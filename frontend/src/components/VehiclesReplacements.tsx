import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import { SortByHeader, Table, TD, Th, TR } from '../styles/styles'
import { useMemo, useState, useEffect} from 'react'
import styled from 'styled-components'
import AddedVehicle from './RenderDocuments/components/AddedVehicle'
import DeletedVehicle from './RenderDocuments/components/DeletedVehicle'
import ReplacedVehicle from './RenderDocuments/components/ReplacedVehicle'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'

const headers = ['Replaced Vin', 'Replacement Vin', 'Eff Date', "Endorsement"]

interface IObjectKeys {
    [key: string]: string | number | undefined | any
}

interface Vehicle extends IObjectKeys {
    vin: string
    make: string
    model: string
    modelYear: string
    baseEffDate: string
    baseExpDate: string
    // seating: string | number
    overallPremium: string
}

const useSortableData = (items: Vehicle[], config = null) => {
    const [sortConfig, setSortConfig] = useState<{
        key: string
        direction: string
    } | null>(config)
    

    const sortedItems = useMemo(() => {
        const sortableItems = [...items]
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const { key } = sortConfig
                const [valA, valB] = [a[key], b[key]]
                if (valA === undefined) {
                    return sortConfig.direction === 'ascending' ? 1 : -1
                }

                if (valB === undefined) {
                    return sortConfig.direction === 'ascending' ? -1 : 1
                }
                if (valA < valB) {
                    return sortConfig.direction === 'ascending' ? -1 : 1
                }
                if (valA > valB) {
                    return sortConfig.direction === 'ascending' ? 1 : -1
                }
                return 0
            })
        }
        return sortableItems
    }, [items, sortConfig])

    const requestSort = (key: string) => {
        if (sortConfig && sortConfig.key === key) {
            const { direction } = sortConfig
            if (direction === 'ascending') {
                setSortConfig({ key, direction: 'descending' })
                return
            }

            setSortConfig(null)
            return
        }
        setSortConfig({ key, direction: 'ascending' })
    }

    return { items: sortedItems, requestSort, sortConfig }
}

