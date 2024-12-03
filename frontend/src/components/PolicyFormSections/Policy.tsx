import SuryaDatePicker from '../PolicyForm/PolicyFormDateSelect'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import {
    agentOptions,
    coverageTermOptions,
    lineOfBusinessOptions,
    policyCategoryOptions,
    policyLineItemOptions,
    statesOptions,
    underwritingCodeOptions,
} from '../../utils/policies'
import { TinySave, StyledCancel } from '../../components/Buttons'
import TextField from '@mui/material/TextField'
import {
    Colors,
    fonts,
    Header,
    StyledDiv,
    SubTitle,
    Title,
    ButtonHolder
} from '../../styles/styles'
import { CircularProgress } from '@mui/material';
import {
    bussinessUseClassesOptions,
    classCodesOptions,
    radiusOptions,
    secondaryCategoryOptions,
} from '../../utils/policies/getCommercial'
import { classificationMap } from '../../utils/policies/getPolicyCategory'
import { Form } from '../../styles/styles'
import SuryaInput from '../PolicyForm/PolicyFormInput'
import SuryaSelect from '../PolicyForm/PolicyFormSelect'
import { useState, useEffect } from 'react'
import Moralis from 'moralis'
import { stateToCodeMapping } from '../../utils/policies/stateToCodeMapping'
import { APP_ID, SERVER_URL } from '../../index'
import { useAlert } from 'react-alert'

const { Section, Flex, InputWrapper } = Form

