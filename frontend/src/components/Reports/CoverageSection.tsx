import { Container, useStyles } from './shared'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Checkbox from '../Form/Checkbox'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

const CoverageSection = ({ coverage, setCoverage }: any) => {
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
                        Coverage
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container>
                        <Checkbox
                            checked={coverage.overall}
                            labelText="Overall"
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    overall: !coverage.overall,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.deductable}
                            labelText="Deductible"
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    deductable: !coverage.deductable,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.deductableAmount}
                            labelText="Deductible Amount"
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    unMotoristAuto: !coverage.unMotoristAuto,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.unMotoristBodyPerAccident}
                            labelText="Uninsured Motorist Body Per Accident"
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    personalInjury: !coverage.personalInjury,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.medicalPayments}
                            labelText="Medical Payments"
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    medicalPayments: !coverage.medicalPayments,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.underinsuredMotorist}
                            labelText="Underinsured Motorist"
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    csl: !coverage.csl,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.nonOwnedCSL}
                            labelText="Non Owned CSL"
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    nonOwnedCSL: !coverage.nonOwnedCSL,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.cslSingleLimit}
                            labelText="CSL Single Limit"
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    cslSingleLimit: !coverage.cslSingleLimit,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.cslSingleLimit}
                            labelText="CSL Single Limit"
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    cslSingleLimit: !coverage.cslSingleLimit,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.cslBodyPerAccident}
                            labelText="CSL Body Per Accident"
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    cslSingleAuto: !coverage.cslSingleAuto,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.cslSplitAuto}
                            labelText="CSL Split Auto"
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    cslSplitAuto: !coverage.cslSplitAuto,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.cslProperty}
                            labelText="CSL Property Damage"
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    cslProperty: !coverage.cslProperty,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.nonCslSingleAuto}
                            labelText="Non-CSL Single Auto"
                            onClick={() => {
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
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    nonCslSplitAuto: !coverage.nonCslSplitAuto,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.nonCslSingleLimit}
                            labelText="Non-CSL Single Limit"
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    nonCslProperty: !coverage.nonCslProperty,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.nonCslBodyPerPerson}
                            labelText="Non-CSL Body Per Accident"
                            onClick={() => {
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
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    nonCslProperty: !coverage.nonCslProperty,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.overallPremium}
                            labelText="Overall Premium"
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    overallPremium: !coverage.overallPremium,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.personalInjuryProtectionPremium}
                            labelText="Personal Injury Protection Premium"
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    personalInjuryProtectionPremium:
                                        !coverage.personalInjuryProtectionPremium,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.medicalPaymentsPremium}
                            labelText="Medical Payments Premium"
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
                                setCoverage({
                                    ...coverage,
                                    uninsuredMotoristPremium:
                                        !coverage.uninsuredMotoristPremium,
                                })
                            }}
                        />

                        <Checkbox
                            checked={coverage.nonOwnedCSLPremium}
                            labelText="Non-owned CSL Premium"
                            onClick={() => {
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
