import { Form } from '../../styles/styles'
import { SmallSave, StyledCancel } from '../Buttons'
import { statesOptions } from '../../utils/policies'
import fuelTypeOptions from '../../utils/vehicle/fuelType'
import getWeightSelects from '../../utils/vehicle/getWeightSelects'
import Input from '../PolicyForm/PolicyFormInput'
import styled from 'styled-components'
import SuryaSelect from '../PolicyForm/PolicyFormSelect'
import vehicleCategoryOptions, {
    optionsMap,
} from '../../utils/vehicle/getVehicleCategory'
import vehicleTypes from '../../utils/vehicle/getVehicleType'
import { useEffect } from 'react'

const { Section, SectionTitle, Flex, InputWrapper } = Form

const vITitle = 'Vehicle Info'
const vQ =
    'Is this vehicle used for something other than the category/classification stated in Policy Info'

const RadioLabel = styled.label`
    font: inherit;
    font-size: 14px;
    padding: 8px;
    display: flex;
    align-items: center;
`

const Span = styled.span`
    margin-right: 5px;
    font-size: inherit;
`

const RadioGroup = ({
    values,
    setValue,
    currentValue,
}: {
    currentValue?: string
    values: string[]
    setValue: any
}) => (
    <Flex>
        {values.map((item) => (
            <RadioLabel key={item}>
                <Span>{item}</Span>
                <input
                    checked={currentValue === item}
                    name={item}
                    onChange={() => {
                        setValue(item)
                    }}
                    type="radio"
                    value={item}
                />
            </RadioLabel>
        ))}
    </Flex>
)

const ynOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
]

const dV = 'No'
const ynValues = ['Yes', dV]

