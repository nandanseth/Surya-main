import {
    agentOptions,
    entityTypeOptions,
    statesOptions,
    stateCodeOptions,
    additionalInsuredOptions
} from '../../utils/policies'

import { ButtonHolder, Form } from '../../styles/styles'
import { Cancel, StyledCancel } from '../Buttons'
import { useState, useEffect } from 'react'
import Overlay from '../Overlay'
import SearchOverlay from '../SearchOverlay'
import styled from 'styled-components'
import SuryaInput from '../PolicyForm/PolicyFormInput'
import SuryaCheckbox from '../PolicyForm/PolicyFormCheckbox'
import SuryaSelect from '../PolicyForm/PolicyFormSelect'
import { territory } from '../../utils/insured/getTerritory'
import { Save } from '../Buttons'
import Moralis from 'moralis'
import { APP_ID, SERVER_URL } from '../../index'

const { Section, SectionTitle, Flex, InputWrapper } = Form

const personTitle = 'Personal Info'
const corpTitle = 'Coporation Info'

const Insured = ({ store }) => {
    const { insured: insuredStates } = store

    const { values, setValues, setAddActive } = insuredStates

    const addInsuredDefaults = {
        insName: "None",
        address: null,
        city: null,
        zipCode: null,
        state: "TX",
        isWaiver: false,
        isAddPremium: false
    }
    const [additionalInsuredValues, setAdditionalInsuredValues] = useState([addInsuredDefaults])
    const [searchActive, setSearchActive] = useState(false)
    const [addInsuredFinal, setAddInsuredFinal] = useState()

    useEffect(() => {
        if (values.additionalInsured?.values) {
            setAdditionalInsuredValues(values.additionalInsured?.values)
        }
    }, [])

    


    useEffect(()=> {

        const getAddInsured = async() => {
            const appId = APP_ID;
            const serverUrl = SERVER_URL;   

            Moralis.start({ serverUrl, appId });

            const Application = (Moralis as any).Object.extend("Applications")

            const query = new (Moralis as any).Query(Application);
            console.log(store)
            const data = await query.equalTo("policyNum", store.policy.values.policyNum).first();
            console.log(data, 'fleal')

            let addInsured = [{
                insName: "None",
                address: null,
                city: null,
                zipCode: null,
                state: "TX",
                isWaiver: false,
                isAddPremium: false
            }]

            if (data) {

                const policyData = JSON.parse(data.get("policyJson"))

                console.log(policyData?.insured?.additionalInsured?.values, 'poop')

                if (additionalInsuredValues === [addInsuredDefaults]) {
                    addInsured = policyData?.insured?.additionalInsured?.values ?? 
                    [{
                        insName: "None",
                        address: null,
                        city: null,
                        zipCode: null,
                        state: "TX",
                        isWaiver: false,
                        isAddPremium: false
                    }]
                    setAddInsuredFinal(addInsured) 
                    setAdditionalInsuredValues(addInsured)
                }
                

            }
            
            

        }



        getAddInsured()




        // const copy = values
        // console.log(copy, 'fle')
        // setAdditionalInsuredValues(addInsuredFinal)   
    }, [])

    useEffect(() => {
        if (values.zipCode && values.zipCode.length > 3) {
            for (const i in territory['Territory']) {
                if (territory['Territory'][i]['Zip Code'] === values.zipCode || ("0").concat(territory['Territory'][i]['Zip Code']) === values.zipCode) {
                    setValues({...values, city: territory['Territory'][i]['City'], state: territory['Territory'][i]['State']})
                }
            }
        }
        
        const copy = values
        copy['additionalInsured']['values'] = additionalInsuredValues
        setValues(copy)

        
        console.log(additionalInsuredValues, values, "Screen")


    }, [values.zipCode, additionalInsuredValues])

    

    const handleInputOnChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    const handleAddInsInputOnChange = (e, index) => {
        const copy = [...additionalInsuredValues]
        copy[index][e.target.name] = e.target.value
        setAdditionalInsuredValues(copy)
    }

    const handleAddInsSelectOnChange = (e, index, prop) => {
        const copy = [...additionalInsuredValues]
        copy[index][prop] = e.target.value
        setAdditionalInsuredValues(copy)
    }

    const handleAddInsCheckboxOnChange = (e, index, prop) => {
        const copy = [...additionalInsuredValues];
        if (!copy[index].hasOwnProperty(prop)) {
            copy[index][prop] = e.target.checked; // Use e.target.checked to get the checkbox state
        } else {
            copy[index][prop] = e.target.checked;
        }
        setAdditionalInsuredValues(copy);
    };

    const addFields = () => {
        setAdditionalInsuredValues([...additionalInsuredValues,  {...addInsuredDefaults}])
    }

    const removeFields = (i) => {
        const newArray = [...additionalInsuredValues]
        newArray.splice(i, 1)
        setAdditionalInsuredValues(newArray)
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
                        handleAddInsSelectOnChange={handleAddInsSelectOnChange}
                        setValues={setValues}
                        values={values}
                        additionalInsuredValues={additionalInsuredValues}
                        handleAddInsInputOnChange={handleAddInsInputOnChange}
                        addFields={addFields}
                        removeFields={removeFields}
                        setAdditionalInsuredValues={setAdditionalInsuredValues}
                        addInsuredDefaults={addInsuredDefaults}
                        handleAddInsCheckboxOnChange={handleAddInsCheckboxOnChange}
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
    additionalInsuredValues,
    addFields,
    removeFields,
    handleAddInsSelectOnChange,
    handleAddInsInputOnChange,
    setAdditionalInsuredValues,
    addInsuredDefaults,
    handleInputOnChange,
    setInactive,
    handleAddInsCheckboxOnChange
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
            <Section>
                <SectionTitle>Additional Insured</SectionTitle>
                <Add onClick={() => addFields()}>+ Add Insured</Add>
                {additionalInsuredValues.map((value, index) => {
                    return (
                    <>
                        <Flex>
                            <InputWrapper>
                                <SuryaInput
                                    label="Additional Insured"
                                    name="insName"
                                    onChange={(e)=>handleAddInsInputOnChange(e, index)}
                                    placeholder="None"
                                    value={additionalInsuredValues[index].insName}
                                />
                            </InputWrapper>
                            
                            <InputWrapper>
                                <SuryaInput
                                    label="Additional Insured Address"
                                    name="address"
                                    onChange={(e)=>handleAddInsInputOnChange(e, index)}
                                    placeholder=""
                                    value={additionalInsuredValues[index].address}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <SuryaInput
                                    label="Additional Insured City"
                                    name="city"
                                    onChange={(e)=>handleAddInsInputOnChange(e, index)}
                                    placeholder=""
                                    value={additionalInsuredValues[index].city}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <SuryaInput
                                    label="Additional Insured Zip Code"
                                    name="zipCode"
                                    onChange={(e)=>handleAddInsInputOnChange(e, index)}
                                    placeholder=""
                                    value={additionalInsuredValues[index].zipCode}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <SuryaSelect
                                    label="Additional Insured State"
                                    name="state"
                                    onChange={(e) => {
                                        handleAddInsSelectOnChange(e, index, "state")
                                    }}
                                    placeholder=""
                                    options={stateCodeOptions}
                                    value={additionalInsuredValues[index].state}
                                />
                            </InputWrapper>
                            <InputWrapper>
  
                                <label>
                                    Waiver of Subrogation?
                                </label>
                                <SuryaCheckbox
                                    type="checkbox"
                                    name="isWaiver"
                                    checked={additionalInsuredValues[index].isWaiver}
                                    onChange={(e) => {
                                        handleAddInsCheckboxOnChange(e, index, "isWaiver");
                                    }}
                                />
         
                            </InputWrapper>
                            <InputWrapper>
  
                                <label>
                                    Additional Insured Premium?
                                </label>
                                <SuryaCheckbox
                                    type="checkbox"
                                    name="isAddPremium"
                                    checked={additionalInsuredValues[index].isAddPremium}
                                    onChange={(e) => {
                                        handleAddInsCheckboxOnChange(e, index, "isAddPremium");
                                    }}
                                />
         
                            </InputWrapper>
                            
                        </Flex>
                        <StyledCancel style={{width: "50px", height: "40px"}}
                            onClick={() => {
                                removeFields(index)
                            }}
                        >Remove</StyledCancel>
                    </>
                    )
                })}
                
            </Section>

            {/* <ButtonHolderStyled>
                <StyledCancel
                    onClick={() => {
                        setInactive()
                    }}
                >
                    Cancel
                </StyledCancel>
            </ButtonHolderStyled> */}
        </>
    )
}

// const NewInsuredButton = styled.button`
//     background: linear-gradient(
//         116.57deg,
//         rgba(52, 152, 194, 0.1) 0%,
//         rgba(3, 205, 174, 0.1) 83.33%
//     );
//     mix-blend-mode: normal;
//     border: 1px solid ${Colors.green};
//     box-sizing: border-box;
//     border-radius: 3px;
//     font-style: normal;
//     font-weight: 600;
//     font-size: 14px;
//     text-align: center;
//     color: ${Colors.green};
//     padding: 18px;
//     flex: 1 1 auto;
//     margin: 5px 10px;
//     margin-left: 0;
//     ${transitionCss}
//     :hover {
//         opacity: 0.7;
//     }
// `

const ButtonHolderStyled = styled(ButtonHolder)`
    margin: 0;
    margin-left: auto;
    margin-bottom: 10px;
    margin-top: 10px;
`

const Add = styled(Save)`
    max-width: 200px;
    width: 100%;
    margin-left: auto;
    font-weight: 500;
    padding: 12px;
    font-size: 14px;
`

export default Insured
