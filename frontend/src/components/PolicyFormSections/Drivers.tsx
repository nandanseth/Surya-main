import { Add } from '../Buttons'
import { ButtonHolder, Form } from '../../styles/styles'
import { useEffect } from 'react'
import DriverItem from './DriverItem'
import styled from 'styled-components'
import Papa from 'papaparse'

const { SectionTitle, Flex } = Form

const title = 'Drivers'

const DriversSection = ({ store }) => {
    const { drivers: driverStates, policy } = store
    const { values, setValues, defaults } = driverStates

    useEffect(() => {
        if (values[0].driverEffDate !== policy.values.effectiveDate && values[0]===defaults) {
            setValues([{ ...defaults, driverEffDate: policy.values.effectiveDate, driverExpDate: policy.values.expirationDate }])
        }
        

    }, [])

    const addFields = () => {
        setValues([...values, { ...defaults, driverEffDate: policy.values.effectiveDate, driverExpDate: policy.values.expirationDate }])
    }
    const removeFields = (i) => {
        if (values.length <= 1) {
            setValues([{ ...defaults, driverEffDate: policy.values.effectiveDate, driverExpDate: policy.values.expirationDate }])
            return
        }

        const newArray = [...values]
        newArray.splice(i, 1)
        setValues(newArray)
    }


    const changeHandler = (event) => {
        Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            const copy = []
          
            for (const i in results.data) {
                copy.push({...defaults, driverLastName: results.data[i]['Last Name'], driverFirstName: results.data[i]['First Name'], driverMiddleName: results.data[i]['Middle Name'],
                 licenseEffDate: results.data[i]['License Effective Date'], 
                licenseExpDate: results.data[i]['License Expiration Date'], licenseNumber: results.data[i]['License Number'], states: results.data[i]['State'], 
                driverEffDate: policy.values.effectiveDate, driverExpDate: policy.values.expirationDate, driverBirthDate: results.data[i]['Birth Date']})
                console.log(copy)
            }
            setValues(copy)
          
        },
        });
    };


    return (
        <Wrapper>
            <Center>
                <StyledTitle>{title}</StyledTitle>
                <StyledHolder>
                    <input type="file" name="file" onChange={changeHandler}/>
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
