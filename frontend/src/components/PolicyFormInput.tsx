import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const SuryaInput = ({
  label = '', placeholder, value, onChange, style = {}, name = '', ...rest
}) => (

  <Wrapper style={style}>
    <TextField
      label={label}
      variant="outlined"
      value={value}
      placeholder={placeholder}
      InputLabelProps={{ shrink: true }}
      fullWidth
      name={name}
      onChange={onChange}
      {...rest}
    />
  </Wrapper>
);

const Wrapper = styled.div`
  margin: 12px 0;
  width: 100%;
`;

export default SuryaInput;
