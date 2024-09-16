import {
    Colors,
    fonts,
    Header,
    StyledDiv,
    SubTitle,
    Title,
} from '../styles/styles'
import {
    CoverageSection,
    DriversSection,
    InsuredSection,
    LossHistorySection,
    PaymentsSection,
    PolicySection,
    ReinsuranceSection,
    VehicleSection,
} from '../components/Reports'
import {
    coverageState,
    driversInitialState,
    insuredInitialState,
    lossHistoryState,
    policyInitialState,
    reinsuranceState,
    vehicleState,
} from '../context/reports-context'
import {
    coverageNAICState,
    driversNAICState,
    insuredNAICState,
    policyNAICState,
    reinsuranceNAICState,
    vehicleNAICState,
} from '../context/reports-naic-context'
import {
    coveragePAYState,
    driversPAYState,
    insuredPAYState,
    policyPAYState,
    reinsurancePAYState,
    vehiclePAYState,
    paymentPAYState
} from '../context/reports-payments-context'
import { CreateButton } from '../components/Buttons'
import { CSVDownload, CSVLink } from 'react-csv'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { testItem, urls } from '../shared'
import { useAlert } from 'react-alert'
import { useEffect, useState } from 'react'
import Checkbox from '../components/Form/Checkbox'
import Layout from '../utils/withLayout'
import RangeSlider from '../components/Reports/RangeSlider'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import Moralis from 'moralis'
import { APP_ID, SERVER_URL } from '../index'
import { organizeBreakdownData } from '../utils/reports/organizeBreakdownData'
import { isTemplateLiteralTypeSpan } from 'typescript'

const min = 0
const max = 1000000
const defaultPremium1 = 0
const defaultPremium2 = 1000000
const omin = 0
const omax = 4000000

const title = 'Generate Reports'
const subtitle =
    'Generate reports in csv format right to your computer. Filter and select fields as needed.'

// Useful to use if you dont want to maintain both
const makeAllFalse = (object: any, isTrue) => {
    const clone = { ...object }
    const keys = Object.keys(clone)
    keys.map((key) => {
        clone[key] = isTrue
    })
    return clone
}

const isAnyTrue = (object: any): boolean => {
    const keys = Object.keys(object)
    return keys.some((key) => {
        return object[key] === true
    })
}

const filterTrue = (object: any) => {
    const keys = Object.keys(object)
    return keys.filter((key) => {
        return object[key] === true
    })
}

const policyDefault = makeAllFalse(policyInitialState, false)
const driversDefault = makeAllFalse(driversInitialState, false)
const insuredDefault = makeAllFalse(insuredInitialState, false)
const coverageDefault = makeAllFalse(coverageState, false)
const vehiclesDefault = makeAllFalse(vehicleState, false)
const lossHistoryDefault = makeAllFalse(lossHistoryState, false)
const paymentsDefault = {
    payments: false,
}
const reinsuranceDefault = makeAllFalse(reinsuranceState, false)

const generateText = 'Generate Report'

// const makeHeaders

// const calculateCustomValues = ({
//     policies
// }) => {
//     let policiesFinal = policies
//     if (customValue === "endorsement") {

//     }

//     return policiesFinal
// }

