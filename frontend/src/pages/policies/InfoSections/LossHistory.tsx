import { Section, Flex,  Title, TileItem, SubSection } from "../shared";

const LossHistory = ({ lossHistoryList }) => {            

    return (
        <Section>
        <Title>Loss History</Title>
        {lossHistoryList.map((lossHistory, i) => {
                const {  
                    claimType, claimNumber, subClaimNumber, 
                    status,  accidentDate, reportedDate,
                    totalIncurred, liabilityPaid, openReserve,
                    previousPolicyNumber, priorCarrierName, originalInceptionDate, expirationDate, 
                    isExperienceMode, isPolicyTransferred
                } = lossHistory;

            return (
            <SubSection key={i}>

                <Flex>
                    <TileItem title="Claim Type" value={claimType} />
                    <TileItem title="Claim #" value={claimNumber} />
                    <TileItem title="Sub-Claim #" value={subClaimNumber} />
                </Flex>
                <Flex>
                    <TileItem title="Status" value={status} />
                    <TileItem title="Accident Date" value={accidentDate} />
                    <TileItem title="Reported Date" value={reportedDate} />
                </Flex>
                <Flex>
                    <TileItem title="Total Incurred" value={totalIncurred} />
                    <TileItem title="Liability Paid" value={liabilityPaid} />
                    <TileItem title="Open Reserve" value={openReserve} />
                </Flex>

                <Flex>
                    <TileItem title="Previous Policy #" value={previousPolicyNumber} />
                    <TileItem title="Prior Carrier Name" value={priorCarrierName} />
                    <TileItem title="Original Inception Date" value={originalInceptionDate} />
                    <TileItem title="Expiration Date" value={expirationDate} />
                </Flex>
                <Flex>
                    <TileItem title="Experience Mode" value={isExperienceMode} />
                    <TileItem title="Policy Transferred" value={isPolicyTransferred} />
                </Flex>
            </SubSection>)
        })
          }
    </Section>
    );
}

export default LossHistory;
