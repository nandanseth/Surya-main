import { Col, Delete, Info, Item, Title } from './shared'
import { Form } from '../../styles/styles'

const { Section, Flex } = Form

const VehicleItemEndorsements = ({
    num = 0,
    values,
    setValues,
    removeFields,
}) => {
    const {
        vehicleType,
        state,
        category,
        fuelType,
        vin,
        make,
        model,
        modelYear,
        overallPremium,

        // classification,
        // vehicleCategory,
        // yesNo,
        // fleet,
        // vehicleState,
        // vehicleWeight,
        // seating,
        // wheelChair,
        // plateNumber,
        // garageZipCode,
        // zoneCode,
        // rateClassCode,
        // baseName,
        // baseType,
        // baseNumber,
        // baseExpDate,
        // shl,
        // garageAddress1,
        // garageAddress2,
        // garageZipCode2,
        // garageCity,
        // garageCounty,
        // garageState,
        // garageCountry,
        // personalInjuryProtectionPremium,
        // medicalPaymentsPremium,
        // underinsuredMotoristPremium,
        // uninsuredMotoristPremium,
        // hiredCSLPremium,
        // nonOwnedCSLPremium,
    } = values[num]

    // yesNo: 'No',
    // category: 'Taxicabs and Limousines',
    // classification: 'null',
    // vehicleCategory: 'Taxicab - Owner-Driver',
    // vehicleType: 'Car Service',
    // state: 'Arizona',
    // vehicleState: 'Arizona',
    // vehicleWeight: '0 - 10,000',
    // fuelType: 'Gas',
    // fleet: 'Yes',
    // vin: 'JTDKN3DU0A1010158',
    // make: 'TOYOTA',
    // model: 'PRIUS',
    // modelYear: '2010',
    // seating: '5',
    // wheelChair: 'Yes',
    // plateNumber: 'null',
    // garageZipCode: 'null',
    // zoneCode: 'null',
    // rateClassCode: 'null',
    // baseName: 'null',
    // baseType: 'Black Car',
    // baseNumber: 'null',
    // baseEffDate: '03/15/19',
    // baseExpDate: '09/25/19',
    // shl: 'null',
    // garageAddress1: 'null',
    // garageAddress2: 'null',
    // garageZipCode2: 'null',
    // garageCity: 'null',
    // garageCounty: 'null',
    // garageState: 'Oregon',
    // garageCountry: 'null',
    // overallPremium: 2554.42,
    // personalInjuryProtectionPremium: 0,
    // medicalPaymentsPremium: 0,
    // underinsuredMotoristPremium: 32.95,
    // uninsuredMotoristPremium: 14.35,
    // hiredCSLPremium: '',
    // nonOwnedCSLPremium: '',

    return (
        <div>
            <Section>
                <Flex>
                    <Item>
                        <Delete onClick={() => removeFields(num)}>X</Delete>
                        <Col>
                            <Title>Car</Title>
                            <Info>
                                <b>{`${modelYear} ${make} ${model}`}</b>
                            </Info>
                        </Col>
                        <Col>
                            <Title>State</Title>
                            <Info>{state}</Info>
                        </Col>

                        <Col>
                            <Title>VIN</Title>
                            <Info>{vin}</Info>
                        </Col>

                        <Col>
                            <Title>Fuel Type</Title>
                            <Info>{fuelType}</Info>
                        </Col>

                        <Col>
                            <Title>Category</Title>
                            <Info>{category}</Info>
                        </Col>
                        <Col>
                            <Title>Overall Premium</Title>
                            <Info>{overallPremium}</Info>
                        </Col>

                        <Col>
                            <Title>Type</Title>
                            <Info>{vehicleType}</Info>
                        </Col>
                    </Item>
                </Flex>
            </Section>
        </div>
    )
}

export default VehicleItemEndorsements
