export const payment = [
    '100% DEPOSIT',
    '25% DEPOSIT & (1) 75% INSTALLMENTS',
    '40% DEPOSIT & (2) 30% INSTALLMENTS',
    '25% DEPOSIT (8) INSTALLMENTS',
    '20% DEPOSIT (8) INSTALLMENTS',
]

export default payment.map((item) => ({ value: item, label: item }))
