import { ButtonHolder, Form } from '../../styles/styles'
import { Save } from '../Buttons'
import styled from 'styled-components'
import VehicleItem from './VehicleItem'
const { SectionTitle, Flex } = Form

const title = 'Vehicles'

const VehicleSection = ({ store }) => {
    const { vehicles: vehicleStates } = store
    const {
        values,
        setValues,
        defaultValue,
        yesNoValues,
        yesNoOptions,
        defaults,
    } = vehicleStates

    const addFields = () => {
        setValues([...values, { ...defaults }])
    }

    const removeFields = (i) => {
        if (values.length <= 1) {
            setValues([{ ...defaults }])
            return
        }

        const newArray = [...values]
        newArray.splice(i, 1)
        setValues(newArray)
    }

    return (
        <Wrapper>
            <Center>
                <StyledTitle>{title}</StyledTitle>
                <StyledHolder>
                    <Add onClick={addFields}>+ Add Vehicle</Add>
                </StyledHolder>
            </Center>
            <div>
                {values.map((_, i) => {
                    //const toReturn = DefaultFields({ num: i })
                    return (
                        <StyledSection key={i}>
                            <VehicleItem
                                defaultValue={defaultValue}
                                removeFields={removeFields}
                                setValues={setValues}
                                values={values}
                                yesNoOptions={yesNoOptions}
                                yesNoValues={yesNoValues}
                            />
                        </StyledSection>
                    )
                })}
            </div>
        </Wrapper>
    )
}

const StyledSection = styled.div`
    border-bottom: solid 1px #00000017;
    margin-bottom: 42px;
    padding-bottom: 24px;
`

const Wrapper = styled.div`
    padding: 8px;
    width: 100%;
`

const Add = styled(Save)`
    max-width: 200px;
    width: 100%;
    margin-left: auto;
    font-weight: 500;
    padding: 12px;
    font-size: 14px;
`

const StyledHolder = styled(ButtonHolder)`
    margin: 0;
    margin-left: auto;
`

const StyledTitle = styled(SectionTitle)`
    width: auto;
`

const Center = styled(Flex)`
    align-items: center;
    margin-bottom: 8px;
`

export default VehicleSection
