import { Colors, fonts, Header, transitionCss } from '../../styles/styles'
import { Link, useParams } from 'react-router-dom'
import { urls } from '../../shared'
import { useEffect, useMemo, useState } from 'react'
import backArrow from '../../images/back-arrow.png'
import CoverageSection from './InfoSections/Coverage'
import DocumentsSection from '../../components/RenderDocuments/RenderDocuments'
import DriversSection from './InfoSections/Drivers'
import RejectedDriversSection from './InfoSections/RejectedDrivers'
import InsuredSection from './InfoSections/Insured'
import NotesSection from './InfoSections/Notes'
import PaymentsSection from './InfoSections/Payments'
import ReinsuranceSection from './InfoSections/Reinsurance'
import UnderwritingSection from './InfoSections/Underwriting'
import Layout from '../../utils/withLayout'
import LossHistorySection from './InfoSections/LossHistory'
import MenuItem from './MenuItem'
import PolicySection from './InfoSections/Policy'
import PolicyTitle from '../../components/PolicyTitle'
import styled from 'styled-components'
import VehiclesSection from './InfoSections/Vehicles'

import Input from '../../components/PolicyForm/PolicyFormInput'
import { SmallSave, StyledCancel } from '../../components/Buttons'

import { buttonBaseCss } from '../../components/Buttons'
import { OverlayWrapper, policySectionMenu, Row, Title } from './shared'
import { useNavigate } from 'react-router-dom'
import Endorsements from '../../components/Endorsements'
import Overlay from '../../components/Overlay'
import { APP_ID, SERVER_URL } from '../../index'
import Moralis from "moralis"
import { useMoralisQuery } from "react-moralis";
import { Form } from '../../styles/styles'
import getDNRReason from '../../utils/renewals/getDNRReason'
import SuryaSelect from '../../components/PolicyForm/PolicyFormSelect'
import { useMoralis } from 'react-moralis'
import { writeUsers } from '../../utils/users/getWriteUsers'

const { InputWrapper } = Form

const policy = { name: 'Policy', to: '#policy', component: PolicySection }

