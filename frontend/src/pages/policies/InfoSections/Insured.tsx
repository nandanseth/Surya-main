import { Section, Flex, Tile, TitleTitle, TitleInfo, Title } from "../shared";

const Insured = ({ insured }) => {            
    const {  
        agent,
        firstName, middleName, lastName, gender,   suffix, email,phoneNumber,  address1, address2, dob, ssn, city, state, zipCode, 
        contactName,  contactEmail, contactNumber,
        entity, isAddActive, 
      
         corporationName,
          licenseNumber,licenseState, licenseExp, licenseEff, taxIdNumber, 
    
    } = insured;
    
    return (
        <Section>
        <Title>Insured</Title>
        <Flex>
            <Tile>
                <TitleTitle>Agent</TitleTitle>
                <TitleInfo>{agent}</TitleInfo>
            </Tile>
        </Flex>

        <Flex>
            <Tile>
                <TitleTitle>First Name</TitleTitle>
                <TitleInfo>{firstName}</TitleInfo>
            </Tile>
            {middleName && 
            (<Tile>
                <TitleTitle>Middle Name</TitleTitle>
                <TitleInfo>{middleName}</TitleInfo>
            </Tile>)
            }
            <Tile>
                <TitleTitle>Last Name</TitleTitle>
                <TitleInfo>{lastName}</TitleInfo>
            </Tile>

            <Tile>
                <TitleTitle>Gender</TitleTitle>
                <TitleInfo>{gender}</TitleInfo>
            </Tile>

            <Tile>
                <TitleTitle>Suffix</TitleTitle>
                <TitleInfo>{suffix}</TitleInfo>
            </Tile>

            <Tile>
                <TitleTitle>Birth Date</TitleTitle>
                <TitleInfo>{dob}</TitleInfo>
            </Tile>

            <Tile>
                <TitleTitle>SSN</TitleTitle>
                <TitleInfo>{ssn}</TitleInfo>
            </Tile>
        </Flex>

        <Flex>
        <Tile>
                <TitleTitle>Email</TitleTitle>
                <TitleInfo>{email}</TitleInfo>
            </Tile>

            <Tile>
                <TitleTitle>Number</TitleTitle>
                <TitleInfo>{phoneNumber}</TitleInfo>
            </Tile>

            <Tile>
                <TitleTitle>Address</TitleTitle>
                <TitleInfo>{address1  + ' ' + address2 + ', ' + city + ', ' + state + ', ' + zipCode}</TitleInfo>
            </Tile>

        </Flex>
        <Flex>
            <Tile>
                <TitleTitle>Contact Name</TitleTitle>
                <TitleInfo>{contactName}</TitleInfo>
            </Tile>

            <Tile>
                <TitleTitle>Contact Email</TitleTitle>
                <TitleInfo>{contactEmail}</TitleInfo>
            </Tile>
            <Tile>
                <TitleTitle>Contact Number</TitleTitle>
                <TitleInfo>{contactNumber}</TitleInfo>
            </Tile>
        </Flex>

        <Flex>
            <Tile>
                <TitleTitle> Entity </TitleTitle>
                <TitleInfo>{entity}</TitleInfo>
            </Tile>

            <Tile>
                <TitleTitle> Is Add Active </TitleTitle>
                <TitleInfo>{isAddActive}</TitleInfo>
            </Tile>
        </Flex>
        <Flex>
        <Tile>
                <TitleTitle> Corporation Name </TitleTitle>
                <TitleInfo>{corporationName}</TitleInfo>
            </Tile>
        </Flex>
        <Flex>
            <Tile>
                <TitleTitle>License # </TitleTitle>
                <TitleInfo>{licenseNumber}</TitleInfo>
            </Tile>

            <Tile>
                <TitleTitle>License State </TitleTitle>
                <TitleInfo>{licenseState}</TitleInfo>
            </Tile>

            <Tile>
                <TitleTitle>License Expiration Date</TitleTitle>
                <TitleInfo>{licenseExp}</TitleInfo>
            </Tile>

            <Tile>
                <TitleTitle>License Effective Date </TitleTitle>
                <TitleInfo>{licenseEff}</TitleInfo>
            </Tile>
        </Flex>
        <Flex>
            <Tile>
            <TitleTitle>Tax Id Number</TitleTitle>
                <TitleInfo>{taxIdNumber}</TitleInfo>
            </Tile>
        </Flex>

    </Section>
    );
}

export default Insured;