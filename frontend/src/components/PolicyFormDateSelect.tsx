import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import 'date-fns';
import React from 'react';

const Picker = ({ value, onChange, label }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      margin="normal"
      id="date-picker-dialog"
      label={label}
      format="MM/dd/yyyy"
      value={value}
      onChange={onChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />

  </MuiPickersUtilsProvider>
);

export default Picker;