// TODO: there is absolutely no ned for this pattern to exist. we dont need the yes no values coming from the state AT ALL
const VehicleItem = ({
    num,
    values,
    setValues,
    removeFields,
    yesNoValues = ynValues,
    defaultValue = dV,
    yesNoOptions = ynOptions,
    policyValues,
    coverageValues,

    save = (i) => {
        console.log(i)
    },
    isSave = false,
}) => {

  
    useEffect(() => {

        const calcPremium = (totalPremium, policyValues) => {
            const baseDate = new Date(values[num].baseEffDate)
            const expDate = new Date(policyValues.expirationDate)
            const effDate = new Date(policyValues.effectiveDate)
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const vehicleDateLegnth = Math.round(Math.abs((expDate.getTime() - baseDate.getTime()) / oneDay))
            const residualPremium = (totalPremium / (Math.round(Math.abs((expDate.getTime() - effDate.getTime()) / oneDay))) * vehicleDateLegnth).toFixed(2)
            return residualPremium;
            
        }
        
        const setDefaults = () => {
            const copy = [...values]

            console.log(values[num])
    
            copy[num]["overallPremium"] = calcPremium(coverageValues.overallPremium, policyValues)
            copy[num]["personalInjuryProtectionPremium"] = calcPremium(coverageValues.personalInjuryProtectionPremium, policyValues)
            copy[num]["pedPipProtectionPremium"] = calcPremium(coverageValues.pedPipProtectionPremium, policyValues)
            copy[num]["medicalPaymentsPremium"] = calcPremium(coverageValues.medicalPaymentsPremium, policyValues)
            copy[num]["underinsuredMotoristPremium"] = calcPremium(coverageValues.underinsuredMotoristPremium, policyValues)
            copy[num]["uninsuredMotoristPremium"] = calcPremium(coverageValues.uninsuredMotoristPremium, policyValues)
            console.log(policyValues)

            // copy[num]['baseEffDate'] = policyValues.effectiveDate
            // copy[num]['baseExpDate'] = policyValues.expirationDate


            setValues(copy)
    
        }
        setDefaults()

    }, [values[num].baseEffDate])

    

    const handleInputOnChange = (e) => {
        const copy = [...values]
        copy[num][e.target.name] = e.target.value
        console.log(copy)
        setValues(copy)
    }

    const handleSelectOnChange = (e, propertyName) => {
        const copy = [...values]
        copy[num][propertyName] = e.target.value
        console.log(e.target.value, copy, 'food')
        setValues(copy)
    }

    return (
        <div style={{ marginTop: 12, marginBottom: 12 }}>
            <Section>
                <SectionTitle>{vQ}</SectionTitle>
                <Flex>
                    <RadioGroup
                        currentValue={values[num].yesNo}
                        setValue={(v) => {
                            const copy = [...values]
                            copy[num].yesNo = v
                            setValues(copy)
                        }}
                        values={yesNoValues}
                    />
                </Flex>
                <Flex>
                    {values[num].yesNo !== defaultValue ? (
                        <Section>
                            <Flex>
                                <InputWrapper>
                                    <SuryaSelect
                                        label="Vehicle Category"
                                        onChange={(e) => {
                                            const copy = [...values]
                                            copy[num].category = e.target.value
                                            copy[num].vehicleCategory =
                                                optionsMap[
                                                    values[num].category
                                                ].value
                                            setValues(copy)
                                        }}
                                        options={vehicleCategoryOptions}
                                        placeholder="Category"
                                        value={values[num].category}
                                    />
                                </InputWrapper>
                            </Flex>
                            <Flex>
                                {values[num].category !== null ||
                                values[num].category === '' ? (
                                    <InputWrapper>
                                        <SuryaSelect
                                            label="Sub Vehicle Category"
                                            onChange={(v) => {
                                                handleSelectOnChange(
                                                    v,
                                                    'vehicleCategory'
                                                )
                                            }}
                                            options={
                                                optionsMap[values[num].category]
                                            }
                                            placeholder="Sub Category"
                                            value={values[num].vehicleCategory}
                                        />
                                    </InputWrapper>
                                ) : null}
                            </Flex>
                        </Section>
                    ) : null}
                </Flex>
            </Section>
            <Section>
                <SectionTitle>{vITitle}</SectionTitle>
                <Flex>
                    <InputWrapper>
                        <SuryaSelect
                            label="Vehicle Type"
                            onChange={(v) => {
                                handleSelectOnChange(v, 'vehicleType')
                            }}
                            options={vehicleTypes}
                            placeholder="Type"
                            value={values[num].vehicleType}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Vin"
                            name="vin"
                            onChange={handleInputOnChange}
                            placeholder="VIN"
                            value={values[num].vin}
                        />
                    </InputWrapper>
                    {/* <div>auto gene make, model, etc.</div> */}
                    <InputWrapper>
                        <Input
                            label="Vehicle Make"
                            name="make"
                            onChange={handleInputOnChange}
                            placeholder="Make"
                            value={values[num].make}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Vehicle Model"
                            name="model"
                            onChange={handleInputOnChange}
                            placeholder="Model"
                            value={values[num].model}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Vehicle Model Year"
                            name="modelYear"
                            onChange={handleInputOnChange}
                            placeholder="Year"
                            value={values[num].modelYear}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Seating"
                            name="seating"
                            onChange={handleInputOnChange}
                            placeholder="Seating Capacity"
                            value={values[num].seating}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaSelect
                            label="Wheelchair Accessible?"
                            onChange={(v) => {
                                handleSelectOnChange(v, 'wheelChair')
                            }}
                            options={yesNoOptions}
                            placeholder="Yes/No"
                            value={values[num].wheelChair}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaSelect
                            label="Vehicle Weight"
                            onChange={(v) => {
                                handleSelectOnChange(v, 'vehicleWeight')
                            }}
                            options={getWeightSelects}
                            placeholder="Weight"
                            value={values[num].vehicleWeight}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaSelect
                            label="Vehicle Type"
                            onChange={(v) => {
                                handleSelectOnChange(v, 'vehicleType')
                            }}
                            options={vehicleTypes}
                            placeholder="Type"
                            value={values[num].vehicleType}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Plate"
                            name="plateNumber"
                            onChange={handleInputOnChange}
                            placeholder="Plate Number"
                            value={values[num].plateNumber}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <SuryaSelect
                            label="Fuel Type"
                            onChange={(v) => {
                                handleSelectOnChange(v, 'fuelType')
                            }}
                            options={fuelTypeOptions}
                            placeholder="Type"
                            value={values[num].fuelType}
                        />
                    </InputWrapper>
                </Flex>
            </Section>
            <Section>
                <Flex>
                    <InputWrapper>
                        <Input
                            label="Overall Premium"
                            name="overallPremium"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values[num].overallPremium}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Personal Injury Protection Premium"
                            name="personalInjuryProtectionPremium"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values[num].personalInjuryProtectionPremium}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Ped PIP Protection Premium"
                            name="pedPipProtectionPremium"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values[num].pedPipProtectionPremium}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Medical Payments Premium"
                            name="medicalPaymentsPremium"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values[num].medicalPaymentsPremium}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Underinsured Motorist Premium"
                            name="underinsuredMotoristPremium"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values[num].underinsuredMotoristPremium}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Uninsured Motorist Premium"
                            name="uninsuredMotoristPremium"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values[num].uninsuredMotoristPremium }
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <Input
                            label="Hired CSL Premium"
                            name="hiredCSLPremium"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values[num].hiredCSLPremium}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Non Owned CSL Premium"
                            name="nonOwnedCSLPremium"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values[num].nonOwnedCSLPremium}
                        />
                    </InputWrapper>
                </Flex>
            </Section>
            <Section>
                <SectionTitle>Additional Info</SectionTitle>
                <Flex>
                    <InputWrapper>
                        <Input
                            label="Garage Zip Code (5 Digit)"
                            name="garageZipCode"
                            onChange={handleInputOnChange}
                            placeholder="XXXXX"
                            value={values[num].garageZipCode}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Zone Code"
                            name="zoneCode"
                            onChange={handleInputOnChange}
                            placeholder="Zone Code"
                            value={values[num].zoneCode}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaSelect
                            label="Fleet"
                            onChange={(v) => {
                                handleSelectOnChange(v, 'fleet')
                            }}
                            options={yesNoOptions}
                            placeholder="Yes/No"
                            value={values[num].fleet}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Rate Class Code"
                            name="rateClassCode"
                            onChange={handleInputOnChange}
                            placeholder="Code"
                            value={values[num].rateClassCode}
                        />
                    </InputWrapper>
                </Flex>
            </Section>
            <Section>
                <SectionTitle>Base Info</SectionTitle>
                <Flex>
                    <InputWrapper>
                        <Input
                            label="Base Name"
                            name="baseName"
                            onChange={handleInputOnChange}
                            placeholder="Name"
                            value={values[num].baseName}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaSelect
                            label="Base Type"
                            onChange={(v) => {
                                handleSelectOnChange(v, 'baseType')
                            }}
                            options={[
                                { value: 'Black Car', label: 'Black Car' },
                                { value: 'Livery', label: 'Livery' },
                                { value: 'N/A', label: 'N/A' },
                            ]}
                            placeholder="type"
                            value={values[num].baseType}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Base Number"
                            name="baseNumber"
                            onChange={handleInputOnChange}
                            placeholder="#"
                            value={values[num].baseNumber}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Base Eff Date"
                            name="baseEffDate"
                            onChange={handleInputOnChange}
                            placeholder="MM/DD/YYYY"
                            value={values[num].baseEffDate}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Base Exp Date"
                            name="baseExpDate"
                            onChange={handleInputOnChange}
                            placeholder="MM/DD/YYYY"
                            value={values[num].baseExpDate}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="SHL Permit"
                            name="shl"
                            onChange={handleInputOnChange}
                            placeholder="SHL"
                            value={values[num].shl}
                        />
                    </InputWrapper>
                </Flex>
            </Section>
            <Section>
                <SectionTitle>Garage Information</SectionTitle>
                <Flex>
                    <InputWrapper>
                        <Input
                            label="Address Line 1"
                            name="garageAddress1"
                            onChange={handleInputOnChange}
                            placeholder="address"
                            value={values[num].garageAddress1}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Address Line 2"
                            name="garageAddress2"
                            onChange={handleInputOnChange}
                            placeholder="address"
                            value={values[num].garageAddress2}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="Zip Code"
                            name="garageZipCode2"
                            onChange={handleInputOnChange}
                            placeholder="zip"
                            value={values[num].garageZipCode2}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="City"
                            name="garageCity"
                            onChange={handleInputOnChange}
                            placeholder="city"
                            value={values[num].garageCity}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="county"
                            name="garageCounty"
                            onChange={handleInputOnChange}
                            placeholder="county"
                            value={values[num].garageCounty}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaSelect
                            label="State"
                            onChange={(v) => {
                                console.log(v,'food')
                                handleSelectOnChange(v, 'state')
                            }}
                            options={statesOptions}
                            placeholder="State"
                            value={values[num].state}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            label="country"
                            name="garageCountry"
                            onChange={handleInputOnChange}
                            placeholder="country"
                            value={values[num].garageCountry}
                        />
                    </InputWrapper>
                </Flex>
            </Section>
            <Flex>
                <div style={{ marginLeft: 'auto' }}>
                    <StyledCancel
                        onClick={() => {
                            removeFields(num)
                        }}
                    >
                        Cancel
                    </StyledCancel>
                    {isSave && (
                        <SmallSave
                            onClick={() => {
                                save(num)
                            }}
                        >
                            Save Vehicle
                        </SmallSave>
                    )}
                </div>
            </Flex>
        </div>
    )
}

export default VehicleItem