const filterPolicyList = ({
    endDate,
    startDate,
    premiumRange,
    overallRange,
    isSplit,
    policies,
}) => {
    return policies.filter((item) => {
        //   Date Range (Based on effective date of the policy or implemented date of an endorsement)
        // Premium of Policy
        // Overall limit associated with a policy (if split limit, use per accident limit).

        const getWaiverPremium = () => {
            let waiverPremium = 0

            if (item.insured.additionalInsured?.values) {
                
                for (const i in item.insured.additionalInsured?.values) {
                    if (item.insured.additionalInsured?.values[i].isWaiver === true) {
                        waiverPremium += 500
                    }
                }
            }
            
            return waiverPremium
        }

        const comparisonDate = new Date('09/01/2024');

        const addValue = effectiveDate >= comparisonDate ? 500.00 : 250.00;

    
        const getAddInsuredPremium = () => {
            let addPremium = 0
            console.log(item.insured, "lsoll")
            
            if (item.insured.additionalInsured?.values) {

                
                
                for (const i in item.insured.additionalInsured?.values) {
                    if (item.insured.additionalInsured?.values[i].isAddPremium === true) {
                        addPremium += addValue
                    }
                }
            }
            
            return addPremium
        }


        


        const effectiveDate = new Date(item?.policy?.effectiveDate ?? '1/1/1800')

        

        const isValidDate =
            effectiveDate >= startDate && effectiveDate <= endDate
        if (!isValidDate) {
            return false
        }

        if (item?.policy?.policyNum === '23NJN00255') {
            console.log(item.policy, isValidDate, 'lifetech')
        }

        const CalculatePremium = () => {
            let premium = 0.00
    
            for (const i in item.vehicles.values) {
                    if (!isNaN(parseFloat(item.vehicles.values[i].overallPremium))) {
                        premium+=parseFloat(item.vehicles.values[i].overallPremium)
                    }
                    if (!isNaN(parseFloat(item.vehicles.values[i].personalInjuryProtectionPremium))) {
                        premium+=parseFloat(item.vehicles.values[i].personalInjuryProtectionPremium)
                    }
                    if (!isNaN(parseFloat(item.vehicles.values[i].pedPipProtectionPremium))) {
                        premium+=parseFloat(item.vehicles.values[i].pedPipProtectionPremium)
                    }
                    if (!isNaN(parseFloat(item.vehicles.values[i].medicalPaymentsPremium))) {
                        premium+=parseFloat(item.vehicles.values[i].medicalPaymentsPremium)
                    }
                    if (!isNaN(parseFloat(item.vehicles.values[i].underinsuredMotoristPremium))) {
                        premium+=parseFloat(item.vehicles.values[i].underinsuredMotoristPremium)
                    }
                    if (!isNaN(parseFloat(item.vehicles.values[i].uninsuredMotoristPremium))) {
                        premium+=parseFloat(item.vehicles.values[i].uninsuredMotoristPremium)
                    }
                }
            
            if (!isNaN(parseFloat(item.coverage.hiredCSLPremium))) {
                premium+=parseFloat(item.coverage.hiredCSLPremium)
            }
    
            if (!isNaN(parseFloat(item.coverage.nonOwnedCSLPremium))) {
                premium+=parseFloat(item.coverage.nonOwnedCSLPremium)
            }

            premium += getWaiverPremium()
            premium += getAddInsuredPremium()
        
            return premium.toFixed(2)
        }

        const total = parseFloat(CalculatePremium())


        const [parsedMin, parsedMax] = [
            parseInt(premiumRange[0]),
            parseInt(premiumRange[1]),
        ]

        const isValidPremium = total >= parsedMin && total <= parsedMax
        if (!isValidPremium) {
            return false
        }

        // if it's not split then do the overallPremium

        let parsedOverall = parseInt(item.coverage.combinedSectionLimit.toLocaleString().replace(/,/g, ''))
        parsedOverall = isNaN(parsedOverall) ? 0 : parsedOverall;

        let parsedSplit = parseInt(item.coverage.splitSectionBodyPerAccidentOptions.toLocaleString().replace(/,/g, ''))
        parsedSplit = isNaN(parsedSplit) ? 0 : parsedSplit

        let finalLimit = 0

        if (parsedOverall > parsedSplit) {
            finalLimit = parsedOverall
        } else {
            finalLimit = parsedSplit
        }



        const limit = isSplit
            ? item.coverage.splitSectionBodyPerAccidentOptions
            : parsedOverall

        return (
            finalLimit <= parseInt(overallRange[1]) &&
            finalLimit >= parseInt(overallRange[0])
        )
    })
}

