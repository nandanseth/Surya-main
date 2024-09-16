import * as React from "react";
import * as XLSX from "xlsx";
import * as ExcelJS from 'exceljs';
import { useState, useEffect } from 'react'
import { ButtonHolder, Form } from '../styles/styles'
import styled from 'styled-components'
import { territory } from '../utils/insured/getTerritory'
import { baserate } from '../utils/insured/getRate'
import { tertiaryRate } from '../utils/insured/getTertRate'
import { primaryRate } from '../utils/insured/getPrimRate'
import { increaseLimitFactor } from '../utils/insured/getIncreaseLimitFactor'
import { secRate } from '../utils/insured/getSecRate'
import { vehTypeFactor } from '../utils/insured/getVehTypeFactor'
import getInfoFromVin from '../utils/vehicle/getInfoFromVin'
import { SortByHeader, Table, TD, Th, TR } from '../styles/styles'
import { Colors } from '../styles/styles'
import SuryaInput from '../components/PolicyForm/PolicyFormInput'
import SuryaSelect from '../components/PolicyForm/PolicyFormSelect'

function Quickrate() {

  const { SectionTitle, Flex, Section, InputWrapper } = Form
//   const { policy, coverage, vehicles, insured, underwriting } = store
//   const {values: underwritingValues, setValues: setUnderwritingValues} = underwriting
//   const {creditsDebits, remarks} = underwritingValues
//   const { values } = vehicles
//   const { policyCategory, classification, policyLineItem, classCode, range, radius, secondaryCategory } = policy.values
//   const { city, zipCode } = insured.values
//   const { overall, combinedSectionLimit, splitSectionBodyPerPerson, splitSectionBodyPerAccident } = coverage.values
//   const {values: coverageValues, setValues: setCoverageValues} = coverage
//   const { seating } = values[0]

  const [zipCode, setZipCode] = useState(0)
  const [classification, setClassification] = useState('')
  const [seating, setSeating] = useState(0)
  const [radius, setRadius] = useState('')

  const [wheelchairVehicles, setWheelchairVehicles] = useState(0)
  const [nonwheelchairVehicles, setNonwheelchairVehicles] = useState(0)
  const [vehicleCount, setVehicleCount] = useState(0)
  const [policyCategory, setPolicyCategory] = useState('')
  const [secondaryCategory, setSecondaryCategory] = useState('')
  const [creditsDebits, setCreditsDebits] = useState(0)

  const [coverageType, setCoverageType] = useState('')


  const [usePremium, setUsePremium] = useState(false)

  const togglePremium = (premium) => {

      if (!usePremium) {
          
          const premiumFinal = (premium/vehicles.values.length).toFixed(2)
          console.log(premiumFinal, 'bde')
          setCoverageValues({...coverageValues, overallPremium: premiumFinal})
      }
      setUsePremium(p => !p)
  }

  const countWheelchairVehicles = (vehicleArray) => {
    let wheelchairYesCount = 0;
    let wheelchairNoCount = 0;
    
    for (let i = 0; i < vehicleArray.length; i++) {
        if (vehicleArray[i].wheelChair === 'Yes') {
        wheelchairYesCount++;
        } else if (vehicleArray[i].wheelChair === 'No') {
        wheelchairNoCount++;
        }
    }
    
    return [
        wheelchairYesCount,
        wheelchairNoCount
    ];
  }


  useEffect(() => {

    setVehicleCount(wheelchairVehicles + nonwheelchairVehicles)

  }, [wheelchairVehicles, nonwheelchairVehicles])

  

  const tableHeaders = ['Vehicle Type', 'Wheelchair', 'Base Rate', 'Comm. Auto Adj.', 'Rel. Factor', 'Capacity Factor', 'Tert. Factor', 'Veh. Type Factor', 'Inc. Limit Factor', 'Rate/Vehicle', 'Number of vehicles', 'Rate']


  const classificationTypes = [
    "Taxicab - Owner-Driver",
    "Taxicab - All Other",
    "Limousine - Seating 8 or Fewer",
    "Limousine - Seating 8 or More",
    "Car Service"
  ]

  const radiusOptions = [
      "Local",
      "Intermediate"
  ]

  const vehicleTypes = [
    "Taxi",
    "Limo",
    "Mini-Van",
    "Van",
    "SUV",
    "School Bus",
    "Transport Bus",
    "Sightseeing",
    "Shuttle Bus/Contract",
    "Jitney",
    "Omni",
    "Wheelchair",
    "Ambulance",
    "Gurney",
    "Paratransit",
  ];

  const specVehicleTypes = [
    "Taxicab",
    "Limousine",
    "Car Service",
    "Medi Cars/Paratransit",
    "Charter Bus",
    "Sightseeing Bus",
    "Transport of Athletic Teams",
    "Urban Bus",
    "Gurney",
    "Airport Bus or Airport Limo",
    "Inter-city Bus",
    "Social Service Agency Auto",
    "Public Auto",
    "Van Pools",
    "School Bus owned by Political or School District Fleet",
    "Other School Bus",
    "Church Bus",
    "Ambulance Service BLS Only",
  ];

  const vehicleMapping = {
    "Taxicab - Owner-Driver": "Taxicab",
    "Taxicab - All Other": "Taxicab",
    "Limousine - Seating 8 or Fewer": "Limousine",
    "Limousine - Seating 8 or More": "Limousine",
    "Car Service": "Car Service",
    "Urban Bus": "Urban Bus",
    "Gurney": "Gurney",
    "Airport Bus or Airport Limousine": "Airport Bus or Airport Limo",
    "Inter-city Bus": "Inter-city Bus",
    "Charter Bus": "Charter Bus",
    "Sightseeing Bus": "Sightseeing Bus",
    "Transportation of Athletes and Entertainers": "Transport of Athletic Teams",
    "Social Service Agency Auto All Other": "Social Service Agency Auto",
    "Paratransit": "Medi Cars/Paratransit",
    "Ambulance": "Medi Cars/Paratransit"
  }

  const specVehicleMapping = {
    "Taxicab - Owner-Driver": "Taxi",
    "Taxicab - All Other": "Taxi",
    "Limousine - Seating 8 or Fewer": "Limo",
    "Limousine - Seating 8 or More": "Limo",
    "Car Service": "Gurney",
    "Urban Bus": "Shuttle Bus/Contract",
    "Airport Bus or Airport Limousine": "Transport Bus",
    "Inter-city Bus": "Sightseeing",
    "Charter Bus": "Transport Bus",
    "Sightseeing Bus": "Sightseeing",
    "Transportation of Athletes and Entertainers": "Transport Bus",
    "Social Service Agency Auto All Other": "Shuttle Bus/Contract",
    "Paratransit": "Paratransit",
    "Ambulance": "Ambulance"
  }

  const stateToCodeMapping = {
      "New Jersey": "NJ",
      "Connecticut": "CT",
      "Pennsylvania": "PA",
      "California": "CA",
      "Alabama": "AL",
      "Ohio": "OH",
      "Oregon": "OR",
      "Texas": "TX",
      "Virginia": "VA",
      "Arizona": "AZ",
      "Indiana": "IN"
  }
  const splitLimitMapping = ["15,000/30,000", "25,000/50,000", "100,000/300,000"]
  const nafleet = ['Ambulance', 'Gurney', 'Van Pools', 'Car Service']
  const nadistance = ['Ambulance', 'Gurney', 'Van Pools']
  const seatingClassFilter = ['Limousine', 'Van Pools']
  const schoolbus = ["School Bus", "Transport Bus"];
  const otherbus = ["Sightseeing", "Shuttle Bus/Contract"];

//   const filterVehicles = () => {

//   }

  const getRate = (
        zipCode: string,
        typeOfVehicle: string,
        
        numberOfPassengers: number,
        rangeOfVehicle: string,
        wheelChairCount: number,
        index: number
        // specVehicleType: string,
        // partOfFleet: string,
        // OwnerDriver: string
    ) => {

        console.log(zipCode, typeOfVehicle, numberOfPassengers, rangeOfVehicle, wheelChairCount, index, 'all')


        let terrCode
        let state
        let stateTerrCode
        let secRateClass
        let baseTaxiRate
        let baseTertiaryRate
        let secondaryRate
        let seating
        let primaryFactor
        let relFactor
        let fleetYesNo
        let finalRate
        let vehTypeRateFactor
        let incLimitFactor
        let fleetFilter
        let ownerDriverFilter
        let distanceFilter
        let seatingFilter
        let splitLimitFull
        let finalRateVehicles
        let generalValues


        if (vehicleCount > 2) {
            fleetYesNo = 'Fleet'
        } else {
            fleetYesNo = 'Non-Fleet'
        }
 
        
        console.log(zipCode, zipCode.length, "legnth")
        if (zipCode && zipCode.length > 3) {


      

            for (const i in territory['Territory']) {
                if (territory['Territory'][i]['Zip Code'] === zipCode || ("0").concat(territory['Territory'][i]['Zip Code']) === zipCode) {
                    terrCode = territory['Territory'][i]['Territory']
                    console.log(terrCode, 'TerrCode')
                    state = stateToCodeMapping[territory['Territory'][i]['State']]
                    if (state === "CT" || state === "NJ") {
                        stateTerrCode = state.concat(terrCode)
                    } else {
                        stateTerrCode = terrCode
                    }
                    
                    console.log(stateTerrCode, 'TerrCode')
                }
            }


            for (const i in baserate['Rate']) {
                if (baserate['Rate'][i]['Territory '] === stateTerrCode) {
                    baseTaxiRate = baserate['Rate'][i]['Taxi Rate ']
                }
            }

            
            
            for (const i in tertiaryRate['tertrate']) {
                if (tertiaryRate['tertrate'][i]['VehicleType'] === vehicleMapping[typeOfVehicle]) {
                    baseTertiaryRate = tertiaryRate['tertrate'][i]['TertiaryFactor']
                }
            }
            for (const i in vehTypeFactor['vehType']) {
                if (vehTypeFactor['vehType'][i]['Type'] === secondaryCategory) {
                    if (index === 0) {
                        vehTypeRateFactor = 1.1
                    } else {
                        vehTypeRateFactor = vehTypeFactor['vehType'][i]['Factor']
                    }
                    
                }
            }

            if (policyCategory !== "School and Church Buses" && policyCategory !== "Other Buses") {
                secRateClass = "Other Vehicles"
            } else {
                secRateClass = policyCategory
            }

            if (numberOfPassengers < 8) {
                seating = 8
            } else if (numberOfPassengers > 8 && numberOfPassengers < 21) {
                seating = 20
            } else if (numberOfPassengers > 20 && numberOfPassengers < 60) {
                seating = 59
            } else if (numberOfPassengers > 60) {
                seating = 1000
            }

            for (const i in secRate['secrate']) {
                if (secRate['secrate'][i]['SECONDARYCLASSIFICATION'] === secRateClass && secRate['secrate'][i]['Max'] === seating ) {
                    secondaryRate = secRate['secrate'][i]['Rate']+1
                }
            }

            const classFilter = primaryRate['primrate'].filter(a => a.Classification === vehicleMapping[typeOfVehicle])
            
            if (!nafleet.includes(vehicleMapping[typeOfVehicle])) {
                fleetFilter = classFilter.filter(a => a.Fleet === fleetYesNo)
            } else {
                fleetFilter = classFilter
            }

            

            if (vehicleMapping[typeOfVehicle] === 'Taxicab' && typeOfVehicle.includes("Owner-Driver")) {
                ownerDriverFilter = fleetFilter.filter(a => a['Owner-Driver'] === 'Owner-Driver')
            } else if (vehicleMapping[typeOfVehicle] === 'Taxicab' && typeOfVehicle.includes("All Other")) {
                ownerDriverFilter = fleetFilter.filter(a => a['Owner-Driver'] === 'All Other')
            } else {
                ownerDriverFilter = fleetFilter
            }

            

            if (!nadistance.includes(vehicleMapping[typeOfVehicle]) && rangeOfVehicle === "Local") {
                distanceFilter = ownerDriverFilter.filter(a => a.Distance === "Local")
            } else if (!nadistance.includes(vehicleMapping[typeOfVehicle]) && rangeOfVehicle === "Intermediate") {
                distanceFilter = ownerDriverFilter.filter(a => a.Distance === "Intermediate")
            } else {
                distanceFilter = ownerDriverFilter
            }

            

            if (seatingClassFilter.includes(vehicleMapping[typeOfVehicle])) {
                seatingFilter = distanceFilter.filter(a => a.Seating < seating)
            } else {
                seatingFilter = distanceFilter
            }

            primaryFactor = seatingFilter[0]['Primary Factor']
            relFactor = seatingFilter[0]['Rel Factor']
            
            for (const i in increaseLimitFactor['increaseLimit']) {
                if (overall === 'Combined Single Limit') {
                    if (increaseLimitFactor['increaseLimit'][i]['Limit'] === combinedSectionLimit) {
                        incLimitFactor = increaseLimitFactor['increaseLimit'][i]['Factor']
                    }
                } else if (overall === 'Split Limit') {
                    splitLimitFull = splitSectionBodyPerPerson.concat('/', splitSectionBodyPerAccident)
                    if (splitLimitMapping.includes(splitLimitFull)) {
                        if (increaseLimitFactor['increaseLimit'][i]['Limit'] === splitLimitFull) {
                            incLimitFactor = increaseLimitFactor['increaseLimit'][i]['Factor']
                        }
                    } else {
                        if (increaseLimitFactor['increaseLimit'][i]['Limit'] === splitSectionBodyPerAccident) {
                            incLimitFactor = increaseLimitFactor['increaseLimit'][i]['Factor']
                        }
                    }
                }
            }

            generalValues = [baseTaxiRate, primaryFactor, relFactor, secondaryRate, baseTertiaryRate, vehTypeRateFactor, incLimitFactor]

            for (const i in generalValues) {
                if (generalValues[i] < 1) {
                    generalValues[i] = 1
                }
            }
            

            finalRate = generalValues[0]*generalValues[1]*generalValues[2]*generalValues[3]*generalValues[4]*generalValues[5]*generalValues[6]
            finalRateVehicles = finalRate*wheelChairCount

            generalValues.push(finalRate)
            generalValues.push(finalRateVehicles)
            // for (const i in primaryRate['Primary Rate']) {
            //     if (primaryRate['Primary Rate'][i]['Classification'] === vehicleMapping[specVehicleType]) {
                    
            //     }
            // }
        }
   


        return generalValues
    }

    const getFinalRates = (wheelChairCount) => {
        let finalRates = 0
        console.log(wheelChairCount, 'ska')
        for (const i in wheelChairCount) {
            console.log(getRate(zipCode.toString(), classification, checkSeating(seating), radius, wheelChairCount[parseFloat(i)], parseFloat(i))[8], 'sklal')
            finalRates += getRate(zipCode.toString(), classification, checkSeating(seating), radius, wheelChairCount[parseFloat(i)], parseFloat(i))[8]
        }
        console.log(finalRates,'mlmlc')
        return finalRates
    }

    const checkSeating = (seating) => {
        let seatingNew = seating
        if (seating === null || seating === "null") {
            seatingNew = 7
        }
        return seatingNew
    }

    // if (!zipCode) {
    //     return (
    //         <Section>
    //             <h1 style={{ fontSize: 42, color: '#d40048' }}>
    //                 Please Add Policy Details to continue
    //             </h1>
    //         </Section>
    //     )
    // }

    return (
        <div>
        <Section>
            <Flex>
                <SuryaInput
                        label="Zip Code"
                        onChange={(e) => {
                            setZipCode(e)
                        }}
                        placeholder="Zip Code"
                        type="number"
                        value={zipCode}
                />
            </Flex>
            <Flex>
                <SuryaSelect
                        label="Classification"
                        onChange={(e) => {
                            setClassification(e)
                        }}
                        placeholder="Classification"
                        options={classificationTypes}
                        value={classification}
                />
            </Flex>
            <Flex>
                <SuryaInput
                        label="Seating"
                        onChange={(e) => {
                            setSeating(e)
                        }}
                        placeholder="Seating"
                        type="number"
                        value={seating}
                />
            </Flex>
            <Flex>
                <SuryaSelect
                        label="Radius"
                        onChange={(e) => {
                            setRadius(e)
                        }}
                        placeholder="Radius"
                        options={radiusOptions}
                        value={radius}
                />
            </Flex>
            <Flex>
                <SuryaInput
                        label="Wheelchair Vehicles"
                        onChange={(e) => {
                            setWheelchairVehicles(e)
                        }}
                        placeholder="Wheelchair Vehicles"
                        type="number"
                        value={wheelchairVehicles}
                />
            </Flex>
            <Flex>
                <SuryaInput
                        label="Non-Wheelchair Vehicles"
                        onChange={(e) => {
                            setNonwheelchairVehicles(e)
                        }}
                        placeholder="Non-Wheelchair Vehicles"
                        type="number"
                        value={nonwheelchairVehicles}
                />
            </Flex>
            <Flex>
                <SuryaSelect
                        label="Policy Category"
                        onChange={(e) => {
                            setPolicyCategory(e)
                        }}
                        placeholder="Policy Category"
                        options={vehicleTypes}
                        value={policyCategory}
                />
            </Flex>
            <Flex>
                <SuryaSelect
                        label="Secondary Category"
                        onChange={(e) => {
                            setSecondaryCategory(e)
                        }}
                        placeholder="Secondary Category"
                        options={specVehicleTypes}
                        value={secondaryCategory}
                />
            </Flex>

            <Flex>

                
                <Table>
                    <thead>
                        {tableHeaders.map((header, index) => {
                            return (
                                <Th>{header}</Th>
                            )
                        })}
                    </thead>
                    <tbody>
                        {[wheelchairVehicles, nonwheelchairVehicles].map((wheelChairCount, index) => {
                            return (
                            <TR>
                                <TDCenter>{secondaryCategory}</TDCenter>
                                <TDCenter>{index === 0 ? (<>Yes</>) : (<>No</>)}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification, checkSeating(seating), radius, wheelChairCount, index)[0]}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification, checkSeating(seating), radius, wheelChairCount, index)[1]}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification, checkSeating(seating), radius, wheelChairCount, index)[2]}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification, checkSeating(seating), radius, wheelChairCount, index)[3]}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification, checkSeating(seating), radius, wheelChairCount, index)[4]}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification, checkSeating(seating), radius, wheelChairCount, index)[5]}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification, checkSeating(seating), radius, wheelChairCount, index)[6]}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification, checkSeating(seating), radius, wheelChairCount, index)[7].toLocaleString('en-US', {maximumFractionDigits: 2})}</TDCenter>
                                <TDCenter>{wheelChairCount}</TDCenter>
                                <TDCenter>${getRate(zipCode.toString(), classification, checkSeating(seating), radius, wheelChairCount, index)[8].toLocaleString('en-US', {maximumFractionDigits: 2})}</TDCenter>
                            </TR>
                            )
                        })
                        }
                    </tbody>
                </Table>
                <br/>
                <h1 style={{ fontSize: 42, color: Colors.electricBlue }}>
                    Credits / Debits
                    <Flex>
                        <SuryaInput
                            label="Credits/Debits"
                            onChange={(e) => {
                                
                                setCreditsDebits(e)
                
                            }}
                            type="number"
                            placeholder="%"
                            value={creditsDebits}
                        />
                    </Flex>

                </h1>
                <br/>
                <Flex>
                    <h1 style={{ fontSize: 42, color: Colors.electricBlue }}>
                        Final Premium: ${(((100+parseFloat(creditsDebits))/100)*getFinalRates(vehicleCount)).toLocaleString('en-US', {maximumFractionDigits: 2})}
                        
                    </h1>
                </Flex>
                <br/>
                <br/>
                <Flex>
                    <h1 style={{ fontSize: 42, color: Colors.electricBlue }}>
                        Use Generated Premium for Overall <input
                                                            type="checkbox"
                                                            id="myCheckbox"
                                                            checked={usePremium}
                                                            onChange={() => togglePremium(((100+parseFloat(creditsDebits))/100)*getFinalRates(vehicleCount))}
                                                        />
                        
                    </h1>
                </Flex>

                    
                <br/>
                <br/>
                <br/>
                <br/>
                
            </Flex>
        </Section>
        </div>
    )
}

export default Quickrate

const TDCenter = styled(TD)`
    text-align: center;
    align-items: center;
`