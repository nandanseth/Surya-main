import { Flex, Section, Tile, Title, TitleInfo, TitleTitle } from '../shared'

const Underwriting = ({ policy }) => {
    const {
        creditsDebits,
        remarks
    } = policy.underwriting

    return (
        <Section>
            <Title>Underwriting Info</Title>
            <Flex>
                <Tile>
                    <TitleTitle>Credits and Debits</TitleTitle>
                    <TitleInfo>{creditsDebits}%</TitleInfo>
                </Tile>
                <Tile>
                    <TitleTitle>Remarks</TitleTitle>
                    <TitleInfo>{remarks}</TitleInfo>
                </Tile>
            </Flex>

        </Section>
    )
}

export default Underwriting
