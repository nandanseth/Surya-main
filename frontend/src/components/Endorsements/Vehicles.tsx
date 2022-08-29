import { AddButton } from './shared'
import { Form } from '../../styles/styles'
import { useState } from 'react'
import { vehicleState } from '../../context/insured-context'
import { Wrapper } from '../PolicyFormSections/Drivers'
import VehicleItem from '../PolicyFormSections/VehicleItem'
import VehicleItemEndorsements from './VehicleItemEndorsements'
const { Section } = Form

const Vehicles = ({ vehicles, setVehicles }) => {
    const [newVehicles, setNewVehicles] = useState([])

    const setValues = setVehicles
    const values = vehicles?.values

    const addFields = () => {
        setNewVehicles([...newVehicles, { ...vehicleState, states: 'Oregon' }])
    }
    const removeFields = (i) => {
        const newArray = [...values]
        newArray.splice(i, 1)
        setValues(newArray)
    }

    const saveNewVehicle = (i) => {
        const newArray = [...newVehicles]
        const currentVehicle = newVehicles[i]
        newArray.splice(i, 1)
        setValues([...values, currentVehicle])
        setNewVehicles(newArray)
    }

    const cancelNewVehicle = (i) => {
        const newArray = [...newVehicles]
        newArray.splice(i, 1)
        setNewVehicles(newArray)
    }
    return (
        <Wrapper>
            <Section>
                {values?.map((_, i) => {
                    // const toReturn = DefaultFields({ num: i, setValues, removeFields, values})
                    return (
                        <VehicleItemEndorsements
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
                {newVehicles.map((_, i) => {
                    return (
                        <VehicleItem
                            defaultValue={undefined}
                            isSave
                            key={i}
                            num={i}
                            removeFields={cancelNewVehicle}
                            save={saveNewVehicle}
                            setValues={setNewVehicles}
                            values={newVehicles}
                        />
                    )
                })}
            </Section>
            <Section>
                <AddButton onClick={addFields}>+ Add Vehicle</AddButton>
            </Section>
        </Wrapper>
    )
}

export default Vehicles