const PoliciesSection = ({ store }) => {
    const { policy: policyStates } = store
    const { values, setValues } = policyStates
    const [loading, setLoading] = useState(false)
    const alert = useAlert()
    const policyNum = values?.policyNum

    useEffect(() => {
        // For new applications (no policyNum) or non-APP numbers
        if (!policyNum || (policyNum && !policyNum.toString().startsWith("APP-"))) {
            generatePolicyNum();
        }
    }, []);

    const generatePolicyNum = async() => {
        try {
            // If it's an APP number, prevent changes
            if (policyNum && policyNum.toString().startsWith("APP-")) {
                console.log("Cannot modify existing APP number:", policyNum);
                return;
            }

            setLoading(true);

            // Generate a random string using crypto
            const array = new Uint32Array(4);
            window.crypto.getRandomValues(array);
            const randomString = Array.from(array, dec => dec.toString(16).padStart(8, '0')).join('');
            
            // Format it to be more readable and add a prefix
            const policyNumberFinal = `APP-${randomString.slice(0, 12).toUpperCase()}`;
            
            // For existing policies in backend, update them
            if (policyNum) {
                await Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID });
                const Applications = Moralis.Object.extend("Applications");
                const appQuery = new Moralis.Query(Applications);
                const dataApp = await appQuery.limit(2000).find();
                
                const appWithOldNumber = dataApp.find(app => app.get("policyNum") === policyNum);
                if (appWithOldNumber) {
                    appWithOldNumber.set("policyNum", policyNumberFinal);
                    const policyJsonString = appWithOldNumber.get("policyJson");
                    const policyJson = JSON.parse(policyJsonString);
                    policyJson.policy.policyNum = policyNumberFinal;
                    appWithOldNumber.set("policyJson", JSON.stringify(policyJson));
                    await appWithOldNumber.save();
                }
            }

            // Update frontend state
            setValues({ ...values, policyNum: policyNumberFinal });
            setLoading(false);
        } catch (error) {
            console.error('Error in generatePolicyNum:', error);
            alert.error('Error generating policy number');
            setLoading(false);
        }
    };

    const {
        states,
        lineOfBusiness,
        policyLineItem,
        coverageTerm,
        policyCategory,
        underwritingCode,
        agent,
        classification,
        effectiveDate,
        expirationDate,
        radius,
        classCode,
        secondaryCategory,
        businessUseClass,
        name,
    } = values

    useEffect(() => {
        if (values.effectiveDate && values.effectiveDate.length > 9) {
            const month = values.effectiveDate.split("/")[0]
            const day = values.effectiveDate.split("/")[1]
            const year = (parseInt(values.effectiveDate.split("/")[2])+1).toString()
        
            setValues({...values, expirationDate: `${month}/${day}/${year}`})
        }
    }, [values.effectiveDate])

    const TimePicker = (props: any) => {
        return (
            <StyledDiv>
                <MobileDatePicker {...props} />
            </StyledDiv>
        )
    }

    return (
        <>
        {loading && (
            <div style={overlayStyle}>
                <CircularProgress />
            </div>
        )}
            <Section>
                <Flex>
                    <InputWrapper>
                        <SuryaInput
                            label="Name"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    name: e.target.value,
                                })
                            }}
                            placeholder=""
                            value={name}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="Policy Number"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    policyNum: e.target.value,
                                })
                            }}
                            placeholder=""
                            value={policyNum}
                        />
                        
                    </InputWrapper>
                    {(values.effectiveDate && values.secondaryCategory && values.states) ? (<TinySave style={{width: "20%", height: "20%"}} onClick={() => getPolicyNum()}>Generate Pol. Num.</TinySave>) : (<></>)}
                </Flex>
                <Flex>
                    <InputWrapper>
                        <SuryaSelect
                            label="What state will the policy be in?"
                            onChange={(e) => {
                                setValues({ ...values, states: e.target.value })
                            }}
                            options={statesOptions}
                            placeholder="States"
                            value={states}
                        />
                    </InputWrapper>
                </Flex>
                <Flex>
                    <InputWrapper>
                        <SuryaInput
                            label="Effective Date"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    effectiveDate: e.target.value,
                                })
                            }}
                            placeholder="MM/DD/YYYY"
                            value={effectiveDate}
                        />
                         {/* <TimePicker
                                    inputFormat="MM/dd/yyyy"
                                    label="Effective Date"
                                    onChange={(e) => {
                                setValues({
                                    ...values,
                                    effectiveDate: e.target.value,
                                })
                            }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    value={effectiveDate}
                                /> */}
                    </InputWrapper>
                   
                    <InputWrapper>
                        <SuryaInput
                            label="Expiration Date"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    expirationDate: e.target.value,
                                })
                            }}
                            placeholder="MM/DD/YYYY"
                            value={expirationDate}
                        />
                        {/* <TimePicker
                                    inputFormat="MM/dd/yyyy"
                                    label="Expiration Date"
                                    onChange={(e) => {
                                setValues({
                                    ...values,
                                    expirationDate: e.target.value,
                                })
                            }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    value={expirationDate}
                                /> */}
                    </InputWrapper>
                </Flex>
                <Flex>
                    <InputWrapper>
                        <SuryaSelect
                            label="What line of business?"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    lineOfBusiness: e.target.value,
                                })
                            }}
                            options={lineOfBusinessOptions}
                            placeholder="Line of Business"
                            value={lineOfBusiness}
                        />
                    </InputWrapper>
                </Flex>
            </Section>
            <Section>
                <Flex>
                    <InputWrapper>
                        <SuryaSelect
                            label="What type of drive?"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    policyLineItem: e.target.value,
                                })
                            }}
                            options={policyLineItemOptions}
                            placeholder="Line Item"
                            value={policyLineItem}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaSelect
                            label="What is the coverage term?"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    coverageTerm: e.target.value,
                                })
                            }}
                            options={coverageTermOptions}
                            placeholder="Coverage Term"
                            value={coverageTerm}
                        />
                    </InputWrapper>
                    {lineOfBusiness === 'Livery' ? (
                        <>
                            <InputWrapper>
                                <SuryaSelect
                                    label="What is the category?"
                                    onChange={(e) => {
                                        setValues({
                                            ...values,
                                            policyCategory: e.target.value,
                                            classification:
                                                classificationMap[
                                                    e.target.value
                                                ][0].value,
                                        })
                                    }}
                                    options={policyCategoryOptions}
                                    placeholder="Category"
                                    value={policyCategory}
                                />
                            </InputWrapper>
                            {policyCategory && (
                                    <InputWrapper>
                                        <SuryaSelect
                                            label="What is the classification?"
                                            onChange={(e) => {
                                                setValues({
                                                    ...values,
                                                    classification:
                                                        e.target.value,
                                                })
                                            }}
                                            options={
                                                classificationMap[
                                                    policyCategory
                                                ]
                                            }
                                            placeholder="Category"
                                            value={classification}
                                        />
                                    </InputWrapper>
                                )}
                        </>
                    ) : (
                        <>
                            <InputWrapper>
                                <SuryaSelect
                                    label="What is secondary category?"
                                    onChange={(e) => {
                                        setValues({
                                            ...values,
                                            secondaryCategory: e.target.value,
                                        })
                                    }}
                                    options={secondaryCategoryOptions}
                                    placeholder="Category"
                                    value={secondaryCategory}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <SuryaSelect
                                    label="What is the business use class?"
                                    onChange={(e) => {
                                        setValues({
                                            ...values,
                                            businessUseClass: e.target.value,
                                        })
                                    }}
                                    options={bussinessUseClassesOptions}
                                    placeholder="Category"
                                    value={businessUseClass}
                                />
                            </InputWrapper>
                        </>
                    )}

                    <InputWrapper>
                        <SuryaSelect
                            label="Underwriting code"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    underwritingCode: e.target.value,
                                })
                            }}
                            options={underwritingCodeOptions}
                            placeholder="Underwriting code"
                            value={underwritingCode}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaSelect
                            label="Agent"
                            onChange={(e) => {
                                setValues({ ...values, agent: e.target.value })
                            }}
                            options={agentOptions}
                            placeholder="Agent"
                            value={agent}
                        />
                    </InputWrapper>
                </Flex>
                <Flex>
                    <InputWrapper>
                        <SuryaSelect
                            label="What is the class code?"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    classCode: e.target.value,
                                })
                            }}
                            options={classCodesOptions}
                            placeholder="Class code"
                            value={classCode}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaSelect
                            label="What is the radius?"
                            onChange={(e) => {
                                setValues({ ...values, radius: e.target.value })
                            }}
                            options={radiusOptions}
                            placeholder="radius"
                            value={radius}
                        />
                    </InputWrapper>
                </Flex>
            </Section>
        </>
    )
}



export default PoliciesSection

const overlayStyle = {
    position: 'absolute', // Or 'absolute' if the spinner should be contained within a specific parent
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Light white background
    zIndex: 1000, // Ensure it sits above everything else
};