const Policy = () => {
    const params = useParams()
    const navigate = useNavigate()
    const { slug } = params

    const [data, setData] = useState(testItem)
    const [loading, setLoading] = useState(true)
    const [_, setLoadingEndorsements] = useState(true)
    const [endorsements, setEndorsements] = useState(undefined)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [section, setSection] = useState(policy)
    const [toggleEndorsements, setToggleEndorsements] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [shortRate, setShortRate] = useState(false)
    const [cancelDate, setCancelDate] = useState('')
    const [rejectedDriverData, setRejectedDriverData] = useState()
    const [cancellationReason, setCancellationReason] = useState('Non Payment of Premium')
    const {authenticate, isAuthenticated, isAuthenticating, hasAuthError, authError, user, logout, account} = useMoralis();

    useEffect(() => {
        console.log(data)
        // const policyUrl = urls.getPolicy(slug)

        // const getPolicy = async () => {
        //     try {
        //         const res = await fetch(policyUrl)
        //         const policyData = await res.json()
        //         setData(policyData)
        //         // also make a deep copy
        //         setLoading(false)
        //     } catch (policyError) {
        //         setError(true)
        //         console.log(policyError)
        //         setLoading(false)
        //     }
        // }

        const getRejectedDrivers = async() => {
            try {
                const appId = APP_ID;
                const serverUrl = SERVER_URL;   

                Moralis.start({ serverUrl, appId });
                const RejectedDrivers = await (Moralis as any).Object.extend("RejectedDrivers");

                const query = new (Moralis as any).Query(RejectedDrivers);
                console.log(slug)
                const data = await query.equalTo("policyNum", slug).first();
                setRejectedDriverData(JSON.parse(data.get("rejectedDrivers")))
                setLoading(false)

            } catch (policyError) {

                setError(true)
                console.log(policyError)
                setLoading(false)

            }
        }
        

        const getPolicy = async() => {
            try {
                const appId = APP_ID;
                const serverUrl = SERVER_URL;   

                Moralis.start({ serverUrl, appId });
                const Policies = await (Moralis as any).Object.extend("Policies");

                const query = new (Moralis as any).Query(Policies);
                console.log(slug)
                const data = await query.equalTo("policyNum", slug).first();
                setData(JSON.parse(data.get("policyJson")))
                setLoading(false)

            } catch (policyError) {

                setError(true)
                console.log(policyError)
                setLoading(false)

            }
        }

        getPolicy()
        getRejectedDrivers()
    }, [slug])


    useEffect(() => {
        // const policyUrl = urls.getEndorsements(slug)

        // const getEndorsements = async () => {
        //     try {
        //         const res = await fetch(policyUrl)
        //         const endorsementsData = await res.json()
        //         setEndorsements(endorsementsData)
        //         console.log(endorsementsData)
        //         setLoadingEndorsements(false)
        //     } catch (endError) {
        //         // this isnt a breaking error but let the console know
        //         setLoadingEndorsements(false)
        //         console.log(endError)
        //     }
        // }


        const getEndorsements = async() => {
            try {
                const appId = APP_ID;
                const serverUrl = SERVER_URL;   

                Moralis.start({ serverUrl, appId });
                const Policies = await (Moralis as any).Object.extend("Policies");

                const query = new (Moralis as any).Query(Policies);
                console.log(slug)
                const endorsementsData = await query.equalTo("policyNum", slug).first();
                setEndorsements(JSON.parse(endorsementsData.get("policyJson")))
                setLoadingEndorsements(false)

            } catch (policyError) {

                console.log(policyError)
                setLoadingEndorsements(false)

            }
        }

        getEndorsements()
    }, [slug])

    const getDifferences = (jsonA, jsonB) => {
  const changes = [];
  const currentDate = new Date();

  const compareObjects = (objA, objB, path = []) => {
    for (const key in objA) {
      if (objA.hasOwnProperty(key)) {
        const valueA = objA[key];
        const valueB = objB[key];

        if (Array.isArray(valueA)) {
          if (key === 'vehicles' || key === 'drivers') {
            const uniqueA = new Set(valueA.map(obj => obj.vin || obj.driverFirstName + obj.driverLastName));
            const uniqueB = new Set(valueB.map(obj => obj.vin || obj.driverFirstName + obj.driverLastName));
            const added = valueB.filter(obj => !uniqueA.has(obj.vin || obj.driverFirstName + obj.driverLastName));
            const removed = valueA.filter(obj => !uniqueB.has(obj.vin || obj.driverFirstName + obj.driverLastName));
            for (const obj of added) {
              changes.push({
                path: [...path, key, obj.vin || obj.driverFirstName + obj.driverLastName],
                value: obj,
                type: 'added',
                time: currentDate
              });
            }
            for (const obj of removed) {
              changes.push({
                path: [...path, key, obj.vin || obj.driverFirstName + obj.driverLastName],
                value: obj,
                type: 'removed',
                time: currentDate
              });
            }
            const intersect = valueA.filter(objA => valueB.some(objB => objB.vin === objA.vin || objB.driverFirstName + objB.driverLastName === objA.driverFirstName + objA.driverLastName));
            for (const objA of intersect) {
              const objB = valueB.find(obj => obj.vin === objA.vin || obj.driverFirstName + obj.driverLastName === objA.driverFirstName + objA.driverLastName);
              compareObjects(objA, objB, [...path, key, objA.vin || objA.driverFirstName + objA.driverLastName]);
            }
          } else {
            changes.push({
              path: [...path, key],
              value: valueB,
              type: 'modified',
              time: currentDate
            });
          }
        } else if (valueA !== valueB) {
          changes.push({
            path: [...path, key],
            value: valueB,
            type: 'modified',
            time: currentDate
          });
        }
      }
    }
  };

  compareObjects(jsonA, jsonB);

  return changes;
};

    const menuOnclick = (val) => {
        console.log(data)
        setSection(val)
    }

    const deletePolicy = async() => {

        const appId = APP_ID;
        const serverUrl = SERVER_URL;   

        Moralis.start({ serverUrl, appId });
        const Policies = await (Moralis as any).Object.extend("Policies");

        const query = new (Moralis as any).Query(Policies);
        
        const policyData = await query.equalTo("policyNum", slug).first();
        console.log(policyData.get("policyJson"), 'ls')
        const policyJSON = JSON.parse(policyData.get("policyJson"))

        if (!policyJSON.cancellation) {
            policyJSON.cancellation = {}
        }

        policyJSON.cancellation.cancellationDate = cancelDate
        policyJSON.cancellation.isCancelled = 'Yes'
        policyJSON.cancellation.cancellationReason = cancellationReason
        policyJSON.cancellation.cancellationRate = shortRate ? "Short Rate" : "Pro Rata"

        const vehicles = policyJSON.vehicles.values;
        const cancellationDate = new Date(cancelDate); // Replace with actual cancellation date
        const effectiveDate = new Date(policyJSON.policy.effectiveDate); // Replace with actual effective date
        
        const daysEffective = Math.ceil((cancellationDate.getTime() - effectiveDate.getTime()) / (1000 * 60 * 60 * 24)); // Round up to account for partial days
        console.log(daysEffective, "sl")
        for (let i = 0; i < vehicles.length; i++) {
            const premiumsToUpdate = ["overallPremium", "personalInjuryProtectionPremium", "pedPipProtectionPremium", "medicalPaymentsPremium", "underinsuredMotoristPremium", "uninsuredMotoristPremium"];
        
            for (let j = 0; j < premiumsToUpdate.length; j++) {
                const premium = policyJSON.vehicles.values[i][premiumsToUpdate[j]];
                let adjustedPremium;
                const expDate = new Date(policyJSON.vehicles.values[i].baseExpDate); // Replace with actual expiration date
      
                if (expDate <= cancellationDate) {
                    // Vehicle has already expired, keep all premium
                    continue;
                }
                
                if (daysEffective <= 90) {
                    // Minimum of 25% of original premium must be earned in first 3 months
                    adjustedPremium = premium * 0.25;
                } else {
                    if (shortRate) {
                        const proRataPrem = premium * (daysEffective) / 365
                        const proRataReturn = premium - proRataPrem
                        const shortRateReturn = proRataReturn * 0.9
                        adjustedPremium = premium - shortRateReturn
                } else {
                    adjustedPremium = premium * (daysEffective) / 365;
                }
            }
            
            // Round to 2 decimal places
            adjustedPremium = Math.round(adjustedPremium * 100) / 100;
            
            // Update premium in JSON object
            policyJSON.vehicles.values[i][premiumsToUpdate[j]] = adjustedPremium;
            policyJSON.vehicles.values[i]['baseExpDate'] = cancelDate
            }
        }
        
        // Update hiredCSLPremium and nonOwnedCSLPremium in coverage object
        const cslPremiumsToUpdate = ["hiredCSLPremium", "nonOwnedCSLPremium"];
        
        for (let i = 0; i < cslPremiumsToUpdate.length; i++) {
            const premium = policyJSON.coverage[cslPremiumsToUpdate[i]];
            let adjustedPremium;
            
            if (daysEffective <= 91) {
                    // Minimum of 25% of original premium must be earned in first 3 months
                    adjustedPremium = premium * 0.25;
                } else {
                    if (shortRate) {
                        const shortRate = 0.10;
                        const proRataPrem = premium * (daysEffective) / 365
                        const proRataReturn = premium - proRataPrem
                        const shortRateReturn = proRataReturn * 0.9
                        adjustedPremium = premium - shortRateReturn
                        
                } else {
                    adjustedPremium = premium * (daysEffective) / 365;
                }
                }
            
            // Round to 2 decimal places
            adjustedPremium = Math.round(adjustedPremium * 100) / 100;
            
            // Update premium in JSON object
            policyJSON.coverage[cslPremiumsToUpdate[i]] = adjustedPremium;
        }

        console.log(JSON.stringify(policyJSON), 'clear')

        policyData.set("policyJson", JSON.stringify(policyJSON))
        policyData.save()





        

        // const policyUrl = urls.getPolicy(slug)
        // const deleteReq = async () => {
        //     try 
        //         setButtonLoading(true)
        //         await fetch(policyUrl, { method: 'DELETE' })
        //         setButtonLoading(false)
        //         navigate('/home')
        //     } catch (deleteError) {
        //         console.log(deleteError)
        //         setButtonLoading(false)
        //     }
        // }
        // deleteReq()




    }


    const endorsementsToggle = () => {
        setShow(false)
        setToggleEndorsements(!toggleEndorsements)
    }

    const menuItems = useMemo(() => {
        return policySectionMenu?.map((item, i) => (
            <MenuItem
                active={section}
                item={item}
                key={i}
                onClick={menuOnclick}
            />
        ))
    }, [section])

    const renderInfo = useMemo(() => {
        if (loading) {
            return <Title>Loading</Title>
        }

        if (error && !data) {
            return <Title>Sorry there was an error: {error}</Title>
        }

        const {
            policy: currentPolicy,
            coverage,
            insured,
            vehicles,
            loss_history,
            drivers,
            payments,
            documents

        } = data
        

        

        const PolicyRender = (
            <PolicySection
                endorsements={endorsements}
                endorsementsOnclick={endorsementsToggle}
                policyFull={currentPolicy}
                policy={data}
            />
        )
        const CoverageRender = <CoverageSection coverage={coverage} />
        const InsuredRender = <InsuredSection insured={insured} />
        const VehiclesRender = (
            <VehiclesSection vehiclesList={vehicles?.values ?? []} policy={data}/>
        )
        const LossHistoryRender = (
            <LossHistorySection lossHistoryList={loss_history?.values ?? []} />
        )
        const NotesRender = (
            <NotesSection notesList={documents} policyNum={currentPolicy.policyNum} />
        )
        const PaymentsRender = (
            <PaymentsSection payments={payments} policy={data} />
        )

        const ReinsuranceRender = (
            <ReinsuranceSection policy={data} />
        )

        const UnderwritingRender = (
            <UnderwritingSection policy={data} />
        )

        const DriversRender = (
            <DriversSection driversList={drivers?.values ?? []} 
            // effectiveDate={currentPolicy.effectiveDate}
            // expirationDate={currentPolicy.expirationDate}
            policy={currentPolicy}
            />
        )
        const RejectedDriversRender = (
            <RejectedDriversSection driversList={rejectedDriverData ?? []} 
            // effectiveDate={currentPolicy.effectiveDate}
            // expirationDate={currentPolicy.expirationDate}
            policy={currentPolicy}
            />
        )
        const DocumentsRender = <DocumentsSection policy={data}/>

        if (isAuthenticated && writeUsers.includes(user.get('username'))) {
            return (
                <div className={section.name}>
                    {section.name === 'Policy'
                        ? PolicyRender
                        : section.name === 'Coverage'
                        ? CoverageRender
                        : section.name === 'Insured'
                        ? InsuredRender
                        : section.name === 'Vehicles'
                        ? VehiclesRender
                        : section.name === 'Loss History'
                        ? LossHistoryRender
                        : section.name === 'Notes'
                        ? NotesRender
                        : section.name === 'Underwriting'
                        ? UnderwritingRender
                        : section.name === 'Drivers'
                        ? DriversRender
                        : section.name === 'Rejected Drivers'
                        ? RejectedDriversRender
                        : section.name === 'Documents'
                        ? DocumentsRender 
                        : section.name === 'Reinsurance'
                        ? ReinsuranceRender 
                        : section.name === 'Payments'
                        ? PaymentsRender
                        : ''}
                </div>
            )
        } else {
            return (
                <div className={section.name}>
                    {section.name === 'Policy'
                        ? PolicyRender
                        : section.name === 'Coverage'
                        ? CoverageRender
                        : section.name === 'Insured'
                        ? InsuredRender
                        : section.name === 'Vehicles'
                        ? VehiclesRender
                        : section.name === 'Loss History'
                        ? LossHistoryRender
                        : section.name === 'Notes'
                        ? PolicyRender
                        : section.name === 'Drivers'
                        ? DriversRender
                        : section.name === 'Rejected Drivers'
                        ? RejectedDriversRender
                        : section.name === 'Documents'
                        ? DocumentsRender 
                        : section.name === 'Reinsurance'
                        ? ReinsuranceRender 
                        : section.name === 'Payments'
                        ? PolicyRender
                        : ''}
                </div>
            )
        }

        
    }, [loading, data, error, section])

    return (
        <Layout
            policyMenu={
                <>
                    <Link to="/home">
                        <Back src={backArrow} />
                    </Link>
                    <PolicySubMenuWrapper>{menuItems}</PolicySubMenuWrapper>
                </>
            }
        >
            <Wrapper>
                <Header>
                    <Row>
                        <PolicyTitle id={slug} />
                        {(isAuthenticated && writeUsers.includes(user.get('username'))) ? (
                            <Delete onClick={() => setShow(!show)}>...</Delete>
                        ) : (<></>)
                        }
                    </Row>
                    {(data?.cancellation?.isCancelled === 'Yes') ? (
                    <Row style={{color: "red"}}>
                        Cancelled {data?.cancellation?.cancellationDate}
                    </Row>) : (<></>)
                    }
                </Header>
            </Wrapper>
            <Div>
                <Col>{renderInfo}</Col>
                <Overlay show={show}>
                    <OverlayWrapper
                        onClick={(e) => {
                            if (e.currentTarget !== e.target) return
                            setShow(false)
                        }}
                    >
                        <Modal>
                            <ModalHead>
                                <Exit onClick={() => setShow(false)}>X</Exit>
                            </ModalHead>
                            <Padding>
                                {(isAuthenticated && writeUsers.includes(user.get('username'))) ? (
                                    <EndorsementsButton 
                                    onClick={() => { 
                                            endorsementsToggle()
                                    }}
                                >
                                    Edit Endorsements
                                </EndorsementsButton>
                                ) : (
                                    <>
                                    </>
                                )}
                                
                                <Button
                                    disabled={buttonLoading}
                                    onClick={() => setShowDelete(true)}
                                >
                                    Cancel Policy
                                </Button>
                                
                                <Cancel
                                    disabled={buttonLoading}
                                    onClick={() => setShow(false)}
                                >
                                    Cancel
                                </Cancel>
                            </Padding>
                        </Modal>
                    </OverlayWrapper>
                </Overlay>
                <Overlay show={showDelete}>
                    <OverlayWrapper
                        onClick={(e) => {
                            if (e.currentTarget !== e.target) return
                            setShowDelete(false)
                        }}
                    >
                    <Modal>
                        <ModalHead>
                            <Exit onClick={() => setShowDelete(false)}>X</Exit>
                        </ModalHead>
                        
                        <PaddingLarge>
                        <Col>
                            <Toggle>
                                <ToggleButton style={{backgroundColor: shortRate ? 'black' : 'white', color: shortRate ? 'white': 'black'}} onClick={() => setShortRate(true)}>Short Rate</ToggleButton>
                                <ToggleButton style={{backgroundColor: shortRate ? 'white' : 'black', color: shortRate ? 'black': 'white'}} onClick={() => setShortRate(false)}>Pro Rata</ToggleButton>
                            </Toggle>
                            
                            <InputWrapper>
                                <Input
                                    label="Date"
                                    name="date"
                                    onChange={(e) => setCancelDate(e.target.value)}
                                    placeholder="mm/dd/yyyy"
                                    value={cancelDate}
                                />
                                
                            </InputWrapper>
                            <InputWrapper>
                                    <SuryaSelect
                                        label="Cancellation Reason"
                                        onChange={(e) => {
                                            setCancellationReason(
                                                e.target.value
                                            );
                                            console.log(e.target.value)
                                        }}
                                        options={getDNRReason}
                                        placeholder="Choose Cancellation Reason"
                                        value={cancellationReason}
                                    />
                            </InputWrapper>
                            
                            <SmallSave onClick={()=>deletePolicy()}>Submit</SmallSave>
                           </Col>
                        </PaddingLarge>
                    </Modal>
                    </OverlayWrapper>
                </Overlay>
                <Endorsements
                    endorsementsToggle={endorsementsToggle}
                    policyMain={data}
                    policyId={slug}
                    toggleEndorsements={toggleEndorsements}
                />
            </Div>
        </Layout>
    )
}

