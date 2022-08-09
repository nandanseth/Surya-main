import { Colors, fonts } from '../../styles/styles'
import styled from 'styled-components'

const Checkbox = ({ checked, labelText, ...props }) => (
    <StyledDiv>
        <Label>
            <CheckboxContainer>
                <HiddenCheckbox checked={checked} {...props} />
                <StyledCheckbox checked={checked}>
                    <Icon viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                    </Icon>
                </StyledCheckbox>
            </CheckboxContainer>
            <StyledSpan>{labelText}</StyledSpan>
        </Label>
    </StyledDiv>
)

const StyledDiv = styled.div`
    margin-top: 6px;
    margin-bottom: 8px;
    padding: 4px;
    display: flex;
    align-items: center;
`

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
`

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
`
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`

const StyledCheckbox = styled.div<{ checked?: boolean }>`
    display: inline-block;
    width: 16px;
    height: 16px;
    background: ${({ checked }) =>
        checked ? Colors.electricBlue : '#2899ff38'};
    border-radius: 3px;
    transition: all 150ms;
    border: solid 1px #2899ff12;

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px ${Colors.purple};
    }

    ${Icon} {
        visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
    }
`

const StyledSpan = styled.span`
    margin-left: ${fonts.size.small};
    font-size: ${fonts.size.default};
    font-weight: ${fonts.weights.regular};
    color: #030407;
`

const Label = styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;
`

export default Checkbox
