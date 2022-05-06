export const types = ['Taxicabs and Limousines', 'School and Church Buses', 'Other Buses', 'Other Public Buses',
'Ambulance'
];

const mapFunc = item =>  ({ value: item, label: item });

export const optionsMap = {
  'Taxicabs and Limousines': ['Taxicab - Owner-Driver', 'Taxicab - All Other',
    'Limousine - Seating 8 or Fewer', 'Limousine - Seating 8 or More',
    'Car Service'].map(mapFunc),
  'School and Church Buses': ['School Bus Owned By Political Subdivision Or School District',
    'Other School Bus', 'Church Bus'].map(mapFunc),
  'Other Buses': ['Urban Bus', 'Airport Bus or Airport Limousine', 'Inter-city Bus', 'Charter Bus',
    'Sightseeing Bus', 'Transportation of Athletes and Entertainers', 'Social Service Agency Auto All Other',
    'Paratransit'].map(mapFunc),
  'Other Public Buses': [
    'Public',
    'Auto',
    'Not Otherwise Classified',
  ].map(mapFunc),
  'Ambulance': [].map(mapFunc),

};

console.log(optionsMap, 'hii')


export default types.map((item) => ({ value: item, label: item }));