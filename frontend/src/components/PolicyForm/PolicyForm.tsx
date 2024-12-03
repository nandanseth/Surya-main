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
    UploadSection,
    UnderwritingSection
} from '../PolicyFormSections'
import { FormContext } from '../../context/insured-context'
import { preSubmit, urls } from '../../shared'
import { useContext, useState } from 'react'
import coverageIcon from '../../images/coverage icon.png'
// import documentsIcon from '../../images/documents icon.png'
import { Submit } from '../Buttons'
import { useAlert } from 'react-alert'
import uploadIcon from '../../images/upload.jpg'
import driversIcon from '../../images/drivers icon.png'
import insuredIcon from '../../images/insured icon.png'
import lossHistoryIcon from '../../images/loss history icon.png'
import paymentsIcon from '../../images/payments icon.png'
import policyIcon from '../../images/policy icon.png'
import reinsuranceIcon from '../../images/reinsurance icon.png'
import underwritingIcon from '../../images/underwriting.png'
import styled from 'styled-components'
import vehicleIcon from '../../images/vehicle icon.png'
import { useMoralis } from "react-moralis"
import Moralis from 'moralis'
import { useEffect } from 'react'
import { APP_ID, SERVER_URL } from '../../index'

const PolicyForm = ({ close, from }) => {
    const store = useContext(FormContext)
    const alert = useAlert()

    const [loading, setLoading] = useState(false)
    const [current, setCurrent] = useState('upload')
    const {isAuthenticated, user, logout, account} = useMoralis(); 

    const { reset } = store
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

    useEffect(() => {
        reset()
    }, [])

    const { name, page: Current } = Pages[current]

    const onSubmit = () => {
        const checkForDuplicates = async () => {
            try {
                // First check if policy number exists and starts with "APP"
                if (!store.policy.values.policyNum || !store.policy.values.policyNum.toString().startsWith("APP")) {
                    alert.error('Please go to the Policy Section to Generate an APP Number');
                    setCurrent('policy'); // Automatically switch to policy section
                    return false;
                }

                await Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID });
                const Applications = Moralis.Object.extend("Applications");
                const query = new Moralis.Query(Applications);
                
                // Add validation to ensure store has required data
                if (!store || !store.policy || !store.policy.values || !store.policy.values.name) {
                    alert.error('Missing required policy information');
                    return false;
                }
                
                // Get the last 30 policies, ordered by creation date
                query.descending("createdAt");
                query.limit(30);
                const data = await query.find();                // Get current policy data
                const currentPolicy = preSubmit(store);
                const currentPolicyName = currentPolicy.policy.name;
                
                // Check for duplicates in the last 30 policies
                for (const app of data) {
                    const appJson = JSON.parse(app.get("policyJson"));
                    const appName = appJson.policy?.name;
                    
                    if (appName === currentPolicyName) {
                        alert.error('This policy already exists in the last 30 submissions');
                        return false;
                    }
                }
                return true;
            } catch (error) {
                alert.error('Error checking for duplicates');
                console.error('Error checking for duplicates:', error);
                return false;
            }
        };

        const moralisStore = async () => {
            try {
                // Check for duplicates first
                const isDuplicate = await checkForDuplicates();
                if (!isDuplicate) {
                    return false;
                }

                const Policy = (Moralis as any).Object.extend("Applications");
                const policy = new Policy();
                policy.set("policyJson", JSON.stringify(preSubmit(store)));
                policy.set("policyNum", store.policy.values.policyNum);
                policy.set('Decision', 'Undefined');
                await policy.save();
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        };
        return moralisStore();
    }

    const MenuFooter = () => (
        <Nav>
            <Close onClick={close}>Close</Close>
            <Submit
                disabled={loading}
                onClick={async () => {
                    setLoading(true)
                    const check = await onSubmit()
                    if (check) {
                        setLoading(false)
                        close()
                        reset()
                    }
                    setLoading(false)
                }}
            >
                {loading ? 'Loading' : 'Submit'}
            </Submit>
        </Nav>
    )

    return (
        <Container>
            <FormHead
                current={current}
                name={name}
                percent={percentMap[current]}
                setCurrent={setCurrent}
            />
            <Main>
                <Current store={store} from={from} />
            </Main>
            <MenuFooter />
        </Container>
    )
}

const FormHead = ({
    percent = 0,
    name = 'Name',
    current,
    setCurrent,
}: {
    percent?: number
    current?: string
    setCurrent: any
    name?: string
}) => {
    return (
        <Header>
            <ProgressContainer>
                <Background />
                <Progress percent={percent} />
            </ProgressContainer>
            <HeaderContent>
                <Left>
                    <NewApplication> New Application</NewApplication>
                    <Title>{name}</Title>
                </Left>
                <Right>
                    <StyledIcon
                        active={current === 'upload'}
                        onClick={() => {
                            setCurrent('upload')
                        }}
                        title="Upload Section"
                    >
                        <StyledImg src={uploadIcon} />
                    </StyledIcon>
                    <StyledIcon
                        active={current === 'underwriting'}
                        onClick={() => {
                            setCurrent('underwriting')
                        }}
                        title="Underwriting"
                    >
                        <StyledImg src={underwritingIcon} />
                    </StyledIcon>
                    <StyledIcon
                        active={current === 'insured'}
                        onClick={() => {
                            setCurrent('insured')
                        }}
                        title="Insured Section"
                    >
                        <StyledImg src={insuredIcon} />
                    </StyledIcon>
                    <StyledIcon
                        active={current === 'policy'}
                        onClick={() => {
                            setCurrent('policy')
                        }}
                        style={{ backgroundImage: `url('${policyIcon}')` }}
                        title="Policy Section"
                    >
                        <StyledImg src={policyIcon} />
                    </StyledIcon>
                    <StyledIcon
                        active={current === 'coverage'}
                        onClick={() => {
                            setCurrent('coverage')
                        }}
                        title="Coverage"
                    >
                        <StyledImg src={coverageIcon} />
                    </StyledIcon>
                    
                    <StyledIcon
                        active={current === 'drivers'}
                        onClick={() => {
                            setCurrent('drivers')
                        }}
                        title="Drivers Section"
                    >
                        <StyledImg src={driversIcon} />
                    </StyledIcon>

                    <StyledIcon
                        active={current === 'loss'}
                        onClick={() => {
                            setCurrent('loss')
                        }}
                        title="Loss History"
                    >
                        <StyledImg src={lossHistoryIcon} />
                    </StyledIcon>

                    <StyledIcon
                        active={current === 'vehicles'}
                        onClick={() => {
                            setCurrent('vehicles')
                        }}
                        title="Vehicles Section"
                    >
                        <StyledImg src={vehicleIcon} />
                    </StyledIcon>

                   
                    <StyledIcon
                        active={current === 'reinsurance'}
                        onClick={() => {
                            setCurrent('reinsurance')
                        }}
                        title="Reinsurance"
                    >
                        <StyledImg src={reinsuranceIcon} />
                    </StyledIcon>
                    
                    <StyledIcon
                        active={current === 'payments'}
                        onClick={() => {
                            setCurrent('payments')
                        }}
                        title="Payments"
                    >
                        <StyledImg src={paymentsIcon} />
                    </StyledIcon>
                    
                </Right>
            </HeaderContent>
        </Header>
    )
}

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

const StyledButton = styled.button`
    background-color: white;
    font-color: black;
    border-radius: 1rem;
    border: 1px solid black;
    font-size: 16px;
    padding: 7.5px;
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
    background: black;
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

export default PolicyForm
