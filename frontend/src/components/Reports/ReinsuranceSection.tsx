import { Container, useStyles } from './shared'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Checkbox from '../Form/Checkbox'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'

const ReinsuranceSection = ({ reinsurance, setReinsurance, ...rest }) => {
    const classes = useStyles()
    return (
        <div>
            <Accordion {...rest}>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                        Reinsurance
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container>
                        <Checkbox
                            checked={reinsurance.payments}
                            labelText="Payments"
                            onChange={() => {
                                setReinsurance({
                                    ...reinsurance,
                                    reinsuranceType:
                                        !reinsurance.reinsuranceType,
                                })
                            }}
                        />

                        <Checkbox
                            checked={reinsurance.payments}
                            labelText="Amount"
                            onChange={() => {
                                setReinsurance({
                                    ...reinsurance,
                                    resInsAmount: !reinsurance.resInsAmount,
                                })
                            }}
                        />
                    </Container>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default ReinsuranceSection
