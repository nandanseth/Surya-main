import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area, Cell } from 'recharts';
import Moralis from 'moralis';
import { SERVER_URL, APP_ID } from '../index';
import { Select, FormControl, InputLabel, MenuItem, Stack } from '@mui/material';
import regression from 'regression';

const VEHICLE_CATEGORIES = {
    'ALL': 'All Vehicles',
    'T': 'Taxi',
    'L': 'Limo',
    'N': 'NEMT'
};

const getVehicleCategory = (policyNum) => {
    if (!policyNum || policyNum.length < 3) return null;
    const categoryChar = policyNum.charAt(2).toUpperCase();
    return ['T', 'L', 'N'].includes(categoryChar) ? categoryChar : null;
};

const PremiumCharts = () => {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedState, setSelectedState] = useState('ALL');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [availableStates, setAvailableStates] = useState(['ALL']);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                await Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID });
                const Policies = Moralis.Object.extend("Policies");
                const query = new Moralis.Query(Policies);
                query.limit(10000);
                const data = await query.find();
                setPolicies(data);

                const states = new Set(['ALL']);
                
                data.forEach(policy => {
                    const policyData = JSON.parse(policy.get("policyJson"));
                    if (policyData.policy.states) {
                        states.add(policyData.policy.states);
                    }
                });
                
                setAvailableStates(Array.from(states).sort());
            } catch (error) {
                console.error('Error fetching policies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPolicies();
    }, []);

    const calculatePolicyPremium = (vehicles, coverage) => {
        let premium = 0.00;

        for (const i in vehicles.values) {
            if (!isNaN(parseFloat(vehicles.values[i].overallPremium))) {
                premium += parseFloat(vehicles.values[i].overallPremium);
            }
            if (!isNaN(parseFloat(vehicles.values[i].personalInjuryProtectionPremium))) {
                premium += parseFloat(vehicles.values[i].personalInjuryProtectionPremium);
            }
            if (!isNaN(parseFloat(vehicles.values[i].pedPipProtectionPremium))) {
                premium += parseFloat(vehicles.values[i].pedPipProtectionPremium);
            }
            if (!isNaN(parseFloat(vehicles.values[i].medicalPaymentsPremium))) {
                premium += parseFloat(vehicles.values[i].medicalPaymentsPremium);
            }
            if (!isNaN(parseFloat(vehicles.values[i].underinsuredMotoristPremium))) {
                premium += parseFloat(vehicles.values[i].underinsuredMotoristPremium);
            }
            if (!isNaN(parseFloat(vehicles.values[i].uninsuredMotoristPremium))) {
                premium += parseFloat(vehicles.values[i].uninsuredMotoristPremium);
            }
        }

        if (!isNaN(parseFloat(coverage.hiredCSLPremium))) {
            premium += parseFloat(coverage.hiredCSLPremium);
        }
        if (!isNaN(parseFloat(coverage.nonOwnedCSLPremium))) {
            premium += parseFloat(coverage.nonOwnedCSLPremium);
        }

        return premium;
    };

    const calculateMonthlyPremiums = () => {
        const monthlyData = {};
        const currentDate = new Date();
        const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        policies.forEach(policy => {
            const policyData = JSON.parse(policy.get("policyJson"));
            const effectiveDate = new Date(policyData.policy.effectiveDate);
            
            if (effectiveDate >= firstDayOfCurrentMonth) {
                return;
            }

            if (selectedState !== 'ALL' && policyData.policy.states !== selectedState) {
                return;
            }

            const vehicleCategory = getVehicleCategory(policyData.policy.policyNum);
            if (selectedCategory !== 'ALL' && vehicleCategory !== selectedCategory) {
                return;
            }

            const monthYear = `${effectiveDate.getFullYear()}-${(effectiveDate.getMonth() + 1).toString().padStart(2, '0')}`;
            const premium = calculatePolicyPremium(policyData.vehicles, policyData.coverage);

            if (!monthlyData[monthYear]) {
                monthlyData[monthYear] = 0;
            }
            monthlyData[monthYear] += premium;
        });

        const historicalData = Object.entries(monthlyData)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([month, total]) => ({ 
                month: formatMonthYear(month), 
                total: parseFloat(total.toFixed(2)),
                isPrediction: false
            }));

        const predictions = calculatePredictions(monthlyData);
        
        return [...historicalData, ...predictions];
    };

    const calculatePredictions = (monthlyData) => {
        // Convert data to array of values
        const values = Object.entries(monthlyData)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([_, total]) => total);
        
        // Calculate seasonal patterns (12-month seasonality)
        const seasonalityPeriod = 12;
        const seasonalFactors = new Array(seasonalityPeriod).fill(0);
        const seasonalCounts = new Array(seasonalityPeriod).fill(0);
        
        // Calculate average value for each month position
        values.forEach((value, index) => {
            const monthPosition = index % seasonalityPeriod;
            seasonalFactors[monthPosition] += value;
            seasonalCounts[monthPosition]++;
        });
        
        // Normalize seasonal factors
        const avgValue = (values as number[]).reduce((sum, val) => sum + val, 0) / values.length;
        seasonalFactors.forEach((_, index) => {
            if (seasonalCounts[index] > 0) {
                seasonalFactors[index] = (seasonalFactors[index] / seasonalCounts[index]) / avgValue;
            } else {
                seasonalFactors[index] = 1;
            }
        });
        
        // Calculate trend using last 12 months (or less if not available)
        const trendPeriod = Math.min(12, values.length);
        const recentValues = values.slice(-trendPeriod);
        
        // Calculate average month-over-month growth with dampening
        const growthRates = [];
        for (let i = 1; i < recentValues.length; i++) {
            if (recentValues[i - 1] !== 0) {
                const monthlyGrowth = recentValues[i] / recentValues[i - 1];
                // Dampen extreme growth rates
                const dampened = Math.max(0.95, Math.min(1.05, monthlyGrowth));
                growthRates.push(dampened);
            }
        }
        
        // Calculate dampened average growth rate
        const avgGrowthRate = growthRates.length > 0 
            ? Math.pow(growthRates.reduce((a, b) => a * b, 1), 1 / growthRates.length)
            : 1;
        
        // Further dampen the growth rate for future predictions
        const dampedGrowthRate = 1 + (Math.min(avgGrowthRate - 1, 0.02));
        
        // Calculate moving average of recent months for baseline
        const recentMonthsAvg = recentValues.slice(-3).reduce((a, b) => a + b, 0) / 3;
        
        // Generate predictions
        const predictions = [];
        const futureMonths = 12;
        
        for (let i = 1; i <= futureMonths; i++) {
            const futureDate = new Date();
            futureDate.setMonth(futureDate.getMonth() + i);
            
            // Apply seasonal factor and dampened growth
            const monthPosition = (values.length + i - 1) % seasonalityPeriod;
            const seasonalFactor = seasonalFactors[monthPosition];
            const growthFactor = Math.pow(dampedGrowthRate, i);
            
            // Calculate predicted value with more conservative growth
            const predictedValue = recentMonthsAvg * seasonalFactor * growthFactor;
            
            // Calculate confidence interval (wider as we predict further)
            const confidenceWidth = 0.03 * i; // Reduced from 0.05 to 0.03
            const lowerBound = predictedValue * (1 - confidenceWidth);
            const upperBound = predictedValue * (1 + confidenceWidth);
            
            predictions.push({
                month: futureDate.toLocaleDateString('en-US', { 
                    year: 'numeric',
                    month: 'long'
                }),
                total: Math.max(0, predictedValue),
                lowerBound: Math.max(0, lowerBound),
                upperBound: Math.max(0, upperBound),
                isPrediction: true
            });
        }
        
        return predictions;
    };

    const formatMonthYear = (dateStr) => {
        const [year, month] = dateStr.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric',
            month: 'long'
        });
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    if (loading) {
        return <div>Loading premium data...</div>;
    }

    const monthlyPremiums = calculateMonthlyPremiums();

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <h2>Monthly Premium Totals Since Inception</h2>
                <Stack direction="row" spacing={2}>
                    <FormControl style={{ minWidth: 200 }}>
                        <InputLabel>Select State</InputLabel>
                        <Select
                            value={selectedState}
                            onChange={handleStateChange}
                            label="Select State"
                        >
                            {availableStates.map((state) => (
                                <MenuItem key={state} value={state}>
                                    {state}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl style={{ minWidth: 200 }}>
                        <InputLabel>Vehicle Type</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            label="Vehicle Type"
                        >
                            {Object.keys(VEHICLE_CATEGORIES).map((category) => (
                                <MenuItem key={category} value={category}>
                                    {VEHICLE_CATEGORIES[category]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </div>
            <BarChart 
                width={1600} 
                height={500}
                data={monthlyPremiums}
                margin={{ 
                    top: 20, 
                    right: 30, 
                    left: 100,
                    bottom: 100
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="month" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                    tick={{ fontSize: 12 }}
                />
                <YAxis 
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    width={100}
                    label={{ 
                        value: 'Premium Amount', 
                        angle: -90, 
                        position: 'insideLeft',
                        offset: -80,
                        style: { textAnchor: 'middle' }
                    }}
                    tick={{ fontSize: 12 }}
                />
                <Tooltip 
                    formatter={(value, name, props) => {
                        if (!props.payload.isPrediction) {
                            return [`$${value.toLocaleString()}`, 'Actual Premium'];
                        }
                        
                        const payload = props.payload;
                        return [
                            `$${value.toLocaleString()}`,
                            `Predicted Premium (Range: $${payload.lowerBound.toLocaleString()} - $${payload.upperBound.toLocaleString()})`
                        ];
                    }}
                    labelStyle={{ fontSize: 14 }}
                    contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #cccccc',
                        padding: '10px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                />
                <Legend 
                    wrapperStyle={{ 
                        paddingTop: '20px',
                        fontSize: '14px'
                    }}
                    payload={[
                        {
                            value: 'Actual Premium',
                            type: 'rect',
                            color: '#4CAF50'
                        },
                        {
                            value: 'Predicted Premium',
                            type: 'rect',
                            color: '#8884d8',
                            strokeDasharray: '3 3'
                        }
                    ]}
                />
                <Bar 
                    dataKey="total" 
                    name="Premium"
                    isAnimationActive={false}
                >
                    {monthlyPremiums.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={entry.isPrediction ? '#8884d8' : '#4CAF50'}
                            stroke={entry.isPrediction ? '#6b6b9e' : '#4CAF50'}
                            strokeWidth={entry.isPrediction ? 2 : 0}
                            strokeDasharray={entry.isPrediction ? '3 3' : '0'}
                            fillOpacity={entry.isPrediction ? 0.6 : 1}
                        />
                    ))}
                </Bar>
                <Area
                    dataKey="upperBound"
                    stroke="none"
                    fill="#8884d8"
                    fillOpacity={0.1}
                    isAnimationActive={false}
                />
                <Area
                    dataKey="lowerBound"
                    stroke="none"
                    fill="#8884d8"
                    fillOpacity={0.1}
                    isAnimationActive={false}
                />
            </BarChart>
        </div>
    );
};

export default PremiumCharts; 