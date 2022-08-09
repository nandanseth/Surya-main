import {
    agentOptions,
    entityTypeOptions,
    statesOptions,
} from '../../utils/policies'
import { ButtonHolder, Colors, Form, transitionCss } from '../../styles/styles'
import { Cancel, Save } from '../Buttons'
import { useState } from 'react'
import Overlay from '../Overlay'
import SearchOverlay from '../SearchOverlay'
import styled from 'styled-components'
import SuryaInput from '../PolicyFormInput'
import SuryaSelect from '../PolicyFormSelect'

const { Section, SectionTitle, Flex, InputWrapper } = Form

const search = '+ Search New Insured'
const add = '+ Add New Insured'
const insuredText = 'Choose Insured'

const personTitle = 'Personal Info'
const corpTitle = 'Coporation Info'

const Insured = ({ store }) => {
    const { insured: insuredStates } = store

    const { values, setValues, isAddActive, setAddActive } = insuredStates
    const [searchActive, setSearchActive] = useState(false)

    const handleInputOnChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div>
            <SuryaSelect
                label="Agent"
                onChange={(e) => {
                    setValues({ ...values, agent: e.target.value })
                }}
                options={agentOptions}
                placeholder="Agent"
                value={values.agent}
            />
            {/* <Section>
                <SectionTitle>{insuredText}</SectionTitle>
                <ButtonFlex>
                    <SearchInsuredButton
                        onClick={() => {
                            setSearchActive(true)
                        }}
                    >
                        {search}
                    </SearchInsuredButton>
                    <NewInsuredButton
                        onClick={() => {
                            setAddActive(true)
                        }}
                    >
                        {add}
                    </NewInsuredButton>
                </ButtonFlex>
            </Section> */}
            {true && (
                <Section>
                    <SectionTitle>New Insured</SectionTitle>

                    <NewInsuredSection
                        handleInputOnChange={handleInputOnChange}
                        setInactive={() => {
                            setAddActive(false)
                        }}
                        setValues={setValues}
                        values={values}
                    />
                </Section>
            )}
            <Overlay show={searchActive}>
                <SearchOverlay
                    close={() => {
                        setSearchActive(false)
                    }}
                />
            </Overlay>
        </div>
    )
}

