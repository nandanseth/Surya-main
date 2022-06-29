const mapFunction = (item) => ({ value: item, label: item })

export const sizeClasses = [
    'Light Trucks ',
    'Medium Trucks',
    'Heavy Trucks',
    'Extra Heavy Trucks',
    'Heavy Truck Tractors',
    'Extra Heavy Truck-tractors',
    'Semitrailers',
    'Trailers',
    'Service or Utility ',
]

export const sizeClassOptions = sizeClasses.map(mapFunction)

export const bussinessUseClasses = ['Service', 'Retail', 'Commerical']

export const bussinessUseClassesOptions = bussinessUseClasses.map(mapFunction)

export const classCodes = ['Non-fleet', 'Fleet']

export const classCodesOptions = classCodes.map(mapFunction)

export const radius = ['Local', 'Intermediate']

export const radiusOptions = radius.map(mapFunction)
