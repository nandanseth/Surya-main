import { Container, useStyles } from './shared'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Checkbox from '../Form/Checkbox'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'

const InsuredSection = ({ insured, setInsured, ...rest }) => {
    const classes = useStyles()
    return (
        <div>
            <Accordion {...rest}>
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
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    agent: !insured.agent,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.entity}
                            labelText="Entity"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    entity: !insured.entity,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.firstName}
                            labelText="First Name"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    firstName: !insured.firstName,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.middleName}
                            labelText="Middle Name"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    middleName: !insured.middleName,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.lastName}
                            labelText="Last Name"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    lastName: !insured.lastName,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.dob}
                            labelText="Date of Birth"
                            onChange={() => {
                                setInsured({ ...insured, dob: !insured.dob })
                            }}
                        />

                        <Checkbox
                            checked={insured.suffix}
                            labelText="Suffix"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    suffix: !insured.suffix,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.gender}
                            labelText="Gender"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    gender: !insured.gender,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.ssn}
                            labelText="SSN"
                            onChange={() => {
                                setInsured({ ...insured, ssn: !insured.ssn })
                            }}
                        />

                        <Checkbox
                            checked={insured.policyNum}
                            labelText="Address 1"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    address1: !insured.address1,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.address2}
                            labelText="Address 2"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    address2: !insured.address2,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.city}
                            labelText="City"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    city: !insured.city,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.state}
                            labelText="State"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    state: !insured.state,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.zipCode}
                            labelText="Zip Code"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    zipCode: !insured.zipCode,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.email}
                            labelText="Email"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    email: !insured.email,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.phoneNumber}
                            labelText="Phone Number"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    phoneNumber: !insured.phoneNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.licenseNumber}
                            labelText="License Number"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    licenseNumber: !insured.licenseNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.licenseEff}
                            labelText="License Effective Date"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    licenseEff: !insured.licenseEff,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.licenseExp}
                            labelText="License Expiration Date"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    licenseExp: !insured.licenseExp,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.contactNumber}
                            labelText="Contact Number"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    contactNumber: !insured.contactNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.contactEmail}
                            labelText="Contact Email"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    contactEmail: !insured.contactEmail,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.corporationName}
                            labelText="Corporation Name"
                            onChange={() => {
                                setInsured({
                                    ...insured,
                                    corporationName: !insured.corporationName,
                                })
                            }}
                        />

                        <Checkbox
                            checked={insured.taxIdNumber}
                            labelText="Tax Id Number"
                            onChange={() => {
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
