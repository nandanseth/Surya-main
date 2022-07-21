import { Colors, fonts, transitionCss } from '../../styles/styles'
import FloatingLabelGroup from './Group'
import Label from './Label'
import styled from 'styled-components'

const Select = ({ label, ...rest }) => {
    return (
        <FloatingLabelGroup>
            <NewSelect {...rest}>{rest?.children}</NewSelect>

            <Label htmlFor={rest?.name}>${label}</Label>
        </FloatingLabelGroup>
    )
}

export const NewSelect = styled.select`
    background-color: inherit;
    cursor: pointer;
    font-size: ${fonts.size.default};
    padding: 8px 0;
    border-color: ${Colors.black};
    ${transitionCss}
    border-width: 0 0 1px 0;

    &:hover {
        border-color: ${Colors.blue};
        border-width: 0 0 2px 0;
    }

    &:active,
    &:focus {
        border-color: ${Colors.electricBlue};
        border-width: 0 0 2px 0;
        outline: none;
        padding-bottom: 6px;
    }
`

export default Select
