import { Colors, Form } from '../../styles/styles'
import payment from '../../utils/policies/getPayment'
import SuryaSelect from '../PolicyFormSelect'
const { Section, Flex } = Form

const PaymentsSection = ({ store }) => {
    const { coverage, payments } = store
    const coverageValues = coverage.values
    const {
        overallPremium,
        personalInjuryProtectionPremium,
        medicalPaymentsPremium,
        underinsuredMotoristPremium,
        uninsuredMotoristPremium,
        hiredCSLPremium,
        nonOwnedCSLPremium,
    } = coverageValues
    const { values, setValues } = payments

    const total = [
        overallPremium,
        personalInjuryProtectionPremium,
        medicalPaymentsPremium,
        underinsuredMotoristPremium,
        uninsuredMotoristPremium,
        hiredCSLPremium,
        nonOwnedCSLPremium,
    ].reduce((partialSum, a) => {
        return partialSum + parseFloat(a)
    }, 0)

    console.log({ total })

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
                        setValues({ ...values, payment: e.target.value })
                    }}
                    options={payment}
                    placeholder="Payment Type"
                    value={values.payment}
                />
            </Flex>
            <h1 style={{ fontSize: 42, color: Colors.electricBlue }}>
                Premium: ${total}
            </h1>
        </Section>
    )
}

export default PaymentsSection
