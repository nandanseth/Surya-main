import { Section, Flex, Tile, TitleTitle, TitleInfo, Title } from '../shared'

const Coverage = ({ coverage }) => {
    const {
        overall,
        deductable,
        deductableAmount,
        deductableAutoEntry,
        combinedSectionLimit,
        combinedSectionEntry,
        splitSectionBodyPerPerson,
        splitSectionBodyPerAccidentOptions,
        splitSectionPropertyDamageOptions,
        splitSectionAutoEntryOptions,
        pIProtectionSingleLimit,
        pIProtectionSingleEntry,
        pIProtectionSplitBodyPerPerson,
        pIProtectionSplitBodyPerAccident,
        pIProtectionSplitPropertyDamage,
        pIProtectionSplitAutoEntry,
        medicalSingleLimit,
        medicalSingleEntry,
        medicalSplitBodyPerPerson,
        medicalSplitBodyPerAccident,
        medicalSplitPropertyDamage,
        medicalSplitAutoEntry,
        underinsuredMotoristSingleLimit,
        underinsuredMotoristSingleAutoEntry,
        underMotoristBodyPerPerson,
        underMotoristBodyPerAccident,
        underMotoristProperty,
        underMotoristAuto,
        cslSingleLimit,
        cslBodyPerAccident,
        cslBodyPerPerson,
        cslSingleAuto,
        cslProperty,
        cslSplitAuto,
        nonCslBodyPerAccident,
        nonCslBodyPerPerson,
        nonCslProperty,
        nonCslSingleAuto,
        nonCslSingleLimit,
        nonCslSplitAuto,
        unMotoristAuto,
        unMotoristBodyPerAccident,
        unMotoristBodyPerPerson,
        unMotoristProperty,
        uninsuredMotoristSingleAutoEntry,
        uninsuredMotoristSingleLimit,
        personalInjury,
        medicalPayments,
        underinsuredMotorist,
        uninsuredMotorist,
        csl,
        nonOwnedCSL,
        // overallPremium,
        // personalInjuryProtectionPremium,
        // medicalPaymentsPremium,
        // underinsuredMotoristPremium,
        // uninsuredMotoristPremium,
    } = coverage

    return (
        <Section>
            <Title>Coverage</Title>
            <Flex>
                <Tile>
                    <TitleTitle>Overall Premium</TitleTitle>
                    <TitleInfo>
                        <b>{coverage?.overallPremium}</b>
                    </TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Personal Injury Protection Premium</TitleTitle>
                    <TitleInfo>
                        <b>{coverage?.personalInjuryProtectionPremium}</b>
                    </TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Medical Payments Premium</TitleTitle>
                    <TitleInfo>
                        <b>{coverage?.medicalPaymentsPremium}</b>
                    </TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Underinsured Motorist Premium</TitleTitle>
                    <TitleInfo>
                        <b>{coverage?.underinsuredMotoristPremium}</b>
                    </TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Uninsured Motorist Premium</TitleTitle>
                    <TitleInfo>
                        <b>{coverage?.uninsuredMotoristPremium}</b>
                    </TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Overall</TitleTitle>
                    <TitleInfo>{overall}</TitleInfo>
                </Tile>
                <Tile>
                    <TitleTitle>Deductable</TitleTitle>
                    <TitleInfo>{deductable}</TitleInfo>
                </Tile>
                <Tile>
                    <TitleTitle>Deductable Amount</TitleTitle>
                    <TitleInfo>{deductableAmount}</TitleInfo>
                </Tile>
                <Tile>
                    <TitleTitle>Deductable Auto</TitleTitle>
                    <TitleInfo>{deductableAutoEntry}</TitleInfo>
                </Tile>
                <Tile>
                    <TitleTitle>Combined Section Limit</TitleTitle>
                    <TitleInfo>{combinedSectionLimit}</TitleInfo>
                </Tile>
                <Tile>
                    <TitleTitle>Combined Section Entry</TitleTitle>
                    <TitleInfo>{combinedSectionEntry}</TitleInfo>
                </Tile>
                <Tile>
                    <TitleTitle>Split Section Body Per Person</TitleTitle>
                    <TitleInfo>{splitSectionBodyPerPerson}</TitleInfo>
                </Tile>
                <Tile>
                    <TitleTitle>Split Section Body Per Accident</TitleTitle>
                    <TitleInfo>{splitSectionBodyPerAccidentOptions}</TitleInfo>
                </Tile>
                <Tile>
                    <TitleTitle>Split Section Property Damage</TitleTitle>
                    <TitleInfo>{splitSectionPropertyDamageOptions}</TitleInfo>
                </Tile>
                <Tile>
                    <TitleTitle>Split Section Auto Entry</TitleTitle>
                    <TitleInfo>{splitSectionAutoEntryOptions}</TitleInfo>
                </Tile>
                <Tile>
                    <TitleTitle>
                        Personal Injury Protections Single Limit
                    </TitleTitle>
                    <TitleInfo>{pIProtectionSingleLimit}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Personal Injury Single Entry</TitleTitle>
                    <TitleInfo>{pIProtectionSingleEntry}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>
                        Personal Injury Split Body Per Person{' '}
                    </TitleTitle>
                    <TitleInfo>{pIProtectionSplitBodyPerPerson}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>
                        Personal Injury Split Body Per Accident{' '}
                    </TitleTitle>
                    <TitleInfo>{pIProtectionSplitBodyPerAccident}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>
                        Personal Injury Split Property Damage{' '}
                    </TitleTitle>
                    <TitleInfo>{pIProtectionSplitPropertyDamage}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Personal Injury Split Auto </TitleTitle>
                    <TitleInfo>{pIProtectionSplitAutoEntry}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Medical Single Limit</TitleTitle>
                    <TitleInfo>{medicalSingleLimit}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Medical Single Entry</TitleTitle>
                    <TitleInfo>{medicalSingleEntry}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Medical Split Body Per Person</TitleTitle>
                    <TitleInfo>{medicalSplitBodyPerPerson}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Medical Split Body Per Accident</TitleTitle>
                    <TitleInfo>{medicalSplitBodyPerAccident}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Medical Split Property Damage</TitleTitle>
                    <TitleInfo>{medicalSplitPropertyDamage}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Medical Split Auto</TitleTitle>
                    <TitleInfo>{medicalSplitAutoEntry}</TitleInfo>
                </Tile>

                <Title>
                    <TitleTitle>Underinsured Motorist</TitleTitle>
                    <TitleInfo>{underinsuredMotorist}</TitleInfo>
                </Title>

                <Tile>
                    <TitleTitle>Underinsured Motorist Single Limit</TitleTitle>
                    <TitleInfo>{underinsuredMotoristSingleLimit}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Underinsured Motorist Auto</TitleTitle>
                    <TitleInfo>{underinsuredMotoristSingleAutoEntry}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>
                        Underinsured Motorist Body Per Person
                    </TitleTitle>
                    <TitleInfo>{underMotoristBodyPerPerson}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>
                        Underinsured Motorist Body Per Person
                    </TitleTitle>
                    <TitleInfo>{underMotoristBodyPerPerson}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>
                        Underinsured Motorist Body Per Accident
                    </TitleTitle>
                    <TitleInfo>{underMotoristBodyPerAccident}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Underinsured Motorist Property</TitleTitle>
                    <TitleInfo>{underMotoristProperty}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Underinsured Motorist Auto</TitleTitle>
                    <TitleInfo>{underMotoristAuto}</TitleInfo>
                </Tile>

                {/* now the uninsured section  */}
                <Tile>
                    <Title>Uninsured Motorist</Title>
                    <TitleInfo>{uninsuredMotorist}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Uninsured Motorist Single Limit</TitleTitle>
                    <TitleInfo>{uninsuredMotoristSingleLimit}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Uninsured Motorist Auto</TitleTitle>
                    <TitleInfo>{uninsuredMotoristSingleAutoEntry}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Uninsured Motorist Body Per Person</TitleTitle>
                    <TitleInfo>{unMotoristBodyPerPerson}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Uninsured Motorist Body Per Person</TitleTitle>
                    <TitleInfo>{unMotoristBodyPerPerson}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>
                        Uninsured Motorist Body Per Accident
                    </TitleTitle>
                    <TitleInfo>{unMotoristBodyPerAccident}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Uninsured Motorist Property</TitleTitle>
                    <TitleInfo>{unMotoristProperty}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Uninsured Motorist Auto</TitleTitle>
                    <TitleInfo>{unMotoristAuto}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>CSL Single Limit</TitleTitle>
                    <TitleInfo>{cslSingleLimit}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>CSL Body Per Accident</TitleTitle>
                    <TitleInfo>{cslBodyPerAccident}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>CSL Boder Per Person</TitleTitle>
                    <TitleInfo>{cslBodyPerPerson}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>CSL Single Auto</TitleTitle>
                    <TitleInfo>{cslSingleAuto}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>CSL Property</TitleTitle>
                    <TitleInfo>{cslProperty}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>CSL Split Auto</TitleTitle>
                    <TitleInfo>{cslSplitAuto}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Non-CSL Body Per Accident</TitleTitle>
                    <TitleInfo>{nonCslBodyPerAccident}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Non-CSL Body Per Person</TitleTitle>
                    <TitleInfo>{nonCslBodyPerPerson}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Non-CSL Property</TitleTitle>
                    <TitleInfo>{nonCslProperty}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Non-CSL Single Auto</TitleTitle>
                    <TitleInfo>{nonCslSingleAuto}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Non-CSL Single Limit</TitleTitle>
                    <TitleInfo>{nonCslSingleLimit}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Non-CSL Split Auto</TitleTitle>
                    <TitleInfo>{nonCslSplitAuto}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Personal Injury</TitleTitle>
                    <TitleInfo>{personalInjury}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Medical Payments</TitleTitle>
                    <TitleInfo>{medicalPayments}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>CSL</TitleTitle>
                    <TitleInfo>{csl}</TitleInfo>
                </Tile>

                <Tile>
                    <TitleTitle>Non-Owned CSL</TitleTitle>
                    <TitleInfo>{nonOwnedCSL}</TitleInfo>
                </Tile>
            </Flex>
        </Section>
    )
}

export default Coverage
