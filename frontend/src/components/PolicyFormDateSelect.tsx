import 'date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import React from 'react';

const Picker = ({ value, onChange, label }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
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
  </MuiPickersUtilsProvider>
);

export default Picker;