const NewInsuredSection = ({
    values,
    setValues,
    handleInputOnChange,
    setInactive,
}) => {
    return (
        <>
            <Section>
                <Flex>
                    <SuryaSelect
                        label="What entity?"
                        onChange={(e) => {
                            setValues({ ...values, entity: e.target.value })
                        }}
                        options={entityTypeOptions}
                        placeholder="Entity"
                        value={values.entity}
                    />
                </Flex>
            </Section>

            {values.entity?.value === 'Corporation' && (
                <Section>
                    <SectionTitle>{corpTitle}</SectionTitle>
                    <Flex>
                        <InputWrapper>
                            <SuryaInput
                                label="Corporation Name"
                                name="corporationName"
                                onChange={handleInputOnChange}
                                placeholder=""
                                value={values.corporationName}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <SuryaInput
                                label="Tax ID Number"
                                name="taxIdNumber"
                                onChange={handleInputOnChange}
                                placeholder=""
                                value={values.taxIdNumber}
                            />
                        </InputWrapper>
                    </Flex>
                </Section>
            )}

            {values.entity === 'Individual' && (
                <Section>
                    <SectionTitle>{personTitle}</SectionTitle>
                    <Flex>
                        <InputWrapper>
                            <SuryaInput
                                label="First Name"
                                name="firstName"
                                onChange={handleInputOnChange}
                                placeholder=""
                                value={values.firstName}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <SuryaInput
                                label="Last Name"
                                name="lastName"
                                onChange={handleInputOnChange}
                                placeholder=""
                                value={values.lastName}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <SuryaInput
                                label="Middle Name **optional**"
                                name="middleName"
                                onChange={handleInputOnChange}
                                placeholder=""
                                value={values.middleName}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <SuryaInput
                                label="Date Of Birth mm/dd/yyyy"
                                name="dob"
                                onChange={handleInputOnChange}
                                placeholder="mm/dd/yyyy"
                                value={values.dob}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <SuryaInput
                                label="Suffix **optional**"
                                name="suffix"
                                onChange={handleInputOnChange}
                                placeholder=""
                                value={values.suffix}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <SuryaSelect
                                label="Choose gender"
                                onChange={(e) => {
                                    setValues({
                                        ...values,
                                        gender: e.target.value,
                                    })
                                }}
                                options={[
                                    { value: 'Male', label: 'Male' },
                                    { value: 'Female', label: 'Female' },
                                ]}
                                placeholder="Gender"
                                value={values.gender}
                            />
                        </InputWrapper>
                    </Flex>
                    <Flex>
                        <SuryaInput
                            label="SSN"
                            name="ssn"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values.ssn}
                        />
                    </Flex>
                </Section>
            )}
            <Section>
                <Flex>
                    <SuryaInput
                        label="Address Line 1"
                        name="address1"
                        onChange={handleInputOnChange}
                        placeholder=""
                        value={values.address1}
                    />
                </Flex>
                <Flex>
                    <InputWrapper>
                        <SuryaInput
                            label="Address Line 2"
                            name="address2"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values.address2}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="City"
                            name="city"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values.city}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="State"
                            name="state"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values.state}
                        />
                    </InputWrapper>
                </Flex>
                <Flex>
                    <InputWrapper>
                        <SuryaInput
                            label="Zip Code"
                            name="zipCode"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values.zipCode}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="Email"
                            name="email"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values.email}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="Phone Number"
                            name="phoneNumber"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values.phoneNumber}
                        />
                    </InputWrapper>
                </Flex>
            </Section>
            <Section>
                <SectionTitle>License State Info</SectionTitle>
                <Flex>
                    <InputWrapper>
                        <SuryaSelect
                            label="License State"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    licenseState: e.target.value,
                                })
                            }}
                            options={statesOptions}
                            placeholder="State"
                            value={values.licenseState}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="License Number"
                            name="licenseNumber"
                            onChange={handleInputOnChange}
                            placeholder="#"
                            value={values.licenseNumber}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="License Effective Date"
                            name="licenseEffDate"
                            onChange={handleInputOnChange}
                            placeholder="MM/DD/YYYY"
                            value={values.licenseEffDate}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="License Expiration Date"
                            name="licenseExpDate"
                            onChange={handleInputOnChange}
                            placeholder="MM/DD/YYYY"
                            value={values.licenseExpDate}
                        />
                    </InputWrapper>
                </Flex>
            </Section>
            <Section>
                <SectionTitle>Contact Person</SectionTitle>
                <Flex>
                    <InputWrapper>
                        <SuryaInput
                            label="Contact Name"
                            name="contactName"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values.contactName}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="Contact Phone Number"
                            name="contactNumber"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values.contactNumber}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="Contact Email"
                            name="contactEmail"
                            onChange={handleInputOnChange}
                            placeholder=""
                            value={values.contactEmail}
                        />
                    </InputWrapper>
                </Flex>
            </Section>
            <ButtonHolderStyled>
                <CancelButton
                    onClick={() => {
                        setInactive()
                    }}
                >
                    Cancel{' '}
                </CancelButton>
            </ButtonHolderStyled>
        </>
    )
}

const NewInsuredButton = styled.button`
    background: linear-gradient(
        116.57deg,
        rgba(52, 152, 194, 0.1) 0%,
        rgba(3, 205, 174, 0.1) 83.33%
    );
    mix-blend-mode: normal;
    border: 1px solid ${Colors.green};
    box-sizing: border-box;
    border-radius: 3px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    color: ${Colors.green};
    padding: 18px;
    flex: 1 1 auto;
    margin: 5px 10px;
    margin-left: 0;
    ${transitionCss}
    :hover {
        opacity: 0.7;
    }
`

const SearchInsuredButton = styled(NewInsuredButton)`
    background: transparent;
`

const ButtonFlex = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
`

const SaveButton = styled(Save)`
    width: 100%;
    margin: 0 10px;
`

const CancelButton = styled(Cancel)`
    width: 100%;
    margin: 0 10px;
`

const ButtonHolderStyled = styled(ButtonHolder)`
    margin: 0;
    margin-left: auto;
    margin-bottom: 10px;
    margin-top: 10px;
`

export default Insured
