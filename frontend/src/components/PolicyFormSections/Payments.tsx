import { Form } from '../../styles/styles'
import SuryaSelect from '../PolicyFormSelect'
import payment from '../../utils/policies/getPayment'
const { Section, Flex } = Form

const PaymentsSection = ({ store }) => {
    console.log(store)
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
    ].reduce((partialSum, a) => (partialSum) + parseInt(a), 0);

    console.log({ total })

    if (isNaN(total)) {
        return (
            <Section>
                <h1 style={{fontSize: 42, color: "#d40048"}}>Please Add Premium to continue</h1>
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
        </Section>
    )
}

export default PaymentsSection
