import { Flex, Section, Tile, Title, TitleInfo, TitleTitle } from '../shared'

const Insured = ({ policy }) => {
    const {
        resInsAmmout
    } = policy.reinsurance

    return (
        <Section>
            <Title>General Reinsurance</Title>
            <Flex>
                <Tile>
                    <TitleTitle>Amount</TitleTitle>
                    <TitleInfo>{resInsAmmout}</TitleInfo>
                </Tile>
            </Flex>

        </Section>
    )
}

export default Insured
