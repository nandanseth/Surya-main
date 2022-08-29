import { Col, Delete, Info, Item, Title } from './shared'
import { Form } from '../../styles/styles'

const { Section, Flex } = Form

const DriverItemEndorsements = ({
    num = 0,
    values,
    setValues,
    removeFields,
}) => {
    // driverName, states, licenseNumber, licenseEffDate, licenseExpDate
    const {
        driverName,
        states,
        licenseNumber,
        licenseEffDate,
        licenseExpDate,
    } = values[num]

    return (
        <div>
            <Section>
                <Flex>
                    <Item>
                        <Delete onClick={() => removeFields(num)}>X</Delete>
                        <Col>
                            <Title>Name</Title>
                            <Info>
                                <b>{driverName}</b>
                            </Info>
                        </Col>
                        <Col>
                            <Title>State</Title>
                            <Info>{states}</Info>
                        </Col>

                        <Col>
                            <Title>License Number</Title>
                            <Info>{licenseNumber}</Info>
                        </Col>

                        <Col>
                            <Title>License Effective Date</Title>
                            <Info>{licenseEffDate}</Info>
                        </Col>

                        <Col>
                            <Title>License Expiration Date</Title>
                            <Info>{licenseExpDate}</Info>
                        </Col>
                    </Item>
                </Flex>
            </Section>
        </div>
    )
}

export default DriverItemEndorsements
