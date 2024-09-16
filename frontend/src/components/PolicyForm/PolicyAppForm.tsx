import { Colors, Title, transitionCss } from '../../styles/styles'
import { checkAllKeys } from '../../shared'
import Search from '../../components/Search'
import { CircularProgress } from '@mui/material';
import {
    CoverageSection,
    DocumentsSection,
    DriversSection,
    InsuredSection,
    LossHistorySection,
    PaymentsSection,
    PolicySection,
    ResinuranceSection,
    VehicleSection,
} from '../PolicyFormSections'
import { Form } from '../../styles/styles'
import Overlay from '../../components/Overlay'
import { FormContext } from '../../context/insured-context'
import { preSubmit, urls, testItem } from '../../shared'
import { useContext, useState } from 'react'
import coverageIcon from '../../images/coverage icon.png'
// import documentsIcon from '../../images/documents icon.png'
import { Accept, Submit } from '../Buttons'
import { useAlert } from 'react-alert'
import driversIcon from '../../images/drivers icon.png'
import insuredIcon from '../../images/insured icon.png'
import lossHistoryIcon from '../../images/loss history icon.png'
import paymentsIcon from '../../images/payments icon.png'
import policyIcon from '../../images/policy icon.png'
import reinsuranceIcon from '../../images/reinsurance icon.png'
import styled from 'styled-components'
import vehicleIcon from '../../images/vehicle icon.png' 
import { useEffect } from 'react'
import { useMoralis } from "react-moralis"
import Moralis from 'moralis'
import { APP_ID, SERVER_URL } from '../../index'
import { SortByHeader, Table, TD, Th, TR } from '../../styles/styles'
import PolicyEditForm from './PolicyEditForm'
import SuryaSelect from './PolicyFormSelect'
import SuryaInput from './PolicyFormInput'
import { stateToCodeMapping } from '../../utils/policies/stateToCodeMapping'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { brokerOptions } from '../../utils/policies/getBrokerName'

const { Section } = Form