const Home = () => {
    const alert = useAlert()

    const [policy, setPolicy] = useState(policyDefault)
    const [drivers, setDrivers] = useState(driversDefault)
    const [insured, setInsured] = useState(insuredDefault)
    const [coverage, setCoverage] = useState(coverageDefault)
    const [vehicles, setVehicles] = useState(vehiclesDefault)
    const [lossHistory, setLossHistory] = useState(lossHistoryDefault)
    const [payments, setPayments] = useState(paymentsDefault)
    const [reinsurance, setReinsurance] = useState(reinsuranceDefault)
    const [generatedData, setGenerated] = useState(undefined)
    const [policies, setPolicies] = useState(undefined)
    const [loadingPolicies, setLoading] = useState(true)

    const [startDate, setStartDate] = useState<Date | null>(
        // This sets the date a year ago
        new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    )

    const [endDate, setEndDate] = useState<Date | null>(new Date())
    const [reportDate, setReportDate] = useState<Date | null>(new Date())

    const [premiumRange, setPremiumRange] = useState([
        defaultPremium1,
        defaultPremium2,
    ])

    const [overallRange, setOverallRange] = useState([
        defaultPremium1,
        defaultPremium2,
    ])

    const [isSplit, setIsSplit] = useState(false)

    const [driversDisabled, setDriversDisabled] = useState(false)
    const [vehiclesDisabled, setVehiclesDisabled] = useState(false)
    const [lossDisabled, setLossDisabled] = useState(false)
    const [paymentsDisabled, setPaymentsDisabled] = useState(true)


    const stateToTaxFee = {
        'New Jersey': 0.05,
        'Texas': 0.036,
        'California': 0.036,
        'Ohio': 0.05,
        'Pennsylvania': 0.036,
        'Arizona': 0.036,
        'Virginia': 0.036,
        'Alabama': 0.036,
        'Oregon': 0.036,
        'Connecticut': 0.04
        }


    const [generating, setGenerating] = useState(false)

    const handleDrivers = (val) => {
        if (isAnyTrue(val)) {
            if (!vehiclesDisabled || !lossDisabled) {
                setVehiclesDisabled(true)
                setLossDisabled(true)
            }
            setDrivers(val)
            return
        }
        setVehiclesDisabled(false)
        setLossDisabled(false)
        setDrivers(val)
    }

    const handleVehicles = (val) => {
        if (isAnyTrue(val)) {
            if (!driversDisabled || !lossDisabled) {
                setDriversDisabled(true)
                setLossDisabled(true)
            }
            setVehicles(val)
            return
        }


        setDriversDisabled(false)
        setLossDisabled(false)
        setVehicles(val)
    }

    const handleLoss = (val) => {
        if (isAnyTrue(val)) {
            if (!driversDisabled || !vehiclesDisabled) {
                setDriversDisabled(true)
                setVehiclesDisabled(true)
            }
            setLossHistory(val)
            return
        }

        setDriversDisabled(false)
        setVehiclesDisabled(false)
        setLossHistory(val)
    }

    const generateBreakdownData = (data) => {
        setGenerating(true)

        const check = !vehiclesDisabled
        let dataBreakdown

        if (check) {

            dataBreakdown = organizeBreakdownData(data, startDate, endDate)
        }


        setGenerating(false)

        return dataBreakdown
    }

    const generateData = () => {
        setGenerating(true) 
        // when we get the policies we will need to filter them
        //const filteredPolicies = [testItem]
        const filteredPolicies = filterPolicyList({
            endDate,
            startDate,
            premiumRange,
            overallRange,
            isSplit,
            policies,
        })

        console.log(filteredPolicies,  endDate,
            startDate,
            premiumRange,
            overallRange,
            isSplit, 
            'flefael')

        if (filteredPolicies.length === 0) {
            alert.error('There are no policies that fit this')
            setGenerating(false)
            return;
        }

        const [
            policyHeaders,
            insuredHeaders,
            coverageHeaders,
            paymentsHeaders,
            reHeaders,
        ] = [
            filterTrue(policy),
            filterTrue(insured),
            filterTrue(coverage),
            filterTrue(payments),
            filterTrue(reinsurance),
        ]

        const buildList = [
            { headers: policyHeaders, key: 'policy' },
            { headers: insuredHeaders, key: 'insured' },
            { headers: coverageHeaders, key: 'coverage' },
            { headers: paymentsHeaders, key: 'payments' },
            { headers: reHeaders,  key: 'reinsurance' },
        ]

        let listValue: { key: string; headers: string[] }
        const check = driversDisabled || vehiclesDisabled || lossDisabled

        if (check) {
            if (!driversDisabled) {
                listValue = { key: 'drivers', headers: filterTrue(drivers) }
            }
            if (!vehiclesDisabled) {
                listValue = { key: 'vehicles', headers: filterTrue(vehicles) }


            }
            if (!lossDisabled) {
                listValue = {
                    key: 'loss_history',
                    headers: filterTrue(lossHistory),
                }
            }
        }
        //all we need to do is see which ones are true then make them into a object
        //policy, insured, coverage, payments, reinsurance
        const csvFormattedList = []

        const csvFormatted = filteredPolicies.map((currPolicy) => {
            const builtPolicy = {}
            buildList.map(({ headers, key }) => {
                headers.map((currVal) => {
                    builtPolicy[currVal] = currPolicy[key][currVal]
                })
            })

            if (check) {
                currPolicy[listValue.key].values.map((currItem) => {
                    const toAppend = { ...builtPolicy }
                    listValue.headers.map((key) => {
                        toAppend[key] = currItem[key]
                    })
                    csvFormattedList.push(toAppend)
                })
            }

            return builtPolicy
        })
        setGenerating(false)

        return check ? csvFormattedList : csvFormatted
    }

    useEffect(() => {
        const getPolicies = async () => {
            setLoading(true)

            const calcEarnedPrem = (totalPremium, vehicleEffDate, vehicleExpDate, policyEffDate, policyExpDate) => {
                let multFactor = 0.0
                const earnedPremiumAtStart = totalPremium*0.25
                
                const finalExpDate = Math.min(reportDate.getTime(), new Date(vehicleExpDate).getTime())
                multFactor = Math.floor((finalExpDate - new Date(vehicleEffDate).getTime()) / (1000 * 60 * 60 * 24)) / Math.floor((new Date(vehicleExpDate).getTime() - new Date(vehicleEffDate).getTime()) / (1000 * 60 * 60 * 24))
                console.log(totalPremium, multFactor, totalPremium*multFactor, 'slal')
                return Math.max(earnedPremiumAtStart, totalPremium*multFactor).toFixed(2)
            }

            const findCommissionPercent = (agent) => {

                const idToCommission = {
                    'Preferred Risk Associates (PRABRK)': 0.10,
                    "Cluett Insurance Agency (CLUETT)": 0.12,
                    "Quantum Risk Solutions (QRSBRK)": 0.15,
                    "American Business Insurance (ABIBRK)": 0.10,
                    "Transportation Insurance Placement Services (TIPSBRK)": 0.10,
                    "Big Rigs (BRBRK)": 0.10,
                    "Cornell Insurance Agency (CORN)":0.10,
                    "Laguna Pacific Insurance Services (LPIS)": 0.10
                }

                return idToCommission[agent]



            }


            const CalculateOnePremium = (vehicle) => {
                let premium = 0.00
                if (!isNaN(parseFloat(vehicle.overallPremium))) {
                    premium+=parseFloat(vehicle.overallPremium)
                }
                if (!isNaN(parseFloat(vehicle.personalInjuryProtectionPremium))) {
                    premium+=parseFloat(vehicle.personalInjuryProtectionPremium)
                }
                if (!isNaN(parseFloat(vehicle.pedPipProtectionPremium))) {
                    premium+=parseFloat(vehicle.pedPipProtectionPremium)
                }
                if (!isNaN(parseFloat(vehicle.medicalPaymentsPremium))) {
                    premium+=parseFloat(vehicle.medicalPaymentsPremium)
                }
                if (!isNaN(parseFloat(vehicle.underinsuredMotoristPremium))) {
                    premium+=parseFloat(vehicle.underinsuredMotoristPremium)
                }
                if (!isNaN(parseFloat(vehicle.uninsuredMotoristPremium))) {
                    premium+=parseFloat(vehicle.uninsuredMotoristPremium)
                }
                
                    
            
                return premium.toFixed(2)
            }
            try {
                // const res = await fetch(urls.getAllPoliciesUrl)
                // const data = await res.json()
                // setPolicies(data)
                const appId = APP_ID;
                const serverUrl = SERVER_URL;  

                Moralis.start({ serverUrl, appId });
                const Policies = await (Moralis as any).Object.extend("Policies");

                const query = new (Moralis as any).Query(Policies);
                const data = await query.limit(1000).find();
                let dataJson
                const policyData = []

                for (const i in data) {
                    const object = data[i]
                    dataJson = JSON.parse(object.get("policyJson"))
                    
                    
                    for (const j in dataJson.vehicles.values) {
                        dataJson.vehicles.values[j]['totalPremium'] = CalculateOnePremium(dataJson.vehicles.values[j])
                        dataJson.vehicles.values[j]['earnedPremium'] = calcEarnedPrem(CalculateOnePremium(dataJson.vehicles.values[j]), dataJson.vehicles.values[j].baseEffDate, 
                        dataJson.vehicles.values[j].baseExpDate,
                        dataJson.policy.effectiveDate,
                        dataJson.policy.expirationDate)
                        dataJson.vehicles.values[j]['commissionPercentage'] = findCommissionPercent(dataJson.policy.agent)*100
                        dataJson.vehicles.values[j]['commissionAmount'] = CalculateOnePremium(dataJson.vehicles.values[j])*findCommissionPercent(dataJson.policy.agent)
 
                        dataJson.vehicles.values[j]['cancellationDate'] = dataJson.cancellation?.cancellationDate
                        dataJson.vehicles.values[j]['isCancelled'] = dataJson.cancellation?.isCancelled

                    }
                    
                    
                    policyData.push(dataJson)
                }





                setPolicies(policyData)
                console.log(policyData, 'godla;')
                setLoading(false)
            } catch (error) {
                alert.error('Error getting policies')
                console.log(error)
                setLoading(false)
            }
        }
        getPolicies()

    }, [alert])

    useEffect(() => {

        const CalculateAllPremium = (vehicles) => {
            let premium = 0.00
            for (const i in vehicles) {
                if (!isNaN(parseFloat(vehicles[i].overallPremium))) {
                    premium+=parseFloat(vehicles[i].overallPremium)
                }
                if (!isNaN(parseFloat(vehicles[i].personalInjuryProtectionPremium))) {
                    premium+=parseFloat(vehicles[i].personalInjuryProtectionPremium)
                }
                if (!isNaN(parseFloat(vehicles[i].pedPipProtectionPremium))) {
                    premium+=parseFloat(vehicles[i].pedPipProtectionPremium)
                }
                if (!isNaN(parseFloat(vehicles[i].medicalPaymentsPremium))) {
                    premium+=parseFloat(vehicles[i].medicalPaymentsPremium)
                }
                if (!isNaN(parseFloat(vehicles[i].underinsuredMotoristPremium))) {
                    premium+=parseFloat(vehicles[i].underinsuredMotoristPremium)
                }
                if (!isNaN(parseFloat(vehicles[i].uninsuredMotoristPremium))) {
                    premium+=parseFloat(vehicles[i].uninsuredMotoristPremium)
                }
            }
            
                
        
            return premium.toFixed(2)
        }

        const getPaymentTotals = (payments) => {
            let totalPremium = 0.00
            let totalTax = 0.00
            let totalSubFee = 0.00
            let totalInstallmentFee = 0.00
            for (const i in payments) {
                totalPremium += parseFloat(payments[i]['Installment'])
                totalTax += parseFloat(payments[i]['Tax'])
                totalSubFee += parseFloat(payments[i]['SubscriptionFee'])
                totalInstallmentFee += parseFloat(payments[i]['InstallmentFee'])
            }
            return [totalPremium, totalSubFee, totalTax, totalInstallmentFee]
        }

        // const getTaxFee = () => {
        //     const agentToTaxFee = 
        // }
        const getPayments = async() => {

            const appId = APP_ID;
            const serverUrl = SERVER_URL;  

            Moralis.start({ serverUrl, appId });
            const Policies = await (Moralis as any).Object.extend("Policies");

            const query = new (Moralis as any).Query(Policies);
            const data = await query.limit(1000).find();
            let dataJson
            const policyData = []

            for (const i in data) {
                const object = data[i]
                dataJson = JSON.parse(object.get("policyJson"))
                
                console.log(CalculateAllPremium(dataJson.vehicles.values), 'mele')

                dataJson.payments['installmentNo'] = 'Total'
                dataJson.payments['totalPremium'] = CalculateAllPremium(dataJson.vehicles.values)
                dataJson.payments['subscriptionFee'] = CalculateAllPremium(dataJson.vehicles.values)*.12
                dataJson.payments['taxFee'] = CalculateAllPremium(dataJson.vehicles.values)*stateToTaxFee[dataJson.policy.states]

                dataJson.payments['totalPremiumPaid'] = getPaymentTotals(dataJson.payments.values)[0]
                dataJson.payments['subscriptionFeePaid'] = getPaymentTotals(dataJson.payments.values)[1]
                dataJson.payments['taxFeePaid'] = getPaymentTotals(dataJson.payments.values)[2]
                dataJson.payments['installmentFeePaid'] = getPaymentTotals(dataJson.payments.values)[3]

                dataJson.payments['totalPremiumDue'] = CalculateAllPremium(dataJson.vehicles.values) - getPaymentTotals(dataJson.payments.values)[0]
                dataJson.payments['subscriptionFeeDue'] = CalculateAllPremium(dataJson.vehicles.values)*.12 - getPaymentTotals(dataJson.payments.values)[1]
                dataJson.payments['taxFeeDue'] = CalculateAllPremium(dataJson.vehicles.values)*stateToTaxFee[dataJson.policy.states] - getPaymentTotals(dataJson.payments.values)[2]


                policyData.push(dataJson)



            }

            console.log(dataJson, 'pap')
            
    
            setPolicies(policyData)
            setLoading(false)
        }

        

        if (!paymentsDisabled) {
            getPayments()
        }
        

    }, [paymentsDisabled])

    const setNAICReport = () => {
        setPolicy(policyNAICState)
    }

    //@Kush if you want to do a make all false or true, its pretty  to use to makeAllFalse method. True sets all of them checked
    return (
        <Layout>
            <Main>
                <Flex>
                    <Content>
                        <Header>
                            <div>
                                <Title>{title}</Title>
                                <SubTitle>{subtitle}</SubTitle>
                            </div>
                        </Header>{
                            loadingPolicies ? 
                            (<ReportsMain>
                                <h1>Loading</h1>
                            </ReportsMain>): (
                                <ReportsMain>
                            <Accordions>
                                <Explainer>select fields</Explainer>


                                <PolicySection
                                    policy={policy}
                                    setPolicy={setPolicy}
                                    makeAllTrue={makeAllFalse}
                                />
                                <DriversSection
                                    disabled={driversDisabled}
                                    drivers={drivers}
                                    setDrivers={handleDrivers}
                                    makeAllTrue={makeAllFalse}

                                />
                                <LossHistorySection
                                    disabled={lossDisabled}
                                    lossHistory={lossHistory}
                                    setLossHistory={handleLoss}
                                    makeAllTrue={makeAllFalse}
                                />
                                <InsuredSection
                                    insured={insured}
                                    setInsured={setInsured}
                                    makeAllTrue={makeAllFalse}
                                />
                                <PaymentsSection
                                    payments={payments}
                                    setPayments={setPayments}
                                    
                                />
                                <VehicleSection
                                    disabled={vehiclesDisabled}
                                    setVehicles={handleVehicles}
                                    vehicles={vehicles}
                                    makeAllTrue={makeAllFalse}
                                />
                                <CoverageSection
                                    coverage={coverage}
                                    setCoverage={setCoverage}
                                    makeAllTrue={makeAllFalse}
                                />
                                <ReinsuranceSection
                                    reinsurance={reinsurance}
                                    setReinsurance={setReinsurance}
                                />
                            </Accordions>
                            <Right>
                                <Explainer>select filters</Explainer>

                                <TimePicker
                                    inputFormat="MM/dd/yyyy"
                                    label="Start Date"
                                    onChange={setStartDate}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    value={startDate}
                                />
                                <TimePicker
                                    inputFormat="MM/dd/yyyy"
                                    label="End Date"
                                    onChange={setEndDate}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    value={endDate}
                                />
                                <TimePicker
                                    inputFormat="MM/dd/yyyy"
                                    label="Report Date"
                                    onChange={setReportDate}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    value={reportDate}
                                />

                                <RangeSlider
                                    label="Premium Range"
                                    max={max}
                                    min={min}
                                    setValue={setPremiumRange}
                                    step={10000}
                                    value={premiumRange}
                                />

                                <RangeSlider
                                    label="Overall Limit Range"
                                    max={omax}
                                    min={omin}
                                    setValue={setOverallRange}
                                    step={100000}
                                    value={overallRange}
                                />
                                {/* <div style={{ marginTop: -12 }}>
                                    <Checkbox
                                        checked={isSplit}
                                        labelText="Split Limit"
                                        onChange={() => setIsSplit(!isSplit)}
                                    />
                                </div> */}
                                <MarginTop>
                                    <GenerateButton
                                        onClick={() => {
                                            console.log('loading')
                                            const data = generateData()
                                            console.log(data, 'els')
                                            const breakdownData = generateBreakdownData(data)
                                            setGenerated(breakdownData)
                                        }}
                                    >
                                        {generateText}
                                    </GenerateButton>
                                </MarginTop>
                                <MarginTop>
                                    <GenerateButton
                                        onClick={() => {
                                            console.log('loading')
                                     
                                            setPolicy(policyNAICState)
                                            handleVehicles(vehicleNAICState)
                                            setInsured(insuredNAICState)
                                            setCoverage(coverageNAICState)
                                        }}
                                    >
                                        NAIC REPORT
                                    </GenerateButton>
                                </MarginTop>
                                <MarginTop>
                                    <GenerateButton
                                        onClick={() => {
                                            console.log('loading')
                                     
                                            setPolicy(policyPAYState)
                                            handleVehicles(vehiclePAYState)
                                            setInsured(insuredPAYState)
                                            setCoverage(coveragePAYState)
                                            setPayments(paymentPAYState)
                                            setPaymentsDisabled(false)
                                        }}
                                    >
                                        PAYMENT REPORT
                                    </GenerateButton>
                                </MarginTop>
                                <MarginTop>
                                    {generatedData === undefined ? (
                                        <div>
                                            {generating ? 'generating csv' : ''}
                                        </div>
                                    ) : (
                                        <>
                                            <CSVDownload
                                                data={generatedData}
                                                target="_blank"
                                            />
                                            <Download
                                                data={generatedData}
                                                target="_blank"
                                            >
                                                {' '}
                                                ↓ Download me
                                            </Download>
                                        </>
                                    )}
                                </MarginTop>
                            </Right>
                        </ReportsMain>
                            )
                            
                        }
                        
                    </Content>
                </Flex>
            </Main>
        </Layout>
    )
}

