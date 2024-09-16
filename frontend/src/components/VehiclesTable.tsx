import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import { SortByHeader, Table, TD, Th, TR } from '../styles/styles'
import { useMemo, useState, useEffect} from 'react'
import styled from 'styled-components'
import AddedVehicle from './RenderDocuments/components/AddedVehicle'
import DeletedVehicle from './RenderDocuments/components/DeletedVehicle'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import FileSaver from 'file-saver'
import { CSVLink } from 'react-csv';

const headers = ['ID', 'Vin', 'Eff Date', 'Exp Date', 'Total Premium', "Make", "Model"]

const headersCSV = ['Vin', 'Make', 'Model', 'Model Year', 'Eff Date', 'Exp Date', 'Total Premium']

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

const VehiclesTable = ({
    vehicles,
    open,
    policy
}: {
    vehicles: Vehicle[]
    open: any
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
    const [formItems, setFormItems] = useState([])



    useEffect(() => {
        setPolicyFull(policy)
        setEffectiveDate(JSON.parse(JSON.stringify(policy)).policy.effectiveDate)
        setExpirationDate(JSON.parse(JSON.stringify(policy)).policy.expirationDate)
        setPolicyNum(JSON.parse(JSON.stringify(policy)).policy.policyNum)
        setPolicyName(JSON.parse(JSON.stringify(policy)).policy.name)
        setCoveragePremium(JSON.parse(JSON.stringify(policy)).coverage.overallPremium)
        setState(JSON.parse(JSON.stringify(policy)).policy.states)
        console.log(items, "FLEA")

        

        const formattedItems = items.map(item => [item.vin, item.make, item.model, item.modelYear, item.baseEffDate, item.baseExpDate, (parseFloat(item.overallPremium)+parseFloat(item.pedPipProtectionPremium)+parseFloat(item.uninsuredMotoristPremium)+parseFloat(item.underinsuredMotoristPremium)).toFixed(2)])

        setFormItems(formattedItems)

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
        <>
        <CSVLink data={formItems} headers={headersCSV} filename="vehicles.csv">
            <DownloadButton>Download CSV</DownloadButton>
        </CSVLink>
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
                {items.map(
                    ({
                        vin,
                        model,
                        make,
                        modelYear,
                        baseEffDate,
                        baseExpDate,
                        overallPremium,
                        pedPipProtectionPremium,
                        uninsuredMotoristPremium,
                        underinsuredMotoristPremium
                        // vehicle

                    }, index) => {
                        // const {
                        //     vin,
                        //     model,
                        //     make,
                        //     modelYear,
                        //     baseEffDate,
                        //     baseExpDate,
                        //     overallPremium
                        //     // vehicle
    
                        // } = item
                        const policyNew = JSON.stringify(policyFull)
                        const effDate = effectiveDate
                        const expDate = expirationDate
                        const polName = policyName
                        const polNum = policyNum
                        const coveragePrem = coveragePremium
                        const polState = state

                        const isDriverAdded = () => {
                            if (new Date(effDate).getTime() < new Date(baseEffDate).getTime()) {
                                return true
                            } else {
                                return false
                            }
                        }

                        const isDriverDeleted = () => {
                            if (new Date(expDate).getTime() > new Date(baseExpDate).getTime()) {
                                return true
                            } else {
                                return false
                            }
                        }
         
                   
                        return (
                            <TR
                                key={vin}
                                onClick={() => {
        

                                    //open(i)
                                    //TODO: lets clean this view up tremendously during the feedback period with a thoughtful view of exactly what we want.
                                }}
                                style={{backgroundColor: isDriverDeleted() ? "#f29da2" : isDriverAdded() ? "#f5f7a8" : "none"}}
                            >
                                <TD>{index+1}</TD>
                                <Name>{vin}</Name>
                                {/* <TD>{make}</TD>
                                <TD>{model}</TD>
                                <TD>{modelYear}</TD> */}
                                <TD>{baseEffDate}</TD>
                                <TD>{baseExpDate}</TD>
                                <TD>{(parseFloat(overallPremium)+parseFloat(pedPipProtectionPremium)+parseFloat(uninsuredMotoristPremium)+parseFloat(underinsuredMotoristPremium)).toFixed(2)}</TD>
                                <TD>{make}</TD>
                                <TD>{model}</TD>
                                
                            </TR>
                        )
                    }
                )}
            </tbody>
        </Table>
        </>
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

export default VehiclesTable
