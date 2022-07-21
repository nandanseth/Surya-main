import { Container, useStyles } from './shared'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Checkbox from '../Form/Checkbox'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

const DriversSection = ({ drivers, setDrivers }: any) => {
    const classes = useStyles()
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Drivers</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container>
                        <Checkbox
                            checked={drivers.driverName}
                            labelText="Name"
                            onClick={() => {
                                setDrivers({
                                    ...drivers,
                                    driverName: !drivers.driverName,
                                })
                            }}
                        />

                        <Checkbox
                            checked={drivers.states}
                            labelText="State"
                            onClick={() => {
                                setDrivers({
                                    ...drivers,
                                    states: !drivers.states,
                                })
                            }}
                        />

                        <Checkbox
                            checked={drivers.licenseNumber}
                            labelText="License Number"
                            onClick={() => {
                                setDrivers({
                                    ...drivers,
                                    licenseNumber: !drivers.licenseNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={drivers.licenseEffDate}
                            labelText="Effective Date"
                            onClick={() => {
                                setDrivers({
                                    ...drivers,
                                    licenseEffDate: !drivers.licenseEffDate,
                                })
                            }}
                        />

                        <Checkbox
                            checked={drivers.licenseExpDate}
                            labelText="Expiration Date"
                            onClick={() => {
                                setDrivers({
                                    ...drivers,
                                    licenseExpDate: !drivers.licenseExpDate,
                                })
                            }}
                        />
                    </Container>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default DriversSection
