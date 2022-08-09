import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import _without from 'lodash/without'
import Box from '@mui/material/Box'
import CancelIcon from '@mui/icons-material/Cancel'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

let names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
]

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

export default function MultipleSelectChip() {
    const theme = useTheme()
    const [personName, setPersonName] = React.useState([])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event
        setPersonName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value
        )
    }

    const handleDelete = (e, value) => {
        e.preventDefault()
        setPersonName(personName.filter((v) => v !== value))
    }

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                <Select
                    MenuProps={MenuProps}
                    id="demo-multiple-chip"
                    input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    labelId="demo-multiple-chip-label"
                    multiple
                    onChange={handleChange}
                    renderValue={(selected) => (
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                            {selected.map((value) => (
                                <Chip
                                    clickable
                                    deleteIcon={
                                        <CancelIcon
                                            onMouseDown={(event) =>
                                                event.stopPropagation()
                                            }
                                        />
                                    }
                                    key={value}
                                    label={value}
                                    onDelete={(e) => handleDelete(e, value)}
                                    style={{ margin: '3px' }}
                                />
                            ))}
                        </Box>
                    )}
                    value={personName}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            style={getStyles(name, personName, theme)}
                            value={name}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