const Wrapper = styled.div`
    padding: 24px;
    padding-bottom: 0;
`


const Toggle = styled.div`
    display: inline-block;
  justify-content: center;
  border: 1px solid black;
  border-radius: 1rem;


`

const Delete = styled(Row)`
    margin-left: 24px;
    cursor: pointer;
    padding: 8px;
    font-size: 20px;
`

const Modal = styled(Row)`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    z-index: 6;
    width: 80%;
    min-height: 220px;
    max-width: 600px;
    border-radius: 8px;
`

const ModalHead = styled.div`
    width: 100%;
    padding: 4px 12px;
    display: flex;
    align-items: center;
    border-bottom: solid 1px #00000005;
    background: ${Colors.blueGrey};
`

const Padding = styled.div`
    padding: 24px;
`

const PaddingLarge = styled.div`
    padding: 12px;
`

const Button = styled.button`
    width: 100%;
    font-size: ${fonts.size.default};
    font-weight: ${fonts.weights.medium};
    color: ${Colors.red};
    background: ${Colors.lightRed};
    ${buttonBaseCss}
    flex: unset;
    margin: 8px 0;
`

const ToggleButton = styled.button`
    width: 50%;
    height: 40px;
    white-space: nowrap;
    font-size: ${fonts.size.default};
    font-weight: ${fonts.weights.medium};
    flex: unset;
    padding: 10px;
    border: 1px solid black;
    border-radius: 0;
    &:first-child {
        border-radius: 1rem 0 0 1rem;
    }
    &:last-child {
        border-radius: 0 1rem 1rem 0;
    }
    &:hover {
        cursor: pointer;
    }
`

