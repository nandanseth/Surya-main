import styled from 'styled-components'
import TextField from '@mui/material/TextField'

const SuryaCheckbox = ({
    label = '',
    placeholder,
    value,
    defaultValue = '',
    onChange,
    style = {},
    name = '',
    ...rest
}) => (
    <Wrapper>
        <input
            InputLabelProps={{ shrink: true }}
            fullWidth
            label={label}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            variant="outlined"
            {...rest}
        />
    </Wrapper>
)

const Wrapper = styled.div`
    margin: 12px 0;
    width: 100%;
    flex: 1 1 auto;
`

export default SuryaCheckbox
