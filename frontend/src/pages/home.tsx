import { FormContextProvider } from '../context/insured-context'
import { Header, Title } from '../styles/styles'
import { testItem, testPolicies, urls } from '../shared'
import { useEffect, useState } from 'react'
import Buttons from '../components/Buttons'
import Layout from '../utils/withLayout'
import Overlay from '../components/Overlay'
import PolicyForm from '../components/PolicyForm'
import PolicyTable from '../components/PolicyTable'
import Search from '../components/Search'
import styled from 'styled-components'

const title = 'Policies'

const checkAllKeys = ({ object, check }) => {
    const keys = Object.keys(object ?? {})
    return keys.some((key) => {
        return String(object[key]).includes(check)
    })
}

const Home = () => {
    const [show, setShow] = useState(false)
    const [policies, setPolicies] = useState([testItem])
    const [search, setSearch] = useState('')

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
        const headers = {}
        const getPolicies = async () => {
            try {
                const res = await fetch(urls.getAllPoliciesUrl)
                const data = await res.json()
                console.log(data, 'test')
                setPolicies(data)
            } catch (error) {
                alert(error)
                console.log(error)
            }
        }
        getPolicies()
    }, [])

    const close = () => {
        setShow(false)
    }

    const policiesToShow = searchFiter(policies)
    // this will be the list
    return (
        <FormContextProvider>
            <Layout>
                <ContentLayout>
                    <ContentMain>
                        <Header>
                            <Title>{title}</Title>
                            <Buttons.CreateNewPolicyButton
                                onClick={() => {
                                    setShow(true)
                                }}
                            />
                            <Search
                                clear={() => {
                                    setSearch('')
                                }}
                                onChange={(e) => {
                                    setSearch(e.target.value)
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
                        <Wrapper>
                            <Exit onClick={close}>X</Exit>
                            <PolicyForm
                                close={() => {
                                    console.log('hey')
                                    close()
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
`

const Exit = styled.div`
    position: absolute;
    right: 20px;
    top: 20px;
    font-weight: 400;
    font-size: 24px;
    text-align: right;
    color: #ffffff;
    cursor: pointer;
    background: #ffffff36;
    height: 40px;
    width: 40px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default Home
