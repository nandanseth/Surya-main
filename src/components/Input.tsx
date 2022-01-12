import styled from 'styled-components';
import { Colors } from '../styles/styles';

const Input = ({
  name,
  onChange, style, label, value, error, placeholder, isPassword,
} :
{
  onChange?: any;
  name?: string;
  style?: any;
  label?: string | number;
  value?: any;
  error?: { message?: string };
  placeholder?: string;
  isPassword?: boolean;
}) => {
  if (error) {
    console.log(error);
  }
  const hasError = error !== undefined;
  return (
    <Div>
      <Label>{label}</Label>
      <StyledInput
        hasError={hasError}
        name={name}
        type={isPassword ? 'password' : 'text'}
        onChange={onChange}
        value={value}
        style={style}
        placeholder={placeholder || (`${label}`)}
      />
      {
        hasError
          ? (
            <ErrorText>
              {error?.message}
              {' '}
            </ErrorText>
          )
          : null
      }
    </Div>
  );
};

const ErrorText = styled.div`
    color: #ff0b65;
    font-weight: 400;
    font-size: 12px;
`;

const Div = styled.div`
    width: 100%;
    flex: 1 1 auto;
`;

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
`;

const StyledInput = styled.input<{ hasError: boolean }>`
    outline: none;
    width: 100%;
    font: inherit;
    color: ${Colors.black};
    font-weight: 300;
    font-size: 14px;
    line-height: 22px;
    background: rgba(150, 150, 150, 0.0240385);
    border: 1px solid ${({ hasError }) => (hasError ? '#ff0b65' : 'rgba(166, 182, 188, 0.171902)')}; ;
    box-sizing: border-box;
    border-radius: 2px;
    padding: 20px 8px 8px;
    :focus {
        background: white;
    }
`;

export default Input;
