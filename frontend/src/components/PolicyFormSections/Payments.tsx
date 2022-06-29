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
    ].reduce((partialSum, a) => partialSum + a, 0)

    if (total === NaN) {
        return (
            <Section>
                <h1>Add Premium</h1>
            </Section>
        )
    }

    return (
        <Section>
            <Flex>
                <SuryaSelect
                    label="Agent"
                    onChange={(e) => {
                        setValues({ ...values, agent: e.target.value })
                    }}
                    options={payment}
                    placeholder="Agent"
                    value={values.payment}
                />
            </Flex>
        </Section>
    )
}

export default PaymentsSection
