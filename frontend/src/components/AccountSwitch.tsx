import { Colors, transitionCss } from '../styles/styles'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import styled from 'styled-components'
import useComponentVisible from '../hooks/useComponentVisible'

const AccountSwitch = ({ title }) => {
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(false)

    const getArrow = () => {
        if (!isComponentVisible) {
            return <Down fontSize="medium" />
        }

        return <Up fontSize="medium" />
    }

    return (
        <Spacer ref={ref}>
            <Container
                onClick={() => {
                    setIsComponentVisible(!isComponentVisible)
                }}
            >
                <Title>{title}</Title>
                {getArrow()}
            </Container>
            {isComponentVisible && (
                <Options>
                    <OptionSelect
                        onClick={() => {
                            console.log('trust me danny')
                        }}
                    >
                        Sign Out
                    </OptionSelect>
                </Options>
            )}
        </Spacer>
    )
}

const Spacer = styled.div``

// rgba(58, 86, 100, 0.0398);
const Container = styled.div`
    background: #f7f7f7;

    border-radius: 20px;
    padding: 3px 8px;
    min-width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Title = styled.div`
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    color: ${Colors.text};
    margin-right: 3px;
`

const Down = styled(KeyboardArrowDown)`
    color: ${Colors.text};
`

const Up = styled(KeyboardArrowUp)`
    color: ${Colors.text};
`

const Options = styled.div`
    position: absolute;
    margin-top: 4px;
    padding: 4px;
    width: 200%;
    left: -100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 100px;
    align-content: center;
    background: #f8f8f9;
    box-shadow: 2px 2px 2px #00000014;
    border: solid 1px #00000014;
`

const OptionSelect = styled.div`
    cursor: pointer;
    width: 100%;
    background: white;
    text-align: center;
    color: ${Colors.text};
    font-weight: 600;
    font-size: 14px;
    border-radius: 100px;
    padding: 4px;
    ${transitionCss}
    :hover {
        opacity: 0.7;
    }
`

export default AccountSwitch
