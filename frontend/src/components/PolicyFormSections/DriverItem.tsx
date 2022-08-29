import { Form } from '../../styles/styles'
import { SmallSave, StyledCancel } from '../Buttons'
import { statesOptions } from '../../utils/policies'
import SuryaInput from '../PolicyForm/PolicyFormInput'
import SuryaSelect from '../PolicyForm/PolicyFormSelect'

const { Section, Flex, InputWrapper } = Form

const DriverItem = ({
    num = 0,
    values,
    setValues,
    removeFields,
    save = (i) => {
        console.log(i)
    },
    isSave = false,
}) => {
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
        <div style={{ marginTop: 12, marginBottom: 12 }}>
            <Section>
                <Flex>
                    <InputWrapper>
                        <SuryaInput
                            //options={driversOptions}
                            label="What is the name of the driver?"
                            name="driverName"
                            onChange={handleInputOnChange}
                            placeholder="Driver Name"
                            value={values[num].driverName}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaSelect
                            label="Driver state"
                            onChange={(v) => {
                                handleSelectOnChange(v, 'states')
                            }}
                            options={statesOptions}
                            placeholder=" state"
                            value={values[num].states}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="License Number"
                            name="licenseNumber"
                            onChange={handleInputOnChange}
                            placeholder="License Number"
                            value={values[num].licenseNumber}
                        />
                    </InputWrapper>
                </Flex>
                <Flex>
                    <InputWrapper>
                        <SuryaInput
                            label="License Effective Date"
                            name="licenseEffDate"
                            onChange={handleInputOnChange}
                            placeholder="MM/DD/YYYY"
                            value={values[num].licenseEffDate}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="License Expiration Date"
                            name="licenseExpDate"
                            onChange={handleInputOnChange}
                            placeholder="MM/DD/YYYY"
                            value={values[num].licenseExpDate}
                        />
                    </InputWrapper>
                </Flex>
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
            </Section>
        </div>
    )
}

export default DriverItem
