import React from 'react'
import styled from 'styled-components'
import { Colors, Title, transitionCss } from '../styles/styles'
// Import icons
import driversIcon from '../images/drivers icon.png'
import insuredIcon from '../images/insured icon.png'
import lossHistoryIcon from '../images/loss history icon.png'
import paymentsIcon from '../images/payments icon.png'
import policyIcon from '../images/policy icon.png'
import reinsuranceIcon from '../images/reinsurance icon.png'
import underwritingIcon from '../images/underwriting.png'
import vehicleIcon from '../images/vehicle icon.png'
import coverageIcon from '../images/coverage icon.png'
import { useMoralis } from "react-moralis"
import Moralis from 'moralis'
import uploadIcon from '../images/upload.jpg'

interface FormHeadProps {
    percent?: number
    current?: string
    setCurrent: (section: string) => void
    name?: string
}

export const FormHead: React.FC<FormHeadProps> = ({
    percent = 0,
    name = 'Name',
    current,
    setCurrent,
}) => {
    return (
        <Header>
            <ProgressContainer>
                <Background />
                <Progress percent={percent} />
            </ProgressContainer>
            <HeaderContent>
                <Left>
                    <NewApplication>New Application</NewApplication>
                    <Title>{name}</Title>
                </Left>
                <Right>
                    <StyledIcon
                        active={current === 'upload'}
                        onClick={() => setCurrent('upload')}
                        title="Upload Section"
                    >
                        <StyledImg src={uploadIcon} alt="upload" />
                    </StyledIcon>
                    <StyledIcon
                        active={current === 'underwriting'}
                        onClick={() => setCurrent('underwriting')}
                        title="Underwriting"
                    >
                        <StyledImg src={underwritingIcon} alt="underwriting" />
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
const ProgressContainer = styled.div`
    position: relative;
    height: 4px;
    width: 100%;
    background: #eee;
`

const Background = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background: #eee;
`

const Progress = styled.div<{ percent: number }>`
    position: absolute;
    height: 100%;
    width: ${props => props.percent * 100}%;
    background: #4CAF50;
    transition: width 0.3s ease;
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

const NewApplication = styled.span`
    font-size: 0.875rem;
    color: #666;
`

const StyledImg = styled.img`
    width: 100%;
    height: auto;
    object-fit: contain;
    margin: auto;
`