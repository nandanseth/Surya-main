import { CreateButton } from '../../../components/Buttons'
import { Flex, Section, Tile, Title, TitleInfo, TitleTitle } from '../shared'
import styled from 'styled-components'

const Policy = ({ policy, endorsements, endorsementsOnclick }) => {
    const {
        policyNumber,
        effectiveDate,
        expirationDate,
        coverageTerm,
        radius,
        sizeClass,
        lineOfBusiness,
        agent,
        underwritingCode,
        states,
        classification,
        policyLineItem,
        businessUseClass,
        policyCategory,
        classCode,
    } = policy

    const renderEndorsements = () => {
        if (endorsements === undefined) {
            return null
        }
        const {
            changes: { __removed__, __added__, __updates__ },
        } = endorsements
        const renderKeys = (object, title) => {
            const keys = Object.keys(object)
            return (
                <Section>
                    <Title>{title}</Title>
                    <Flex>
                        {keys.map((key) => {
                            return (
                                <Tile>
                                    <TitleTitle>{key}</TitleTitle>
                                    <TitleInfo>{object[key]}</TitleInfo>
                                </Tile>
                            )
                        })}
                    </Flex>
                </Section>
            )
        }

        const rendered = [
            renderKeys(__removed__, 'Removed'),
            renderKeys(__added__, 'Added'),
            renderKeys(__updates__, 'Updated'),
        ]
        return rendered
    }

    return (
        <>
            <Section>
                <Title>Policy {policyNumber}</Title>
                <Flex>
                    <Tile>
                        <TitleTitle>Policy Number</TitleTitle>
                        <TitleInfo>{policyNumber}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Effective Date</TitleTitle>
                        <TitleInfo>{effectiveDate}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Expiration Date</TitleTitle>
                        <TitleInfo>{expirationDate}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Coverage Term</TitleTitle>
                        <TitleInfo>{coverageTerm}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Radius</TitleTitle>
                        <TitleInfo>{radius}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Size Class</TitleTitle>
                        <TitleInfo>{sizeClass}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Line of Business</TitleTitle>
                        <TitleInfo>{lineOfBusiness}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Agent</TitleTitle>
                        <TitleInfo>{agent}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Underwriting Code</TitleTitle>
                        <TitleInfo>{underwritingCode}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>State</TitleTitle>
                        <TitleInfo>{states}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Classification</TitleTitle>
                        <TitleInfo>{classification}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Policy Line Item</TitleTitle>
                        <TitleInfo>{policyLineItem}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Business Use Class</TitleTitle>
                        <TitleInfo>{businessUseClass}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Policy Category</TitleTitle>
                        <TitleInfo>{policyCategory}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Class Code</TitleTitle>
                        <TitleInfo>{classCode}</TitleInfo>
                    </Tile>
                </Flex>
            </Section>
            <Section>
                <Row>
                    <Title style={{ marginRight: 'unset' }}>
                        Endorsements{' '}
                    </Title>{' '}
                    <CreateButton onClick={endorsementsOnclick}>
                        {' '}
                        + Edit Endorsements
                    </CreateButton>
                </Row>
                <Flex>{renderEndorsements()}</Flex>
            </Section>
        </>
    )
}

const Row = styled.div`
    display: flex;
    align-items: center;
`

export default Policy
