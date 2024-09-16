import { Colors, Form } from '../../styles/styles'
import payment from '../../utils/policies/getPayment'
import Payments from '../../pages/policies/InfoSections/Payments'
import SuryaSelect from '../PolicyForm/PolicyFormSelect'
const { Section, Flex } = Form


const PaymentsSection = ({ store }) => {
    const { coverage, payments } = store
    const coverageValues = coverage.values
    const {
        overallPremium,
        personalInjuryProtectionPremium,
        pedPipProtectionPremium,
        medicalPaymentsPremium,
        underinsuredMotoristPremium,
        uninsuredMotoristPremium,
        hiredCSLPremium,
        nonOwnedCSLPremium,
    } = coverageValues
    console.log(payments, 'fien')
    const { values, setValues } = payments

    const total = [
        overallPremium,
        personalInjuryProtectionPremium,
        pedPipProtectionPremium,
        medicalPaymentsPremium,
        underinsuredMotoristPremium,
        uninsuredMotoristPremium,
        // hiredCSLPremium,
        // nonOwnedCSLPremium,
    ].reduce((partialSum, a) => {
        return partialSum + parseFloat(a)
    }, 0)

    const HiredNonOwned = [
        hiredCSLPremium,
        nonOwnedCSLPremium,
    ].reduce((partialSum, a) => {
        return partialSum + parseFloat(a)
    }, 0)

    const policyNew = () => {
        return Object.keys(store).reduce((acc, key) => {
            if (Array.isArray(store[key].values)) {
                acc[key] = { values: store[key].values };
            } else {
                acc[key] = store[key].values;
            }
            return acc;
        }, {});
    }

    if (isNaN(total)) {
        return (
            <Section>
                <h1 style={{ fontSize: 42, color: '#d40048' }}>
                    Please Add Premium to continue
                </h1>
            </Section>
        )
    }

    return (
        <Section>
            <Flex>
                <SuryaSelect
                    label="Payment Type"
                    onChange={(e) => {
                        setValues({ ...values, paymentType: e.target.value })
                        console.log(store, 'slel')
                    }}
                    options={payment}
                    placeholder="Payment Type"
                    value={values.paymentType}
                />
            </Flex>
            <h1 style={{ fontSize: 42, color: Colors.electricBlue }}>
                Premium/Vehicle: ${total}
            </h1>
            <h1 style={{ fontSize: 42, color: Colors.electricBlue }}>
                Hired + Non-Owned: ${HiredNonOwned}
            </h1>
            <Payments payments={payments.values} policy={policyNew()}/>

        </Section>
    )
}

export default PaymentsSection
