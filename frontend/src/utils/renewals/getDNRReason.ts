export const getDNRReason = [
    'Non Payment Of Premium',
    'Misrepresentation of facts',
    'Not writing this line of coverage anymore',
    'Insurance Fraud',
    'License Suspension',
    'Insureds Request Replaced Coverage',
    'Insureds Request Plates Surrendered/Destroyed',
    'Flat Cancellation Policy Not Taken',
    'Finance company request',
    'Insureds request',
    'Underwriting Reason',
    'Excessive Loss Ratio',
    'Cancel / Rewrite at Different Limit',
    'N/A',
    
]

export default getDNRReason.map((item) => ({ value: item, label: item }))