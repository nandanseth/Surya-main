
import { checkAllKeys } from '../../../shared'
import { Flex, Section, Title } from '../shared'
import { useState, useEffect } from 'react'
import Search from '../../../components/Search'
import VehicleOverlay from '../../../components/VehicleOverlay'
import VehiclesTable from '../../../components/VehiclesTable'
//import VehiclesReplacements from '../../../components/VehiclesReplacements'


const Vehicles = ({ vehiclesList, policy }) => {
    const [show, setShow] = useState(false)
    const [vehicleId, setVehicleId] = useState(0)
    const [downloadEndorse, setDownloadEndorse] = useState(false)

    const [search, setSearch] = useState('')

    

    // could be wrapped in a useMemo
    const searchFiter = (currentVehicles) => {
        if (search === '') {
            return currentVehicles
        }

        return currentVehicles?.filter((item) => {
            return checkAllKeys({ object: item, check: search })
        })
    }

    const close = () => {
        setShow(false)
    }

    const vehiclesToShow = searchFiter(vehiclesList)

    return (
        <>
            <Section>
                <Flex>
                    <Title>Vehicles (Total: {vehiclesList.length})</Title>
                    <Search
                        clear={() => {
                            setSearch('')
                        }}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                        placeholder="Search Vehicles"
                        style={{ marginLeft: 'auto' }}
                        value={search}
                    />
                </Flex>
                <VehiclesTable
                    open={(id) => {
                        setShow(true)
                        setVehicleId(id)
                    }}
                    vehicles={vehiclesToShow}
                    policy={policy}
                />
{/*                 <VehiclesReplacements
                    vehicles={vehiclesToShow}
                    policy={policy}
                /> */}

                {show && (
                    <VehicleOverlay
                        close={close}
                        show={show}
                        vehicle={vehiclesToShow[vehicleId]}
                    />
                )}
                
            </Section>
        </>
    )
}

export default Vehicles
