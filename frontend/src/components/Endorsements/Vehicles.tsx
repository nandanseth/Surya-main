import { AddButton } from './shared'
import { Form } from '../../styles/styles'
import { useState } from 'react'
import { vehicleState } from '../../context/insured-context'
import { Wrapper } from '../PolicyFormSections/Drivers'
import VehicleItem from './VehicleItem'
import VehicleItemReplace from './VehicleItemReplace'
import VehicleItemEndorsements from './VehicleItemEndorsements'
import Moralis from 'moralis'
const { Section } = Form

const Vehicles = ({ vehicles, setVehicles, coverage, policy }) => {
    const [newVehicles, setNewVehicles] = useState([])
    const [newVehiclesReplace, setNewVehiclesReplace] = useState([])
    const [newVehiclesReplaceIndex, setNewVehiclesReplaceIndex] = useState(0)
    const [endDate, setEndDate] = useState("")
    

    const setValues = setVehicles
    const values = vehicles?.values

    const addFields = () => {
        setNewVehicles([...newVehicles, { ...vehicleState, states: 'Oregon' }])
    }

    const getDate = () => {
        const today = new Date();
        const date= today.getMonth()+1 + "/" + today.getDate() +"/"+today.getFullYear();
        return date
    }

    const removeFields = (i) => {
        const newArray = [...values]
        const date = getDate()
        newArray[i].baseExpDate = endDate

        //newArray.splice(i, 1)
        setValues(newArray)
    }

    const replaceFields = (i) => {
        const newArray = [...values]
        // const date = getDate()
        // newArray[i].baseExpDate = date
        // console.log(newArray[i])

        setNewVehiclesReplace([values[i]])
        setNewVehiclesReplaceIndex(i)

        //newArray.splice(i, 1)
        // setValues(newArray)
        // setNewVehiclesReplace([...newVehicles, { ...vehicleState, states: 'Oregon' }])
        // const newArray = [...values]
        // const date = getDate()
        // newArray[i].baseExpDate = date

        // //newArray.splice(i, 1)
        // setValues(newArray)
    }

    // const removeFields = (i) => {
    //     const newArray = [...values]
    //     newArray.baseExpDate = 
    //     setValues(newArray)
    // }

    const saveNewVehicle = (i) => {
        const newArray = [...newVehicles]
        console.log(newVehicles[i], 'food')
        const currentVehicle = newVehicles[i]
        const date = getDate()
        newArray.splice(i, 1)
        setValues([...values, currentVehicle])
        setNewVehicles(newArray)
    }

    const replaceNewVehicle = (i) => {
        // const newArray = [...newVehiclesReplace]
        // const currentVehicle = newVehiclesReplace[i]
        // const date = getDate()
        // newArray.splice(i, 1)
        // setValues([...values, currentVehicle])
        // setNewVehicles(newArray)

        // const replaceVehicle = (Moralis as any).Object.extend("ReplacedVehicles")

        // const replacedVehicle = new replaceVehicle()
        // replacedVehicle.set("policyNumber", policy.policyNum)
        // replacedVehicle.set("replacedVehicle", currentVehicle)

        const newArray = [...values]

        const currentVehicle = newVehiclesReplace[i]
        newArray[newVehiclesReplaceIndex] = currentVehicle

        console.log(newArray, 'sla')

        setValues(newArray)

        console.log(values, 'hiro')



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
                            replaceFields={replaceFields}
                            setValues={setValues}
                            values={values}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            

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
                            policyValues={policy}
                            coverageValues={coverage}
                        
                        />
                    )
                })}
                {newVehiclesReplace.map((_, i) => {
                    return (
                        <VehicleItemReplace
                            defaultValue={undefined}
                            isSave
                            key={i}
                            num={i}
                            removeFields={cancelNewVehicle}
                            newVehiclesReplaceIndex={newVehiclesReplaceIndex}
                            
                            save={replaceNewVehicle}
                            setValues={setNewVehiclesReplace}
                            values={newVehiclesReplace}
                        
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
