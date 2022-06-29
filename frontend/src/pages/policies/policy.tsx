import { GenericSearch } from '../../components/Search'
import { Header } from '../../styles/styles'
import { Link, useParams } from 'react-router-dom'
import backArrow from '../../images/back-arrow.png'
import Layout from '../../utils/withLayout'
import MenuItem from './MenuItem'
import PolicyTitle from '../../components/PolicyTitle'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SubHeader from '../../components/PolicyHomeSubHeader'
// import VehicleOverlay from '../../components/VehicleOverlay'
// import VehiclesTable, { makeSampleInfo } from '../../components/VehiclesTable'
import { urls } from '../../shared'
import PolicySection from './InfoSections/Policy'
import CoverageSection from './InfoSections/Coverage'
import InsuredSection from './InfoSections/Insured'
import VehiclesSection from './InfoSections/Vehicles'
import LossHistorySection from './InfoSections/LossHistory'
import DriversSection from './InfoSections/Drivers'

import { Title } from './shared'
import Drivers from './InfoSections/Drivers'

//const home = { name: 'Home', to: '#home', component: Home }
// const policySectionMenu = [
//     home,
//     { name: 'Info', to: '#info', component: Info },
//     { name: 'Documents', to: '#documents', component: Documents },
//     { name: 'Ratings', to: '#ratings', component: Ratings },
//     { name: 'Endorsements', to: '#endorsements', component: Endorsments },
// ]

const Policy = () => {
    const params = useParams()
    const [data, setData] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const { slug } = params

    const [show, setShow] = useState(false)
    // const [section, setSection] = useState(home)

    // const menuOnclick = (val) => {
    //     setSection(val)
    // }

    // const close = () => {
    //     setShow(false)
    // }

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

    const policyMenu = (
        <>
            <Link to="/home">
                <a>
                    <Back src={backArrow} />
                </a>
            </Link>
            {/* <PolicySubMenuWrapper>
                {policySectionMenu?.map((item, i) => (
                    <MenuItem
                        active={section}
                        item={item}
                        key={i}
                        onClick={menuOnclick}
                    />
                ))}
            </PolicySubMenuWrapper> */}
        </>
    )

    const renderInfo = () => {
        if (loading) {
            return <Title>Loading</Title>
        }

        if (error) {
            return <Title>Sorry there was an error: {error}</Title>
        }
        const { policy, coverage, insured, vehicles, loss_history, drivers } =
            data

        return (
            <>
                <PolicySection policy={policy} />
                <CoverageSection coverage={coverage} />
                <InsuredSection insured={insured} />
                <VehiclesSection vehiclesList={vehicles?.values ?? []} />
                <LossHistorySection
                    lossHistoryList={loss_history?.values ?? []}
                />
                <DriversSection driversList={drivers?.values ?? []} />
            </>
        )
    }

    return (
        <Layout policyMenu={policyMenu}>
            <Wrapper>
                <Header>
                    <PolicyTitle id={slug} />
                </Header>
                {/* <SubHeader
                    agent="agent"
                    insured="test insured"
                    period="DATE - DATE "
                    totalPremium="$$$"
                /> */}
                <Div>
                    {/* {<CurrentSection />}
                    <Flex>
                        <Title>Vehicles</Title>
                        <GenericSearch
                            placeholder="Search Vehicles"
                            style={{ marginLeft: 'auto' }}
                        />
                    </Flex>
                    <VehiclesTable
                        open={() => {
                            setShow(true)
                        }}
                        vehicles={makeSampleInfo(10)}
                    />
                    {show && <VehicleOverlay close={close} show={show} />} */}
                </Div>
            </Wrapper>
            <Div>
                <Col>{renderInfo()}</Col>
            </Div>
        </Layout>
    )
}

const Wrapper = styled.div`
    padding: 24px;
`

const Div = styled.div`
    width: 100%;
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
