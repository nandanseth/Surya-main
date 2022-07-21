import { Container, useStyles } from './shared'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Checkbox from '../Form/Checkbox'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

const VehicleSection = ({ vehicles, setVehicles }: any) => {
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
                        Vehicles
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container>
                        <Checkbox
                            checked={vehicles.category}
                            labelText="Category"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    category: !vehicles.category,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.classification}
                            labelText="Classification"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    classification: !vehicles.classification,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.vehicleCategory}
                            labelText="Vehicle Classification"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    vehicleCategory: !vehicles.vehicleCategory,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.vehicleType}
                            labelText="Vehicle Type"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    vehicleType: !vehicles.vehicleType,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.state}
                            labelText="state"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    state: !vehicles.state,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.vehicleState}
                            labelText="state"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    vehicleState: !vehicles.vehicleState,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.vehicleWeight}
                            labelText="Vehicle Weight"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    vehicleWeight: !vehicles.vehicleWeight,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.fuelType}
                            labelText="Fuel Type"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    fuelType: !vehicles.fuelType,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.fleet}
                            labelText="Fleet"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    fleet: !vehicles.fleet,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.vin}
                            labelText="VIN"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    vin: !vehicles.vin,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.make}
                            labelText="Make"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    make: !vehicles.make,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.model}
                            labelText="Model"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    model: !vehicles.model,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.modelYear}
                            labelText="Model Year"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    modelYear: !vehicles.modelYear,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.seating}
                            labelText="Seating"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    seating: !vehicles.seating,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.wheelChair}
                            labelText="Wheelchair"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    wheelChair: !vehicles.wheelChair,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.plateNumber}
                            labelText="Plate Number"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    plateNumber: !vehicles.plateNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.plateNumber}
                            labelText="Plate Number"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    plateNumber: !vehicles.plateNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageAddress1}
                            labelText="Garage Address1"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageAddress1: !vehicles.garageAddress1,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageAddress2}
                            labelText="Garage Address2"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageAddress2: !vehicles.garageAddress2,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageCity}
                            labelText="Garage City"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageCity: !vehicles.garageCity,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageCounty}
                            labelText="Garage County"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageCounty: !vehicles.garageCounty,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageState}
                            labelText="Garage State"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageState: !vehicles.garageState,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageZipCode}
                            labelText="Garage Zip Code"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageZipCode: !vehicles.garageZipCode,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageZipCode2}
                            labelText="Garage Zip Code2"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageZipCode2: !vehicles.garageZipCode2,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.garageCountry}
                            labelText="Garage Country"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    garageCountry: !vehicles.garageCountry,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.zoneCode}
                            labelText="Zone Code"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    zoneCode: !vehicles.zoneCode,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.rateClassCode}
                            labelText="Rate Class Code"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    rateClassCode: !vehicles.rateClassCode,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.baseName}
                            labelText="Base Name"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    baseName: !vehicles.baseName,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.baseType}
                            labelText="Base Type"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    baseType: !vehicles.baseType,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.baseNumber}
                            labelText="Base Number"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    baseNumber: !vehicles.baseNumber,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.baseExpDate}
                            labelText="Base Exp Date"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    baseExpDate: !vehicles.baseExpDate,
                                })
                            }}
                        />

                        <Checkbox
                            checked={vehicles.shl}
                            labelText="shl"
                            onClick={() => {
                                setVehicles({
                                    ...vehicles,
                                    shl: !vehicles.shl,
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
