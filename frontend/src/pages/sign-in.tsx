import { Block, Colors, ColorsCSS } from '../styles/styles'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import React, { useState } from 'react'
import styled from 'styled-components'

const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email) && email.length > 3
}

const validatePassword = (password: string) => password.length > 6

type State = {
    email: string
    password: string
    error?: { validEmail?: boolean; validPassword?: boolean }
}

const SignIn = () => {
    const navigate = useNavigate()

    const [form, setInput] = useState<State>({
        email: '',
        password: '',
        error: undefined,
    })
    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        const { email, password } = form
        const [validEmail, validPassword] = [
            validateEmail(email),
            validatePassword(password),
        ]
        if (!validEmail || !validPassword) {
            setInput({ ...form, error: { validEmail, validPassword } })
            return
        }
        navigate('/home')
    }
    const signInText = 'SIGN IN'
    return (
        <StyledBlock>
            <head>
                <title>Surya Sign In</title>
                <meta content="Surya admin sign in" name="description" />
                <link href="/favicon.ico" rel="icon" />
            </head>

            <Main>
                <LogoDiv>
                    <Logo src="/logo white.png" />
                </LogoDiv>
                <SignInForm onSubmit={submit}>
                    <StyledDiv>
                        <AdminText>Admin</AdminText>
                        <SignInText>Sign In</SignInText>
                    </StyledDiv>
                    <InputFields>
                        <MarginDiv>
                            <Input
                                error={
                                    form.error?.validEmail !== undefined &&
                                    !form.error?.validEmail
                                        ? {
                                              message:
                                                  'Please enter valid email',
                                          }
                                        : undefined
                                }
                                label="email"
                                onChange={(e) => {
                                    setInput({
                                        ...form,
                                        email: e.target.value,
                                        error: undefined,
                                    })
                                }}
                                placeholder="email"
                                value={form.email}
                            />
                        </MarginDiv>
                        <MarginDiv>
                            <Input
                                error={
                                    form.error?.validPassword !== undefined &&
                                    !form.error?.validPassword
                                        ? {
                                              message:
                                                  'Please enter valid password',
                                          }
                                        : undefined
                                }
                                label="password"
                                onChange={(e) => {
                                    setInput({
                                        ...form,
                                        password: e.target.value,
                                        error: undefined,
                                    })
                                }}
                                placeholder="password"
                                type="password"
                                value={form.password}
                            />
                        </MarginDiv>
                        <Button onClick={submit}>{signInText}</Button>
                    </InputFields>
                </SignInForm>
            </Main>
            <Footer />
        </StyledBlock>
    )
}

const StyledBlock = styled(Block)`
    background: white;
`

const Main = styled.main`
    display: flex;
    flex-flow: row wrap;
    min-height: calc(100% - 50px);
    justify-content: center;
    background-image: url('https://media.cntraveler.com/photos/5f622dadb364bbb0663273fc/16:9/w_2560%2Cc_limit/RockefellerCenter-NYC-2020-B0D8KH.jpg');
    background-size: cover;
    background-position: center;
    padding: 20px;
`

const LogoDiv = styled.div`
    padding: 15px;
    width: 100%;
    margin-bottom: auto;
`

const Logo = styled.img`
    width: 60px;
    height: auto;
    margin: auto;
    object-fit: contain;
    margin-bottom: 23px;
    display: block;
`

const Footer = styled.footer`
    width: 100%;
    padding: 25px;
    background-color: ${Colors.grey};
`

const SignInForm = styled.form`
    width: 100%;
    max-width: 510px;
    padding: 50px 30px 30px;
    border-radius: 1px;
    border: solid 1px transparent;
    box-shadow: 2px 2px 3px rgb(0 0 0 / 12%);
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    background: white;
    margin-top: -52px;
    margin-bottom: auto;
`

const StyledDiv = styled.div`
    margin: auto;
    text-align: center;
    margin-top: 20px;
`

const AdminText = styled.h5`
    text-transform: uppercase;
    font-weight: 200;
    font-size: 12px;
    line-height: 15px;
    margin: 0;
    color: ${Colors.green};
`

const SignInText = styled.h1`
    text-transform: uppercase;
    font-weight: 500;
    font-size: 36px;
    line-height: 44px;
    text-align: center;
    color: ${Colors.black};
    margin: 8px 0 0 0;
`

const InputFields = styled.div`
    width: 100%;
    margin: 20px auto 0;
    max-width: 500px;
`

const Button = styled.button`
    font-family: inherit;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #ffffff;
    ${ColorsCSS.gradientCSS};
    padding: 15px 20px;
    margin: 8px auto;
    margin-top: 22px;
    text-transform: uppercase;
    width: 100%;
    border: none;
    border-radius: 2px;
    border-bottom: solid 5px #f8fdff;
    :hover {
        transform: scale(1.01);
    }
`

const MarginDiv = styled.div`
    margin: -5px auto 8px;
`

export default SignIn
