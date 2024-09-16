import { Col, Delete, Info, Item, Title } from './shared'
import { Form } from '../../styles/styles'
import { useState } from 'react' 
import Input from '../PolicyForm/PolicyFormInput'
import { SmallSave, StyledCancel } from '../Buttons'
const { Section, Flex, InputWrapper } = Form


const DriverItemEndorsements = ({
    num = 0,
    values,
    setValues,
    removeFields,
    replaceFields,
    endDate,
    setEndDate
}) => {
    // driverName, states, licenseNumber, licenseEffDate, licenseExpDate
    const {
        driverFirstName,
        driverMiddleName,
        driverLastName,
        states,
        licenseNumber,
        licenseEffDate,
        licenseExpDate,
        driverEffDate,
        driverExpDate,
        
    } = values[num]

    const [showDate, setShowDate] = useState(false)

    return (
        <Item>
            <Delete onClick={() => setShowDate(true)}>X</Delete>
            <Col>
                <Title>ID</Title>
                <Info>
                    <b>{num+1}</b>
                </Info>
            </Col>
            <Col>
                <Title>Name</Title>
                <Info>
                    <b>{driverFirstName} {driverMiddleName} {driverLastName}</b>
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

            <Col>
                <Title>Driver Effective Date</Title>
                <Info>{driverEffDate}</Info>
            </Col>

            <Col>
                <Title>Driver Expiration Date</Title>
                <Info>{driverExpDate}</Info>
            </Col>
            {showDate && 
                        <Col>
                        <InputWrapper>
                            <Input
                                label="Date"
                                name="date"
                                onChange={(e) => setEndDate(e.target.value)}
                                placeholder="Date of End."
                                value={endDate}
                            />
                            
                        </InputWrapper>
                        <SmallSave onClick={()=>removeFields(num)}>Submit</SmallSave>
                        </Col>}
                        <Col>
                            <SmallSave onClick={()=>replaceFields(num)}>Replace</SmallSave>
                        </Col>

        </Item>
    )
}

export default DriverItemEndorsements
