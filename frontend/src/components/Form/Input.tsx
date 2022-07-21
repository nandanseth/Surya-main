import { Colors, fonts, transitionCss } from '../../styles/styles'
import { ForwardedRef, forwardRef } from 'react'
import styled from 'styled-components'

const Input = forwardRef(
    (
        { error, loading, success, ...rest }: any,
        ref?: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <StyledInput
                {...rest}
                disabled={loading}
                isInvalid={!!error}
                ref={ref}
            />
        )
    }
)

export const StyledInput = styled.input<{ isInvalid?: boolean }>`
    width: 100%;
    -webkit-appearance: none;
    background-color: inherit;
    border-radius: 0;
    border-color: ${Colors.blue};
    padding: 8px 0;
    border-width: 0 0 1px 0;
    font-size: ${fonts.default};
    outline: none;

    ${transitionCss}

    ${({ isInvalid }) =>
        isInvalid &&
        `
        border-width: 0 0 2px 0 !important;
        padding-bottom: 6px !important;
        border-color: ${Colors.red} !important;

      `}
  
    &::placeholder {
        color: ${Colors.grey};
    }

    &:hover {
        border-color: ${Colors.electricBlue};
        border-width: 2px;
        padding-bottom: 6px;
    }

    &:disabled {
        color: ${Colors.grey};
        border-color: ${Colors.grey};
    }

    &:active,
    &:focus {
        border-color: ${Colors.electricBlue};
        border-width: 2px;
        padding-bottom: 6px;
    }
`

export default Input
// for some reason we gotta add this
