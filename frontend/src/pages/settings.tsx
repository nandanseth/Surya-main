import { Header, Title, Form } from '../styles/styles'
import { useState, useEffect } from 'react'
import Layout from '../utils/withLayout'
import styled from 'styled-components'
import Moralis from 'moralis'
import { useMoralis } from 'react-moralis'
import SuryaInput from '../components/PolicyForm/PolicyFormInput'
import { Accept, Submit } from '../components/Buttons'
const title = 'Settings'

const { Section, SectionTitle, InputWrapper, Flex } = Form

function Home() {

    const [username, setUsername] = useState('')
    const [usernameEntered, setUsernameEntered] = useState('')
    const {authenticate, isAuthenticated, isAuthenticating, hasAuthError, authError, user, logout, account} = useMoralis();


    useEffect(() => {

        if (!user) return null;

        setUsername(user.get("username"))


    }, [user])


    const saveUserInfo = async() => {
        if (usernameEntered !== "") {
            user.set('username', usernameEntered)
        }
        await user.save()

        setUsername(user.get('username'))

        window.location.reload()
    }




    return (
        <Layout>
            <Wrapper>
                <Content>
                    <Header>
                        <Title>{title}</Title>
                    </Header>
                    <Section>
                    <SectionTitle>Username</SectionTitle>
                    <Flex>
                    <SuryaInput
                            label="Username"
                            onChange={(e) => {
                                setUsernameEntered(e.target.value)
                            }}
                            defaultValue={username}
                            placeholder="Username"
                            value={usernameEntered}
                        />
                    
                    </Flex>
                    <Submit onClick={()=>saveUserInfo()}>Submit</Submit>
                    </Section>
                </Content>
            </Wrapper>
        </Layout>
    )
    
}

const Wrapper = styled.div`
    padding: 24px;
`
const Content = styled.div`
    height: 100%;
    background: white;
    flex: 1 1 auto;
`

export default Home
