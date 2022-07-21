import { Container, useStyles } from './shared'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Checkbox from '../Form/Checkbox'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

const InsuredSection = ({ insured, setInsured }: any) => {
    const classes = useStyles()
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Insured</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container>
                        <Checkbox
                            checked={insured.agent}
                            labelText="Agent"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    agent: !insured.agent,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.entity}
                            labelText="Entity"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    entity: !insured.entity,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.firstName}
                            labelText="First Name"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    firstName: !insured.firstName,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.middleName}
                            labelText="Middle Name"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    middleName: !insured.middleName,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.lastName}
                            labelText="Last Name"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    lastName: !insured.lastName,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.dob}
                            labelText="Date of Birth"
                            onClick={() => {
                                setInsured({ ...insured, dob: !insured.dob })
                            }}
                        />

                        <Checkbox
                            checked={insured.suffix}
                            labelText="Suffix"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    suffix: !insured.suffix,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.gender}
                            labelText="Gender"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    gender: !insured.gender,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.ssn}
                            labelText="SSN"
                            onClick={() => {
                                setInsured({ ...insured, ssn: !insured.ssn })
                            }}
                        />

                        <Checkbox
                            checked={insured.policyNum}
                            labelText="Address 1"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    address1: !insured.address1,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.address2}
                            labelText="Address 2"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    address2: !insured.address2,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.city}
                            labelText="City"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    city: !insured.city,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.state}
                            labelText="State"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    state: !insured.state,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.zipCode}
                            labelText="Zip Code"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    zipCode: !insured.zipCode,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.email}
                            labelText="Email"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    email: !insured.email,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.phoneNumber}
                            labelText="Phone Number"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    phoneNumber: !insured.phoneNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.licenseNumber}
                            labelText="License Number"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    licenseNumber: !insured.licenseNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.licenseEff}
                            labelText="License Effective Date"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    licenseEff: !insured.licenseEff,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.licenseExp}
                            labelText="License Expiration Date"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    licenseExp: !insured.licenseExp,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.contactNumber}
                            labelText="Contact Number"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    contactNumber: !insured.contactNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.contactEmail}
                            labelText="Contact Email"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    contactEmail: !insured.contactEmail,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.corporationName}
                            labelText="Corporation Name"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    corporationName: !insured.corporationName,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.taxIdNumber}
                            labelText="Tax Id Number"
                            onClick={() => {
                                setInsured({
                                    ...insured,
                                    taxIdNumber: !insured.taxIdNumber,
                                })
                            }}
                        />
                    </Container>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default InsuredSection
