import { Container, useStyles } from './shared'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Checkbox from '../Form/Checkbox'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'

const LossSection = ({ lossHistory, setLossHistory, ...rest }) => {
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
                        Loss History
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container>
                        <Checkbox
                            checked={lossHistory.accidentDate}
                            labelText="Accident Date"
                            onChange={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    accidentDate: !lossHistory.accidentDate,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.reportedDate}
                            labelText="Reported Date"
                            onChange={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    reportedDate: !lossHistory.reportedDate,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.claimNumber}
                            labelText="Claim Number"
                            onChange={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    claimNumber: !lossHistory.claimNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.claimType}
                            labelText="Claim Type"
                            onChange={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    claimType: !lossHistory.claimType,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.subClaimNumber}
                            labelText="Sub-Claim Number"
                            onChange={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    subClaimNumber: !lossHistory.subClaimNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.totalIncurred}
                            labelText="Total Incurred"
                            onChange={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    totalIncurred: !lossHistory.totalIncurred,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.liabilityPaid}
                            labelText="Liability Paid"
                            onChange={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    liabilityPaid: !lossHistory.liabilityPaid,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.openReserve}
                            labelText="Open Reserve"
                            onChange={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    openReserve: !lossHistory.openReserve,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.status}
                            labelText="Status"
                            onChange={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    status: !lossHistory.status,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.previousPolicyNumber}
                            labelText="Previous Policy Number"
                            onChange={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    previousPolicyNumber:
                                        !lossHistory.previousPolicyNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.priorCarrierName}
                            labelText="Prior Carrier Name"
                            onChange={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    priorCarrierName:
                                        !lossHistory.priorCarrierName,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.originalInceptionDate}
                            labelText="Original Inception date"
                            onChange={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    originalInceptionDate:
                                        !lossHistory.originalInceptionDate,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.expirationDate}
                            labelText="Expiration Date"
                            onChange={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    expirationDate: !lossHistory.expirationDate,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.isExperienceMode}
                            labelText="Experience Mode"
                            onChange={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    isExperienceMode:
                                        !lossHistory.isExperienceMode,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.isPolicyTransferred}
                            labelText="Policy Transferred"
                            onChange={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    isPolicyTransferred:
                                        !lossHistory.isPolicyTransferred,
                                })
                            }}
                        />
                    </Container>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default LossSection