const PolicyAppForm = ({ close }) => {
    const store = useContext(FormContext)
    const alert = useAlert()

    const [loading, setLoading] = useState(false)
    const [current, setCurrent] = useState('policy')
    const [moralisApps, setMoralisApps] = useState([testItem])
    const [moralisStartingApps, setMoralisStartingApps] = useState([testItem])
    const [showForm, setShowForm] = useState(false)
    const [currentApp, setCurrentApp] = useState([testItem])
    const [rejectedApps, setRejectedApps] = useState()
    const {isAuthenticated, user, logout, account} = useMoralis(); 
    const [moralisStatus, setMoralisStatus] = useState('')
    const [moralisUWStatus, setMoralisUWStatus] = useState('')
    const [genReDateStatus, setGenReDateStatus] = useState('')
    const [createdDates, setCreatedDates] = useState([])
    const [search, setSearch] = useState('')
    const [decisionStatus, setDecisionStatus] = useState('')
    const [clearSearch, setClearSearch] = useState(false)
    const [brokerNames, setBrokerNames] = useState([]);



    const { reset } = store

    useEffect(() => {
        
        const getApplications = async() => {
            try {
                const appId = APP_ID;
                const serverUrl = SERVER_URL;   

                Moralis.start({ serverUrl, appId });

                const Application = await (Moralis as any).Object.extend("Applications")
                const query = new (Moralis as any).Query(Application);
                const data = await query.limit(1000).find();

                const fortyDaysAgo = new Date();
                fortyDaysAgo.setDate(fortyDaysAgo.getDate() - 70);

                let dataJson
                let statusString
                let uwString
                let genReDate
                let createdAt
                let createdDate
                let polNum
                let decision = "null"
                const appData = []
                const statusData=[]
                const uwData = []
                const genReDateData = []
                const decisionData = []
                const createdDateData = []
                const brokerNamesData = [];
                
                for (const i in data) {
                    const object = data[i]
                    dataJson = JSON.parse(object.get("policyJson"))
                    statusString = object.get("policyStatus")
                    uwString = object.get("policyUnderwriter")
                    decision = object.get("Decision")
                    genReDate = object.get("genReDate")
                    createdAt = new Date(dataJson.policy.effectiveDate)
                    polNum = object.get("policyNum")

                    console.log(fortyDaysAgo, createdAt, createdAt < fortyDaysAgo, dataJson.policy.name, 'classic')

 
                    if (createdAt < fortyDaysAgo) {
                        createdDate = false
                    } else {
                        createdDate = true
                    }
                    
                    console.log(dataJson.insured.additionalInsured, 'lsnuts')
                    


                    appData.push(dataJson)

                
                    statusData.push(statusString)
                    uwData.push(uwString)
                    genReDateData.push(genReDate)
                    decisionData.push(decision)
                    createdDateData.push(createdDate)

                    const brokerName = object.get("brokerName") || "Undefined"; // Assuming brokerName is stored in your database
                    brokerNamesData.push(brokerName);


                    
                    if (polNum === '23NJN00271') {
                        console.log(decision, createdDateData, dataJson, 'clems')
                    }
                }

                
                
                setMoralisApps(appData)
                setMoralisStartingApps(appData)

                setMoralisStatus(statusData)
                setMoralisUWStatus(uwData)
                setGenReDateStatus(genReDateData)
                setDecisionStatus(decisionData)
                setCreatedDates(createdDateData)
                setBrokerNames(brokerNamesData);

                const rejectedData = []
                for (const i in data) {

                    const object = data[i]
                    if (object.get("Decision") !== 'Rejected') {
                        rejectedData.push(object.get("Decision"))
                    }
                    
                }

                setRejectedApps(rejectedData)
                console.log(rejectedData, 'skak')

            } catch (error) {
                alert.error("Error getting Applications")
                console.log(error)
            }
        }





        getApplications()
    }, [showForm, clearSearch])



    const logStatus = async(label, app, i) => {
        const Application = (Moralis as any).Object.extend("Applications")

        const query = new (Moralis as any).Query(Application);
        const data = await query.equalTo("policyNum", app.policy.policyNum).first();

        data.set("policyStatus", label)
        console.log(moralisStatus, i, label, 'dead')

        const copyStatus = [...moralisStatus]
        copyStatus[i] = label

        setMoralisStatus(copyStatus)
        
        data.save()
        
    }

    const logUWStatus = async(label, app, i) => {
        const Application = (Moralis as any).Object.extend("Applications")

        const query = new (Moralis as any).Query(Application);
        const data = await query.equalTo("policyNum", app.policy.policyNum).first();

        data.set("policyUnderwriter", label)

        const copyStatus = [...moralisUWStatus]
        copyStatus[i] = label

        setMoralisUWStatus(copyStatus)
        
        data.save()
        
    }

    const logGenReDateStatus = async(label, app, i) => {
        const Application = (Moralis as any).Object.extend("Applications")

        const query = new (Moralis as any).Query(Application);
        const data = await query.equalTo("policyNum", app.policy.policyNum).first();

        data.set("genReDate", label)

        const copyStatus = [...genReDateStatus]
        copyStatus[i] = label

        setGenReDateStatus(copyStatus)
        
        data.save()
        
    }


    

    

    useEffect(() => {

        
        const searchApp = async(policies) => {
            console.log(search, 'free')
            if (search === '') {
                setMoralisApps(policies)
            }
    
            const currentPolicies = [...policies]
            const filteredPolicies = currentPolicies.filter((item) => {
                const policy = item?.policy.name
                return (
                    policy?.includes(search)
    
                )
            })
    
            const appId = APP_ID;
            const serverUrl = SERVER_URL;   
    
            Moralis.start({ serverUrl, appId });
    
            const Application = await (Moralis as any).Object.extend("Applications")
            const query = new (Moralis as any).Query(Application);
    
            let statusString
            let uwString
            let genReDate
            let createdAt
            let createdDate
            let decision = "null"

            const fortyDaysAgo = new Date();
            fortyDaysAgo.setDate(fortyDaysAgo.getDate() - 60);
            const appData = []
            const statusData=[]
            const uwData = []
            const genReDateData = []
            const decisionData = []
            const createdDateData = []
            if (filteredPolicies.length === 1) {
                for (const i in filteredPolicies) {
                    const object = filteredPolicies[i]
                    const data = await query.equalTo("policyNum", object.policy.policyNum).first();
                    statusString = data.get("policyStatus")
                    uwString = data.get("policyUnderwriter")
                    decision = data.get("Decision")
                    genReDate = data.get("genReDate")
                    createdAt = data.get("_created_at")
                    console.log(createdAt, 'skiing')

                    if (createdAt < fortyDaysAgo) {
                        createdDate = false
                    } else {
                        createdDate = true
                    }

                    // createdDate = true
                    
        
        
                
                    statusData.push(statusString)
                    uwData.push(uwString)
                    genReDateData.push(genReDate)
                    decisionData.push(decision)
                    createdDateData.push(createdDate)
        
                }
                setMoralisApps(filteredPolicies)
    
                setMoralisStatus(statusData)
                setMoralisUWStatus(uwData)
                setGenReDateStatus(genReDateData)
                setDecisionStatus(decisionData)
                setCreatedDate(createdDateData)
            }
             
    
        }


        searchApp(moralisStartingApps)
        

    }, [search])



    const closeApp = async(app) => {

        close()
        try {
            // const Policy = Moralis.Object.extend("Policies")

            const Application = (Moralis as any).Object.extend("Applications")

            const query = new (Moralis as any).Query(Application);
            console.log(app.app.policy.policyNum, "NUMBer")
            const data = await query.equalTo("policyNum", app.app.policy.policyNum).first();
            console.log(data, "DATAFIELD")
            data.set("Decision", "Rejected")
            //data.destroy({useMasterKey: true})
            await data.save()

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const onSubmit = (app) => {
        const postStore = async () => {
            try {
                //we can do some verification here
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(preSubmit(store)),
                }
                console.log(JSON.stringify(preSubmit(store)))
                const res = await fetch(urls.createPoliciesUrl, requestOptions)
                const data = await res.json()
                console.log({ data }, 'test')
                return true
            } catch (error) {
                alert.error('Error submitting')
                console.log(error)
                return false
            }
        }

        const getPolicyNum = async() => {

            const appId = APP_ID;
            const serverUrl = SERVER_URL;  

            Moralis.start({ serverUrl, appId });
            const Policies = await (Moralis as any).Object.extend("Policies");
            const Applications = await (Moralis as any).Object.extend("Applications");

            const query = new (Moralis as any).Query(Policies);

            const data = await query.limit(1000).find();


            const policyNumbers = []

            let dataJson = ''



            for (const i in data) {
                const object = data[i]
                dataJson = object.get("policyNum")
                policyNumbers.push(dataJson)
            }


            const effYear = parseInt(app.app.policy.effectiveDate.split("/")[2]).toString().slice(2,4)
            const state = stateToCodeMapping[app.app.policy.states]
            let categorySingle = ''

            if (app.app.policy.secondaryCategory === 'Taxi') {
                categorySingle = 'T'
            } else if (app.app.policy.secondaryCategory === 'Limo') {
                categorySingle = 'L'
            } else {
                categorySingle = 'N'
            }


            let maxNumber = -Infinity;
            let maxPolicyNumber = '';

            policyNumbers.forEach(policyNumber => {
            const lastThreeDigits = parseInt(policyNumber.slice(-3), 10);
            console.log(lastThreeDigits, app.app.insured.name, 'keys')
            if (lastThreeDigits > maxNumber) {
                maxNumber = lastThreeDigits;
                maxPolicyNumber = policyNumber;
            }
            });

            const policyNumberFinal = effYear + state + categorySingle + '00' + (maxNumber+1).toString()

            


            app.app.policy.policyNum = policyNumberFinal

        }

        const moralisStore = async (app) => {
            try {
                // const Policy = Moralis.Object.extend("Policies")
                const Policy = (Moralis as any).Object.extend("Policies")
                const policy = new Policy()

                const initPolicy = (Moralis as any).Object.extend("InitialPolicies")
                const initpolicy = new initPolicy()

                if (app.app.policy.underwritingCode !== 'Renewal') {
                    
                    await getPolicyNum()
                }

                app.app.payments.values = []

                if (!app.app.payments.paymentType || app.app.payments.paymentType === 'null') {
                    app.app.payments.paymentType = "FULLPAY_POL"
                }
                
                initpolicy.set("policyJson", JSON.stringify(app.app))
                policy.set("policyJson", JSON.stringify(app.app))
                console.log(app, "EXTRA")

                initpolicy.set("policyNum", app.app.policy.policyNum)
                policy.set("policyNum", app.app.policy.policyNum)
                await policy.save()

                const Application = (Moralis as any).Object.extend("Applications")

                const query = new (Moralis as any).Query(Application);
                const data = await query.equalTo("policyNum", app.app.policy.policyNum).first();

                console.log(data, "LSL")

                data.set("Decision", "Accepted")

                //data.destroy({useMasterKey: true})

                await data.save()

                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
        return moralisStore(app)
    }

    const MenuFooter = (app) => (
        
        <>
            <Accept
                disabled={loading}
                onClick={async () => {
                    setLoading(true)
                    const check = await onSubmit(app)
                    
                    if (check) {
                        setLoading(false)
                        close()
                        reset()
                    }
                    setLoading(false)
                    // window.location.reload()
                }}
            >
                {loading ? 'Loading' : 'Accept'}
            </Accept>
            <Close onClick={() => closeApp(app)}>Reject</Close>
        </>
    )

    const MenuFooterReject = (app) => (
        
        <>

            <Close onClick={() => closeApp(app)}>Reject</Close>
        </>
    )

    const MenuFooterRejected = (app) => (
        
        <>
            Rejected
        </>
    )



    const ShowPolicyForm = (app) => {
        setShowForm(true)
        
        setCurrentApp(app.app)
    }

    const CloseForm = () => {
        setShowForm(false)
    }

    const EditApp = (app) => (
        <>
            <Button
                onClick={() => {
                    ShowPolicyForm(app);
                }}
            >
                Edit
            </Button>
        </>
    )

    const sortMoralisAppsAlphabetically = async (morApps) => {
        try {
            const indexMap = morApps.reduce((acc, app, index) => {
                acc[app.policy.policyNum] = index;
                return acc;
            }, {});
    
            const sortedApps = morApps.sort((a, b) => {
                const nameA = a.policy.name.toUpperCase();
                const nameB = b.policy.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
    
            const appData = [];
            const statusData = new Array(morApps.length);
            const uwData = new Array(morApps.length);
            const genReDateData = new Array(morApps.length);
            const decisionData = new Array(morApps.length);
            const createdDateData = new Array(morApps.length);
            const brokerNameData = new Array(morApps.length); // New array for broker names
    
            for (let i = 0; i < sortedApps.length; i++) {
                const originalIndex = indexMap[sortedApps[i].policy.policyNum];
    
                // Reposition other states
                statusData[i] = moralisStatus[originalIndex];
                uwData[i] = moralisUWStatus[originalIndex];
                genReDateData[i] = genReDateStatus[originalIndex];
                decisionData[i] = decisionStatus[originalIndex];
                createdDateData[i] = createdDates[originalIndex];
                brokerNameData[i] = brokerNames[originalIndex]; // Add broker name data
            }
    
            setMoralisStatus(statusData);
            setMoralisUWStatus(uwData);
            setGenReDateStatus(genReDateData);
            setDecisionStatus(decisionData);
            setCreatedDates(createdDateData);
            setBrokerNames(brokerNameData); // Update broker names state
    
            setMoralisApps([...sortedApps]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const logBrokerName = async (label, app, i) => {
        const Application = (Moralis as any).Object.extend("Applications");
        const query = new (Moralis as any).Query(Application);
        const data = await query.equalTo("policyNum", app.policy.policyNum).first();
    
        data.set("brokerName", label);
    
        const copyBrokerNames = [...brokerNames];
        copyBrokerNames[i] = label;
    
        setBrokerNames(copyBrokerNames);
        
        data.save();
    };


    

    return (
        <>
        <Container>
            {loading && (
                <div style={overlayStyle}>
                    <CircularProgress />
                </div>
            )}
            {/* <FormHead
                current={current}
                name={name}
                percent={percentMap[current]}
                setCurrent={setCurrent}
            /> */}
            
            <Search
                clear={() => {
                    setClearSearch(true)
                    setSearch('')
                }}
                onChange={(e) => {
                    setSearch(e.target.value.toUpperCase())
                }}
                placeholder="Search Policies"
                style={{ marginLeft: 'auto' }}
                value={search}
            />
            <Button disabled={loading} onClick={
                async() => {
                setLoading(true)
                const check = await sortMoralisAppsAlphabetically(moralisApps);
                if (check) {
                    setLoading(false)
                }
                setLoading(false)
                }} style={{ marginRight: 'auto', padding: "10px", marginLeft: '10px' }}>Sort Alphabetically</Button>
            <Table>
                <thead>
                        <Th>
                            Application Name
                        </Th>
                        <Th>
                            Broker Name
                        </Th>
                        <Th>
                            Limit
                        </Th>
                        <Th>
                            Renewal
                        </Th>
                        <Th>
                            Eff Date
                        </Th>
                        <Th>
                            GenRe Date
                        </Th>
                        <Th>
                            Status
                        </Th>
                        <Th>
                            Underwriter
                        </Th>
                        <Th>Broker Name</Th>
                        <Th>
                            Accept/Reject
                        </Th>
                </thead>
                <tbody>
                {moralisApps.map(
                        (app, i) => (
                            (decisionStatus[i] === 'Undefined' && createdDates[i] === true) ? (
                            <TR>
                  
                                    <Name>{app.policy.name}{"       "}
                                    <EditApp app={app}/>
                                    </Name>
                                    <Name>
                                        {app.policy.agent}
                                    </Name>
                                    <Name>
                                        {(app.coverage.overall !== 'Split Limit') ? (app.coverage.combinedSectionLimit) : (<>{app.coverage.splitSectionBodyPerPerson} / {app.coverage.splitSectionBodyPerAccidentOptions} </>)}
                                    </Name>

                                    <Name>
                                        {app.policy.underwritingCode}
                                    </Name>

                                    <Name>
                                        {app.policy.effectiveDate}
                                    </Name>
                                    <div style={{ border: '1px solid black', width: '140px', display: 'inline-block' }}>
                                        <DatePicker
                                            label="GenRe Date"
                                            name="GenRe Date"
                                            onChange={(date) => logGenReDateStatus(date, app, i)}
                                            dateFormat="MM/dd/yyyy"
                                            placeholder="GenRe Date"
                                            selected={genReDateStatus[i]}
                                            style={{ border: 'none', width: '100%', color: "black" }}
                                        />
                                    </div>

                                    <Name>
                                        <SuryaSelect
                                            label="Choose status"
                                            onChange={(e) => {
                                                logStatus(e.target.value, app, i)
                                            }}
                                            options={[
                                                { value: 'Awaiting Documents', label: 'Awaiting Documents' },
                                                { value: 'Documents Uploaded', label: 'Documents Uploaded' },
                                                { value: 'Additional Docs Requested', label: 'Additional Docs Requested' },
                                                { value: 'Quote Sent to GenRe', label: 'Quote Sent to GenRe' },
                                                { value: 'Quote Received from GenRe / In Discussion', label: 'Quote Recieved from GenRe / In Discussion' },
                                                { value: 'Quote Sent to Broker', label: 'Quote Sent to Broker' },
                                                { value: 'Quote Not Taken By Broker', label: 'Quote Not Taken By Broker' },
                                                { value: 'Quote Accepted By Broker', label: 'Quote Accepted By Broker' },
                                                { value: 'N/A', label: 'N/A' }
                                            ]}
                                            placeholder="Status"
                                            value={moralisStatus[i]}
                                        />
                                    </Name>
                                    <Name>
                                        <SuryaSelect
                                            label="Choose Underwriter"
                                            onChange={(e) => {
                                                logUWStatus(e.target.value, app, i)
                                            }}
                                            options={[
                                                { value: 'Tim Kirkem', label: 'Tim Kirkem' },
                                                { value: 'Anthony Stola', label: 'Anthony Stola' },
                                                { value: 'Undefined', label: 'Undefined' }
                                                
                                            ]}
                                            placeholder="UWStatus"
                                            value={moralisUWStatus[i]}
                                        />
                                    </Name>
                                    <Name>
                                        <SuryaSelect
                                            label="Choose Broker"
                                            onChange={(e) => logBrokerName(e.target.value, app, i)}
                                            options={brokerOptions}
                                            placeholder="Broker Name"
                                            value={brokerNames[i]}
                                        />
                                    </Name>

                                    {
                                    (user.get('username') === 'KVekaria' || user.get('username') === 'kushdave' || user.get('username') === 'rshukla' || user.get('username') === 'rshukla1') ? (<Name><MenuFooter app={app}/></Name>) : (<Name><MenuFooterReject app={app}/></Name>)}
                            </TR>
                            ) : (<></>)
                        )
                    )}
                </tbody>
            </Table>
            {/* <MenuFooter /> */}
        </Container>

        {showForm && (
            <Overlay
                show={showForm}
                style={{ background: 'rgba(11, 17, 20, 0.7939303)' }}
            >
                <Wrapper
                    onClick={(e) => {
                        if (e.currentTarget !== e.target) {
                            return
                        }
                        CloseForm()
                    }}
                >
                    <PolicyEditForm
                        close={() => {
                            CloseForm()
                        }}
                        app={currentApp}
                    />
                </Wrapper>
            </Overlay>
            
        )}
        </>

    )
}

const Button = styled.button`
    background-color: white;
    font-color: black;
    border-radius: 1rem;
    border: 1px solid black;
    font-size: 16px;
    padding: 7.5px;
`

const ProgressContainer = styled.div`
    height: 7px;
    width: 100%;
    position: relative;
`

const BaseBox = styled.div`
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transition: width 0.8s ease-in-out;
`

const Background = styled(BaseBox)`
    background: #83abd533;
    width: 100%;
    height: 8px;
`

const Progress = styled(BaseBox)<{ percent: number }>`
    background: ${Colors.electricBlue};
    border-radius: 0px 8px 8px 0px;
    width: ${({ percent }) => percent * 100}%;
`

const Header = styled.div`
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    background: #ffffff87;
    z-index: 4;
    backdrop-filter: blur(4px);
    display: block;
    top: 0;
`

const HeaderContent = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: 24px 12px;
    align-items: stretch;
`

const Left = styled.div`
    margin-right: auto;
    flex: 1 1 auto;
`

const Right = styled.div`
    margin-left: auto;
    flex: 1 1 auto;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const NewApplication = styled.div`
    font-size: 12px;
    color: ${Colors.text};
    margin-bottom: 6px;
`

const Close = styled(Submit)`
    color: white;
    background: red;
    :hover {
        opacity: 0.4;
        background: rgba(58, 86, 100, 0.06);
        color: black;
    }
    min-width: 100px;
`

const Container = styled.div`
    background: #ffffff;
    width: 100%;
    align-self: center;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
`

const Main = styled.div`
    padding: 20px 24px;
    width: 100%;
    padding-bottom: 40px;
    padding-top: 12px;
`

const Nav = styled.div`
    width: 100%;
    position: sticky;
    border-top: solid 1px #0000001c;
    backdrop-filter: blur(3px);
    background: #ffffffc4;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 2;
    bottom: 0;
    margin-top: auto;
    padding: 12px 20px;
`

const StyledIcon = styled.div<{ active: boolean }>`
  width: 40px;
  height: 100%;
  margin: 0 24px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${transitionCss}
  ${({ active }) =>
      active &&
      `
      border-bottom: solid 4px #3A5560;
      background-color: #00000003;
    `}}
`

const StyledImg = styled.img`
    width: 100%;
    height: auto;
    object-fit: contain;
    margin: auto;
`

const Wrapper = styled.div`
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
    padding: 24px;
    height: 100%;
    width: 100%;
`

const Name = styled(TD)`
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    align-items: center;
`
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



export default PolicyAppForm
