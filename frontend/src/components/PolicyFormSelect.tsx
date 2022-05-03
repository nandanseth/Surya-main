import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styled from 'styled-components';
import { InputContainer } from './Input';

const SuryaSelect = ({
  label = '',
  options,
  placeholder,
  value,
  onChange,
  style = {},
}) => (
  <Wrapper style={style}>
    <label>{label}</label>
    <InputContainer className="select-container">
        <select value={value === null ? '' : value} onChange={onChange}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
        </select>
  </InputContainer>
  </Wrapper>
);

const Wrapper = styled.div`
  margin: 12px 0;
  width: 100%;
`;

/*

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

export default SuryaSelect;
