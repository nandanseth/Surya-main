export const policyCategory = [
    'Taxicabs and Limousines',
    'School and Church Buses',
    'Other Buses',
    'Van Pools',
]

const mapFunction = (item) => ({ value: item, label: item })

export const classificationMap = {
    'Taxicabs and Limousines': [
        'Taxicab - Owner-Driver',
        'Taxicab - Owner-Driver',
        'Taxicab - All Other',
        'Limousine - Seating 8 or Fewer',
        'Limousine - Seating 8 or More',
        'Car Service',
    ].map(mapFunction),

    'School and Church Buses': [
        'School Bus Owned By Political Subdivision Or School District',
        'Other School Bus',
        'Church Bus',
    ].map(mapFunction),
    'Other Buses': [
        'Urban Bus',
        'Airport Bus or Airport Limousine',
        'Inter-city Bus',
        'Charter Bus',
        'Sightseeing Bus',
        'Transportation of Athletes and Entertainers',
        'Social Service Agency Auto All Other',
        'Paratransit',
        'Ambulance',
        'Gurney'
    ].map(mapFunction),
    'Van Pools': ['Employer Furnished', 'All Other'].map(mapFunction),
}

export default policyCategory.map((item) => ({ value: item, label: item }))
