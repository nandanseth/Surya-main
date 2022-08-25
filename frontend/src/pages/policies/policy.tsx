import { Colors, fonts, Header } from '../../styles/styles'
import { Link, useParams } from 'react-router-dom'
import { urls } from '../../shared'
import { useEffect, useState } from 'react'
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
import { Nav, NavItem, SubSection, Title } from './shared'
import { useHistory } from 'react-router-dom'
import Overlay from '../../components/Overlay'

const policy = { name: 'Policy', to: '#policy', component: PolicySection }
const policySectionMenu = [
    // home,
    { name: 'Policy', to: '#policy', component: PolicySection },
    { name: 'Coverage', to: '#coverage', component: CoverageSection },
    { name: 'Insured', to: '#insured', component: InsuredSection },
    { name: 'Vehicles', to: '#vehicles', component: VehiclesSection },
    { name: 'Loss History', to: '#losshistory', component: LossHistorySection },
    { name: 'Drivers', to: '#drivers', component: DriversSection },
    { name: 'Documents', to: '#documents', component: DocumentsSection },
]

const Policy = () => {
    const params = useParams()
    const history = useHistory()

    const [data, setData] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [_, setLoadingEndorsements] = useState(true)
    const [endorsements, setEndorsements] = useState(undefined)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [error, setError] = useState(false)
    const { slug } = params

    const [show, setShow] = useState(false)
    const [section, setSection] = useState(policy)

    const menuOnclick = (val) => {
        setSection(val)
    }

    useEffect(() => {
        const policyUrl = urls.getPolicy(slug)

        const getPolicy = async () => {
            try {
                const res = await fetch(policyUrl)
                const data = await res.json()
                setData(data)
                setLoading(false)
            } catch (error) {
                setError(true)
                console.log(error)
                setLoading(false)
                alert(error)
            }
        }
        getPolicy()
    }, [])

    useEffect(() => {
        const policyUrl = urls.getEndorsments(slug)

        const getEndorsements = async () => {
            try {
                const res = await fetch(policyUrl)
                const data = await res.json()
                setEndorsements(data)
                console.log(data)
                setLoadingEndorsements(false)
            } catch (error) {
                // this isnt a breaking error but let the console know
                setLoadingEndorsements(false)
                console.log(error)
            }
        }
        getEndorsements()
    }, [])

    const deletePolicy = () => {
        const policyUrl = urls.getPolicy(slug)
        const deleteReq = async () => {
            try {
                setButtonLoading(true)
                await fetch(policyUrl, { method: 'DELETE' })
                setButtonLoading(false)
                history.push('/home')
            } catch (error) {
                console.log(error)
                setButtonLoading(false)
                alert(error)
            }
        }
        deleteReq()
    }

    const policyMenu = (
        <>
            <Link to="/home">
                <a>
                    <Back src={backArrow} />
                </a>
            </Link>
            <PolicySubMenuWrapper>
                {policySectionMenu?.map((item, i) => (
                    <MenuItem
                        active={section}
                        item={item}
                        key={i}
                        onClick={menuOnclick}
                    />
                ))}
            </PolicySubMenuWrapper>
        </>
    )

    const renderInfo = () => {
        if (loading) {
            return <Title>Loading</Title>
        }

        if (error && !data) {
            return <Title>Sorry there was an error: {error}</Title>
        }

        const { policy, coverage, insured, vehicles, loss_history, drivers } =
            data

        const PolicyRender = (
            <PolicySection endorsements={endorsements} policy={policy} />
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
    }

    return (
        <Layout policyMenu={policyMenu}>
            <Wrapper>
                <Header>
                    <Row>
                        <PolicyTitle id={slug} />
                        <Delete onClick={() => setShow(!show)}>...</Delete>
                    </Row>
                </Header>
            </Wrapper>
            <Div>
                <Col>{renderInfo()}</Col>
                <Overlay show={show}>
                    <OverlayWrapper
                        onClick={(e) => {
                            if (e.currentTarget != e.target) return
                            setShow(false)
                        }}
                    >
                        <Modal>
                            <Button
                                disabled={buttonLoading}
                                onClick={() => deletePolicy()}
                            >
                                {' '}
                                Delete Policy
                            </Button>
                            <Cancel
                                disabled={buttonLoading}
                                onClick={() => setShow(false)}
                            >
                                Cancel
                            </Cancel>
                        </Modal>
                    </OverlayWrapper>
                </Overlay>
            </Div>
        </Layout>
    )
}

const Wrapper = styled.div`
    padding: 24px;
    padding-bottom: 0;
`

const Row = styled.div`
    display: flex;
    align-items: center;
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
    padding: 24px;
    background: white;
    z-index: 6;
    width: 80%;
    height: 220px;
    max-width: 600px;
    border-radius: 8px;
`

const OverlayWrapper = styled(Row)`
    width: 100%;
    height: 100vh;
    padding: 24px;
    background: #0000003d;
    justify-content: center;
`

const Button = styled.button`
    width: 100%;
    font-size: ${fonts.size.default};
    font-weight: ${fonts.weights.medium};
    color: ${Colors.red};
    background: ${Colors.lightRed};
    ${buttonBaseCss}
    flex: unset;
    margin-bottom: 12px;
`

const Cancel = styled(Button)`
    color: ${Colors.black};
    background: ${Colors.lightBlack};
`

const Exit = styled(Button)`
    background: transparent;
    border-radius: 20px;
    height: 20px;
    width: 20px;
    margin-bottom: auto;
    margin-left: auto;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    color: ${Colors.black};
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
    documents: {},
    policy: {
        expirationDate: null,
        coverageTerm: 'Annual',
        radius: 'Local',
        sizeClass: 'Light Trucks ',
        effectiveDate: null,
        lineOfBusiness: 'Commercial',
        agent: 'Quantum Risk Solutions (QRSBRK)',
        underwritingCode: 'New Business',
        states: 'Oregon',
        classification: null,
        policyLineItem: 'Owner Operator',
        businessUseClass: 'Service',
        policyCategory: 'Taxicabs and Limousines',
        classCode: 'Non-fleet',
    },
    created_at: 1651859369.697056,
    coverage: {
        overall: 'Combined Single Limit',
        nonCslSingleAuto: 'Excluded',
        nonCslSingleLimit: '35,000',
        splitSectionAutoEntryOptions: 'Excluded',
        deductableAutoEntry: null,
        medicalSingleEntry: 'Excluded',
        unMotoristProperty: '10,000',
        cslProperty: '10,000',
        nonCslSplitAuto: 'Excluded',
        medicalSingleLimit: '35,000',
        medicalPayments: 'Combined Single Limit',
        medicalSplitBodyPerAccident: '25,000',
        errors: null,
        personalInjury: 'Combined Single Limit',
        pIProtectionSplitPropertyDamage: '10,000',
        nonCslBodyPerAccident: '25,000',
        cslBodyPerPerson: '25,000',
        uninsuredMotoristSingleAutoEntry: 'Excluded',
        underMotoristBodyPerPerson: '25,000',
        unMotoristAuto: 'Excluded',
        uninsuredMotorist: 'Combined Single Limit',
        csl: 'Yes',
        underinsuredMotorist: 'Combined Single Limit',
        cslBodyPerAccident: '25,000',
        nonCslBodyPerPerson: '25,000',
        splitSectionBodyPerPerson: '25,000',
        pIProtectionSplitBodyPerPerson: '25,000',
        uninsuredMotoristSingleLimit: '35,000',
        nonCslProperty: '10,000',
        splitSectionPropertyDamageOptions: '10,000',
        underMotoristProperty: '10,000',
        nonOwnedCSL: 'Yes',
        splitSectionBodyPerAccidentOptions: '25,000',
        deductable: null,
        pIProtectionSingleEntry: 'Excluded',
        pIProtectionSingleLimit: '35,000',
        underinsuredMotoristSingleAutoEntry: 'Excluded',
        pIProtectionSplitAutoEntry: 'Excluded',
        pIProtectionSplitBodyPerAccident: '25,000',
        medicalSplitBodyPerPerson: '25,000',
        combinedSectionLimit: '35,000',
        medicalSplitAutoEntry: 'Excluded',
        underMotoristBodyPerAccident: '25,000',
        unMotoristBodyPerPerson: '25,000',
        unMotoristBodyPerAccident: '25,000',
        cslSingleAuto: 'Excluded',
        medicalSplitPropertyDamage: '10,000',
        underinsuredMotoristSingleLimit: '35,000',
        underMotoristAuto: 'Excluded',
        cslSingleLimit: '35,000',
        cslSplitAuto: 'Excluded',
        deductableAmount: null,
        combinedSectionEntry: 'Excluded',
    },
    insured: {
        licenseState: 'Oregon',
        gender: 'Male',
        contactName: null,
        lastName: null,
        isAddActive: null,
        suffix: null,
        email: null,
        middleName: null,
        address1: null,
        contactNumber: null,
        address2: null,
        corporationName: null,
        licenseNumber: null,
        ssn: null,
        firstName: null,
        entity: 'Individual',
        dob: null,
        state: 'Oregon',
        zipCode: null,
        licenseExp: null,
        city: null,
        taxIdNumber: null,
        contactEmail: null,
        agent: 'Quantum Risk Solutions (QRSBRK)',
        phoneNumber: null,
        licenseEff: null,
    },
    vehicles: {
        values: [
            {
                garageAddress2: null,
                seating: null,
                wheelChair: 'Yes',
                garageCountry: null,
                baseType: 'Black Car',
                garageCounty: null,
                rateClassCode: null,
                vin: null,
                zoneCode: null,
                garageState: 'Oregon',
                vehicleWeight: '0 - 10,000',
                state: 'Oregon',
                shl: null,
                vehicleType: 'Car Service',
                category: 'Taxicabs and Limousines',
                fuelType: 'Gas',
                classification: null,
                plateNumber: null,
                make: null,
                baseName: null,
                modelYear: null,
                garageCity: null,
                yesNo: 'No',
                model: null,
                baseNumber: null,
                baseExpDate: null,
                garageZipCode2: null,
                vehicleState: null,
                vehicleCategory: 'Taxicab - Owner-Driver',
                garageZipCode: null,
                garageAddress1: null,
            },
        ],
    },
    loss_history: null,
    drivers: {
        values: [
            {
                states: 'Oregon',
                licenseNumber: null,
                licenseExpDate: null,
                driverName: null,
                licenseEffDate: null,
            },
        ],
        defaults: null,
    },
    id: '17264e26-fa53-48da-a450-c477cb456687',
}

export default Policy
