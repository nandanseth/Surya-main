import {
    Colors,
    fonts,
    Header,
    StyledDiv,
    SubTitle,
    Title,
} from '../styles/styles'
import {
    CoverageSection,
    DriversSection,
    InsuredSection,
    LossHistorySection,
    PaymentsSection,
    PolicySection,
    ReinsuranceSection,
    VehicleSection,
} from '../components/Reports'
import {
    coverageState,
    driversInitialState,
    insuredInitialState,
    lossHistoryState,
    policyInitialState,
    reinsuranceState,
    vehicleState,
} from '../context/insured-context'
import { CreateButton } from '../components/Buttons'
import { CSVDownload, CSVLink } from 'react-csv'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { testItem, urls } from '../shared'
import { useEffect, useState } from 'react'
import Checkbox from '../components/Form/Checkbox'
import Layout from '../utils/withLayout'
import RangeSlider from '../components/Reports/RangeSlider'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'

const min = 0
const max = 600000
const defaultPremium1 = 20000
const defaultPremium2 = 100000
const omin = 10000
const omax = 4000000

const title = 'Generate Reports'
const subtitle =
    'Generate reports in csv format right to your computer. Filter and select fields as needed.'

// Useful to use if you dont want to maintain both
const makeAllFalse = (object: any, isTrue = false) => {
    const clone = { ...object }
    const keys = Object.keys(clone)
    keys.map((key) => {
        clone[key] = isTrue
    })
    return clone
}

const isAnyTrue = (object: any): boolean => {
    const keys = Object.keys(object)
    return keys.some((key) => {
        return object[key] === true
    })
}

const filterTrue = (object: any) => {
    const keys = Object.keys(object)
    return keys.filter((key) => {
        return object[key] === true
    })
}

const policyDefault = makeAllFalse(policyInitialState)
const driversDefault = makeAllFalse(driversInitialState)
const insuredDefault = makeAllFalse(insuredInitialState)
const coverageDefault = makeAllFalse(coverageState)
const vehiclesDefault = makeAllFalse(vehicleState)
const lossHistoryDefault = makeAllFalse(lossHistoryState)
const paymentsDefault = {
    payments: false,
}
const reinsuranceDefault = makeAllFalse(reinsuranceState)

const generateText = 'Generate Report'
const loadingText = 'Loading Report'

// const makeHeaders

const filterPolicyList = ({
    endDate,
    startDate,
    premiumRange,
    overallRange,
    isSplit,
    policies,
}) => {
    return policies.filter((item) => {
        //   Date Range (Based on effective date of the policy or implemented date of an endorsement)
        // Premium of Policy
        // Overall limit associated with a policy (if split limit, use per accident limit).
        const effectiveDate = new Date(item.effectiveDate ?? '1/1/1800')
        const isValidDate =
            effectiveDate >= startDate && effectiveDate <= endDate
        if (!isValidDate) {
            false
        }

        const {
            overallPremium,
            personalInjuryProtectionPremium,
            medicalPaymentsPremium,
            underinsuredMotoristPremium,
            uninsuredMotoristPremium,
            hiredCSLPremium,
            nonOwnedCSLPremium,
            splitSectionBodyPerAccidentOptions,
        } = item.coverage

        const total = [
            overallPremium,
            personalInjuryProtectionPremium,
            medicalPaymentsPremium,
            underinsuredMotoristPremium,
            uninsuredMotoristPremium,
            hiredCSLPremium,
            nonOwnedCSLPremium,
        ].reduce((partialSum, a) => {
            return partialSum + parseFloat(a)
        }, 0)

        const [parsedMin, parsedMax] = [
            parseInt(premiumRange[0]),
            parseInt(premiumRange[1]),
        ]
        const isValidPremium = total >= parsedMin && total <= parsedMax
        if (!isValidPremium) {
            return false
        }

        const limit = isSplit
            ? splitSectionBodyPerAccidentOptions
            : overallPremium
        return (
            limit <= parseInt(overallRange[1]) &&
            limit >= parseInt(overallRange(0))
        )
    })
}

