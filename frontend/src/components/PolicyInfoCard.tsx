import { Colors } from '../styles/styles'
import styled from 'styled-components'

export default function PolicyInfoCard({ title, subtitle }) {
    return (
        <Container>
            <Title>{title}</Title>
            <SubTitle>{subtitle}</SubTitle>
        </Container>
    )
}

const Container = styled.div`
    background: rgba(52, 152, 194, 0.04);
    mix-blend-mode: normal;
    border-radius: 8px;
    box-sizing: border-box;
    border-radius: 8px;
    text-align: center;
    padding: 20px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    flex: 1 1 auto;
`

const Title = styled.div`
    font-weight: 600;
    font-size: 32px;
    line-height: 39px;
    /* identical to box height */
    text-align: center;
    color: #000000;
`

const SubTitle = styled.div`
    margin-top: 8px;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    color: ${Colors.text};
`
