export const limits = [
    '35,000',
    '50,000',
    '100,000',
    '250,000',
    '300,000',
    '350,000',
    '500,000',
    '1,000,000',
    '2,000,000',
    '3,000,000',
]

export const limitsSelectMap = limits.map((item) => ({
    value: item,
    label: item,
}))

export const base = ['25,000', '50,000', '100,000']
// this needs an add new for each
export const splitLimitMap = {
    'Body Injury Per Person': [...base],
    'Body Injury Per Accident': [...base, '300,000'],
    'Property Damage': ['10,000', '25,000', '50,000', '100,000'],
}

export const deductable = [
    '250',
    '500',
    '1,000',
    '2,500',
    '5,000',
    '10,000',
    '25,000',
    '50,000',
    '75,000',
    '100,000',
    'N/A',
    'Excluded',
]

export const autoSymbol = [
    '250',
    '500',
    '1,000',
    '2,500',
    '5,000',
    '10,000',
    '25,000',
    '50,000',
    '75,000',
    '100,000',
    'N/A',
    'Included',
]

export const propertyDamage = ['10,000', '25,000', '50,000', '100,000']

export const bodyPerAccident = ['25,000', '50,000', '100,000', '300,000']

export const bodyPerPerson = ['25,000', '50,000', '100,000']

const valFunction = (item) => ({ value: item, label: item })

const options = {
    bodyPerPersonOptions: bodyPerPerson.map(valFunction),
    bodyPerAccidentOptions: bodyPerAccident.map(valFunction),
    propertyDamageOptions: propertyDamage.map(valFunction),
    autoSymbolOptions: autoSymbol.map(valFunction),
    deductableOptions: deductable.map(valFunction),
    limitOptions: limitsSelectMap,
}

export default options