const Home = () => {
    const [policy, setPolicy] = useState(policyDefault)
    const [drivers, setDrivers] = useState(driversDefault)
    const [insured, setInsured] = useState(insuredDefault)
    const [coverage, setCoverage] = useState(coverageDefault)
    const [vehicles, setVehicles] = useState(vehiclesDefault)
    const [lossHistory, setLossHistory] = useState(lossHistoryDefault)
    const [payments, setPayments] = useState(paymentsDefault)
    const [reinsurance, setReinsurance] = useState(reinsuranceDefault)
    const [generatedData, setGenerated] = useState(undefined)
    const [policies, setPolicies] = useState([testItem])

    const [startDate, setStartDate] = useState<Date | null>(new Date())

    const [endDate, setEndDate] = useState<Date | null>(new Date())

    const [premiumRange, setPremiumRange] = useState([
        defaultPremium1,
        defaultPremium2,
    ])

    const [overallRange, setOverallRange] = useState([
        defaultPremium1,
        defaultPremium2,
    ])

    const [isSplit, setIsSplit] = useState(false)

    const [driversDisabled, setDriversDisabled] = useState(false)
    const [vehiclesDisabled, setVehiclesDisabled] = useState(false)
    const [lossDisabled, setLossDisabled] = useState(false)

    const [generating, setGenerating] = useState(false)

    const handleDrivers = (val) => {
        if (isAnyTrue(val)) {
            if (!vehiclesDisabled || !lossDisabled) {
                setVehiclesDisabled(true)
                setLossDisabled(true)
            }
            setDrivers(val)
            return
        }
        setVehiclesDisabled(false)
        setLossDisabled(false)
        setDrivers(val)
    }

    const handleVehicles = (val) => {
        if (isAnyTrue(val)) {
            if (!driversDisabled || !lossDisabled) {
                setDriversDisabled(true)
                setLossDisabled(true)
            }
            setVehicles(val)
            return
        }

        setDriversDisabled(false)
        setLossDisabled(false)
        setVehicles(val)
    }

    const handleLoss = (val) => {
        if (isAnyTrue(val)) {
            if (!driversDisabled || !vehiclesDisabled) {
                setDriversDisabled(true)
                setVehiclesDisabled(true)
            }
            setLossHistory(val)
            return
        }

        setDriversDisabled(false)
        setVehiclesDisabled(false)
        setLossHistory(val)
    }

    const generateData = () => {
        setGenerating(true)
        // when we get the policies we will need to filter them
        const filteredPolicies = [testItem]
        // const filteredPolicies = filterPolicyList({ endDate, startDate, premiumRange, overallRange, isSplit, policies: enter policies here})
        const [
            policyHeaders,
            insuredHeaders,
            coverageHeaders,
            paymentsHeaders,
            reHeaders,
        ] = [
            filterTrue(policy),
            filterTrue(insured),
            filterTrue(coverage),
            filterTrue(payments),
            filterTrue(reinsurance),
        ]

        const buildList = [
            { headers: policyHeaders, key: 'policy' },
            { headers: insuredHeaders, key: 'insured' },
            { headers: coverageHeaders, key: 'coverage' },
            { headers: paymentsHeaders, key: 'payments' },
            { key: 'reinsurance', headers: reHeaders },
        ]

        let listValue: { key: string; headers: string[] }
        const check = driversDisabled || vehiclesDisabled || lossDisabled

        if (check) {
            if (!driversDisabled) {
                listValue = { key: 'drivers', headers: filterTrue(drivers) }
            }
            if (!vehiclesDisabled) {
                listValue = { key: 'vehicles', headers: filterTrue(vehicles) }
            }
            if (!lossDisabled) {
                listValue = {
                    key: 'loss_history',
                    headers: filterTrue(lossHistory),
                }
            }
        }
        //all we need to do is see which ones are true then make them into a object
        //policy, insured, coverage, payments, reinsurance
        const csvFormattedList = []

        const csvFormatted = filteredPolicies.map((currPolicy) => {
            const builtPolicy = {}
            buildList.map(({ headers, key }) => {
                headers.map((currVal) => {
                    builtPolicy[currVal] = currPolicy[key][currVal]
                })
            })

            if (check) {
                currPolicy[listValue.key].values.map((currItem) => {
                    const toAppend = { ...builtPolicy }
                    listValue.headers.map((key) => {
                        toAppend[key] = currItem[key]
                    })
                    csvFormattedList.push(toAppend)
                })
            }

            return builtPolicy
        })
        setGenerating(false)

        return check ? csvFormattedList : csvFormatted
    }

    useEffect(() => {
        const headers = {}
        const getPolicies = async () => {
            try {
                const res = await fetch(urls.getAllPoliciesUrl)
                const data = await res.json()
                setPolicies(data)
            } catch (error) {
                alert(error)
                console.log(error)
            }
        }
        getPolicies()
    }, [])

    //@Kush if you want to do a make all false or true, its pretty  to use to makeAllFalse method. True sets all of them checked
    return (
        <Layout>
            <Main>
                <Flex>
                    <Content>
                        <Header>
                            <div>
                                <Title>{title}</Title>
                                <SubTitle>{subtitle}</SubTitle>
                            </div>
                        </Header>
                        <ReportsMain>
                                <Accordions>
                                    <Explainer>select fields</Explainer>

                                    <PolicySection
                                        policy={policy}
                                        setPolicy={setPolicy}
                                    />
                                    <DriversSection
                                        disabled={driversDisabled}
                                        drivers={drivers}
                                        setDrivers={handleDrivers}
                                    />
                                    <LossHistorySection
                                        disabled={lossDisabled}
                                        lossHistory={lossHistory}
                                        setLossHistory={handleLoss}
                                    />
                                    <InsuredSection
                                        insured={insured}
                                        setInsured={setInsured}
                                    />
                                    <PaymentsSection
                                        payments={payments}
                                        setPayments={setPayments}
                                    />
                                    <VehicleSection
                                        disabled={vehiclesDisabled}
                                        setVehicles={handleVehicles}
                                        vehicles={vehicles}
                                    />
                                    <CoverageSection
                                        coverage={coverage}
                                        setCoverage={setCoverage}
                                    />
                                    <ReinsuranceSection
                                        reinsurance={reinsurance}
                                        setReinsurance={setReinsurance}
                                    />
                                </Accordions>
                            <Right>
                                <Explainer>select filters</Explainer>

                                <TimePicker
                                    inputFormat="MM/dd/yyyy"
                                    label="Start Date"
                                    onChange={setStartDate}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    value={startDate}
                                />
                                <TimePicker
                                    inputFormat="MM/dd/yyyy"
                                    label="End Date"
                                    onChange={setEndDate}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    value={endDate}
                                />

                                <RangeSlider
                                    label="Premium Range"
                                    max={max}
                                    min={min}
                                    setValue={setPremiumRange}
                                    step={10000}
                                    value={premiumRange}
                                />

                                <RangeSlider
                                    label="Overall Limit Range"
                                    max={omax}
                                    min={omin}
                                    setValue={setOverallRange}
                                    step={100000}
                                    value={overallRange}
                                />
                                <div style={{ marginTop: -12 }}>
                                    <Checkbox
                                        checked={isSplit}
                                        labelText="Split Limit"
                                        onChange={() => setIsSplit(!isSplit)}
                                    />
                                </div>
                                <MarginTop>
                                    <GenerateButton
                                        onClick={() => {
                                            console.log('loading')
                                            const data = generateData()
                                            setGenerated(data)
                                        }}
                                    >
                                        {generateText}
                                    </GenerateButton>
                                </MarginTop>
                                <MarginTop>
                                    {generatedData === undefined ? (
                                        <div>
                                            {generating ? 'generating csv' : ''}
                                        </div>
                                    ) : (
                                        <>
                                            <CSVDownload
                                                data={generatedData}
                                                target="_blank"
                                            />
                                            <Download
                                                data={generatedData}
                                                target="_blank"
                                            >
                                                {' '}
                                                ↓ Download me
                                            </Download>
                                        </>
                                    )}
                                </MarginTop>
                            </Right>
                        </ReportsMain>
                    </Content>
                </Flex>
            </Main>
        </Layout>
    )
}