const Cancel = styled(Button)`
    color: white;
    background: black;
`

const EndorsementsButton = styled(Button)`
    color: ${Colors.electricBlue};
    background: ${Colors.lightBlue};
`

const Exit = styled(Button)`
    background: transparent;
    height: 20px;
    width: 20px;
    margin-bottom: auto;
    font-size: 16px;
    opacity: 0.4;
    font-weight: ${fonts.weights.regular};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    color: ${Colors.black};
    ${transitionCss}

    :hover {
        opacity: 1;
    }
`

const Div = styled.div`
    width: 100%;
    margin-top: 12px;
`

const Col = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    justify-content: center;
`

const Back = styled.img`
    width: 26px;
    height: 26px;
    object-fit: contain;
`

const PolicySubMenuWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    flex: 1 1 auto;
`

const testItem = {
    id: 'test',
    name: 'test',
    policy: {
        name: 'JOSE GUTIERREZ-MANRIQUEZ',
        policyNum: '19AZT00002',
        states: 'Arizona',
        lineOfBusiness: 'Commercial',
        policyLineItem: 'Owner Operator',
        coverageTerm: 'Annual',
        policyCategory: 'Taxicabs and Limousines',
        underwritingCode: 'New Business',
        agent: 'ABIBRK',
        effectiveDate: '03/15/19',
        expirationDate: '03/15/20',
        radius: 'Local',
        classCode: 'Non-fleet',
        businessUseClass: 'Service',
        secondaryCategory: 'Taxi',
    },
    insured: {
        agent: 'ABIBRK',
        entity: 'Individual',
        firstName: 'JOSE',
        lastName: 'GUTIERREZ-MANRIQUEZ',
        middleName: '',
        dob: '12/26/73',
        suffix: 'null',
        gender: 'Male',
        ssn: 'null',
        address1: '19401 N 7TH ST',
        address2: 'LOT 229',
        city: 'PHOENIX',
        state: 'Arizona',
        zipCode: '85024',
        email: '',
        phoneNumber: '',
        licenseState: 'Oregon',
        licenseNumber: 'null',
        licenseEff: 'null',
        licenseExp: 'null',
        contactName: 'null',
        contactNumber: 'null',
        contactEmail: 'null',
        corporationName: 'null',
        taxIdNumber: '',
        additionalInsured: {
            values: [
                {
                insName: "None",
                address: "null",
                city: "null",
                zipCode: "null",
                state: "TX",
                isWaiver: false,
                isAddPremium: false
                },
            ],
        },
    },
        renewal : {
            renewalDecision : "undecided",
            nonRenewalReason : "undecided",
            dateOfDecision : "null"
        },

        underwriting: {
            creditsDebits: "",
            remarks: "",
            isCamera: false
        },
        cancellation: {
            cancellationReason: "null",
            isCancelled: "No",
            cancellationDate: "",
            cancellationRate: ''
        },
    drivers: {
        values: [
            {
                driverFirstName: 'ERNESTO',
                driverMiddleName: "",
                driverLastName: "LOPEZ",
                states: 'AZ',
                licenseNumber: 'D08560671',
                licenseEffDate: '03/15/19',
                licenseExpDate: '03/15/20',
                driverEffDate: '05/03/19',
                driverExpDate: '08/16/19',
            },
            {
                driverFirstName: 'VICTOR',
                driverMiddleName: "",
                driverLastName: "SANCHEZFLORES",
                states: 'AZ',
                licenseNumber: 'D07806915',
                licenseEffDate: '03/15/19',
                licenseExpDate: '03/15/20',
                driverEffDate: '05/30/19',
                driverExpDate: '08/28/19',
            },
        ],
    },
    loss_history: {
        values: [
            {
                accidentDate: 'null',
                reportedDate: 'null',
                claimNumber: 'null',
                claimType: 'Body Injury',
                subClaimNumber: 'null',
                totalIncurred: 'null',
                liabilityPaid: 'null',
                openReserve: 'null',
                status: 'Yes',
                previousPolicyNumber: 'null',
                priorCarrierName: 'null',
                originalInceptionDate: 'null',
                expirationDate: 'null',
                isExperienceMode: 'Yes',
                isPolicyTransferred: 'Yes',
            },
        ],
    },
    documents: {},
    vehicles: {
        values: [
            {
                yesNo: 'No',
                category: 'Taxicabs and Limousines',
                classification: 'null',
                vehicleCategory: 'Taxicab - Owner-Driver',
                vehicleType: 'Car Service',
                state: 'Arizona',
                vehicleState: 'Arizona',
                vehicleWeight: '0 - 10,000',
                fuelType: 'Gas',
                fleet: 'Yes',
                vin: 'JTDKN3DU0A1010158',
                make: 'TOYOTA',
                model: 'PRIUS',
                modelYear: '2010',
                seating: '5',
                wheelChair: 'Yes',
                plateNumber: 'null',
                garageZipCode: 'null',
                zoneCode: 'null',
                rateClassCode: 'null',
                baseName: 'null',
                baseType: 'Black Car',
                baseNumber: 'null',
                baseEffDate: '03/15/19',
                baseExpDate: '09/25/19',
                shl: 'null',
                garageAddress1: 'null',
                garageAddress2: 'null',
                garageZipCode2: 'null',
                garageCity: 'null',
                garageCounty: 'null',
                garageState: 'Oregon',
                garageCountry: 'null',
                overallPremium: 2554.42,
                personalInjuryProtectionPremium: 0,
                medicalPaymentsPremium: 0,
                underinsuredMotoristPremium: 32.95,
                uninsuredMotoristPremium: 14.35,
                hiredCSLPremium: '',
                nonOwnedCSLPremium: '',
            },
            {
                yesNo: 'No',
                category: 'Taxicabs and Limousines',
                classification: 'null',
                vehicleCategory: 'Taxicab - Owner-Driver',
                vehicleType: 'Car Service',
                state: 'Arizona',
                vehicleState: 'Arizona',
                vehicleWeight: '0 - 10,000',
                fuelType: 'Gas',
                fleet: 'Yes',
                vin: 'JTDKB20U987728520',
                make: 'TOYOTA',
                model: 'PRIUS',
                modelYear: '2018',
                seating: '7',
                wheelChair: 'Yes',
                plateNumber: 'null',
                garageZipCode: 'null',
                zoneCode: 'null',
                rateClassCode: 'null',
                baseName: 'null',
                baseType: 'Black Car',
                baseNumber: 'null',
                baseEffDate: '09/25/19',
                baseExpDate: '03/15/20',
                shl: 'null',
                garageAddress1: 'null',
                garageAddress2: 'null',
                garageZipCode2: 'null',
                garageCity: 'null',
                garageCounty: 'null',
                garageState: 'Oregon',
                garageCountry: 'null',
                overallPremium: 2264.74,
                personalInjuryProtectionPremium: 0,
                medicalPaymentsPremium: 0,
                underinsuredMotoristPremium: 12.72,
                uninsuredMotoristPremium: 29.22,
                hiredCSLPremium: '',
                nonOwnedCSLPremium: '',
            },
        ],
    },
    payments: { paymentType: '100% DEPOSIT' },
    reinsurance: { reinsuranceType: 'Price Forbes', resInsAmmout: '' },
    coverage: {
        overall: 'Combined Single Limit',
        deductable: 'null',
        deductableAmount: 'null',
        deductableAutoEntry: 'null',
        combinedSectionLimit: 250000.0,
        combinedSectionEntry: 'Excluded',
        splitSectionBodyPerPerson: 0,
        splitSectionBodyPerAccidentOptions: 0,
        splitSectionPropertyDamageOptions: 0,
        splitSectionAutoEntryOptions: 'Excluded',
        pIProtectionSingleLimit: 0,
        pIProtectionSingleEntry: 'Excluded',
        pIProtectionSplitBodyPerPerson: 0,
        pIProtectionSplitBodyPerAccident: 0,
        pIProtectionSplitPropertyDamage: 0,
        pIProtectionSplitAutoEntry: 'Excluded',
        pedPipSingleLimit: 'Yes',
        medicalSingleLimit: 0,
        medicalSingleEntry: 'Excluded',
        medicalSplitBodyPerPerson: 0,
        medicalSplitBodyPerAccident: 0,
        medicalSplitPropertyDamage: '10,000',
        medicalSplitAutoEntry: 'Excluded',
        underinsuredMotoristSingleLimit: 250000.0,
        underinsuredMotoristSingleAutoEntry: 'Excluded',
        underMotoristBodyPerPerson: 0,
        underMotoristBodyPerAccident: 0,
        underMotoristProperty: 0,
        underMotoristAuto: 'Excluded',
        cslSingleLimit: '35,000',
        cslBodyPerAccident: '25,000',
        cslBodyPerPerson: '25,000',
        cslSingleAuto: 'Excluded',
        cslProperty: '10,000',
        cslSplitAuto: 'Excluded',
        nonCslBodyPerAccident: '25,000',
        nonCslBodyPerPerson: '25,000',
        nonCslProperty: '10,000',
        nonCslSingleAuto: 'Excluded',
        nonCslSingleLimit: '35,000',
        nonCslSplitAuto: 'Excluded',
        unMotoristAuto: 'Excluded',
        unMotoristBodyPerAccident: 0,
        unMotoristBodyPerPerson: 0,
        unMotoristProperty: 0,
        uninsuredMotoristSingleAutoEntry: 'Excluded',
        uninsuredMotoristSingleLimit: 250000.0,
        personalInjury: 'Combined Single Limit',
        medicalPayments: 'Combined Single Limit',
        underinsuredMotorist: 'Combined Single Limit',
        uninsuredMotorist: 'Combined Single Limit',
        csl: 'Yes',
        nonOwnedCSL: 'Yes',
        overallPremium: '',
        personalInjuryProtectionPremium: '',
        pedPipProtectionPremium: '',
        medicalPaymentsPremium: '',
        underinsuredMotoristPremium: '',
        uninsuredMotoristPremium: '',
        hiredCSLPremium: '',
        nonOwnedCSLPremium: '',
        "medicalSplitPropertyDamage'": 0,
    },
}

export default Policy
