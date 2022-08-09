import { Container, useStyles } from './shared'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Checkbox from '../Form/Checkbox'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'

const PolicySection = ({ policy, setPolicy, ...rest }) => {
    const classes = useStyles()
    return (
        <div>
            <Accordion {...rest}>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Policy</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container>
                        <Checkbox
                            checked={policy.name}
                            labelText="Name"
                            onChange={() => {
                                setPolicy({ ...policy, name: !policy.name })
                            }}
                        />

                        <Checkbox
                            checked={policy.policyNum}
                            labelText="Policy Number"
                            onChange={() => {
                                setPolicy({
                                    ...policy,
                                    policyNum: !policy.policyNum,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.states}
                            labelText="State"
                            onChange={() => {
                                setPolicy({ ...policy, states: !policy.states })
                            }}
                        />

                        <Checkbox
                            checked={policy.classification}
                            labelText="Classification"
                            onChange={() => {
                                setPolicy({
                                    ...policy,
                                    classification: !policy.classification,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.lineOfBusiness}
                            labelText="Line Of Business"
                            onChange={() => {
                                setPolicy({
                                    ...policy,
                                    lineOfBusiness: !policy.lineOfBusiness,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.coverageTerm}
                            labelText="Coverage Term"
                            onChange={() => {
                                setPolicy({
                                    ...policy,
                                    coverageTerm: !policy.coverageTerm,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.policyCategory}
                            labelText="Policy Category"
                            onChange={() => {
                                setPolicy({
                                    ...policy,
                                    policyCategory: !policy.policyCategory,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.underwritingCode}
                            labelText="Underwriting Code"
                            onChange={() => {
                                setPolicy({
                                    ...policy,
                                    underwritingCode: !policy.underwritingCode,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.agent}
                            labelText="Agent"
                            onChange={() => {
                                setPolicy({ ...policy, agent: !policy.agent })
                            }}
                        />

                        <Checkbox
                            checked={policy.effectiveDate}
                            labelText="Effective Date"
                            onChange={() => {
                                setPolicy({
                                    ...policy,
                                    effectiveDate: !policy.effectiveDate,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.expirationDate}
                            labelText="Expiration Date"
                            onChange={() => {
                                setPolicy({
                                    ...policy,
                                    expirationDate: !policy.expirationDate,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.radius}
                            labelText="Radius"
                            onChange={() => {
                                setPolicy({ ...policy, radius: !policy.radius })
                            }}
                        />

                        <Checkbox
                            checked={policy.classCode}
                            labelText="Class Code"
                            onChange={() => {
                                setPolicy({
                                    ...policy,
                                    classCode: !policy.classCode,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.businessUseClass}
                            labelText="Business Use Class"
                            onChange={() => {
                                setPolicy({
                                    ...policy,
                                    businessUseClass: !policy.businessUseClass,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.sizeClass}
                            labelText="Size Class"
                            onChange={() => {
                                setPolicy({
                                    ...policy,
                                    sizeClass: !policy.sizeClass,
                                })
                            }}
                        />
                    </Container>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default PolicySection