const VehiclesReplacements = ({
    vehicles,
    policy
}: {
    vehicles: Vehicle[]
    policy: any
}) => {
    const [policyFull, setPolicyFull] = useState("")
    const { items, requestSort, sortConfig } = useSortableData(vehicles)
    const [downloadEndorse, setDownloadEndorse] = useState()
    const [effectiveDate, setEffectiveDate] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const [policyName, setPolicyName] = useState("")
    const [policyNum, setPolicyNum] = useState("")
    const [coveragePremium, setCoveragePremium] = useState("")
    const [state, setState] = useState("")
    const [replacedVehicles, setReplacedVehicles] = useState([])



    useEffect(() => {

        let i = 0
        let j = 0
        setPolicyFull(policy)
        setEffectiveDate(JSON.parse(JSON.stringify(policy)).policy.effectiveDate)
        setExpirationDate(JSON.parse(JSON.stringify(policy)).policy.expirationDate)
        setPolicyNum(JSON.parse(JSON.stringify(policy)).policy.policyNum)
        setPolicyName(JSON.parse(JSON.stringify(policy)).policy.name)
        setCoveragePremium(JSON.parse(JSON.stringify(policy)).coverage.overallPremium)
        setState(JSON.parse(JSON.stringify(policy)).policy.states)

        const replacements = []

        while (i < vehicles.length) {
            while (j < vehicles.length) {
                if (vehicles[i].baseExpDate !== expirationDate && vehicles[j].baseEffDate !== effectiveDate && vehicles[i].baseExpDate === vehicles[j].baseEffDate) {
                    replacements.push([i,j])
                }
                j++
            }
            i++
            j=0
        }

        setReplacedVehicles(replacements)




        console.log(replacements, "HI")
        
    }, [policy])

    

    const getAttribute = (name: string) => {
        if (!sortConfig) {
            return {}
        }
        return sortConfig.key === name
            ? { direction: sortConfig.direction }
            : {}
    }

    const getArrow = (direction) => {
        if (direction === 'ascending') {
            return <KeyboardArrowDown fontSize="medium" />
        }

        return <KeyboardArrowUp fontSize="medium" />
    }

    const DownloadEnd = async(vin) => {
        console.log(policyFull)
    }

    

    return (
        <Table>
            <thead>
                <tr>
                    {headers.map((name, i) => {
                        
                        const green = i === headers.length - 1
                        return (
                            <Th key={name}>
                                <SortByHeader
                                    green={green}
                                    onClick={() => requestSort(name)}
                                    type="button"
                                >
                                    {name}
                                    {getAttribute(name)?.direction
                                        ? getArrow(getAttribute(name).direction)
                                        : null}
                                </SortByHeader>
                            </Th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {replacedVehicles.map(
                    (replacement) => {
                        const policyNew = JSON.stringify(policyFull)
                        const effDate = effectiveDate
                        const expDate = expirationDate
                        const polName = policyName
                        const polNum = policyNum
                        const coveragePrem = coveragePremium
                        const polState = state
         
                   
                        return (
                            <TR
                            >
                                <Name>{vehicles[replacement[0]].vin}</Name>
                                {/* <TD>{make}</TD>
                                <TD>{model}</TD>
                                <TD>{modelYear}</TD> */}
                                <TD>{vehicles[replacement[1]].vin}</TD>
                                <TD>{vehicles[replacement[1]].baseEffDate}</TD>
                                <TD>
                                    {/* <PDFDownloadLink
                                    document={<ReplacedVehicle policy={policyNew} 
                                    vinReplaced={vehicles[replacement[0]].vin} modelReplaced={vehicles[replacement[0]].model} modelYearReplaced={vehicles[replacement[0]].modelYear} makeReplaced={vehicles[replacement[0]].make} 
                                    vinReplacement={vehicles[replacement[1]].vin} modelReplacement={vehicles[replacement[1]].model} modelYearReplacement={vehicles[replacement[1]].modelYear} makeReplacement={vehicles[replacement[1]].make}
                                    baseEffDateReplaced={vehicles[replacement[0]].baseEffDate} baseExpDateReplaced={vehicles[replacement[0]].baseExpDate} 
                                    baseEffDateReplacement={vehicles[replacement[1]].baseEffDate} baseExpDateReplacement={vehicles[replacement[1]].baseExpDate} 
                                    effDate={effDate} expDate={expDate} polName={polName} polNum={polNum}
                                    coveragePremium={coveragePrem} state={polState}/>}
                                    fileName="FORM"
                                    >
                                        {({ loading }) =>
                                            loading ? (
                                                <DownloadButton>Loading Document...</DownloadButton>
                                            ) : (
                                                <DownloadButton>Download</DownloadButton>
                                            )
                                        }
                                    </PDFDownloadLink> */}
                                </TD>
                                
                            </TR>
                        )
                    }
                )}
            </tbody>
        </Table>
    )
}

const Name = styled(TD)`
    font-weight: 600;
`

const DownloadButton = styled.button`
    border: 1px solid black;
    border-radius: 2rem;
    padding: 10px;
`

export const makeSampleInfo = (num: number) => {
    const sample: Vehicle[] = []
    for (let i = 0; i <= num; i += 1) {
        const vin = `21PAT00083 - 0${i}`
        const make = `MERCEDES${i}`
        const model = 'BENZ'
        const modelYear = '2005'
        const baseEffDate = '09/07/2021'
        const baseExpDate = '09/07/2022'
        const seating = 4
        const fullPolicy = "policy"
        const overallPremium = `$${(750.12 + i) * (i + 1)}`
        sample.push({
            vin,
            make,
            model,
            modelYear,
            baseEffDate,
            baseExpDate,
            overallPremium
        })
    }
    return sample
}

export default VehiclesReplacements
