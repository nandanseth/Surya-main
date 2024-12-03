import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PolicyType } from '../../shared'
import { Form } from '../../styles/styles'
import styled from 'styled-components'
import { useAlert } from 'react-alert'

import Moralis from 'moralis'
import { APP_ID, SERVER_URL } from '../../index'
import { FormContext } from '../../context/insured-context'
import { preSubmit } from '../../shared'
import {
    CoverageSection,
    DocumentsSection,
    DriversSection,
    UploadSection,
    InsuredSection,
    LossHistorySection,
    PaymentsSection,
    PolicySection,
    ResinuranceSection,
    VehicleSection,
    UnderwritingSection
} from '../PolicyFormSections'
import { FormHead } from '../../components/FormHead'
import { Submit } from '../../components/Buttons'

interface PolicyEditFormProps {
    policyNum: string;
    onClose: () => void;
}

const Pages = {
    upload: { page: UploadSection, name: 'Upload' },
    policy: { page: PolicySection, name: 'Policy' },
    insured: { page: InsuredSection, name: 'Insured' },
    drivers: { page: DriversSection, name: 'Drivers' },
    vehicles: { page: VehicleSection, name: 'Vehicles' },
    loss: { page: LossHistorySection, name: 'Loss History' },
    coverage: { page: CoverageSection, name: 'Coverage' },
    documents: { page: DocumentsSection, name: 'Documents' },
    reinsurance: { page: ResinuranceSection, name: 'Reinsurance' },
    payments: { page: PaymentsSection, name: 'Payments' },
    underwriting: { page: UnderwritingSection, name: 'Underwriting'}
}

const total = Object.keys(Pages).length

const percentMap = {
    upload: 1 / total,
    underwriting: 2 / total,
    policy: 4 / total,
    insured: 3 / total,
    drivers: 6 / total,
    coverage: 5 / total,
    loss: 7 / total,
    vehicles: 8 / total,
    // documents: 7 / total,
    reinsurance: 9 / total,
    payments: 10 / total,
}

const PolicyEditForm: React.FC<PolicyEditFormProps> = ({ policyNum, onClose }) => {
    const [loading, setLoading] = useState(false)
    const [policyData, setPolicyData] = useState<Record<string, any> | null>(null)
    const [current, setCurrent] = useState('policy')
    const store = useContext(FormContext)
    const alert = useAlert()

    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                await Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID })
                const Application = Moralis.Object.extend("Applications")
                const query = new Moralis.Query(Application)
                const app = await query.equalTo("policyNum", policyNum).first()
                
                const policyJson = app.get("policyJson")
                const parsedPolicy = JSON.parse(policyJson)
                setPolicyData(parsedPolicy)

                // Update all form sections with existing data
                store.coverage.setValues(parsedPolicy.coverage)
                store.Uploads.setValues(parsedPolicy.Uploads)
                store.insured.setValues(parsedPolicy.insured)
                store.policy.setValues(parsedPolicy.policy)
                store.payments.setValues(parsedPolicy.payments)
                store.reinsurance.setValues(parsedPolicy.reinsurance)
                store.vehicles.setValues(parsedPolicy.vehicles.values)
                store.drivers.setValues(parsedPolicy.drivers.values)
                store.underwriting.setValues(parsedPolicy.underwriting)
            } catch (error) {
                console.error('Error fetching policy:', error)
                alert.error('Error loading policy data')
            }
        }

        fetchPolicy()
    }, [policyNum])

    const handleSave = async () => {
        try {
            // Check if policy number exists and starts with "APP"
            if (!store.policy.values.policyNum || !store.policy.values.policyNum.toString().startsWith("APP")) {
                alert.error('Please go to the Policy Section to Generate an APP Number');
                setCurrent('policy'); // Automatically switch to policy section
                return;
            }

            setLoading(true)
            await Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID })
            const Application = Moralis.Object.extend("Applications")
            const query = new Moralis.Query(Application)
            const app = await query.equalTo("policyNum", policyNum).first()

            if (app) {
                const formattedData = preSubmit(store)
                app.set("policyJson", JSON.stringify(formattedData))
                app.set("policyNum", store.policy.values.policyNum)
                await app.save()
                alert.success('Policy updated successfully')
                onClose()
            }
        } catch (error) {
            console.error('Error saving policy:', error)
            alert.error('Error saving policy')
        } finally {
            setLoading(false)
        }
    }

    if (!policyData) return <div>Loading...</div>

    const MenuFooter = () => (
        <Nav>
            <Close onClick={onClose}>Close</Close>
            <Submit
                disabled={loading}
                onClick={async () => {
                    handleSave()
                }}
            >
                {loading ? 'Loading' : 'Submit'}
            </Submit>
        </Nav>
    )

    return (
        <ModalContainer>
            <Header>
                <Title>Edit Policy: {policyNum}</Title>
                <FormHead
                    current={current}
                    name={Pages[current]?.name}
                    percent={percentMap[current]}
                    setCurrent={setCurrent}
                />
            </Header>
            
            <Main>
                {Pages[current]?.page && React.createElement(Pages[current].page, {
                    store: store,
                    from: "edit"
                })}
            </Main>
            <MenuFooter />
        </ModalContainer>
    )
}

const ModalContainer = styled.div`
    background: white;
    padding: 24px;
    border-radius: 8px;
    width: 100%;
    max-height: 100vh;
    overflow-y: auto;
`
const Close = styled(Submit)`
    color: white;
    background: black;
    :hover {
        opacity: 0.4;
        background: rgba(58, 86, 100, 0.06);
        color: black;
    }
`

const StyledButton = styled.button`
    background-color: white;
    font-color: black;
    border-radius: 1rem;
    border: 1px solid black;
    font-size: 16px;
    padding: 7.5px;
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

const Title = styled.h1`
    font-size: 24px;
    margin: 0;
`

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`
const Main = styled.div`
    padding: 20px 24px;
    width: 100%;
    padding-bottom: 40px;
    padding-top: 12px;
`

export default PolicyEditForm

