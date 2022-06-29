import { Section, Flex, Tile, TitleTitle, TitleInfo, Title } from "../shared";

const Policy = ({ policy }) => {            
    const { expirationDate, coverageTerm, radius, sizeClass, effectiveDate, 
            lineOfBusiness, agent, underwritingCode, states, classification, 
            policyLineItem, businessUseClass, policyCategory, classCode, } = policy;
    
    return (
        <Section>
        <Title>Policy</Title>
        <Flex>
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
                <TitleTitle>Effective Date</TitleTitle>
                <TitleInfo>{effectiveDate}</TitleInfo>
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
    );
}

export default Policy;