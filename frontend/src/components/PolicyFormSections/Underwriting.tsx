import * as React from "react";
import * as XLSX from "xlsx";
import * as ExcelJS from 'exceljs';
import { useState, useEffect } from 'react'
import { ButtonHolder, Form } from '../../styles/styles'
import styled from 'styled-components'
import { territory } from '../../utils/insured/getTerritory'
import { baserate } from '../../utils/insured/getRate'
import { tertiaryRate } from '../../utils/insured/getTertRate'
import { primaryRate } from '../../utils/insured/getPrimRate'
import { increaseLimitFactor } from '../../utils/insured/getIncreaseLimitFactor'
import { secRate } from '../../utils/insured/getSecRate'
import { vehTypeFactor } from '../../utils/insured/getVehTypeFactor'
import getInfoFromVin from '../../utils/vehicle/getInfoFromVin'
import { SortByHeader, Table, TD, Th, TR } from '../../styles/styles'
import { Colors } from '../../styles/styles'
import SuryaInput from '../PolicyForm/PolicyFormInput'

function Underwriting({ store }) {

  const { SectionTitle, Flex, Section, InputWrapper } = Form
  const { policy, coverage, vehicles, insured, underwriting } = store
  const {values: underwritingValues, setValues: setUnderwritingValues} = underwriting
  const {creditsDebits, remarks, isCamera} = underwritingValues
  const { values } = vehicles
  const { policyCategory, classification, policyLineItem, classCode, range, radius, secondaryCategory } = policy.values
  const { city, zipCode } = insured.values
  const { overall, combinedSectionLimit, splitSectionBodyPerPerson, splitSectionBodyPerAccidentOptions, pedPipProtectionPremium, uninsuredMotoristPremium, underinsuredMotoristPremium } = coverage.values
  const {values: coverageValues, setValues: setCoverageValues} = coverage
  const {values: vehicleValues, setValues: setVehicleValues} = vehicles
  const { seating } = values[0]



  const [usePremium, setUsePremium] = useState(false)

  const togglePremium = (premium) => {
      console.log(premium, 'lde')
      
      if (!usePremium) {
          
          const premiumFinal = (premium/vehicles.values.length).toFixed(2)
          console.log(premiumFinal, 'bde')
          setCoverageValues({...coverageValues, overallPremium: premiumFinal})
          const vehiclesCopy = vehicleValues
          for (const i in vehiclesCopy) {
            vehiclesCopy[i].overallPremium = premiumFinal
            vehiclesCopy[i].pedPipProtectionPremium = pedPipProtectionPremium
            vehiclesCopy[i].uninsuredMotoristPremium = uninsuredMotoristPremium
            vehiclesCopy[i].underinsuredMotoristPremium = underinsuredMotoristPremium
            
          }
          setVehicleValues(vehiclesCopy)
      }
      setUsePremium(p => !p)
  }

  const countWheelchairVehicles = (vehicleArray) => {
    let wheelchairYesCount = 0;
    let wheelchairNoCount = 0;
    console.log(vehicleArray, "vehicleArray")
    for (let i = 0; i < vehicleArray.length; i++) {
        console.log(vehicleArray[i].wheelChair, 'vehicleArray[i].wheelChair')
        if (vehicleArray[i].wheelChair === 'Yes' || vehicleArray[i].wheelChair === 'YES') {
            wheelchairYesCount++;
        } else if (vehicleArray[i].wheelChair === 'No' || vehicleArray[i].wheelChair === 'NO') {
            wheelchairNoCount++;
        }
    }
    
    return [
        wheelchairYesCount,
        wheelchairNoCount
    ];
  }

  const countUniqueZipCodes = (vehicleArray) => {
    const uniqueZipCodes = [zipCode]
    
    for (let i = 0; i < vehicleArray.length; i++) {
        if (vehicleArray[i].garageZipCode !== zipCode && vehicleArray[i].garageZipCode !== 'null' && vehicleArray[i].garageZipCode !== null) {
            uniqueZipCodes.push(vehicleArray[i].garageZipCode)
        } else if (vehicleArray[i].garageZipCode2 !== zipCode && vehicleArray[i].garageZipCode2 !== 'null' && vehicleArray[i].garageZipCode !== null) {
            uniqueZipCodes.push(vehicleArray[i].garageZipCode)
        }
    }

    
    
    return uniqueZipCodes;
  }

  




  useEffect(() => {

    const vehicleCopy = vehicleValues
    
    for (const i in vehicleCopy) {
        vehicleCopy[i].pedPipProtectionPremium = pedPipProtectionPremium
        vehicleCopy[i].uninsuredMotoristPremium = uninsuredMotoristPremium
        vehicleCopy[i].underinsuredMotoristPremium = underinsuredMotoristPremium

    }

    setVehicleValues(vehicleCopy)


    console.log(store.insured, zipCode, store, underwritingValues,creditsDebits, remarks, "KUSH")
  }, [])

  const tableHeaders = ['Vehicle Type', 'Wheelchair', 'Base Rate', 'Comm. Auto Adj.', 'Rel. Factor', 'Capacity Factor', 'Tert. Factor', 'Veh. Type Factor', 'Inc. Limit Factor', 'Rate/Vehicle', 'Number of vehicles', 'Rate']

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
    "Ambulance": "Medi Cars/Paratransit",
    "Other School Bus": "Urban Bus",
    "School Bus Owned By Political Subdivision Or School District": "Urban Bus"
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
  const splitLimitMapping = ["15,000/30,000", "25,000/50,000", "30,000/60,000", "100,000/300,000"]
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
        let baseTertiaryRate = 0
        let secondaryRate = 1
        let seating
        let primaryFactor
        let relFactor
        let fleetYesNo
        let finalRate
        let vehTypeRateFactor = 1
        let incLimitFactor
        let fleetFilter
        let ownerDriverFilter
        let distanceFilter
        let seatingFilter
        let splitLimitFull
        let finalRateVehicles
        let generalValues


        


        if (values.length > 2) {
            fleetYesNo = 'Fleet'
        } else {
            fleetYesNo = 'Non-Fleet'
        }

        if (typeOfVehicle === 'Taxi' ) {
            typeOfVehicle = 'Taxicab - Owner-Driver'
        }
 
        
        console.log(zipCode, zipCode.length, "legnth")
        if (zipCode && zipCode.length > 3) {

            let uniqueZips = countUniqueZipCodes(values)

            const filteredData = territory['Territory'].filter(item => item['Zip Code'] === zipCode.toString());
            console.log(filteredData, zipCode, zipCode.toString(), 'free');
            

            uniqueZips = uniqueZips.filter(item => item !== 'null')


            if (uniqueZips.length > 1 && filteredData.length === 0) {
                let baseSummedRate = 0
                console.log(uniqueZips, 'xl')
                for (const k in uniqueZips) {
                    for (const i in territory['Territory']) {
                        if (territory['Territory'][i]['Zip Code'] === uniqueZips[k] || ("0").concat(territory['Territory'][i]['Zip Code']) === uniqueZips[k]) {
                            terrCode = territory['Territory'][i]['Territory']
                            state = stateToCodeMapping[territory['Territory'][i]['State']]
                            if (!terrCode.includes(state)) {
                                stateTerrCode = state.concat(terrCode)
                            } else {
                                stateTerrCode = terrCode
                            }
                            
                        }
                    }
        
                    for (const i in baserate['Rate']) {
                        if (baserate['Rate'][i]['Territory '] === stateTerrCode && Number.isInteger(baserate['Rate'][i]['Taxi Rate '])) {
                            baseSummedRate += baserate['Rate'][i]['Taxi Rate ']
                            console.log(baseSummedRate, baserate['Rate'][i]['Territory '], 'xl')
                        }

                    }
                }

                baseTaxiRate = baseSummedRate / uniqueZips.length
                
                
            } else {

            

                

                for (const i in territory['Territory']) {
                    if (territory['Territory'][i]['Zip Code'] === zipCode || ("0").concat(territory['Territory'][i]['Zip Code']) === zipCode) {
                        terrCode = territory['Territory'][i]['Territory']
                        state = stateToCodeMapping[territory['Territory'][i]['State']]
                        if (state === "CT" || state === "NJ") {
                            stateTerrCode = state.concat(terrCode)
                        } else {
                            stateTerrCode = terrCode
                        }
                        
                    }
                }


                for (const i in baserate['Rate']) {
                    if (baserate['Rate'][i]['Territory '] === stateTerrCode) {
                        baseTaxiRate = baserate['Rate'][i]['Taxi Rate ']
                    }
                }
            }   


            for (const i in tertiaryRate['tertrate']) {
                if (tertiaryRate['tertrate'][i]['VehicleType'] === specVehicleMapping[typeOfVehicle]) {
                    baseTertiaryRate = tertiaryRate['tertrate'][i]['TertiaryFactor']
                }

                if (baseTertiaryRate === 0) {

                    if (tertiaryRate['tertrate'][i]['VehicleType'] === vehicleMapping[typeOfVehicle]) {
                        
                        baseTertiaryRate = tertiaryRate['tertrate'][i]['TertiaryFactor']
                    }
                    
                }
            }

            for (const i in vehTypeFactor['vehType']) {


  
                if (index === 0) {
                    console.log('lsal')
                    vehTypeRateFactor = 1.1
                    
                } else {
                    console.log(vehTypeFactor['vehType'][i]['Type'] === secondaryCategory, vehTypeFactor['vehType'][i]['Type'] , secondaryCategory, 'forlem')
                    if (secondaryCategory === 'Paratransit') {
                        vehTypeRateFactor = 1
                    } else if (vehTypeFactor['vehType'][i]['Type'] === secondaryCategory) {
                        
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
            console.log(secRateClass, 'crems')

            for (const i in secRate['secrate']) {
                if (secRate['secrate'][i]['SECONDARYCLASSIFICATION'] === secRateClass && secRate['secrate'][i]['Max'] === seating ) {
                    secondaryRate = secRate['secrate'][i]['Rate']+1
                }
            }

            console.log(typeOfVehicle, secondaryRate, 'stems')

            let classFilter = primaryRate['primrate'].filter(a => a.Classification === vehicleMapping[typeOfVehicle]);

            // Check if the filter resulted in an empty array
            if (classFilter.length === 0) {
                // If so, revert classFilter to its original state
                classFilter = primaryRate['primrate'];
            }
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

            console.log(ownerDriverFilter, 'mems')

            if (!nadistance.includes(vehicleMapping[typeOfVehicle]) && rangeOfVehicle === "Local") {
                distanceFilter = ownerDriverFilter.filter(a => a.Distance === "Local")
            } else if (!nadistance.includes(vehicleMapping[typeOfVehicle]) && rangeOfVehicle === "Intermediate") {
                distanceFilter = ownerDriverFilter.filter(a => a.Distance === "Intermediate")
            } else {
                distanceFilter = ownerDriverFilter
            }

            console.log(distanceFilter, seatingClassFilter, vehicleMapping[typeOfVehicle], 'pems')

            

            if (seatingClassFilter.includes(vehicleMapping[typeOfVehicle])) {
                let seatingFixed = 10
                if (seating < 10) {
                    seatingFixed = 10
                }
                console.log(seatingFixed, 'dems')
                seatingFilter = distanceFilter.filter(a => a.Seating < seatingFixed)
            } else {
                seatingFilter = distanceFilter
            }

            console.log(seatingFilter, 'lems')

            primaryFactor = seatingFilter[0]['Primary Factor']
            relFactor = seatingFilter[0]['Rel Factor']
            
            for (const i in increaseLimitFactor['increaseLimit']) {
                if (overall === 'Combined Single Limit') {
                    if (increaseLimitFactor['increaseLimit'][i]['Limit'] === combinedSectionLimit) {
                        incLimitFactor = increaseLimitFactor['increaseLimit'][i]['Factor']
                    }
                } else if (overall === 'Split Limit' || splitSectionBodyPerAccidentOptions?.length > 3 ) {
                    splitLimitFull = splitSectionBodyPerPerson.concat('/', splitSectionBodyPerAccidentOptions)
                    console.log(splitLimitFull, 'kems')
                    if (splitLimitMapping.includes(splitLimitFull)) {
                        console.log(splitLimitMapping, 'sems')
                        if (increaseLimitFactor['increaseLimit'][i]['Limit'] === splitLimitFull) {
                            console.log(splitLimitFull, increaseLimitFactor['increaseLimit'][i]['Factor'], 'dems')
                            incLimitFactor = increaseLimitFactor['increaseLimit'][i]['Factor']
                        }
                    } else {
                        if (increaseLimitFactor['increaseLimit'][i]['Limit'] === splitSectionBodyPerAccidentOptions) {
                            incLimitFactor = increaseLimitFactor['increaseLimit'][i]['Factor']
                        }
                    }
                }
            }

            console.log(zipCode, stateTerrCode, incLimitFactor, baseTaxiRate, 'sasas')

            generalValues = [baseTaxiRate, primaryFactor, relFactor, secondaryRate, baseTertiaryRate, vehTypeRateFactor]

            for (const i in generalValues) {
                if (generalValues[i] < 1) {
                    generalValues[i] = 1
                }
            }


            generalValues.push(incLimitFactor)

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

    const toggleCameraState = (e) => {
        
        setUnderwritingValues({
            ...underwritingValues,
            isCamera: e,
        })
    }



    if (!zipCode) {
        return (
            <Section>
                <h1 style={{ fontSize: 42, color: '#d40048' }}>
                    Please Add Policy Details to continue
                </h1>
            </Section>
        )
    }

    return (
        <div>
        <Section>
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
                        {countWheelchairVehicles(values).map((wheelChairCount, index) => {
                            console.log(wheelChairCount, index, "wheelchairCount")
                            return (
                            <TR>
                                <TDCenter>{secondaryCategory}</TDCenter>
                                <TDCenter>{index === 0 ? (<>Yes</>) : (<>No</>)}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification === 'null' ? policyCategory : classification, checkSeating(seating), radius, wheelChairCount, index)[0]}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification === 'null' ? policyCategory : classification, checkSeating(seating), radius, wheelChairCount, index)[1]}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification === 'null' ? policyCategory : classification, checkSeating(seating), radius, wheelChairCount, index)[2]}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification === 'null' ? policyCategory : classification, checkSeating(seating), radius, wheelChairCount, index)[3]}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification === 'null' ? policyCategory : classification, checkSeating(seating), radius, wheelChairCount, index)[4]}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification === 'null' ? policyCategory : classification, checkSeating(seating), radius, wheelChairCount, index)[5]}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification === 'null' ? policyCategory : classification, checkSeating(seating), radius, wheelChairCount, index)[6]}</TDCenter>
                                <TDCenter>{getRate(zipCode.toString(), classification === 'null' ? policyCategory : classification, checkSeating(seating), radius, wheelChairCount, index)[7].toLocaleString('en-US', {maximumFractionDigits: 2})}</TDCenter>
                                <TDCenter>{wheelChairCount}</TDCenter>
                                <TDCenter>${getRate(zipCode.toString(), classification === 'null' ? policyCategory : classification, checkSeating(seating), radius, wheelChairCount, index)[8].toLocaleString('en-US', {maximumFractionDigits: 2})}</TDCenter>
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
                                
                                setUnderwritingValues({
                                    ...underwritingValues,
                                    creditsDebits: e.target.value,
                                })
                                console.log(underwritingValues,'l')
                            }}
                            placeholder="%"
                            value={creditsDebits}
                        />
                    </Flex>

                </h1>
                <br/>
                <Flex>
                    <h1 style={{ fontSize: 42, color: Colors.electricBlue }}>
                        Final Premium: ${Math.round((((100+parseFloat(underwritingValues.creditsDebits))/100)*getFinalRates(countWheelchairVehicles(values))))}
                        
                    </h1>
                </Flex>
                <Flex>
                    <h1 style={{ fontSize: 42, color: Colors.electricBlue }}>
                        Final Liab. Premium / Vehicle: ${Math.round((((100+parseFloat(underwritingValues.creditsDebits))/100)*getFinalRates(countWheelchairVehicles(values))/vehicles.values.length))}
                        
                    </h1>
                </Flex>
                <br/>
                <br/>
                {/* <Flex>
                    <h1 style={{ fontSize: 42, color: Colors.red }}>
                        Prem. + Fees / Vehicle: ${(((100+parseFloat(underwritingValues.creditsDebits))/100)*(((getFinalRates(countWheelchairVehicles(values)))/vehicles.values.length)+coverage.values.pedPipProtectionPremium+coverage.values.uninsuredMotoristPremium+coverage.values.underinsuredMotoristPremium)*1.17).toLocaleString('en-US', {maximumFractionDigits: 2})}
                        
                    </h1>
                </Flex> */}
                

            

                <br/>
                <br/>


                <Flex>
                    <h1 style={{ fontSize: 42, color: Colors.electricBlue }}>
                        Use Generated Premium for Overall <input
                                                            type="checkbox"
                                                            id="myCheckbox"
                                                            checked={usePremium}
                                                            onChange={() => togglePremium(Math.round(((100+parseFloat(underwritingValues.creditsDebits))/100)*getFinalRates(countWheelchairVehicles(values))))}
                                                        />
                        
                    </h1>
                </Flex>
                <Flex>
                    <h1 style={{ fontSize: 42, color: Colors.electricBlue }}>
                        Add Camera Requirement for Insured <input
                                                            type="checkbox"
                                                            id="myCheckbox"
                                                            checked={isCamera}
                                                            onChange={(e) => toggleCameraState(e.target.checked)}
                                                        />
                        
                    </h1>
                </Flex>

                    
                <br/>
                <br/>
                <br/>
                <br/>
                <Flex>
                    
                    <h1 style={{ fontSize: 30, color: Colors.green }}>
                        Remarks: 
                    </h1>
                    
                </Flex>
                <br/>
                <br/>
                <br/>
                <Flex>
                    <div style={{ width: '90%', margin: 'auto' }}>
                        <textarea
                            style={{ width: '100%', resize: 'none', border: "1px solid black" }}
                            rows={10}
                            placeholder="Enter your text here..."
                            value={remarks}
                            onChange={(e) => {
                                
                                setUnderwritingValues({
                                    ...underwritingValues,
                                    remarks: e.target.value,
                                })
                                console.log(underwritingValues,'l')
                            }}
                        />
                    </div>
                </Flex>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
               
            </Flex>
        </Section>
        </div>
    )
}

export default Underwriting

const TDCenter = styled(TD)`
    text-align: center;
    align-items: center;
`