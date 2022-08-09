import { Colors, transitionCss } from '../styles/styles'
import { InputContainer } from './Input'
import styled from 'styled-components'

const SuryaSelect = ({
    label = '',
    options,
    placeholder,
    value,
    onChange,
    style = {},
    ...rest
}) => (
    <Wrapper style={style}>
        <StyledLabel htmlFor={label}>{label}</StyledLabel>
        <InputContainer className="select-container">
            <StyledSelect
                name={label}
                onChange={onChange}
                value={value === null ? '' : value}
            >
                {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </StyledSelect>
        </InputContainer>
    </Wrapper>
)

const Wrapper = styled.div`
    width: 100%;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 8px 0;
    cursor: pointer;
`

const StyledLabel = styled.label`
    width: 100%;
    font-size: 14px;
    letter-spacing: 0px;
    font-weight: 400;
    font-family: inherit;
    /* padding: 6px 0; */
    display: inline-block;
    color: #757575;
`

const StyledSelect = styled.select`
    width: 100%;
    min-width: 15ch;
    border-radius: 0.25em;
    background-color: #ffffff;
    border: solid 1px #0000001a;
    padding: 8px 6px;
    cursor: pointer;
    display: grid;
    grid-template-areas: select;
    align-items: center;
    position: relative;
    margin-top: 6px;
    ${transitionCss};
    padding-right: 12px;

    :hover {
        border-color: ${Colors.electricBlue};
        border-width: 1px;
    }

    ::after {
        content: '';
        width: em;
        height: 0.5em;
        background-color: ${Colors.electricBlue};
        clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    }
`

/*
display: grid;
  grid-template-areas: "select";
  align-items: center;
  position: relative;

  select,
  &::after {
    grid-area: select;
  }

  min-width: 15ch;
  max-width: 30ch;

  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  padding: 0.25em 0.5em;

  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;

    <Select
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      isSearchable={isSearchable}
      components={{
        DropdownIndicator: () => (
          <ArrowHolder>
            <KeyboardArrowDown size="small" />
          </ArrowHolder>
        ),
        IndicatorSeparator: () => null,
        Control,
      }}
      value={value}
      onChange={onChange}
    />

const Label = styled.label`
    font-size: 12px;
    position: absolute;
    top: 8px;
    left: 16px;
    color: black;
    mix-blend-mode: normal;
    opacity: 0.582;
    font-weight: 400;
`; */

export default SuryaSelect