const TimePicker = (props: any) => {
    return (
        <StyledDiv>
            <MobileDatePicker {...props} />
        </StyledDiv>
    )
}

const MarginTop = styled.div`
    margin-top 24px;
`

const Main = styled.main`
    min-height: 100vh;
    height: 100%;
    width: 100%;
    display: block;
`

const Flex = styled.div`
    display: flex;
    height: 100%;
`

const Content = styled.div`
    height: 100%;
    background: white;
    flex: 3;
`

const ReportsMain = styled(Flex)`
    padding: 20px;
    padding-left: 4px;
    flex-flow: row wrap;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex: 2;
    overflow-y: scroll;
`

const Right = styled(Row)`
    flex-direction: column;
    margin-left: auto;
    flex: 1 1 auto;
    padding: 0 12px;
`

const Accordions = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 300;
    flex: 1 1 auto;
`

const Explainer = styled.p`
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    color: #00000094;
    padding: 8px 0;
    text-align: left;
    margin-bottom: 12px;
`
const GenerateButton = styled(CreateButton)`
    margin: auto;
    width: 100%;
    font-size: ${fonts.size.medium};
    color: white;
    background: ${Colors.electricBlue};
    :hover {
        color: ${Colors.electricBlue};
    }
`

const Download = styled(CSVLink)`
    font: inherit;
    font-weight: 500;
    font-size: ${fonts.size.medium};
    display: flex;
    padding: 12px 24px;
    align-items: center;
    justify-content: center;
    color: white;
    background: black;
    border-radius: 10px;
    :hover {
        color: ${Colors.electricBlue};
    }
`

export default Home
