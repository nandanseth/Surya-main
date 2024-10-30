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

const { Section, Flex, InputWrapper } = Form

const PoliciesSection = ({ store }) => {
    const { policy: policyStates } = store
    const { values, setValues } = policyStates
    const [loading, setLoading] = useState(false)

    const {
        policyNum,
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

        // const getPolicyNum = async() => {

        //     setLoading(true)

        //     const appId = APP_ID;
        //     const serverUrl = SERVER_URL;  

        //     Moralis.start({ serverUrl, appId });
        //     const Policies = await (Moralis as any).Object.extend("Policies");
        //     const Applications = await (Moralis as any).Object.extend("Applications");

        //     const query = new (Moralis as any).Query(Policies);
        //     const appQuery = new (Moralis as any).Query(Applications);
        //     const data = await query.limit(1000).find();
        //     const dataApp = await appQuery.limit(1000).find();

        //     const policyNumbers = []

        //     let dataJson = ''
        //     let dataJsonApp = ''



        //     for (const i in data) {
        //         const object = data[i]
        //         dataJson = object.get("policyNum")
        //         policyNumbers.push(dataJson)
        //     }

        //     for (const i in dataApp) {
        //         const objectApp = dataApp[i]
        //         dataJsonApp = objectApp.get("policyNum")
        //         policyNumbers.push(dataJsonApp)
        //     }

        //     console.log(values.effectiveDate, effectiveDate, stateToCodeMapping, 'fe')

        //     const effYear = parseInt(values.effectiveDate.split("/")[2]).toString().slice(2,4)
        //     const state = stateToCodeMapping[values.states]
        //     let categorySingle = ''

        //     if (values.secondaryCategory === 'Taxi') {
        //         categorySingle = 'T'
        //     } else if (values.secondaryCategory === 'Limo') {
        //         categorySingle = 'L'
        //     } else {
        //         categorySingle = 'N'
        //     }


        //     let maxNumber = -Infinity;
        //     let maxPolicyNumber = '';
        //     console.log(policyNumbers, 'deam')

        //     policyNumbers.forEach(policyNumber => {
        //     const lastThreeDigits = parseInt(policyNumber.slice(-3), 10);

        //     if (lastThreeDigits > maxNumber) {
        //         maxNumber = lastThreeDigits;
        //         maxPolicyNumber = policyNumber;
        //     }
        //     });
        //     console.log(maxNumber, 'deam')

        //     const policyNumberFinal = effYear + state + categorySingle + '00' + (maxNumber+1).toString()

        //     const copy = values

            


        //     copy['policyNum'] = policyNumberFinal

        //     console.log(copy, 'frle')

        //     setValues(copy)
        //     setLoading(false)

        // }

        // if (values.effectiveDate && values.secondaryCategory && values.states) {
        //     getPolicyNum()
        // }

        
    

    }, [values.effectiveDate])



    useEffect(() => {

        const getDuplicate = (polNumbers) => {

            const foundNumbers = polNumbers.filter(item => item === values.policyNum);
            if (foundNumbers && foundNumbers.length > 1) {
                return true
            } else {
                return false
            }
            


        }

        const getPolicyNum = async() => {

            setLoading(true)

            const appId = APP_ID;
            const serverUrl = SERVER_URL;  

            Moralis.start({ serverUrl, appId });
            const Policies = await (Moralis as any).Object.extend("Policies");
            const Applications = await (Moralis as any).Object.extend("Applications");

            const query = new (Moralis as any).Query(Policies);
            const appQuery = new (Moralis as any).Query(Applications);
            const data = await query.limit(1000).find();
            const dataApp = await appQuery.limit(2000).find();

            const policyNumbers = []
            let dataJsonApp = ''



            // for (const i in data) {
            //     const object = data[i]
            //     dataJson = object.get("policyNum")
            //     policyNumbers.push(dataJson)
            // }

            for (const i in dataApp) {
                const objectApp = dataApp[i]
                dataJsonApp = objectApp.get("policyNum")
                policyNumbers.push(dataJsonApp)
            }

            const isTrue = getDuplicate(policyNumbers)

            if (isTrue) {

                const effYear = parseInt(values.effectiveDate.split("/")[2]).toString().slice(2,4)
                const state = stateToCodeMapping[values.states]
                let categorySingle = ''

                if (values.secondaryCategory === 'Taxi') {
                    categorySingle = 'T'
                } else if (values.secondaryCategory === 'Limo') {
                    categorySingle = 'L'
                } else {
                    categorySingle = 'N'
                }


                let maxNumber = -Infinity;
                let maxPolicyNumber = '';
                console.log(policyNumbers, 'deam')
                const cleanedPolicyNumbers = policyNumbers.filter(policyNumber => policyNumber !== undefined);

                cleanedPolicyNumbers.forEach(policyNumber => {
                    let lastThreeDigits = policyNumber.slice(-5)
            
                    if (lastThreeDigits[0] === '0') {
                        lastThreeDigits = lastThreeDigits.slice(-4)
                    }
                    if (lastThreeDigits[0] === '0') {
                        lastThreeDigits = lastThreeDigits.slice(-3)
                    }
                    lastThreeDigits = parseInt(lastThreeDigits, 10)
            
                    if (lastThreeDigits > maxNumber) {
                        maxNumber = lastThreeDigits;
                        maxPolicyNumber = policyNumber;
                    }
                });
                console.log(maxNumber, 'deam')

                const policyNumberFinal = effYear + state + categorySingle + '0' + (maxNumber+1).toString()

                const copy = values

                


                copy['policyNum'] = policyNumberFinal

                console.log(copy, 'frle')

                setValues({...values, policyNum: policyNumberFinal})

            }
            
            setLoading(false)

        }

        if (values.effectiveDate && values.secondaryCategory && values.states && values.policyNum !== "null") {
            getPolicyNum()
        }

    }, [])



    const getPolicyNum = async() => {

        const appId = APP_ID;
        const serverUrl = SERVER_URL;  

        Moralis.start({ serverUrl, appId });
        const Policies = await (Moralis as any).Object.extend("Policies");
        const Applications = await (Moralis as any).Object.extend("Applications");
        console.log('hi')
        const query = new (Moralis as any).Query(Policies);
        const appQuery = new (Moralis as any).Query(Applications);
        const data = await query.limit(1000).find();
        const dataApp = await appQuery.limit(1000).find();

        const policyNumbers = []

        // let dataJson = ''
        let dataJsonApp = ''



        // for (const i in data) {
        //     const object = data[i]
        //     dataJson = object.get("policyNum")
        //     policyNumbers.push(dataJson)
        // }

        for (const i in dataApp) {
            const objectApp = dataApp[i]
            dataJsonApp = objectApp.get("policyNum")
            policyNumbers.push(dataJsonApp)
        }

        console.log(values.effectiveDate, effectiveDate, stateToCodeMapping, 'fe')

        const effYear = parseInt(values.effectiveDate.split("/")[2]).toString().slice(2,4)
        const state = stateToCodeMapping[values.states]
        let categorySingle = ''

        if (values.secondaryCategory === 'Taxi') {
            categorySingle = 'T'
        } else if (values.secondaryCategory === 'Limo') {
            categorySingle = 'L'
        } else {
            categorySingle = 'N'
        }


        let maxNumber = -Infinity;
        let maxPolicyNumber = '';

        const cleanedPolicyNumbers = policyNumbers.filter(policyNumber => policyNumber !== undefined);

        cleanedPolicyNumbers.forEach(policyNumber => {
        let lastThreeDigits = policyNumber.slice(-5)

        if (lastThreeDigits[0] === '0') {
            lastThreeDigits = lastThreeDigits.slice(-4)
        }
        if (lastThreeDigits[0] === '0') {
            lastThreeDigits = lastThreeDigits.slice(-3)
        }
        lastThreeDigits = parseInt(lastThreeDigits, 10)

        if (lastThreeDigits > maxNumber) {
            maxNumber = lastThreeDigits;
            maxPolicyNumber = policyNumber;
        }
        });

        const policyNumberFinal = effYear + state + categorySingle + '0' + (maxNumber+1).toString()

        const copy = values

        


        copy['policyNum'] = policyNumberFinal

        console.log(copy, policyNumberFinal, 'frle')

        setValues({...values, policyNum: policyNumberFinal})

    }

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
