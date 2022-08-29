import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { PolicyType } from '../../shared'
import { SortByHeader, Table, TD, Th, TR } from '../../styles/styles'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const headers = ['Policy Name', 'ID', 'Insured Name', 'Created At', 'Premium']

// TODO: Reintroduce this at the request @Kush
// const useSortableData = (items: PolicyType[], config = null) => {
//     const [sortConfig, setSortConfig] = useState<{
//         key: string
//         direction: string
//     } | null>(config)

//     const sortedItems = useMemo(() => {
//         const sortableItems = [...items]
//         if (sortConfig !== null) {
//             sortableItems.sort((a, b) => {
//                 const { key } = sortConfig
//                 const [valA, valB] = [a[key], b[key]]
//                 if (valA === undefined) {
//                     return sortConfig.direction === 'ascending' ? 1 : -1
//                 }

//                 if (valB === undefined) {
//                     return sortConfig.direction === 'ascending' ? -1 : 1
//                 }
//                 if (valA < valB) {
//                     return sortConfig.direction === 'ascending' ? -1 : 1
//                 }
//                 if (valA > valB) {
//                     return sortConfig.direction === 'ascending' ? 1 : -1
//                 }
//                 return 0
//             })
//         }
//         return sortableItems
//     }, [items, sortConfig])

//     const requestSort = (key: string) => {
//         if (sortConfig && sortConfig.key === key) {
//             const { direction } = sortConfig
//             if (direction === 'ascending') {
//                 setSortConfig({ key, direction: 'descending' })
//                 return
//             }

//             setSortConfig(null)
//             return
//         }
//         setSortConfig({ key, direction: 'ascending' })
//     }

//     return { items: sortedItems, requestSort, sortConfig }
// }

const PoliciesTable = ({ policies }: { policies: PolicyType[] }) => {
    //const { items, requestSort, sortConfig } = useSortableData(policies);
    const items = policies
    const sortConfig = undefined
    const navigate = useNavigate()

    // add this in there to sort when getting the info
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

    return (
        <Table>
            <thead>
                <tr>
                    {headers.map((name, i) => {
                        const green = i === headers.length - 1
                        return (
                            <Th key={i}>
                                <SortByHeader
                                    green={green}
                                    type="button"
                                    //onClick={() => requestSort(name)}
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
                    ({ created_at, id, policy, insured, coverage }, i) => (
                        //        <StyledLink to={`/policies/${encodeURI(name)}`} key={name}>
                        <TR
                            key={i}
                            onClick={() => {
                                //@ts-ignore
                                navigate(`/policies/${encodeURI(id)}`)
                            }}
                        >
                            <Name>{policy.name}</Name>
                            <TD>{id}</TD>
                            <TD>{`${insured.firstName} ${insured.lastName}`}</TD>
                            <TD>{created_at}</TD>
                            <TD>{coverage.overallPremium}</TD>
                        </TR>
                    )
                )}
            </tbody>
        </Table>
    )
}

const Name = styled(TD)`
    font-weight: 600;
`

export default PoliciesTable
