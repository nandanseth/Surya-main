import { checkAllKeys, testItem, urls } from '../shared'
import { FormContextProvider } from '../context/insured-context'
import { Header, Title, transitionCss } from '../styles/styles'
import { useAlert } from 'react-alert'
import { useEffect, useState } from 'react'
import Buttons from '../components/Buttons'
import Layout from '../utils/withLayout'
import Overlay from '../components/Overlay'
import PolicyForm from '../components/PolicyForm/PolicyForm'
import PolicyAppForm from '../components/PolicyForm/PolicyAppForm'
import PolicyRenewalForm from '../components/PolicyForm/PolicyRenewalForm'
import PolicyTable from '../components/PolicyForm/PolicyTable'
import Search from '../components/Search'
import styled from 'styled-components'
import Moralis from 'moralis'
import { useMoralis } from 'react-moralis'
import { APP_ID, SERVER_URL } from '../index'
import { writeUsers } from '../utils/users/getWriteUsers'


const title = 'Policies'

const Home = () => {
    const [show, setShow] = useState(false)
    const [showApplications, setShowApplications] = useState(false)
    const [showRenewals, setShowRenewals] = useState(false)
    const {authenticate, isAuthenticated, isAuthenticating, hasAuthError, authError, user, logout, account} = useMoralis();
    const [policies, setPolicies] = useState([testItem])
    const [moralisPolicies, setMoralisPolicies] = useState([testItem])
    const [search, setSearch] = useState('')
    const [role, setRole] = useState('')

    const alert = useAlert()

    // could be wrapped in a useMemo
    const searchFiter = (currentPolicies) => {
        if (search === '') {
            return currentPolicies
        }

        

        return currentPolicies?.filter((item) => {
            const policy = item?.policy
            const insured = item?.insured
            const id = item?.id
            return (
                checkAllKeys({ object: policy, check: search }) ||
                checkAllKeys({ object: insured, check: search }) ||
                id?.includes(search)
            )
        })
    }

    useEffect(() => {
        let address
        if (isAuthenticated) { 
            console.log(user.get('username'), 'sdka')
            if (user.get('username') && user.get('username').length > 3) {
                address = user.get('username')
            } else {
                address = user.get('ethAddress')
            }
            
        }

        console.log(writeUsers, 'sal')
        
        const getPolicies = async () => {
            try {
                const res = await fetch(urls.getAllPoliciesUrl)
                const data = await res.json()
                console.log(data, 'test')
                setPolicies(data)
            } catch (error) {
                alert.error('Error getting policies')
                console.log(error)
            }
        }
        const getMoralisPolicies = async () => {
            try {
                const appId = APP_ID;
                const serverUrl = SERVER_URL;  

                Moralis.start({ serverUrl, appId });
                const Policies = await (Moralis as any).Object.extend("Policies");

                const query = new (Moralis as any).Query(Policies);
                const data = await query.limit(1000).find();
                let dataJson
                const policyData = []
                for (const i in data) {
                    const object = data[i]
                    dataJson = JSON.parse(object.get("policyJson"))
                    policyData.push(dataJson)
                }
                setMoralisPolicies(policyData)
                console.log(dataJson, 'test')
                //setMoralisPolicies(data)
            } catch (error) {
                alert.error('Error getting policies')
                console.log(error)
            }
        }
        if (isAuthenticated) {
            getMoralisPolicies()
        }
        
        
    }, [isAuthenticated])

    const close = () => {
        setShow(false)
    }

    const closeApp = () => {
        setShowApplications(false)
    }

    const closeRenewals = () => {
        setShowRenewals(false)
    }


    const policiesToShow = searchFiter(moralisPolicies)
    // this will be the list
    return (
        <FormContextProvider>
            <Layout>
                <ContentLayout>
                    <ContentMain>
                        <Header>
                            <Title>{title}</Title>
                            {(isAuthenticated && writeUsers.includes(user.get('username'))) ? (
                                <>
                                <Buttons.CreateNewPolicyButton
                                    onClick={() => setShow(true)}
                                />
                                <Buttons.CreateNewPolicyButton
                                    onClick={() => setShowApplications(true)}
                                    textOverride="Pending Applications"
                                />
                                <Buttons.CreateNewPolicyButton
                                    onClick={() => setShowRenewals(true)}
                                    textOverride="Pending Renewals"
                                />
                                </>
                            ) : (<></>)}
                            
                            <Search
                                clear={() => {
                                    setSearch('')
                                }}
                                onChange={(e) => {
                                    setSearch(e.target.value.toUpperCase())
                                }}
                                placeholder="Search Policies"
                                style={{ marginLeft: 'auto' }}
                                value={search}
                            />
                        </Header>
                        <Section>
                            <PolicyTable policies={policiesToShow} />
                        </Section>
                    </ContentMain>
                    <Side />
                </ContentLayout>
                {show && (
                    <Overlay
                        show={show}
                        style={{ background: 'rgba(11, 17, 20, 0.7939303)' }}
                    >
                        <Wrapper
                            onClick={(e) => {
                                if (e.currentTarget !== e.target) {
                                    return
                                }
                                close()
                            }}
                        >
                            <PolicyForm
                                close={() => {
                                    close()
                                }}
                                from="new"
                            />
                        </Wrapper>
                    </Overlay>
                )}
                {showApplications && (
                    <Overlay
                        show={showApplications}
                        style={{ background: 'rgba(11, 17, 20, 0.7939303)' }}
                    >
                        <Wrapper
                            onClick={(e) => {
                                if (e.currentTarget !== e.target) {
                                    return
                                }
                                closeApp()
                            }}
                        >
                            <PolicyAppForm
                                close={() => {
                                    closeApp()
                                }}
                            />
                        </Wrapper>
                    </Overlay>
                )}
                {showRenewals && (
                    <Overlay
                        show={showRenewals}
                        style={{ background: 'rgba(11, 17, 20, 0.7939303)' }}
                    >
                        <Wrapper
                            onClick={(e) => {
                                if (e.currentTarget !== e.target) {
                                    return
                                }
                                closeRenewals()
                            }}
                        >
                            <PolicyRenewalForm
                                close={() => {
                                    closeRenewals()
                                }}
                            />
                        </Wrapper>
                    </Overlay>
                )}
            </Layout>
        </FormContextProvider>
    )
}

const ContentLayout = styled.div`
    height: auto;
    min-height: 100%;
    display: flex;
    width: 100%;
`

const ContentMain = styled.div`
    padding: 10px;
    flex: 1 1 auto;
`

const Side = styled.div`
    margin-left: auto;
    padding: 0px 12px;
    display: flex;
    flex: column;
    max-width: 160px;
`

const Section = styled.section`
    width: 100%;
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

const Exit = styled.div`
    position: absolute;
    right: 20px;
    top: 20px;
    font-weight: 400;
    font-weight: 300;
    font-size: 60px;
    text-align: right;
    color: white;
    opacity: 0.2;
    cursor: pointer;
    height: 40px;
    width: 40px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${transitionCss};
    :hover {
        opacity: 1;
    }
`

export default Home
