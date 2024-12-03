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
import styled from 'styled-components'
import vehicleIcon from '../../images/vehicle icon.png' 
import { useEffect } from 'react'
import { useMoralis } from "react-moralis"
import Moralis from 'moralis'
import { APP_ID, SERVER_URL } from '../../index'
import { SortByHeader, Table, Th, TR } from '../../styles/styles'
import PolicyEditForm from './PolicyEditForm'
import SuryaSelect from './PolicyFormSelect'
import SuryaInput from './PolicyFormInput'
import { stateToCodeMapping } from '../../utils/policies/stateToCodeMapping'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { brokerOptions } from '../../utils/policies/getBrokerName'
import { PolicyType } from '../../shared'
import { createGlobalStyle } from 'styled-components';
import ReactDOM from 'react-dom';
import { IconButton, FormControl, FormGroup, FormControlLabel, Checkbox, Popover } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const GlobalStyle = createGlobalStyle`
    .react-datepicker-popper {
        z-index: 9999 !important;
    }
`;

const { Section } = Form

interface Application {
    id: string
    policyJson: string
    policyNum: string
    Decision: string
    _created_at: string
    _updated_at: string
    policyStatus: string
    effectiveDate: string
    brokerName: string
    genReDate: string
    policyUnderwriter: string
}

interface PolicyAppFormProps {
    applications: Application[]
    searchValue: string
}

