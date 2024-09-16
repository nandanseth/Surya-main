import { Form } from '../../styles/styles'
import { SmallSave, StyledCancel } from '../Buttons'
import { statesOptions } from '../../utils/policies'
import SuryaInput from '../PolicyForm/PolicyFormInput'
import SuryaSelect from '../PolicyForm/PolicyFormSelect'
import { useState, useEffect } from 'react'

const { Section, Flex, InputWrapper } = Form

const DriverItemReplace = ({
    num,
    values,
    setValues,
    removeFields,
    newDriversReplaceIndex,
    save = (i) => {
        console.log(i)
    },
    isSave = false,
}) => {
    


    const handleInputOnChange = (e) => {
        const copy = [...values]
        copy[num][e.target.name] = e.target.value
        setValues(copy)
        console.log(copy)
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
                            label="Driver Last Name"
                            name="driverLastName"
                            onChange={handleInputOnChange}
                            placeholder="Driver Last Name"
                            value={values[num].driverLastName}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            //options={driversOptions}
                            label="Driver First Name"
                            name="driverFirstName"
                            onChange={handleInputOnChange}
                            placeholder="Driver First Name"
                            value={values[num].driverFirstName}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            //options={driversOptions}
                            label="Driver Middle Name"
                            name="driverMiddleName"
                            onChange={handleInputOnChange}
                            placeholder="Driver Middle Name"
                            value={values[num].driverMiddleName}
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
                    <InputWrapper>
                        <SuryaInput
                            label="Driver Effective Date"
                            name="driverEffDate"
                            onChange={handleInputOnChange}
                            placeholder="MM/DD/YYYY"
                            value={values[num].driverEffDate}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="Driver Expiration Date"
                            name="driverExpDate"
                            onChange={handleInputOnChange}
                            placeholder="MM/DD/YYYY"
                            value={values[num].driverExpDate}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="Driver Birth Date"
                            name="driverBirthDate"
                            onChange={handleInputOnChange}
                            placeholder="MM/DD/YYYY"
                            value={values[num].driverBirthDate}
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
                                Replace Driver
                            </SmallSave>
                        )}
                    </div>
                </Flex>
            </Section>
        </div>
    )
}

export default DriverItemReplace