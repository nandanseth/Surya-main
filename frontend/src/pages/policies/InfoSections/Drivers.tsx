import { Flex, Section, SubSection, TileItem, Title } from '../shared'

const Drivers = ({ driversList }) => {
    return (
        <Section>
            <Title>Drivers (Total: {driversList.length})</Title>
            {driversList.map((vehicle, i) => {
                const {
                    driverName,
                    licenseNumber,
                    licenseExpDate,
                    licenseEffDate,
                    states,
                } = vehicle

                return (
                    <SubSection key={i}>
                        <Flex>
                            <TileItem title="Driver Name" value={driverName} />
                            <TileItem title="License #" value={licenseNumber} />
                            <TileItem
                                title="License Expiration Date"
                                value={licenseExpDate}
                            />
                            <TileItem
                                title="License Effective Date"
                                value={licenseEffDate}
                            />
                            <TileItem title="State" value={states} />
                        </Flex>
                    </SubSection>
                )
            })}
        </Section>
    )
}

export default Drivers
