import { Colors, fonts, transitionCss } from '../styles/styles'
import styled, { css } from 'styled-components'

const CreateNewPolicyButton = ({
    onClick,
    textOverride,
}: {
    onClick?: any
    textOverride?: string
}) => {
    const text = '+ Create new Policy' || textOverride
    return <CreateButton onClick={onClick}>{text}</CreateButton>
}

export const CreateButton = styled.button<{ disabled?: boolean }>`
    background: transparent;
    border-radius: 10px;
    padding: 8px 6px;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${transitionCss}
    color: ${({ disabled }) => (disabled ? Colors.grey : Colors.electricBlue)};
    font-weight: 600;
    font-size: ${fonts.size.default};
    margin-left: 32px;
    box-shadow: 2px 2px 2px rgb(0 0 0 / 2%);
    :hover {
        // transform: scale(1.03);
        background: #e0f0ff;
    }
`

export const buttonBaseCss = css`
    font-family: inherit;
    border-radius: 20px;
    font-size: 16px;
    text-align: center;
    padding: 18px 24px;
    flex: 1 1 auto;
    margin: 0 4px;
    ${transitionCss};

    :hover {
        opacity: 0.4;
    }
`

export const Save = styled.button`
    ${transitionCss}
    background: ${Colors.lightBlue};
    ${buttonBaseCss}
    border-radius: 8px;
    color: ${Colors.electricBlue};
`

export const SmallSave = styled(Save)`
    padding: 12px 40px;
    min-width: 200px;
    font-size: 14px;
    font-weight: 500;
`

export const Cancel = styled.button`
    ${transitionCss}
    background: rgba(249, 250, 250, 1);
    ${buttonBaseCss}
    color: ${Colors.text};
    :hover {
        background: rgba(100, 100, 100, 0.7);
    }
`

export const Close = styled.button`
    ${transitionCss}

    background: #F9FAFA;
    ${buttonBaseCss}
    mix-blend-mode: normal;
    border: 1px solid rgba(58, 86, 100, 0.08);
    box-sizing: border-box;
    border-radius: 28px;
    color: black;
    min-width: 200px;
    padding: 12px 24px;
    font-weight: 600;
    text-transform: uppercase;

    :hover {
        opacity: 0.68;
    }
`

export const Add = styled(Save)`
    max-width: 200px;
    width: 100%;
    margin-left: auto;
    font-weight: 500;
    padding: 12px;
    font-size: 14px;
`
export const StyledCancel = styled(Add)`
    background: #f4f5f6;
    padding: 12px 40px;
    min-width: 200px;
    color: #3a5665;
`

export const Submit = styled.button`
    font-weight: 600;
    font-size: 16px;
    color: #00aeff;
    text-align: center;
    background: #00aeff12;
    padding: 8px 16px;
    marigin-left: 8px;
    border-radius: 20px;
    height: 40px;
    min-width: 200px;
    margin: 12px;
    ${transitionCss};

    :hover {
        background: ${Colors.electricBlue};
        color: white;
    }
    :disabled {
        background: #80808021;
        color: #00000033;
    }
`
export const DarkSubmit = styled(Submit)`
    background: black;
    color: white;
`

const Buttons = {
    CreateNewPolicyButton,
}

export default Buttons
