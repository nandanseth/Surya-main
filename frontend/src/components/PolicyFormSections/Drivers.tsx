import { Add } from '../Buttons'
import { ButtonHolder, Form } from '../../styles/styles'
import { useEffect } from 'react'
import DriverItem from './DriverItem'
import styled from 'styled-components'

const { SectionTitle, Flex } = Form

const title = 'Drivers'

const DriversSection = ({ store }) => {
    const { drivers: driverStates } = store
    const { values, setValues, defaults } = driverStates

    useEffect(() => {
        setValues([{ ...defaults, states: 'Oregon' }])
    }, [defaults, setValues])

    const addFields = () => {
        setValues([...values, { ...defaults, states: 'Oregon' }])
    }
    const removeFields = (i) => {
        if (values.length <= 1) {
            setValues([{ ...defaults, states: 'Oregon' }])
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
                    <Add onClick={addFields}>+ Add Driver</Add>
                </StyledHolder>
            </Center>
            <div>
                {values.map((_, i) => {
                    // const toReturn = DefaultFields({ num: i, setValues, removeFields, values})
                    return (
                        <DriverItem
                            key={i}
                            num={i}
                            removeFields={removeFields}
                            setValues={setValues}
                            values={values}
                        />
                    )
                })}
            </div>
        </Wrapper>
    )
}

export const Wrapper = styled.div`
    padding: 8px;
    width: 100%;
`

export const StyledHolder = styled(ButtonHolder)`
    margin: 0;
    margin-left: auto;
`

export const StyledTitle = styled(SectionTitle)`
    width: auto;
`

export const Center = styled(Flex)`
    align-items: center;
    margin-bottom: 8px;
`

export default DriversSection
