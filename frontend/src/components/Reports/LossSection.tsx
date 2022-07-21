import { Container, useStyles } from './shared'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Checkbox from '../Form/Checkbox'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

const LossSection = ({ lossHistory, setLossHistory }: any) => {
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
                        Loss History
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container>
                        <Checkbox
                            checked={lossHistory.accidentDate}
                            labelText="Accident Date"
                            onClick={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    states: !lossHistory.accidentDate,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.reportedDate}
                            labelText="Reported Date"
                            onClick={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    reportedDate: !lossHistory.reportedDate,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.claimNumber}
                            labelText="Claim Number"
                            onClick={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    claimNumber: !lossHistory.claimNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.claimType}
                            labelText="Claim Type"
                            onClick={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    claimType: !lossHistory.claimType,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.subClaimNumber}
                            labelText="Sub-Claim Number"
                            onClick={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    subClaimNumber: !lossHistory.subClaimNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.claimType}
                            labelText="Claim Type"
                            onClick={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    claimType: !lossHistory.claimType,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.totalIncurred}
                            labelText="Total Incurred"
                            onClick={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    totalIncurred: !lossHistory.totalIncurred,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.liabilityPaid}
                            labelText="Liability Paid"
                            onClick={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    liabilityPaid: !lossHistory.liabilityPaid,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.openReserve}
                            labelText="Open Reserve"
                            onClick={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    openReserve: !lossHistory.openReserve,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.openReserve}
                            labelText="Open Reserve"
                            onClick={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    openReserve: !lossHistory.openReserve,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.status}
                            labelText="Status"
                            onClick={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    status: !lossHistory.status,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.previousPolicyNumber}
                            labelText="Previous Policy Number"
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
                                setLossHistory({
                                    ...lossHistory,
                                    expirationDate: !lossHistory.expirationDate,
                                })
                            }}
                        />

                        <Checkbox
                            checked={lossHistory.isExperienceMode}
                            labelText="Experience Mode"
                            onClick={() => {
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
                            onClick={() => {
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
