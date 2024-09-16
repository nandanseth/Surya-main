import { Container, useStyles } from './shared'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Checkbox from '../Form/Checkbox'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'

const VehicleSection = ({ vehicles, setVehicles, makeAllTrue, ...rest }) => {
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
                        Vehicles
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                        <Checkbox
                            checked={vehicles.category}
                            labelText="Select All"
                            onChange={() => {
                                if (vehicles.category) {
                                    setVehicles(makeAllTrue(vehicles, false))
                                } else {
                                    setVehicles(makeAllTrue(vehicles, true))
                                }
                                
                            }}
                        />
                    <Container>
                        <Checkbox
                            checked={vehicles.category}
                            labelText="Category"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    category: !vehicles.category,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.classification}
                            labelText="Classification"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    classification: !vehicles.classification,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.vehicleCategory}
                            labelText="Vehicle Classification"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    vehicleCategory: !vehicles.vehicleCategory,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.vehicleType}
                            labelText="Vehicle Type"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    vehicleType: !vehicles.vehicleType,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.state}
                            labelText="state"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    state: !vehicles.state,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.vehicleState}
                            labelText="state"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    vehicleState: !vehicles.vehicleState,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.vehicleWeight}
                            labelText="Vehicle Weight"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    vehicleWeight: !vehicles.vehicleWeight,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.fuelType}
                            labelText="Fuel Type"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    fuelType: !vehicles.fuelType,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.fleet}
                            labelText="Fleet"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    fleet: !vehicles.fleet,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.vin}
                            labelText="VIN"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    vin: !vehicles.vin,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.make}
                            labelText="Make"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    make: !vehicles.make,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.model}
                            labelText="Model"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    model: !vehicles.model,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.modelYear}
                            labelText="Model Year"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    modelYear: !vehicles.modelYear,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.seating}
                            labelText="Seating"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    seating: !vehicles.seating,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.wheelChair}
                            labelText="Wheelchair"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    wheelChair: !vehicles.wheelChair,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.plateNumber}
                            labelText="Plate Number"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    plateNumber: !vehicles.plateNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.plateNumber}
                            labelText="Plate Number"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    plateNumber: !vehicles.plateNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageAddress1}
                            labelText="Garage Address1"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageAddress1: !vehicles.garageAddress1,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageAddress2}
                            labelText="Garage Address2"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageAddress2: !vehicles.garageAddress2,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageCity}
                            labelText="Garage City"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageCity: !vehicles.garageCity,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageCounty}
                            labelText="Garage County"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageCounty: !vehicles.garageCounty,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageState}
                            labelText="Garage State"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageState: !vehicles.garageState,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageZipCode}
                            labelText="Garage Zip Code"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageZipCode: !vehicles.garageZipCode,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageZipCode2}
                            labelText="Garage Zip Code2"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageZipCode2: !vehicles.garageZipCode2,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageCountry}
                            labelText="Garage Country"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageCountry: !vehicles.garageCountry,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.zoneCode}
                            labelText="Zone Code"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    zoneCode: !vehicles.zoneCode,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.rateClassCode}
                            labelText="Rate Class Code"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    rateClassCode: !vehicles.rateClassCode,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.baseName}
                            labelText="Base Name"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    baseName: !vehicles.baseName,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.baseType}
                            labelText="Base Type"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    baseType: !vehicles.baseType,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.baseNumber}
                            labelText="Base Number"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    baseNumber: !vehicles.baseNumber,
                                })
                            }}
                        />
                        <Checkbox
                            checked={vehicles.baseEffDate}
                            labelText="Base Eff Date"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    baseEffDate: !vehicles.baseEffDate,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.baseExpDate}
                            labelText="Base Exp Date"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    baseExpDate: !vehicles.baseExpDate,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.shl}
                            labelText="shl"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    shl: !vehicles.shl,
                                })
                            }}
                        />
                        <Checkbox
                            checked={vehicles.overallPremium}
                            labelText="Overall Premium"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    overallPremium: !vehicles.overallPremium,
                                })
                            }}
                        />
                        <Checkbox
                            checked={vehicles.personalInjuryProtectionPremium}
                            labelText="Personal Injury Premium"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    personalInjuryProtectionPremium: !vehicles.personalInjuryProtectionPremium,
                                })
                            }}
                        />
                        <Checkbox
                            checked={vehicles.pedPipProtectionPremium}
                            labelText="Ped Pip Premium"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    pedPipProtectionPremium: !vehicles.pedPipProtectionPremium,
                                })
                            }}
                        />
                        <Checkbox
                            checked={vehicles.medicalPaymentsPremium}
                            labelText="Medical Payments Premium"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    medicalPaymentsPremium: !vehicles.medicalPaymentsPremium,
                                })
                            }}
                        />
                        <Checkbox
                            checked={vehicles.underinsuredMotoristPremium}
                            labelText="Underinsured Premium"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    underinsuredMotoristPremium: !vehicles.underinsuredMotoristPremium,
                                })
                            }}
                        />
                        <Checkbox
                            checked={vehicles.uninsuredMotoristPremium}
                            labelText="Uninsured Premium"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    uninsuredMotoristPremium: !vehicles.uninsuredMotoristPremium,
                                })
                            }}
                        />
                        <Checkbox
                            checked={vehicles.totalPremium}
                            labelText="Total Premium"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    totalPremium: !vehicles.totalPremium,
                                })
                            }}
                        />
                        <Checkbox
                            checked={vehicles.earnedPremium}
                            labelText="Earned Premium"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    earnedPremium: !vehicles.earnedPremium,
                                })
                            }}
                        />
                        <Checkbox
                            checked={vehicles.endorsement}
                            labelText="Endorsement/Policy"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    endorsement: !vehicles.endorsement,
                                })
                            }}
                        />
                        <Checkbox
                            checked={vehicles.endorsementEffectiveDate}
                            labelText="Endorsement Date"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    endorsementEffectiveDate: !vehicles.endorsementEffectiveDate,
                                })
                            }}
                        />
                        <Checkbox
                            checked={vehicles.commissionPercentage}
                            labelText="Commission %"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    commissionPercentage: !vehicles.commissionPercentage,
                                })
                            }}
                        />
                        <Checkbox
                            checked={vehicles.commissionAmount}
                            labelText="Commission Amount"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    commissionAmount: !vehicles.commissionAmount,
                                })
                            }}
                        />
                        <Checkbox
                            checked={vehicles.cancellationDate}
                            labelText="Cancellation Date"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    cancellationDate: !vehicles.cancellationDate,
                                })
                            }}
                        />
                        <Checkbox
                            checked={vehicles.isCancelled}
                            labelText="Is Cancelled?"
                            onChange={() => {
                                setVehicles({
                                    ...vehicles,
                                    isCancelled: !vehicles.isCancelled,
                                })
                            }}
                        />
                    </Container>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default VehicleSection
