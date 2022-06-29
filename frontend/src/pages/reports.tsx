import React from 'react'
import Sidebar from '../components/Sidebar'
import styled from 'styled-components'

const Home = () => (
    <Main>
        <Flex>
            <Sidebar />
            <Content>
                <h1> reports </h1>
            </Content>
        </Flex>
    </Main>
)

const Main = styled.main`
    min-height: 100vh;
    height: 100%;
    width: 100%;
    display: block;
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const Content = styled.div`
    height: 100%;
    min-height: 100vh;
    background: white;
    flex: 1 1 auto;
`

export default Home
