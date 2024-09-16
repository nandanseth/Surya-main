import { Container, useStyles } from './shared'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Checkbox from '../Form/Checkbox'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'

const CoverageSection = ({ coverage, setCoverage, makeAllTrue, ...rest }) => {
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
                        Coverage
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                        <Checkbox
                            checked={coverage.overall}
                            labelText="Select All"
                            onChange={() => {
                                if (coverage.overall) {
                                    setCoverage(makeAllTrue(coverage, false))
                                } else {
                                    setCoverage(makeAllTrue(coverage, true))
                                }
                                
                            }}
                        />
                    <Container>
                        <Checkbox
                            checked={coverage.overall}
                            labelText="Overall"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    overall: !coverage.overall,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.deductable}
                            labelText="Deductible"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    deductable: !coverage.deductable,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.deductableAmount}
                            labelText="Deductible Amount"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    deductableAmount:
                                        !coverage.deductableAmount,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.deductableAutoEntry}
                            labelText="Deductible Auto Entry"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    deductableAutoEntry:
                                        !coverage.deductableAutoEntry,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.combinedSectionLimit}
                            labelText="Combined Section Limit"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    combinedSectionLimit:
                                        !coverage.combinedSectionLimit,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.combinedSectionEntry}
                            labelText="Combined Section Entry"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    combinedSectionEntry:
                                        !coverage.combinedSectionEntry,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.splitSectionBodyPerPerson}
                            labelText="Split Section Body Per Person"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    splitSectionBodyPerPerson:
                                        !coverage.splitSectionBodyPerPerson,
                                })
                            }}
                        />

                        <Checkbox
                            checked={
                                coverage.splitSectionBodyPerAccidentOptions
                            }
                            labelText="Split Section Body Per Accident Options"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    splitSectionBodyPerAccidentOptions:
                                        !coverage.splitSectionBodyPerAccidentOptions,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.splitSectionPropertyDamageOptions}
                            labelText="Split Section Property Damage Options"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    splitSectionPropertyDamageOptions:
                                        !coverage.splitSectionPropertyDamageOptions,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.splitSectionAutoEntryOptions}
                            labelText="Split Section Auto Entry Options"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    splitSectionAutoEntryOptions:
                                        !coverage.splitSectionAutoEntryOptions,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.medicalSingleLimit}
                            labelText="Medical Single Limit"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    medicalSingleLimit:
                                        !coverage.medicalSingleLimit,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.medicalSingleEntry}
                            labelText="Medical Single Entry"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    medicalSingleEntry:
                                        !coverage.medicalSingleEntry,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.medicalSplitBodyPerPerson}
                            labelText="Medical Split Body Per Person"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    medicalSplitBodyPerPerson:
                                        !coverage.medicalSplitBodyPerPerson,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.medicalSplitBodyPerAccident}
                            labelText="Medical Split Body Per Accident"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    medicalSplitBodyPerAccident:
                                        !coverage.medicalSplitBodyPerAccident,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.medicalSplitPropertyDamage}
                            labelText="Medical Split Property Damage"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    medicalSplitPropertyDamage:
                                        !coverage.medicalSplitPropertyDamage,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.medicalSplitAutoEntry}
                            labelText="Medical Split Auto Entry"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    medicalSplitAutoEntry:
                                        !coverage.medicalSplitAutoEntry,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.pIProtectionSingleLimit}
                            labelText="Personal Injury Protection Single Limit"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    pIProtectionSingleLimit:
                                        !coverage.pIProtectionSingleLimit,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.pIProtectionSingleEntry}
                            labelText="Personal Injury Protection Single Entry"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    pIProtectionSingleEntry:
                                        !coverage.pIProtectionSingleEntry,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.pIProtectionSplitBodyPerPerson}
                            labelText="Personal Injury Protection Split Body Per Person"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    pIProtectionSplitBodyPerAccident:
                                        !coverage.pIProtectionSplitBodyPerPerson,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.pIProtectionSplitBodyPerAccident}
                            labelText="Personal Injury Protection Split Body Per accident"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    pIProtectionSplitBodyPerAccident:
                                        !coverage.pIProtectionSplitBodyPerAccident,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.pIProtectionSplitPropertyDamage}
                            labelText="Personal Injury Protection Split Property Damage"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    pIProtectionSplitPropertyDamage:
                                        !coverage.pIProtectionSplitPropertyDamage,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.pIProtectionSplitAutoEntry}
                            labelText="Personal Injury Protection Split Auto Entry"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    pIProtectionSplitAutoEntry:
                                        !coverage.pIProtectionSplitAutoEntry,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.underinsuredMotoristSingleLimit}
                            labelText="Underinsured Motorist Single Limit"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    underinsuredMotoristSingleLimit:
                                        !coverage.underinsuredMotoristSingleLimit,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.underMotoristAuto}
                            labelText="Underinsured Motorist Auto"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    underMotoristAuto:
                                        !coverage.underMotoristAuto,
                                })
                            }}
                        />

                        <Checkbox
                            checked={
                                coverage.underinsuredMotoristSingleAutoEntry
                            }
                            labelText="Underinsured Motorist Single Auto Entry"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    underinsuredMotoristSingleAutoEntry:
                                        !coverage.underinsuredMotoristSingleAutoEntry,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.underMotoristBodyPerPerson}
                            labelText="Underinsured Motorist Body Per Person"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    underMotoristBodyPerPerson:
                                        !coverage.underMotoristBodyPerPerson,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.underMotoristBodyPerAccident}
                            labelText="Underinsured Motorist Body Per Accident"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    underMotoristBodyPerAccident:
                                        !coverage.underMotoristBodyPerAccident,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.underMotoristProperty}
                            labelText="Underinsured Motorist Property Damage"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    underMotoristProperty:
                                        !coverage.underMotoristProperty,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.unMotoristAuto}
                            labelText="Uninsured Motorist Auto"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    unMotoristAuto: !coverage.unMotoristAuto,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.unMotoristBodyPerAccident}
                            labelText="Uninsured Motorist Body Per Accident"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    unMotoristBodyPerAccident:
                                        !coverage.unMotoristBodyPerAccident,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.unMotoristBodyPerPerson}
                            labelText="Uninsured Motorist Body Per Person"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    unMotoristBodyPerPerson:
                                        !coverage.unMotoristBodyPerPerson,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.unMotoristProperty}
                            labelText="Uninsured Motorist Property"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    unMotoristProperty:
                                        !coverage.unMotoristProperty,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.uninsuredMotoristSingleAutoEntry}
                            labelText="Uninsured Motorist Single Auto Entry"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    uninsuredMotoristSingleAutoEntry:
                                        !coverage.uninsuredMotoristSingleAutoEntry,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.uninsuredMotoristSingleLimit}
                            labelText="Uninsured Motorist Single Limit"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    uninsuredMotoristSingleLimit:
                                        !coverage.uninsuredMotoristSingleLimit,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.personalInjury}
                            labelText="Personal Injury"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    personalInjury: !coverage.personalInjury,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.medicalPayments}
                            labelText="Medical Payments"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    medicalPayments: !coverage.medicalPayments,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.underinsuredMotorist}
                            labelText="Underinsured Motorist"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    underinsuredMotorist:
                                        !coverage.underinsuredMotorist,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.uninsuredMotorist}
                            labelText="Uninsured Motorist"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    uninsuredMotorist:
                                        !coverage.uninsuredMotorist,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.csl}
                            labelText="CSL"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    csl: !coverage.csl,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.nonOwnedCSL}
                            labelText="Non Owned CSL"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    nonOwnedCSL: !coverage.nonOwnedCSL,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.cslSingleLimit}
                            labelText="CSL Single Limit"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    cslSingleLimit: !coverage.cslSingleLimit,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.cslSingleLimit}
                            labelText="CSL Single Limit"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    cslSingleLimit: !coverage.cslSingleLimit,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.cslBodyPerAccident}
                            labelText="CSL Body Per Accident"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    cslBodyPerAccident:
                                        !coverage.cslBodyPerAccident,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.cslBodyPerPerson}
                            labelText="CSL Body Per Person"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    cslBodyPerPerson:
                                        !coverage.cslBodyPerPerson,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.cslSingleAuto}
                            labelText="CSL Single Auto"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    cslSingleAuto: !coverage.cslSingleAuto,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.cslSplitAuto}
                            labelText="CSL Split Auto"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    cslSplitAuto: !coverage.cslSplitAuto,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.cslProperty}
                            labelText="CSL Property Damage"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    cslProperty: !coverage.cslProperty,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.nonCslSingleAuto}
                            labelText="Non-CSL Single Auto"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    nonCslSingleAuto:
                                        !coverage.nonCslSingleAuto,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.nonCslSplitAuto}
                            labelText="Non-CSL Split Auto"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    nonCslSplitAuto: !coverage.nonCslSplitAuto,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.nonCslSingleLimit}
                            labelText="Non-CSL Single Limit"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    nonCslSingleLimit:
                                        !coverage.nonCslSingleLimit,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.nonCslBodyPerAccident}
                            labelText="Non-CSL Body Per Accident"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    nonCslBodyPerAccident:
                                        !coverage.nonCslBodyPerAccident,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.nonCslProperty}
                            labelText="Non-CSL Property Damage"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    nonCslProperty: !coverage.nonCslProperty,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.nonCslBodyPerPerson}
                            labelText="Non-CSL Body Per Accident"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    nonCslBodyPerPerson:
                                        !coverage.nonCslBodyPerPerson,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.cslProperty}
                            labelText="Non-CSL Property Damage"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    nonCslProperty: !coverage.nonCslProperty,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.overallPremium}
                            labelText="Overall Premium"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    overallPremium: !coverage.overallPremium,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.personalInjuryProtectionPremium}
                            labelText="Personal Injury Protection Premium"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    personalInjuryProtectionPremium:
                                        !coverage.personalInjuryProtectionPremium,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.pedPipProtectionPremium}
                            labelText="Ped PIP Protection Premium"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    pedPipProtectionPremium:
                                        !coverage.pedPipProtectionPremium,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.medicalPaymentsPremium}
                            labelText="Medical Payments Premium"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    medicalPaymentsPremium:
                                        !coverage.medicalPaymentsPremium,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.underinsuredMotoristPremium}
                            labelText="Underinsured Motorist Premium"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    underinsuredMotoristPremium:
                                        !coverage.underinsuredMotoristPremium,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.uninsuredMotoristPremium}
                            labelText="Uninsured Motorist Premium"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    uninsuredMotoristPremium:
                                        !coverage.uninsuredMotoristPremium,
                                })
                            }}
                        />
                        <Checkbox
                            checked={coverage.hiredCSLPremium}
                            labelText="Hired CSL Premium"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    hiredCSLPremium:
                                        !coverage.hiredCSLPremium,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.nonOwnedCSLPremium}
                            labelText="Non-owned CSL Premium"
                            onChange={() => {
                                setCoverage({
                                    ...coverage,
                                    nonOwnedCSLPremium:
                                        !coverage.nonOwnedCSLPremium,
                                })
                            }}
                        />
                    </Container>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
// in the future use map for this and a hashmap
export default CoverageSection
