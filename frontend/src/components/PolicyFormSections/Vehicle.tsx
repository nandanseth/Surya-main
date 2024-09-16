import { ButtonHolder, Form } from '../../styles/styles'
import { Save } from '../Buttons'
import styled from 'styled-components'
import VehicleItem from './VehicleItem'
import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import { Colors } from '../../styles/styles'
const { SectionTitle, Flex } = Form

const title = 'Vehicles'

const VehicleSection = ({ store }) => {
    const { vehicles: vehicleStates, coverage, policy } = store

    const coverageValues = coverage.values
    const policyValues = policy.values

    const [useCoverage, setUseCoverage] = useState(false)


    const {
        values,
        setValues,
        defaultValue,
        yesNoValues,
        yesNoOptions,
        defaults,
    } = vehicleStates

    useEffect(() => {

        console.log(values, defaults, values[0]===defaults,"WHY")

        if (values[0].baseEffDate !== policy.values.effectiveDate || values[0].overallPremium !== coverage.values.overallPremium ||
        values[0].personalInjuryProtectionPremium !== coverage.values.personalInjuryProtectionPremium || values[0].pedPipProtectionPremium !== coverage.values.pedPipProtectionPremium ||
        values[0].medicalPaymentsPremium !== coverage.values.medicalPaymentsPremium || values[0].underinsuredMotoristPremium !== coverage.values.underinsuredMotoristPremium ||
        values[0].uninsuredMotoristPremium !== coverage.values.uninsuredMotoristPremium) {
            console.log("HI")
            if (values[0]===defaults) {
                setValues([{ ...defaults, baseEffDate: policy.values.effectiveDate, baseExpDate: policy.values.expirationDate,
                overallPremium: coverage.values.overallPremium, personalInjuryProtectionPremium: coverage.values.personalInjuryProtectionPremium, 
                pedPipProtectionPremium: coverage.values.pedPipProtectionPremium, medicalPaymentsPremium: coverage.values.medicalPaymentsPremium,
                underinsuredMotoristPremium: coverage.values.underinsuredMotoristPremium, uninsuredMotoristPremium: coverage.values.uninsuredMotoristPremium}])
            }
        }

        if (coverage.values.overallPremium && values[0].overallPremium && values[0].overallPremium !== coverage.values.overallPremium) {
            const vehiclesCopy = values
            for (const i in vehiclesCopy) {
                vehiclesCopy[i].overallPremium = coverage.values.overallPremium
            }

            setValues(vehiclesCopy)
        }

        

    }, [])

    const setCoveragePremiums = () => {

        const vehiclesCopy = values
        for (const i in vehiclesCopy) {
            vehiclesCopy[i].overallPremium = coverage.values.overallPremium
            vehiclesCopy[i].personalInjuryProtectionPremium = coverage.values.personalInjuryProtectionPremium
            vehiclesCopy[i].pedPipProtectionPremium = coverage.values.pedPipProtectionPremium
            vehiclesCopy[i].medicalPaymentsPremium = coverage.values.medicalPaymentsPremium
            vehiclesCopy[i].underinsuredMotoristPremium = coverage.values.underinsuredMotoristPremium
            vehiclesCopy[i].uninsuredMotoristPremium = coverage.values.uninsuredMotoristPremium
        }
        setValues(vehiclesCopy)
    }

    const addFields = () => {
        setValues([...values,  {...defaults, baseEffDate: policy.values.effectiveDate, baseExpDate: policy.values.expirationDate,
        overallPremium: coverage.values.overallPremium, personalInjuryProtectionPremium: coverage.values.personalInjuryProtectionPremium, 
        pedPipProtectionPremium: coverage.values.pedPipProtectionPremium, medicalPaymentsPremium: coverage.values.medicalPaymentsPremium,
        underinsuredMotoristPremium: coverage.values.underinsuredMotoristPremium, uninsuredMotoristPremium: coverage.values.uninsuredMotoristPremium}])
    }

    const removeFields = (i) => {
        if (values.length <= 1) {
            setValues([{ ...defaults }])
            return
        }

        const newArray = [...values]
        newArray.splice(i, 1)
        setValues(newArray)
    }

    const changeHandler = (event) => {
        Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            const copy = []
          
            for (const i in results.data) {
                copy.push({...defaults, baseEffDate: policy.values.effectiveDate, baseExpDate: policy.values.expirationDate,
                    overallPremium: coverage.values.overallPremium, personalInjuryProtectionPremium: coverage.values.personalInjuryProtectionPremium, 
                    pedPipProtectionPremium: coverage.values.pedPipProtectionPremium, medicalPaymentsPremium: coverage.values.medicalPaymentsPremium,
                    underinsuredMotoristPremium: coverage.values.underinsuredMotoristPremium, uninsuredMotoristPremium: coverage.values.uninsuredMotoristPremium, 
                    vin: results.data[i]["VIN"], make: results.data[i]["Make"], model: results.data[i]["Model"], 
                    modelYear: results.data[i]["Model Year"], seating: results.data[i]['Seating'], wheelChair: results.data[i]['Wheelchair Seating'],
                    vehicleWeight: results.data[i]["Vehicle Weight"], vehicleType: results.data[i]['Vehicle Type'], plateNumber: results.data[i]['Plate'],
                    fuelType: results.data[i]['Fuel Type'], garageZipCode: results.data[i]['Garage Zip Code'], zoneCode: results.data[i]['Zone Code'],
                    fleet: results.data[i]['Fleet'], rateClassCode: results.data[i]['Rate Class Code'], baseName: results.data[i]['Base Name'], 
                    baseType: results.data[i]['Base Type'], baseNumber: results.data[i]['Base Number'], address1: results.data[i]['Address Line 1'],
                    address2: results.data[i]['Address Line 2'], zipCode: results.data[i]['Zip Code'], city: results.data[i]['City'],
                    county: results.data[i]['County'], state: results.data[i]['State']})
                console.log(copy)
            }
            setValues(copy)
          
        },
        });
    };

    return (
        <Wrapper>
            
            <Center>
                <StyledTitle>{title}</StyledTitle>
                <StyledHolder>
                    <input type="file" name="file" onChange={changeHandler}/>
                    <Add onClick={addFields}>+ Add Vehicle</Add>
                    
                </StyledHolder>
                
              
            </Center>
            <Flex>
                <h1 style={{ fontSize: 42, color: Colors.electricBlue }}>
                    Reset Vehicle Premiums to Coverage Premiums <input
                                                        type="checkbox"
                                                        id="myCheckbox"
                                                        checked={useCoverage}
                                                        onChange={() => {setCoveragePremiums(); setUseCoverage(true)}}
                                                    />
                    
                </h1>
            </Flex>
            
            <div>
                {values.map((_, i) => {
                    //const toReturn = DefaultFields({ num: i })
                    return (
                        <StyledSection key={i}>
                            <VehicleItem
                                num={i}
                                defaultValue={defaultValue}
                                removeFields={removeFields}
                                setValues={setValues}
                                values={values}
                                yesNoOptions={yesNoOptions}
                                yesNoValues={yesNoValues}
        
                            

                            />
                        </StyledSection>
                    )
                })}
            </div>
        </Wrapper>
    )
}

const StyledSection = styled.div`
    border-bottom: solid 1px #00000017;
    margin-bottom: 42px;
    padding-bottom: 24px;
`

const Wrapper = styled.div`
    padding: 8px;
    width: 100%;
`

const Add = styled(Save)`
    max-width: 200px;
    width: 100%;
    margin-left: auto;
    font-weight: 500;
    padding: 12px;
    font-size: 14px;
`

const AddCSV = styled.input`
    max-width: 200px;
    width: 100%;
    margin-left: auto;
    font-weight: 500;
    padding: 12px;
    font-size: 14px;
`

const StyledHolder = styled(ButtonHolder)`
    margin: 0;
    margin-left: auto;
`

const StyledTitle = styled(SectionTitle)`
    width: auto;
`

const Center = styled(Flex)`
    align-items: center;
    margin-bottom: 8px;
`

export default VehicleSection