const PolicyAppForm = ({ applications, searchValue }: PolicyAppFormProps) => {
    const [moralisStatus, setMoralisStatus] = useState<string[]>([])
    const [moralisUWStatus, setMoralisUWStatus] = useState<string[]>([])
    const [genReDateStatus, setGenReDateStatus] = useState<(string | Date)[]>([])
    const [decisionStatus, setDecisionStatus] = useState<string[]>([])
    const [createdDates, setCreatedDates] = useState<boolean[]>([])
    const [brokerNames, setBrokerNames] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedPolicyNum, setSelectedPolicyNum] = useState<string | null>(null)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedApp, setSelectedApp] = useState<Application | null>(null)
    const [sortField, setSortField] = useState<string>('')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const {isAuthenticated, user, logout, account} = useMoralis(); 
    const [underwriterFilters, setUnderwriterFilters] = useState<string[]>([]);
    const [tempUnderwriterFilters, setTempUnderwriterFilters] = useState<string[]>([]);
    const [underwriterAnchorEl, setUnderwriterAnchorEl] = useState<HTMLButtonElement | null>(null);

    // Initialize status arrays when applications change
    useEffect(() => {
        if (applications?.length) {
            setMoralisStatus(applications.map(app => app.policyStatus || 'Undefined'))
            setMoralisUWStatus(applications.map(app => app.policyUnderwriter || 'Undefined'))
            setGenReDateStatus(applications.map(app => app.genReDate || ''))
            setDecisionStatus(applications.map(app => app.Decision || 'Undefined'))
            setBrokerNames(applications.map(app => app.brokerName || 'Undefined'))
            
            // Set created dates based on 60 day check
            const fortyDaysAgo = new Date()
            fortyDaysAgo.setDate(fortyDaysAgo.getDate() - 60)
            setCreatedDates(applications.map(app => {
                const createdAt = new Date(app._created_at)
                return createdAt > fortyDaysAgo
            }))
        }
    }, [applications])

    const updateBrokerName = async (newBrokerName: string, app: Application, index: number) => {
        try {
            setLoading(true)
            await Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID });
            const Application = Moralis.Object.extend("Applications");
            const query = new Moralis.Query(Application);
            const data = await query.equalTo("policyNum", app.policyNum).first();
            
            if (data) {
                data.set("brokerName", newBrokerName);
                await data.save();
                
                const newBrokerNames = [...brokerNames]
                newBrokerNames[index] = newBrokerName
                setBrokerNames(newBrokerNames)
            }
        } catch (error) {
            console.error('Error updating broker name:', error)
        } finally {
            setLoading(false)
        }
    }

    const statusOptions = [
        { value: 'Awaiting Documents', label: 'Awaiting Documents' },
        { value: 'Documents Uploaded', label: 'Documents Uploaded' },
        { value: 'Additional Docs Requested', label: 'Additional Docs Requested' },
        { value: 'Quote Sent to GenRe', label: 'Quote Sent to GenRe' },
        { value: 'Quote Received from GenRe / In Discussion', label: 'Quote Recieved from GenRe / In Discussion' },
        { value: 'Quote Sent to Broker', label: 'Quote Sent to Broker' },
        { value: 'Quote Not Taken By Broker', label: 'Quote Not Taken By Broker' },
        { value: 'Quote Accepted By Broker', label: 'Quote Accepted By Broker' },
        { value: 'N/A', label: 'N/A' }
    ]

    const underwriterOptions = [
        { value: "Anthony Stola", label: "Anthony Stola" },
        { value: "Tim Kirkem", label: "Tim Kirkem" },
        { value: "Undefined", label: "Undefined" }
    ]

    const updateStatus = async (newStatus: string, app: Application, index: number) => {
        try {
            setLoading(true)
            await Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID });
            const Application = Moralis.Object.extend("Applications");
            const query = new Moralis.Query(Application);
            const data = await query.equalTo("policyNum", app.policyNum).first();
            
            if (data) {
                data.set("policyStatus", newStatus);
                await data.save();
                
                const newStatuses = [...moralisStatus]
                newStatuses[index] = newStatus
                setMoralisStatus(newStatuses)
            }
        } catch (error) {
            console.error('Error updating status:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateGenReDate = async (newDate: Date, app: Application, index: number) => {
        try {
            if (!newDate) {
                // Handle clearing the date
                setLoading(true);
                await Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID });
                const Application = Moralis.Object.extend("Applications");
                const query = new Moralis.Query(Application);
                const data = await query.equalTo("policyNum", app.policyNum).first();
                
                if (data) {
                    data.set("genReDate", "");
                    await data.save();
                    
                    const newGenReDates = [...genReDateStatus];
                    newGenReDates[index] = "";
                    setGenReDateStatus(newGenReDates);
                }
                return;
            }
            
            setLoading(true);
            await Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID });
            const Application = Moralis.Object.extend("Applications");
            const query = new Moralis.Query(Application);
            const data = await query.equalTo("policyNum", app.policyNum).first();
            
            if (data) {
                // Create a new date object to avoid timezone issues
                const validDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
                data.set("genReDate", validDate);
                await data.save();
                
                const newGenReDates = [...genReDateStatus]
                newGenReDates[index] = validDate
                setGenReDateStatus(newGenReDates)
            }
        } catch (error) {
            console.error('Error updating GenRe date:', error);
        } finally {
            setLoading(false);
        }
    }

    const updateUnderwriter = async (newUnderwriter: string, app: Application, index: number) => {
        try {
            setLoading(true)
            await Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID });
            const Application = Moralis.Object.extend("Applications");
            const query = new Moralis.Query(Application);
            const data = await query.equalTo("policyNum", app.policyNum).first();
            
            if (data) {
                data.set("policyUnderwriter", newUnderwriter);
                await data.save();
                
                const newUWStatus = [...moralisUWStatus]
                newUWStatus[index] = newUnderwriter
                setMoralisUWStatus(newUWStatus)
            }
        } catch (error) {
            console.error('Error updating underwriter:', error)
        } finally {
            setLoading(false)
        }
    }

    const parseDate = (dateStr: string): Date => {
        if (!dateStr) return new Date(0); // Return earliest possible date if empty
        
        // Handle MM/DD/YYYY format
        const [month, day, year] = dateStr.split('/').map(num => parseInt(num, 10));
        return new Date(year, month - 1, day); // month is 0-based in Date constructor
    }

    // Add this helper function to check if a date is within the last 45 days
    const isWithinPast45Days = (dateStr: string): boolean => {
        if (!dateStr) return false;
        
        const effectiveDate = parseDate(dateStr);
        const today = new Date();
        const daysAgo45 = new Date();
        daysAgo45.setDate(today.getDate() - 45);
        
        return effectiveDate >= daysAgo45;
    }

    const handleUnderwriterFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('Filter button clicked'); // Debug log
        event.preventDefault();
        event.stopPropagation();
        setTempUnderwriterFilters([...underwriterFilters]);
        setUnderwriterAnchorEl(event.currentTarget);
    };

    const handleUnderwriterFilterClose = () => {
        setUnderwriterAnchorEl(null);
    };

    const applyUnderwriterFilters = () => {
        setUnderwriterFilters(tempUnderwriterFilters);
        handleUnderwriterFilterClose();
    };

    // Modify the filterApplications function to include underwriter filtering
    const filterApplications = (apps: Application[]) => {
        // First filter out "Quote Accepted by Broker" status
        let filteredApps = apps.filter(app => 
            app.policyStatus !== 'Quote Accepted By Broker'
        );

        // Then apply effective date filter
        filteredApps = filteredApps.filter(app => {
            const policyData = JSON.parse(app.policyJson || '{}');
            return isWithinPast45Days(policyData.policy?.effectiveDate);
        });

        // Apply underwriter filters if any are selected
        if (underwriterFilters.length > 0) {
            filteredApps = filteredApps.filter(app => 
                underwriterFilters.includes(app.policyUnderwriter || 'Undefined')
            );
        }

        return filteredApps;
    };

    // Modify the sortApplications function to filter first
    const sortApplications = (apps: Application[]) => {
        // First filter applications by effective date
        const filteredAppsOne = apps.filter(app => {
            const policyData = JSON.parse(app.policyJson || '{}');
            return isWithinPast45Days(policyData.policy?.effectiveDate);
        });

        const filteredApps = filterApplications(filteredAppsOne);

        // Then apply sorting if needed
        if (!sortField) return filteredApps;

        return [...filteredApps].sort((a, b) => {
            let aValue, bValue;

            switch (sortField) {
                case 'name':
                    aValue = JSON.parse(a.policyJson || '{}').policy?.name || ''
                    bValue = JSON.parse(b.policyJson || '{}').policy?.name || ''
                    break;
                case 'effectiveDate':
                    aValue = parseDate(JSON.parse(a.policyJson || '{}').policy?.effectiveDate || '')
                    bValue = parseDate(JSON.parse(b.policyJson || '{}').policy?.effectiveDate || '')
                    if (sortDirection === 'asc') {
                        return aValue.getTime() - bValue.getTime();
                    }
                    return bValue.getTime() - aValue.getTime();
                case 'broker':
                    aValue = a.brokerName || ''
                    bValue = b.brokerName || ''
                    break;
                case 'status':
                    aValue = a.policyStatus || ''
                    bValue = b.policyStatus || ''
                    break;
                case 'underwriter':
                    aValue = a.policyUnderwriter || ''
                    bValue = b.policyUnderwriter || ''
                    break;
                case 'underwritingCode':
                    aValue = JSON.parse(a.policyJson || '{}').policy?.underwritingCode || ''
                    bValue = JSON.parse(b.policyJson || '{}').policy?.underwritingCode || ''
                    break;
                case 'agent':
                    aValue = JSON.parse(a.policyJson || '{}').policy?.agent || ''
                    bValue = JSON.parse(b.policyJson || '{}').policy?.agent || ''
                    break;
                case 'genReDate':
                    aValue = a.genReDate ? new Date(a.genReDate).getTime() : 0
                    bValue = b.genReDate ? new Date(b.genReDate).getTime() : 0
                    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
                default:
                    return 0;
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }

    useEffect(() => {
        const sortedApps = sortApplications(applications);
        const newMoralisStatus = sortedApps.map(app => app.policyStatus || 'Undefined');
        const newMoralisUWStatus = sortedApps.map(app => app.policyUnderwriter || 'Undefined');
        const newGenReDateStatus = sortedApps.map(app => app.genReDate || '');
        const newDecisionStatus = sortedApps.map(app => app.Decision || 'Undefined');
        const newBrokerNames = sortedApps.map(app => app.brokerName || 'Undefined');
    
        setMoralisStatus(newMoralisStatus);
        setMoralisUWStatus(newMoralisUWStatus);
        setGenReDateStatus(newGenReDateStatus);
        setDecisionStatus(newDecisionStatus);
        setBrokerNames(newBrokerNames);
    }, [applications, sortField, sortDirection, underwriterFilters]);

    const closeApp = async(app) => {

        close()
        try {
            // const Policy = Moralis.Object.extend("Policies")

            const Application = (Moralis as any).Object.extend("Applications")

            const query = new (Moralis as any).Query(Application);
            const data = await query.equalTo("policyNum", app.app.policy.policyNum).first();
            data.set("Decision", "Rejected")
            //data.destroy({useMasterKey: true})
            await data.save()

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const ButtonContainer = styled.div`
        display: flex;
        flex-direction: column;
        gap: 3px;
        align-items: stretch;
        min-width: 120px;
    `

    const AcceptButton = styled(Accept)`
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 13px;
        width: 100%;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
    `

    const RejectButton = styled(Close)`
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 13px;
        width: 100%;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ff4444;
        
        &:hover {
            background-color: #cc0000;
            opacity: 1;
            color: white;
        }
    `

    const RejectedText = styled.span`
        color: #ff4444;
        font-weight: 600;
        font-size: 13px;
        text-align: center;
        width: 100%;
        display: block;
    `

    const AUTHORIZED_USERS = ['KVekaria', 'kushdave', 'rshukla', 'rshukla1'];

    const MenuFooter = (app) => (
        <ButtonContainer>
            <AcceptButton
                disabled={loading}
                onClick={async (e) => {
                    e.stopPropagation();
                    setLoading(true);
                    const check = await onSubmit(app);
                    if (check) {
                        setLoading(false);
                        close();
                    }
                    setLoading(false);
                }}
            >
                {loading ? 'Loading' : 'Accept'}
            </AcceptButton>
            <RejectButton onClick={(e) => {
                e.stopPropagation();
                closeApp(app);
            }}>
                Reject
            </RejectButton>
        </ButtonContainer>
    )

    const MenuFooterReject = (app) => (
        <ButtonContainer>
            <RejectButton onClick={(e) => {
                e.stopPropagation();
                closeApp(app);
            }}>
                Reject
            </RejectButton>
        </ButtonContainer>
    )

    const MenuFooterRejected = () => (
        <ButtonContainer>
            <RejectedText>Rejected</RejectedText>
        </ButtonContainer>
    )

    const onSubmit = async (app) => {
        const generatePolicyNumber = async (app) => {
            await Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID });
            const Policies = Moralis.Object.extend("Policies");
            const query = new Moralis.Query(Policies);
            const data = await query.limit(2000).find();
            const policyJson = JSON.parse(app.app.policyJson || '{}')
            // Get all existing policy numbers
            const policyNumbers = data.map(object => object.get("policyNum"));

            // Generate policy number components
            const effYear = policyJson.policy.effectiveDate.split("/")[2].slice(-2);
            const state = stateToCodeMapping[policyJson.policy.states];
            const categoryMap = {
                'Taxi': 'T',
                'Limo': 'L'
            };
            const categorySingle = categoryMap[policyJson.policy.secondaryCategory] || 'N';

            // Find the highest number and increment
            const maxNumber = policyNumbers.reduce((max, policyNumber) => {
                const lastThreeDigits = parseInt(policyNumber.slice(-3), 10);
                return Math.max(max, lastThreeDigits);
            }, -1);

            return `${effYear}${state}${categorySingle}00${maxNumber + 1}`;
        };

        const updateApplication = async (policyNum) => {
            const Application = Moralis.Object.extend("Applications");
            const query = new Moralis.Query(Application);
            const application = await query.equalTo("policyNum", policyNum).first();

            if (application) {
                application.set("Decision", "Accepted");
                await application.save();
            }
        };

        const savePolicyToMoralis = async (policyData) => {
            const Policy = Moralis.Object.extend("Policies");
            const InitialPolicy = Moralis.Object.extend("InitialPolicies");
            
            const policy = new Policy();
            const initPolicy = new InitialPolicy();
            console.log(policyData)
            // Set policy data
            const policyJsonString = JSON.stringify(policyData);
            policy.set("policyJson", policyJsonString);
            policy.set("policyNum", policyData.policy.policyNum);
            
            initPolicy.set("policyJson", policyJsonString);
            initPolicy.set("policyNum",  policyData.policy.policyNum);

            // Save both policies
            await Promise.all([
                policy.save(),
                initPolicy.save()
            ]);
        };

        try {
            // Initialize Moralis
            await Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID });
            console.log(app.app.policyJson)
            const policyJson = JSON.parse(app.app.policyJson || '{}')

            // Generate new policy number if not a renewal
            if (policyJson.policy.underwritingCode !== 'Renewal') {
                policyJson.policy.policyNum = await generatePolicyNumber(app);
            }

            // Set default payment values
            policyJson.payments.values = [];
            policyJson.payments.paymentType = policyJson.payments.paymentType || "FULLPAY_POL";

            // Save policy and update application
            await savePolicyToMoralis(policyJson);
            await updateApplication(policyJson.policy.policyNum);

            return true;
        } catch (error) {
            console.error('Error in onSubmit:', error);
            return false;
        }
    };

    return (
        <>
            <GlobalStyle />
            {loading && (
                <div style={overlayStyle}>
                    <CircularProgress />
                </div>
            )}
            <StyledTable>
                <thead>
                    <tr>
                    <Th>
                        <SortByHeader
                            onClick={() => {
                                setSortDirection(sortField === 'name' && sortDirection === 'asc' ? 'desc' : 'asc')
                                setSortField('name')
                            }}
                            active={sortField === 'name'}
                            direction={sortDirection}
                        >
                            Policy Name
                            </SortByHeader>
                        </Th>
                        <Th>
                            <SortByHeader
                                onClick={() => {
                                setSortDirection(sortField === 'effectiveDate' && sortDirection === 'asc' ? 'desc' : 'asc')
                                setSortField('effectiveDate')
                            }}
                            active={sortField === 'effectiveDate'}
                            direction={sortDirection}
                        >
                                Effective Date
                            </SortByHeader>
                        </Th>
                        <Th>
                            <SortByHeader
                                onClick={() => {
                                    setSortDirection(sortField === 'agent' && sortDirection === 'asc' ? 'desc' : 'asc')
                                    setSortField('agent')
                                }}
                                active={sortField === 'agent'}
                                direction={sortDirection}
                            >
                                Agent
                            </SortByHeader>
                        </Th>
                        <Th>
                            <SortByHeader
                                onClick={() => {
                                    setSortDirection(sortField === 'underwritingCode' && sortDirection === 'asc' ? 'desc' : 'asc')
                                    setSortField('underwritingCode')
                                }}
                                active={sortField === 'underwritingCode'}
                                direction={sortDirection}
                            >
                                Underwriting Code
                            </SortByHeader>
                        </Th>
                        
                        <Th>
                            <SortByHeader
                                onClick={() => {
                                setSortDirection(sortField === 'broker' && sortDirection === 'asc' ? 'desc' : 'asc')
                                setSortField('broker')
                            }}
                            active={sortField === 'broker'}
                            direction={sortDirection}
                        >
                            Broker Name
                            </SortByHeader>
                        </Th>
                        <Th>
                            <SortByHeader
                                onClick={() => {
                                    setSortDirection(sortField === 'status' && sortDirection === 'asc' ? 'desc' : 'asc')
                                setSortField('status')
                            }}
                            active={sortField === 'status'}
                            direction={sortDirection}
                        >
                            Status
                            </SortByHeader>
                        </Th>
                        <Th>
                            <SortByHeader
                                onClick={() => {
                                    setSortDirection(sortField === 'underwriter' && sortDirection === 'asc' ? 'desc' : 'asc')
                                setSortField('underwriter')
                            }}
                            active={sortField === 'underwriter'}
                            direction={sortDirection}
                        >
                            Underwriter
                            <IconButton
                                size="small"
                                onClick={handleUnderwriterFilterClick}
                                style={{ marginLeft: '4px' }}
                            >
                                <FilterListIcon fontSize="small" />
                            </IconButton>
                        </SortByHeader>
                        <Popover
                            id="underwriter-filter-popover"
                            open={Boolean(underwriterAnchorEl)}
                            anchorEl={underwriterAnchorEl}
                            onClose={handleUnderwriterFilterClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            slotProps={{
                                paper: {
                                    style: {
                                        marginTop: '8px',
                                        maxHeight: '400px',
                                        overflowY: 'auto',
                                        zIndex: 9999
                                    }
                                }
                            }}
                        >
                            <FormControl sx={{ p: 2 }} component="fieldset" variant="standard">
                                <FormGroup>
                                    {underwriterOptions.map((option) => (
                                        <FormControlLabel
                                            key={option.value}
                                            control={
                                                <Checkbox
                                                    checked={tempUnderwriterFilters.includes(option.value)}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        if (e.target.checked) {
                                                            setTempUnderwriterFilters([...tempUnderwriterFilters, option.value]);
                                                        } else {
                                                            setTempUnderwriterFilters(tempUnderwriterFilters.filter(uw => uw !== option.value));
                                                        }
                                                    }}
                                                />
                                            }
                                            label={option.label}
                                        />
                                    ))}
                                </FormGroup>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'flex-end', 
                                    gap: '8px',
                                    marginTop: '16px',
                                    borderTop: '1px solid #eee',
                                    paddingTop: '16px'
                                }}>
                                    <Button
                                        onClick={() => {
                                            setTempUnderwriterFilters([]);
                                            handleUnderwriterFilterClose();
                                        }}
                                        style={{
                                            backgroundColor: '#f5f5f5',
                                            border: '1px solid #ddd',
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={applyUnderwriterFilters}
                                        style={{
                                            backgroundColor: Colors.electricBlue,
                                            color: 'white',
                                        }}
                                    >
                                        Apply
                                    </Button>
                                </div>
                            </FormControl>
                        </Popover>
                        </Th>
                        <Th>
                            <SortByHeader
                                onClick={() => {
                                    setSortDirection(sortField === 'genReDate' && sortDirection === 'asc' ? 'desc' : 'asc')
                                    setSortField('genReDate')
                                }}
                                active={sortField === 'genReDate'}
                                direction={sortDirection}
                            >
                                GenRe Date
                            </SortByHeader>
                        </Th>
                        <Th>
                            <SortByHeader>
                            Decision
                            </SortByHeader>
                        </Th>
                        
                        
                    </tr>
                </thead>
                <tbody>
                    {sortApplications(applications).map((app, i) => {
                        const policyData = JSON.parse(app.policyJson || '{}')
                        return (
                            <ClickableRow key={app.id} onClick={() => {
                                setSelectedApp(app)
                                setShowEditModal(true)
                            }}>
                                <TD>{policyData.policy?.name || 'N/A'}</TD>
                                <TD>{policyData.policy?.effectiveDate || 'N/A'}</TD>
                                <TD>{policyData.policy?.agent || 'N/A'}</TD>
                                <TD>{policyData.policy?.underwritingCode || 'N/A'}</TD>
                                <TD className="select-column" onClick={(e) => e.stopPropagation()}>
                                    <Select
                                        value={brokerNames[i] || ''}
                                        onChange={(e) => updateBrokerName(e.target.value, app, i)}
                                    >
                                        <option value="Undefined">Select Broker</option>
                                        {brokerOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Select>
                                </TD>
                                <TD className="select-column" onClick={(e) => e.stopPropagation()}>
                                    <Select
                                        value={moralisStatus[i] || ''}
                                        onChange={(e) => updateStatus(e.target.value, app, i)}
                                    >
                                        <option value="Undefined">Select Status</option>
                                        {statusOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Select>
                                </TD>
                                <TD className="select-column" onClick={(e) => e.stopPropagation()}>
                                    <Select
                                        value={moralisUWStatus[i] || ''}
                                        onChange={(e) => updateUnderwriter(e.target.value, app, i)}
                                    >
                                        <option value="Undefined">Select Underwriter</option>
                                        {underwriterOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Select>
                                </TD>
                                <TD className="date-column" onClick={(e) => e.stopPropagation()}>
                                    <DatePickerContainer>
                                        <StyledDatePicker
                                            label="GenRe Date"
                                            name="GenRe Date"
                                            onChange={(date) => updateGenReDate(date, app, i)}
                                            dateFormat="MM/dd/yyyy"
                                            placeholder="GenRe Date"
                                            selected={genReDateStatus[i]}
                                            popperContainer={({ children }) => 
                                                ReactDOM.createPortal(children, document.body)
                                            }
                                            popperProps={{
                                                positionFixed: true,
                                                strategy: 'fixed'
                                            }}
                                            popperModifiers={[
                                                {
                                                    name: 'preventOverflow',
                                                    options: {
                                                        boundary: 'window'
                                                    }
                                                },
                                                {
                                                    name: 'zIndex',
                                                    options: {
                                                        zIndex: 9999
                                                    }
                                                }
                                            ]}
                                        />
                                    </DatePickerContainer>
                                </TD>
                                <TD className="decision-column" onClick={(e) => e.stopPropagation()}>
                                    {app.Decision === "Rejected" ? (
                                        <MenuFooterRejected />
                                    ) : app.Decision === "Accepted" ? (
                                        <MenuFooterReject app={app} />
                                    ) : AUTHORIZED_USERS.includes(user?.get('username')) ? (
                                        <MenuFooter app={app} />
                                    ) : (
                                        <MenuFooterReject app={app} />
                                    )}
                                </TD>
                            </ClickableRow>
                        )
                    })}
                </tbody>
            </StyledTable>

            {showEditModal && selectedApp && (
                <Overlay show={showEditModal}>
                    <PolicyEditForm 
                        policyNum={selectedApp.policyNum}
                        onClose={() => {
                            setShowEditModal(false)
                            setSelectedApp(null)
                        }}
                    />
                </Overlay>
            )}
        </>
    )
}

const ClickableRow = styled.tr`
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${Colors.light};
    }
    z-index: 1;
`

const overlayStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 1000,
}

const Button = styled.button`
    background-color: white;
    font-color: black;
    border-radius: 1rem;
    border: 1px solid black;
    font-size: 16px;
    padding: 7.5px;
`

const TD = styled.td`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    
    &.select-column {
        width: 150px;
    }
    align-items: center;
    font-weight: 600;

    &.decision-column {
        width: 120px;
        padding: 8px;
        vertical-align: middle;
    }

    &.date-column {
        width: 130px;
        padding: 4px 8px;
        position: relative;
        z-index: auto;
    }

    .date-picker-wrapper {
        position: relative;
        z-index: auto;
    }

    .date-picker {
        width: 100%;
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid ${Colors.black};
        font-size: 13px;
        cursor: pointer;
        background-color: white;
    }

    .date-picker-popper {
        z-index: 9999 !important;
    }

    .react-datepicker-wrapper {
        position: relative;
    }
    .react-datepicker__input-container {
        display: block;
        width: 100%;
    }
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

const StyledTable = styled(Table)`
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    
    th, td {
        padding: 8px 12px;
        border-bottom: 1px solid #eee;
        font-size: 14px;
    }

    th {
        background-color: #f8f9fa;
        font-weight: 600;
    }

    td {
        position: relative;
        z-index: auto;
    }
`
// Add styled Select component
const Select = styled.select`
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid ${Colors.black};
    font-size: 13px;
    width: 120px;  // Reduced from 200px
    background-color: white;
    cursor: pointer;

    &:hover {
        border-color: ${Colors.electricBlue};
    }

    &:focus {
        outline: none;
        border-color: ${Colors.electricBlue};
    }
`

const StyledDatePicker = styled(DatePicker)`
    width: 100%;
    border: none;
    color: black;
`

const DatePickerContainer = styled.div`
    border: 1px solid black;
    width: 120px;
    position: relative;
`

export default PolicyAppForm
