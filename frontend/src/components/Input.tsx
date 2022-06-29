import { Colors } from '../styles/styles'
import styled from 'styled-components'

const Input = ({
    name,
    onChange,
    style,
    label,
    value,
    error,
    placeholder,
    isPassword,
}: {
    onChange?: any
    name?: string
    style?: any
    label?: string | number
    value?: any
    error?: { message?: string }
    placeholder?: string
    isPassword?: boolean
}) => {
    if (error) {
        console.log(error)
    }
    const hasError = error !== undefined
    return (
        <Div>
            <Label>{label}</Label>
            <StyledInput
                hasError={hasError}
                name={name}
                onChange={onChange}
                placeholder={placeholder || `${label}`}
                style={style}
                type={isPassword ? 'password' : 'text'}
                value={value}
            />
            {hasError ? <ErrorText>{error?.message} </ErrorText> : null}
        </Div>
    )
}

const ErrorText = styled.div`
    color: #ff0b65;
    font-weight: 400;
    font-size: 12px;
`

const Div = styled.div`
    width: 100%;
    flex: 1 1 auto;
`

const Label = styled.label`
    font-weight: 300;
    font-size: 10px;
    line-height: 15px;
    color: ${Colors.text};
    opacity: 0.52;
    top: 20px;
    position: relative;
    right: -8px;
    z-index: 1;
`

const StyledInput = styled.input<{ hasError: boolean }>`
    outline: none;
    width: 100%;
    font: inherit;
    color: ${Colors.black};
    font-weight: 300;
    font-size: 14px;
    line-height: 22px;
    background: rgba(150, 150, 150, 0.0240385);
    border: 1px solid
        ${({ hasError }) =>
            hasError ? '#ff0b65' : 'rgba(166, 182, 188, 0.171902)'};
    box-sizing: border-box;
    border-radius: 2px;
    padding: 20px 8px 8px;
    :focus {
        background: white;
    }
`

export default Input

export const InputContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    :focus-within label {
        transform: translate(0, 12px) scale(0.8);
        color: #0a53e4;
    }

    label {
        position: absolute;
        pointer-events: none;
        transform: translate(0, 23px) scale(1);
        transform-origin: top left;
        transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        color: #6f81a5;
        font-size: 16px;
        line-height: 1;
        left: 16px;
    }

    input {
        height: 64px;
        border-radius: 4px;
        border: none;
        padding: 24px 16px 4px 16px;
        font-size: 16px;
        line-height: 1;
        outline: none;
        box-shadow: none;
        transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    }

    input:focus {
        box-shadow: 0 0 0 2px #79b1ff;
    }
`

/*

const Container = styled.div`
 position: relative;
  display: flex;
  flex-direction: column;

  :focus-within label {
    transform: translate(0, 12px) scale(0.8);
    color: #0a53e4;
  }

  label {
    position: absolute;
    pointer-events: none;
    transform: translate(0, 23px) scale(1);
    transform-origin: top left;
    transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    color: #6f81a5;
    font-size: 16px;
    line-height: 1;
    left: 16px;
  }

  input {
  height: 64px;
  border-radius: 4px;
  border: none;
  padding: 24px 16px 4px 16px;
  font-size: 16px;
  line-height: 1;
  outline: none;
  box-shadow: none;
  transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }

  input:focus {
  box-shadow: 0 0 0 2px #79b1ff;
  }

`;

const Label = styled.label`
  position: absolute;
  pointer-events: none;
  transform: translate(0, 23px) scale(1);
  transform-origin: top left;
  transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  color: #6f81a5;
  font-size: 16px;
  line-height: 1;
  left: 16px;
`;


.input-container input {
  height: 64px;
  border-radius: 4px;
  border: none;
  padding: 24px 16px 4px 16px;
  font-size: 16px;
  line-height: 1;
  outline: none;
  box-shadow: none;
  transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.input-container input:focus {
  box-shadow: 0 0 0 2px #79b1ff;
}


*/
