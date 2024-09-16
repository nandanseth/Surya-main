import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

const SuryaDatePicker = ({ value, onChange, label }) => (
    <LocalizationProvider utils={DateFnsUtils}>
        <DatePicker
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
            format="MM/dd/yyyy"
            id="date-picker-dialog"
            label={label}
            margin="normal"
            onChange={onChange}
            value={value}
        />
    </LocalizationProvider>
)

export default SuryaDatePicker
