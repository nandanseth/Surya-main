import { Colors, Title, transitionCss } from '../../styles/styles'
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
import { SortByHeader, Table, TD, Th, TRLight } from '../../styles/styles'
import PolicyEditForm from './PolicyEditForm'
import getDNRReason from '../../utils/renewals/getDNRReason'
import SuryaSelect from './PolicyFormSelect'
import SuryaInput from './PolicyFormInput'

const { Section, InputWrapper, Flex } = Form

const PolicyAppForm = ({ close }) => {
    const store = useContext(FormContext)
    const alert = useAlert()

    const [loading, setLoading] = useState(false)
    const [current, setCurrent] = useState('insured')
    const [moralisApps, setMoralisApps] = useState([testItem])
    const [showForm, setShowForm] = useState(false)
    const [currentApp, setCurrentApp] = useState([testItem])
    const [dnrReason, setDNRReason] = useState('')
    const [dateOfIssuance, setDateOfIssuance] = useState('')
    const {isAuthenticated, user, logout, account} = useMoralis(); 


    const renewalNoticeDates = {
    "ALABAMA": 135,
    "ARIZONA": 60,
    "CALIFORNIA": 60,
    "CONNECTICUT": 60,
    "INDIANA": 60,
    "NEW JERSEY": 60,
    "OHIO": 60,
    "OREGON": 60,
    "PENNSYLVANIA": 60,
    "TEXAS": 60,
    "VIRGINIA": 60
    }

    const renewalFinalDates = {
    "ALABAMA": 120,
    "ARIZONA": 30,
    "CALIFORNIA": 45,
    "CONNECTICUT": 30,
    "INDIANA": 30,
    "NEW JERSEY": 45,
    "OHIO": 30,
    "OREGON": 45,
    "PENNSYLVANIA": 30,
    "TEXAS": 30,
    "VIRGINIA": 45
    }

    const { reset } = store

    useEffect(() => {
        const getRenewals = async() => {
            try {
                const appId = APP_ID;
                const serverUrl = SERVER_URL;   

                Moralis.start({ serverUrl, appId });

                const Policies = await (Moralis as any).Object.extend("Policies")
                const query = new (Moralis as any).Query(Policies);
                const data = await query.limit(1000).find();

                let dataJson
                const appData = []
                for (const i in data) {
                    const object = data[i]
                    dataJson = JSON.parse(object.get("policyJson"))

                    const state = dataJson.policy.states.toUpperCase()
                    const expDate = dataJson.policy.expirationDate

                    if (expDate) {
                        const stateDays = renewalNoticeDates[state]
                        const daysUntilExpiration = Math.floor((new Date(expDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                        if (!dataJson.renewal || dataJson.renewal.renewalDecision === 'undecided') {
                            if (Math.abs(daysUntilExpiration) <= stateDays && daysUntilExpiration > -4) {
                                console.log(dataJson.policy.name, expDate, daysUntilExpiration, stateDays, 'doos')
                                appData.push(dataJson)
                            }
                        }
                        
                    }
                }
                    
                setMoralisApps(appData)
                console.log(dataJson, 'test')

            } catch (error) {
                alert.error("Error getting Applications")
                console.log(error)
            }
        }
        getRenewals()
        console.log(getDNRReason, 'skak')
    }, [])

    const closeApp = async(app) => {
        close()
        try {
            // const Policy = Moralis.Object.extend("Policies")
            if (dnrReason === '' || dateOfIssuance === '') {
                throw new Error("Make sure to input DNR Reason and Date of Issuance")
            }

            const Policies = (Moralis as any).Object.extend("Policies")

            const query = new (Moralis as any).Query(Policies);
            const data = await query.equalTo("policyNum", app.app.policy.policyNum).first();
            const dataJson = JSON.parse(data.get('policyJson'))

            if (!dataJson.renewal) {
                dataJson.renewal = {
                    "renewalDecision" : "undecided",
                    "nonRenewalReason" : "undecided",
                    "dateOfDecision": "null"
                }
            }

            dataJson.renewal.renewalDecision = 'rejected'
            dataJson.renewal.nonRenewalReason = dnrReason
            dataJson.renewal.dateOfDecision = dateOfIssuance

            data.set("policyJson", JSON.stringify(dataJson))
            //data.destroy({useMasterKey: true})
            await data.save()

            return true
        } catch (error) {
            console.log(error)
            alert.error("Need to Input Date of Issuance and DNR Reason")
            return false
        }
    }

    const onSubmit = (app) => {
   
        const moralisStore = async (app) => {
            try {

                if (dateOfIssuance === '') {
                    throw new Error("Make sure to input date of issuance")
                }
                const Policies = Moralis.Object.extend("Policies")

          
                const query = new (Moralis as any).Query(Policies);
                const data = await query.equalTo("policyNum", app.app.policy.policyNum).first();
                const dataJson = JSON.parse(data.get('policyJson'))

                if (!dataJson.renewal) {
                    dataJson.renewal = {
                        "renewalDecision" : "undecided",
                        "nonRenewalReason" : "undecided",
                        "dateOfDecision": "null"
                    }
                }

                dataJson.renewal.renewalDecision = 'accepted'
                
                dataJson.renewal.nonRenewalReason = dnrReason
                dataJson.renewal.dateOfDecision = dateOfIssuance

                data.set("policyJson", JSON.stringify(dataJson))
                //data.destroy({useMasterKey: true})
                await data.save()


                const Application = (Moralis as any).Object.extend("Applications")
                const application = new Application()

                const incrementDateByOneYear = (dateString) => {
                    const date = new Date(dateString);
                    date.setFullYear(date.getFullYear() + 1);
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    const year = date.getFullYear().toString().substr(-2);
                    const newDate = `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year}`;
                    return newDate;
                }

                const incrementPolicyYear = (policyNumber) => {
                    const year = parseInt(policyNumber.substring(0, 2));
                    const newYear = year + 1;
                    const newPolicyNumber = newYear.toString().padStart(2, "0") + policyNumber.substring(2);
                    return newPolicyNumber;
                }


                const oldPolicyNum = app.app.policy.policyNum
                const oldPolicyEffDate = app.app.policy.effectiveDate
                const oldPolicyExpDate = app.app.policy.expirationDate

                for (const i in app.app.vehicles.values) {
                    if (app.app.vehicles.values[i].baseExpDate === app.app.policy.expirationDate) {
                        app.app.vehicles.values[i].baseEffDate = incrementDateByOneYear(oldPolicyEffDate)
                        app.app.vehicles.values[i].baseExpDate = incrementDateByOneYear(oldPolicyExpDate)
                    } else {
                        app.app.vehicles.values.splice(i, 1)
                    }
                }


                for (const i in app.app.drivers.values) {
                    if (app.app.drivers.values[i].driverExpDate === app.app.policy.expirationDate) {
                        app.app.drivers.values[i].driverEffDate = incrementDateByOneYear(oldPolicyEffDate)
                        app.app.drivers.values[i].driverExpDate = incrementDateByOneYear(oldPolicyExpDate)
                    } else {
                        app.app.drivers.values.splice(i, 1)
                    }
                }

                
                app.app.policy.effectiveDate = incrementDateByOneYear(oldPolicyEffDate)
                app.app.policy.expirationDate = incrementDateByOneYear(oldPolicyExpDate)
                app.app.policy.underwritingCode = 'Renewal'
                app.app.policy.policyNum = incrementPolicyYear(oldPolicyNum)

                app.app.Uploads = {}
                

                application.set("policyNum", incrementPolicyYear(oldPolicyNum))

                application.set("policyJson", JSON.stringify(app.app))
                application.set("Decision", "Undefined")
                await application.save()


                //await data.save()

                return true
            } catch (error) {
                console.log(error)
                alert.error("Need to Input Date of Issuance")
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
                }}
            >
                {loading ? 'Loading' : 'Renew'}
            </Accept>
            <Close onClick={() => closeApp(app)}>Do Not Renew</Close>
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

    return (
        <>
        <Container>
            {/* <FormHead
                current={current}
                name={name}
                percent={percentMap[current]}
                setCurrent={setCurrent}
            /> */}
            <Table>
                <thead>
                        <Th>
                            Policy Name
                        </Th>
                        <Th>
                            Expiration Date
                        </Th>
                        <Th>
                            State
                        </Th>
                        <Th>
                            Days to Send Notice 
                        </Th>
                        <Th>
                            DNR Reason (If Applicable)
                        </Th>
                        <Th>
                            Date of Issuance
                        </Th>
                        <Th>
                            Conditionally Renew/Reject
                        </Th>
                </thead>
                <tbody>
                {moralisApps.map(
                        (app, i) => (
                            // <div style={{display:"flex", flexDirection: "row", width: "1700px"}}>
                            <TRLight>
                        
                                    <Name>{app.policy.name}{"       "}
                                    {/* <EditApp app={app}/> */}
                                    </Name>
                        
                       
                                    <Name>{app.policy.expirationDate}{"       "}
                                    {/* <EditApp app={app}/> */}
                                    </Name>
                                    <Name>{app.policy.states}{"       "}
                                    {/* <EditApp app={app}/> */}
                                    </Name>
                                    <Name>{Math.floor((new Date(app.policy.expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) - renewalFinalDates[app.policy.states.toUpperCase()]}{"       "}
                                    {/* <EditApp app={app}/> */}
                                    </Name>
                                    <Name>
                                    <InputWrapper>
                                        <SuryaSelect
                                            label="DNR Reason"
                                            onChange={(e) => {
                                                setDNRReason(
                                                    e.target.value
                                                )
                                            }}
                                            options={getDNRReason}
                                            placeholder="Choose DNR Reason"
                                            value={dnrReason}
                                        />
                                    </InputWrapper>{"       "}
                                    {/* <EditApp app={app}/> */}
                                    </Name>
                                    <Name>
                                        <Flex>
                                            <SuryaInput
                                                label="Date of Issuance"
                                                onChange={(e) => {
                                                    setDateOfIssuance(
                                                        e.target.value,
                                                    )
                                                }}
                                                placeholder="mm/dd/yy"
                                                value={dateOfIssuance}
                                            />
                                        </Flex>
                                    </Name>
                      
                           
                                    <Name><MenuFooter app={app}/></Name>
                   
                            </TRLight>
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

const TDCenter = styled(TD)`
    text-align: center;
    align-items: center;
`

const Name = styled(TD)`
    font-weight: 600;
    font-size: 20px;
    text-align: center;
    align-items: center;
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

export default PolicyAppForm
