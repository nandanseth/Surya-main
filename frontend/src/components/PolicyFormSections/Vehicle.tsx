import { ButtonHolder, Form } from '../../styles/styles'
import { Save } from '../Buttons'
import { statesOptions } from '../../utils/policies'
import fuelTypeOptions from '../../utils/vehicle/fuelType'
import getWeightSelects from '../../utils/vehicle/getWeightSelects'
import Input from '../PolicyFormInput'
import styled from 'styled-components'
import SuryaSelect from '../PolicyFormSelect'
import vehicleCategoryOptions, {
    optionsMap,
} from '../../utils/vehicle/getVehicleCategory'
import vehicleTypes from '../../utils/vehicle/getVehicleType'

const { Section, SectionTitle, Flex, InputWrapper } = Form

const title = 'Vehicles'
const vITitle = 'Vehicle Info'

const VehicleSection = ({ store }) => {
    const { vehicles: vehicleStates } = store
    const {
        values,
        setValues,
        defaultValue,
        yesNoValues,
        yesNoOptions,
        defaults,
    } = vehicleStates

    const addFields = () => {
        setValues([...values, { ...defaults }])
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

    const vQ =
        'Is this vehicle used for something other than the category/classification stated in Policy Info'

    const DefaultFields = ({ num = 0 }: { num?: number }) => {
        const handleInputOnChange = (e) => {
            const copy = [...values]
            copy[num][e.target.name] = e.target.value
            setValues(copy)
        }

        const handleSelectOnChange = (e, propertyName) => {
            const copy = [...values]
            copy[num][propertyName] = e.target.value
            setValues(copy)
        }

        return (
            <div>
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
                                                copy[num].category =
                                                    e.target.value
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
                                                    optionsMap[
                                                        values[num].category
                                                    ]
                                                }
                                                placeholder="Sub Category"
                                                value={
                                                    values[num].vehicleCategory
                                                }
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
                                onChange={handleInputOnChange}
                                placeholder="VIN"
                                value={values[num].vin}
                            />
                        </InputWrapper>
                        {/* <div>auto gene make, model, etc.</div> */}
                        <InputWrapper>
                            <Input
                                label="Vehicle Make"
                                onChange={handleInputOnChange}
                                placeholder="Make"
                                value={values[num].make}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Input
                                label="Vehicle Model"
                                onChange={handleInputOnChange}
                                placeholder="Model"
                                value={values[num].model}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Input
                                label="Vehicle Model Year"
                                onChange={handleInputOnChange}
                                placeholder="Year"
                                value={values[num].modelYear}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Input
                                label="Seating"
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
                                label="Base Number"
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
                                    handleSelectOnChange(v, 'garageState')
                                }}
                                options={statesOptions}
                                placeholder="State"
                                value={values[num].garageState}
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
                    </div>
                </Flex>
            </div>
        )
    }

    return (
        <Wrapper>
            <Center>
                <StyledTitle>{title}</StyledTitle>
                <StyledHolder>
                    <Add onClick={addFields}>+ Add Vehicle</Add>
                </StyledHolder>
            </Center>
            <div>
                {values.map((key, i) => {
                    const toReturn = DefaultFields({ num: i })
                    return <StyledSection key={i}>{toReturn}</StyledSection>
                })}
            </div>
        </Wrapper>
    )
}

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

const StyledSection = styled.div`
    border-bottom: solid 1px #00000017;
    margin-bottom: 42px;
    padding-bottom: 24px;
`

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

const StyledCancel = styled(Add)`
    background: #f4f5f6;
    padding: 12px 40px;
    min-width: 200px;
    color: #3a5665;

    &:hover {
        background: rgba(89, 195, 179, 0.125683);
    }
`

export default VehicleSection
