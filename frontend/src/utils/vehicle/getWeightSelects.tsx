export const weights = [
  { value: 10000, label: '0 - 10,000' },
  { value: 20000, label: '10,001 - 20,000' },
  { value: 50000, label: '20,001 - 50,000' },
  { value: 50001, label: '50,001+' },
];

export default weights.map(({ value, label }) => ({ value: label, label, info: value }));
