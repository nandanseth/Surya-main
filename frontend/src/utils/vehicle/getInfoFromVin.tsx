import axios from 'axios'

const getDataFromList = (vinList: []) => {
    const setValues = new Set([
        'Make',
        'Manufacturer Name',
        'Model',
        'Model Year',
        'Series',
        'Trim',
        'Vehicle Type',
        'Body Class',
        'Number of Seats',
    ])
    const reducedObj = vinList.reduce((map, item) => {
        const { Variable, Value } = item
        if (setValues.has(Variable) && Value !== null) {
            map[Variable] = Value
        }
        return map
    }, {})
    return reducedObj
}

const getInoFromVin = async (vin: string) => {
    try {
        const {
            data: { Results },
        } = await axios.get(
            `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
        )

        const data = getDataFromList(Results)
        return { data }
    } catch (error) {
        return { error }
    }
}

export default getInoFromVin
