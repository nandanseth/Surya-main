const mapFunction = (item) => ({ value: item, label: item })

export const secondaryCategory = [
    'Taxi',
    'Limo',
    'Mini-Van',
    'Van',
    'SUV',
    'School Bus S-2 (NJ)',
    'Transport Bus',
    'Sightseeing',
    'Shuttle Bus/Contract',
    'Jitney',
    'Omni',
    'MAV/Wheelchair',
    'BLS/Non ALS Ambulance',
    'MAV/Wheelchair/Gurney',
    'Paratransit'
]

export const secondaryCategoryOptions = secondaryCategory.map(mapFunction)

export const bussinessUseClasses = ['Service', 'Retail', 'Commerical']

export const bussinessUseClassesOptions = bussinessUseClasses.map(mapFunction)

export const classCodes = ['Non-fleet', 'Fleet']

export const classCodesOptions = classCodes.map(mapFunction)

export const radius = ['Local', 'Intermediate']

export const radiusOptions = radius.map(mapFunction)