const TimePicker = (props: any) => {
    return (
        <StyledDiv>
            <MobileDatePicker {...props} />
        </StyledDiv>
    )
}

const MarginTop = styled.div`
    margin-top 24px;
`

const Main = styled.main`
    min-height: 100vh;
    height: 100%;
    width: 100%;
    display: block;
    padding: 0 24px;
`

const Flex = styled.div`
    display: flex;
    height: 100%;
`

const Content = styled.div`
    height: 100%;
    background: white;
    flex: 3;
`

const ReportsMain = styled(Flex)`
    padding: 20px;
    padding-left: 4px;
    flex-flow: row wrap;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex: 2;
    overflow-y: scroll;
`

const Right = styled(Row)`
    flex-direction: column;
    margin-left: auto;
    flex: 1 1 auto;
    padding: 0 12px;
`

const Accordions = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 300;
    flex: 1 1 auto;
`

const Explainer = styled.p`
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    color: #00000094;
    padding: 8px 0;
    text-align: left;
    margin-bottom: 12px;
`
const GenerateButton = styled(CreateButton)`
    margin: auto;
    width: 100%;
    font-size: ${fonts.size.medium};
    color: white;
    background: ${Colors.electricBlue};
    :hover {
        color: ${Colors.electricBlue};
    }
`

const Download = styled(CSVLink)`
    font: inherit;
    font-weight: 500;
    font-size: ${fonts.size.medium};
    display: flex;
    padding: 12px 24px;
    align-items: center;
    justify-content: center;
    color: white;
    background: black;
    border-radius: 10px;
    :hover {
        color: ${Colors.electricBlue};
    }
`

export default Home