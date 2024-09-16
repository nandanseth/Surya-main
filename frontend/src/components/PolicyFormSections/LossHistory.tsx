import { ButtonHolder, Form } from '../../styles/styles'
import { Save } from '../Buttons'
import { yesNoOptions } from '../../context/insured-context'
import React from 'react'
import styled from 'styled-components'
import SuryaInput from '../PolicyForm/PolicyFormInput'
import SuryaSelect from '../PolicyForm/PolicyFormSelect'

const { Section, SectionTitle, Flex, InputWrapper } = Form

const title = 'Loss History'

const LossHistory = ({ store }) => {
    const { lossHistory: lossStates } = store
    const { values, setValues, defaults } = lossStates
    console.log(values)

    const removeFields = (i) => {
        if (values.length <= 0) {
            setValues([{ ...defaults }])
            return
        }

        const newArray = [...values]
        newArray.splice(i, 1)
        setValues(newArray)
    }

    const addFields = () => {
        setValues([...values, { ...defaults }])
    }

    const dTitle = 'Loss History'

    const DefaultFields = ({ num = 0 }: { num?: number }) => {
        // render regular HTML input elemen

        const handleInputOnChange = (e) => {
            const copy = [...values]
            copy[num][e.target.name] = e.target.value
            setValues(copy)
        }

        return (
            <DarkSection>
                <SectionTitle>{dTitle}</SectionTitle>
                <Flex>
                    <InputWrapper>
                        <SuryaInput
                            label="Accident Date"
                            name="accidentDate"
                            onChange={handleInputOnChange}
                            placeholder="MM/DD/YYYY"
                            value={values[num].accidentDate}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="Reported Date"
                            name="reportedDate"
                            onChange={handleInputOnChange}
                            placeholder="MM/DD/YYYY"
                            value={values[num].reportedDate}
                        />
                    </InputWrapper>
                </Flex>
                <Flex>
                    <InputWrapper>
                        <SuryaInput
                            label="Claim Number"
                            name="claimNumber"
                            onChange={handleInputOnChange}
                            placeholder="claim number"
                            value={values[num].claimNumber}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="Sub - Claim Number"
                            name="subClaimNumber"
                            onChange={handleInputOnChange}
                            placeholder="sub-claim number"
                            value={values[num].subClaimNumber}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaSelect
                            label="Claim Type"
                            onChange={(e) => {
                                const copy = [...values]
                                copy[num].claimType = e.target.value
                                setValues(copy)
                            }}
                            options={[
                                { value: 'Body Injury', label: 'Body Injury' },
                                {
                                    value: 'Property Damage',
                                    label: 'Property Damage',
                                },
                                { value: 'Medical', label: 'Medical' },
                                {
                                    value: 'Uninsured Motorist',
                                    label: 'Uninsured Motorist',
                                },
                            ]}
                            placeholder="Claim Type"
                            value={values[num].claimType}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="Total Incurred"
                            name="totalIncurred"
                            onChange={handleInputOnChange}
                            placeholder="claimType"
                            value={values[num].totalIncurred}
                        />
                    </InputWrapper>
                </Flex>
                <Flex>
                    <SuryaSelect
                        label="Open Or Closed Status"
                        onChange={(e) => {
                            const copy = [...values]
                            copy[num].status = e.target.value
                            setValues(copy)
                        }}
                        options={yesNoOptions}
                        placeholder="Status"
                        value={values[num].status}
                    />
                </Flex>
                <Flex>
                    <InputWrapper>
                        <SuryaInput
                            label="Previous Policy Number"
                            name="previousPolicyNumber"
                            onChange={handleInputOnChange}
                            placeholder="Prev Policy #"
                            value={values[num].previousPolicyNumber}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="Prior Carrier Name"
                            name="priorCarrierName"
                            onChange={handleInputOnChange}
                            placeholder="Prev Policy #"
                            value={values[num].priorCarrierName}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="Original Inception Date"
                            name="originalInceptionDate"
                            onChange={handleInputOnChange}
                            placeholder="MM/DD/YYYY"
                            value={values[num].originalInceptionDate}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="Expiration Date"
                            name="expirationDate"
                            onChange={handleInputOnChange}
                            placeholder="MM/DD/YYYY"
                            value={values[num].expirationDate}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaSelect
                            label="Is Experience Mode"
                            onChange={(e) => {
                                const copy = [...values]
                                copy[num].isExperienceMode = e.target.value
                                setValues(copy)
                            }}
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            placeholder="Yes/No"
                            value={values[num].isExperienceMode}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaSelect
                            label="Is Policy Transferred"
                            onChange={(e) => {
                                const copy = [...values]
                                copy[num].isPolicyTransferred = e.target.value
                                setValues(copy)
                            }}
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                            placeholder="Yes/No"
                            value={values[num].isPolicyTransferred}
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
                    </div>
                </Flex>
            </DarkSection>
        )
    }

    return (
        <Wrapper>
            <Center>
                <StyledTitle>{title}</StyledTitle>
                <StyledHolder>
                    <Add onClick={addFields}>+ Add Loss</Add>
                </StyledHolder>
            </Center>
            <div>
                {values.map((key, i) => {
                    const toReturn = DefaultFields({ num: i })
                    return <React.Fragment key={i}>{toReturn}</React.Fragment>
                })}
            </div>
        </Wrapper>
    )
}

const DarkSection = styled(Section)`
    border: solid 1px #0000001a;
    background: #00000003;
    padding: 10px;
    border-radius: 4px;
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

export default LossHistory
