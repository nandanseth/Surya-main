import { Colors, fonts } from '../../styles/styles'
import { StyledInput } from './Input'
import styled from 'styled-components'

const Label = styled.label`
    width: 100%;
    color: ${Colors.black};

    font-size: ${fonts.default};
    font-family: inherit;

    ${StyledInput}:disabled ~ & {
        color: ${Colors.grey};
    }
`

export default Label
