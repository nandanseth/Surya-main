import { Container, useStyles } from './shared'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Checkbox from '../Form/Checkbox'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

const ReinsuranceSection = ({ reinsurance, setReinsurance }: any) => {
    const classes = useStyles()
    return (
        <div>
            <Accordion>
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
                            onClick={() => {
                                setReinsurance({
                                    ...reinsurance,
                                    reinsuranceType:
                                        !reinsurance.reinsuranceType,
                                })
                            }}
                        />

                        <Checkbox
                            checked={reinsurance.payments}
                            labelText="Payments"
                            onClick={() => {
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
