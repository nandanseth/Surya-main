import { Container, useStyles } from './shared'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Checkbox from '../Form/Checkbox'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

const PolicySection = ({ policy, setPolicy }: any) => {
    const classes = useStyles()
    return (
        <div>
            <Accordion>
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
                            onClick={() => {
                                setPolicy({ ...policy, name: !policy.name })
                            }}
                        />

                        <Checkbox
                            checked={policy.policyNum}
                            labelText="Policy Number"
                            onClick={() => {
                                setPolicy({
                                    ...policy,
                                    policyNum: !policy.policyNum,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.states}
                            labelText="State"
                            onClick={() => {
                                setPolicy({ ...policy, states: !policy.states })
                            }}
                        />

                        <Checkbox
                            checked={policy.classification}
                            labelText="Classification"
                            onClick={() => {
                                setPolicy({
                                    ...policy,
                                    classification: !policy.classification,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.lineOfBusiness}
                            labelText="Line Of Business"
                            onClick={() => {
                                setPolicy({
                                    ...policy,
                                    lineOfBusiness: !policy.lineOfBusiness,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.coverageTerm}
                            labelText="Coverage Term"
                            onClick={() => {
                                setPolicy({
                                    ...policy,
                                    coverageTerm: !policy.coverageTerm,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.policyCategory}
                            labelText="Policy Category"
                            onClick={() => {
                                setPolicy({
                                    ...policy,
                                    policyCategory: !policy.policyCategory,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.underwritingCode}
                            labelText="Underwriting Code"
                            onClick={() => {
                                setPolicy({
                                    ...policy,
                                    underwritingCode: !policy.underwritingCode,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.agent}
                            labelText="Agent"
                            onClick={() => {
                                setPolicy({ ...policy, agent: !policy.agent })
                            }}
                        />

                        <Checkbox
                            checked={policy.effectiveDate}
                            labelText="Effective Date"
                            onClick={() => {
                                setPolicy({
                                    ...policy,
                                    effectiveDate: !policy.effectiveDate,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.expirationDate}
                            labelText="Expiration Date"
                            onClick={() => {
                                setPolicy({
                                    ...policy,
                                    expirationDate: !policy.expirationDate,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.radius}
                            labelText="Radius"
                            onClick={() => {
                                setPolicy({ ...policy, radius: !policy.radius })
                            }}
                        />

                        <Checkbox
                            checked={policy.classCode}
                            labelText="Class Code"
                            onClick={() => {
                                setPolicy({
                                    ...policy,
                                    classCode: !policy.classCode,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.businessUseClass}
                            labelText="Business Use Class"
                            onClick={() => {
                                setPolicy({
                                    ...policy,
                                    businessUseClass: !policy.businessUseClass,
                                })
                            }}
                        />

                        <Checkbox
                            checked={policy.sizeClass}
                            labelText="Size Class"
                            onClick={() => {
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
