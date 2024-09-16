import { AddButton } from './shared'
import { driversInitialState } from '../../context/insured-context'
import { Form } from '../../styles/styles'
import { useState } from 'react'
import { Wrapper } from '../PolicyFormSections/Drivers'
import DriverItem from '../PolicyFormSections/DriverItem'
import DriverItemEndorsements from './DriverItemEndorsements'
import DriverItemReplace from './DriverItemReplace'
const { Section } = Form

const Drivers = ({ drivers, setDrivers }) => {
    const [newDrivers, setNewDrivers] = useState([])
    const [endDate, setEndDate] = useState("")
    const [newDriversReplace, setNewDriversReplace] = useState([])
    const [newDriversReplaceIndex, setNewDriversReplaceIndex] = useState(0)

    const setValues = setDrivers
    const values = drivers?.values

    const addFields = () => {
        setNewDrivers([
            ...newDrivers,
            { ...driversInitialState, states: 'Oregon',  },
        ])
    }

    const replaceFields = (i) => {
        const newArray = [...values]


        setNewDriversReplace([values[i]])
        setNewDriversReplaceIndex(i)

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

    // const removeFields = (i) => {
    //     const newArray = [...values]
    //     newArray.splice(i, 1)
    //     setValues(newArray)
    // }

    const getDate = () => {
        const today = new Date();
        const date= today.getMonth()+1 + "/" + today.getDate() +"/"+today.getFullYear();
        return date
    }

    const removeFields = (i) => {
        const newArray = [...values]
        const date = getDate()
        newArray[i].driverExpDate = endDate

        //newArray.splice(i, 1)
        setValues(newArray)
    }

    const replaceNewDriver = (i) => {

        const newArray = [...values]

        const currentDriver = newDriversReplace[i]
        newArray[newDriversReplaceIndex] = currentDriver

        console.log(newArray, 'sla')

        setValues(newArray)

        console.log(values, 'hiro')



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
                {newDriversReplace.map((_, i) => {
                    return (
                        <DriverItemReplace
                            isSave
                            key={i}
                            num={i}
                            removeFields={cancelNewDriver}
                            newDriversReplaceIndex={newDriversReplaceIndex}
                            
                            save={replaceNewDriver}
                            setValues={setNewDriversReplace}
                            values={newDriversReplace}
                        
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
