import { AddButton } from './shared'
import { driversInitialState } from '../../context/insured-context'
import { Form } from '../../styles/styles'
import { useState } from 'react'
import { Wrapper } from '../PolicyFormSections/Drivers'
import DriverItem from '../PolicyFormSections/DriverItem'
import DriverItemEndorsements from './DriverItemEndorsements'
const { Section } = Form

const Drivers = ({ drivers, setDrivers }) => {
    const [newDrivers, setNewDrivers] = useState([])

    const setValues = setDrivers
    const values = drivers?.values

    const addFields = () => {
        setNewDrivers([
            ...newDrivers,
            { ...driversInitialState, states: 'Oregon' },
        ])
    }

    const saveNewDriver = (i) => {
        const newArray = [...newDrivers]
        const currentDriver = newDrivers[i]
        newArray.splice(i, 1)
        setValues([...values, currentDriver])
        setNewDrivers(newArray)
    }

    const cancelNewDriver = (i) => {
        const newArray = [...newDrivers]
        newArray.splice(i, 1)
        setNewDrivers(newArray)
    }

    const removeFields = (i) => {
        const newArray = [...values]
        newArray.splice(i, 1)
        setValues(newArray)
    }

    return (
        <Wrapper>
            <Section>
                {values?.map((_, i) => {
                    return (
                        <DriverItemEndorsements
                            key={i}
                            num={i}
                            removeFields={removeFields}
                            setValues={setValues}
                            values={values}
                        />
                    )
                })}
            </Section>
            <Section>
                {newDrivers.map((_, i) => {
                    return (
                        <DriverItem
                            isSave
                            key={i}
                            num={i}
                            removeFields={cancelNewDriver}
                            save={saveNewDriver}
                            setValues={setNewDrivers}
                            values={newDrivers}
                        />
                    )
                })}
            </Section>

            <Section>
                <AddButton onClick={addFields}>+ Add Driver</AddButton>
            </Section>
        </Wrapper>
    )
}

export default Drivers
