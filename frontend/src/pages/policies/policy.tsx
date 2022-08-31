import { Colors, fonts, Header, transitionCss } from '../../styles/styles'
import { Link, useParams } from 'react-router-dom'
import { urls } from '../../shared'
import { useEffect, useMemo, useState } from 'react'
import backArrow from '../../images/back-arrow.png'
import CoverageSection from './InfoSections/Coverage'
import DocumentsSection from '../../components/RenderDocuments/RenderDocuments'
import DriversSection from './InfoSections/Drivers'
import InsuredSection from './InfoSections/Insured'
import Layout from '../../utils/withLayout'
import LossHistorySection from './InfoSections/LossHistory'
import MenuItem from './MenuItem'
import PolicySection from './InfoSections/Policy'
import PolicyTitle from '../../components/PolicyTitle'
import styled from 'styled-components'
import VehiclesSection from './InfoSections/Vehicles'

import { buttonBaseCss } from '../../components/Buttons'
import { OverlayWrapper, policySectionMenu, Row, Title } from './shared'
import { useNavigate } from 'react-router-dom'
import Endorsements from '../../components/Endorsements'
import Overlay from '../../components/Overlay'

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

    useEffect(() => {
        const policyUrl = urls.getPolicy(slug)

        const getPolicy = async () => {
            try {
                const res = await fetch(policyUrl)
                const policyData = await res.json()
                setData(policyData)
                // also make a deep copy
                setLoading(false)
            } catch (policyError) {
                setError(true)
                console.log(policyError)
                setLoading(false)
            }
        }
        getPolicy()
    }, [slug])

    useEffect(() => {
        const policyUrl = urls.getEndorsements(slug)

        const getEndorsements = async () => {
            try {
                const res = await fetch(policyUrl)
                const endorsementsData = await res.json()
                setEndorsements(endorsementsData)
                console.log(endorsementsData)
                setLoadingEndorsements(false)
            } catch (endError) {
                // this isnt a breaking error but let the console know
                setLoadingEndorsements(false)
                console.log(endError)
            }
        }
        getEndorsements()
    }, [slug])

    const menuOnclick = (val) => {
        setSection(val)
    }

    const deletePolicy = () => {
        const policyUrl = urls.getPolicy(slug)
        const deleteReq = async () => {
            try {
                setButtonLoading(true)
                await fetch(policyUrl, { method: 'DELETE' })
                setButtonLoading(false)
                navigate('/home')
            } catch (deleteError) {
                console.log(deleteError)
                setButtonLoading(false)
            }
        }
        deleteReq()
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
        } = data

        const PolicyRender = (
            <PolicySection
                endorsements={endorsements}
                endorsementsOnclick={endorsementsToggle}
                policy={currentPolicy}
            />
        )
        const CoverageRender = <CoverageSection coverage={coverage} />
        const InsuredRender = <InsuredSection insured={insured} />
        const VehiclesRender = (
            <VehiclesSection vehiclesList={vehicles?.values ?? []} />
        )
        const LossHistoryRender = (
            <LossHistorySection lossHistoryList={loss_history?.values ?? []} />
        )
        const DriversRender = (
            <DriversSection driversList={drivers?.values ?? []} />
        )
        const DocumentsRender = <DocumentsSection policy={data} />

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
                    : section.name === 'Drivers'
                    ? DriversRender
                    : section.name === 'Documents'
                    ? DocumentsRender
                    : ''}
            </div>
        )
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
                        <Delete onClick={() => setShow(!show)}>...</Delete>
                    </Row>
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
                                <EndorsementsButton
                                    onClick={() => endorsementsToggle()}
                                >
                                    Edit Endorsements
                                </EndorsementsButton>
                                <Button
                                    disabled={buttonLoading}
                                    onClick={() => deletePolicy()}
                                >
                                    Delete Policy
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
                <Endorsements
                    endorsementsToggle={endorsementsToggle}
                    policy={data}
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
        sizeClass: 'Light Trucks ',
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
    },
    drivers: {
        values: [
            {
                driverName: 'ERNESTO LOPEZ',
                states: 'AZ',
                licenseNumber: 'D08560671',
                licenseEffDate: '03/15/19',
                licenseExpDate: '03/15/20',
                driverEffDate: '05/03/19',
                driverExpDate: '08/16/19',
            },
            {
                driverName: 'VICTOR SANCHEZFLORES',
                states: 'AZ',
                licenseNumber: 'D07806915',
                licenseEffDate: '03/15/19',
                licenseExpDate: '03/15/20',
                driverEffDate: '05/30/19',
                driverExpDate: '08/28/19',
            },
            {
                driverName: 'FRANCISCO PANIAGUAVALENCIA',
                states: 'AZ',
                licenseNumber: 'D02282926',
                licenseEffDate: '01/01/19',
                licenseExpDate: '01/01/20',
                driverEffDate: '08/28/19',
                driverExpDate: '09/04/19',
            },
            {
                driverName: 'OSWALDO ZEVADACARDENAS',
                states: 'AZ',
                licenseNumber: 'D10301616',
                licenseEffDate: '01/01/19',
                licenseExpDate: '01/01/20',
                driverEffDate: '09/04/19',
                driverExpDate: '09/23/19',
            },
            {
                driverName: 'JOSE GUTIERREZ-MANRIQUEZ',
                states: 'AZ',
                licenseNumber: 'D03223848',
                licenseEffDate: '01/01/19',
                licenseExpDate: '01/01/20',
                driverEffDate: '03/15/19',
                driverExpDate: '03/15/20',
            },
            {
                driverName: 'ROBERTOJESUS RODRIGUEZMONTES',
                states: 'AZ',
                licenseNumber: 'D08823326',
                licenseEffDate: '01/01/19',
                licenseExpDate: '01/01/20',
                driverEffDate: '09/23/19',
                driverExpDate: '03/15/20',
            },
            {
                driverName: 'ERNESTO RODRIGUEZLOPEZ',
                states: 'AZ',
                licenseNumber: 'D08560671',
                licenseEffDate: '03/15/19',
                licenseExpDate: '03/15/20',
                driverEffDate: '05/03/19',
                driverExpDate: '08/16/19',
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
    payments: { payment: '100% DEPOSIT' },
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
        medicalPaymentsPremium: '',
        underinsuredMotoristPremium: '',
        uninsuredMotoristPremium: '',
        hiredCSLPremium: '',
        nonOwnedCSLPremium: '',
        "medicalSplitPropertyDamage'": 0,
    },
}

export default Policy
