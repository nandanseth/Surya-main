import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'

import { PolicyType } from '../../shared'
import { SortByHeader, Table, TD, Th, TR } from '../../styles/styles'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useState, useMemo } from 'react'

const headers = ['Policy Name', 'ID', 'Insured Name', 'Effective Date', 'Status', 'Premium']


const headersMap = {'Policy Name': 'name', 
'ID': 'policyNum', 
'Insured Name': 'name', 
'Effective Date': 'effectiveDate', 
'Status': 'expirationDate', 
'Premium': 'overallPremium'}

// TODO: Reintroduce this at the request @Kush
const useSortableData = (items: PolicyType[], config = null) => {
    const [sortConfig, setSortConfig] = useState<{
        key: string
        direction: string
    } | null>(config)


    const CalculatePremium = (vehicles, coverage) => {
        let premium = 0.00

        for (const i in vehicles.values) {
           
                if (!isNaN(parseFloat(vehicles.values[i].overallPremium))) {
                    premium+=parseFloat(vehicles.values[i].overallPremium)
                }
                if (!isNaN(parseFloat(vehicles.values[i].personalInjuryProtectionPremium))) {
                    premium+=parseFloat(vehicles.values[i].personalInjuryProtectionPremium)
                }
                if (!isNaN(parseFloat(vehicles.values[i].pedPipProtectionPremium))) {
                    premium+=parseFloat(vehicles.values[i].pedPipProtectionPremium)
                }
                if (!isNaN(parseFloat(vehicles.values[i].medicalPaymentsPremium))) {
                    premium+=parseFloat(vehicles.values[i].medicalPaymentsPremium)
                }
                if (!isNaN(parseFloat(vehicles.values[i].underinsuredMotoristPremium))) {
                    premium+=parseFloat(vehicles.values[i].underinsuredMotoristPremium)
                }
                if (!isNaN(parseFloat(vehicles.values[i].uninsuredMotoristPremium))) {
                    premium+=parseFloat(vehicles.values[i].uninsuredMotoristPremium)
                }
            
        
        }
        if (!isNaN(parseFloat(coverage.hiredCSLPremium))) {
            premium+=parseFloat(coverage.hiredCSLPremium)
        }

        if (!isNaN(parseFloat(coverage.nonOwnedCSLPremium))) {
            premium+=parseFloat(coverage.nonOwnedCSLPremium)
        }
    
        return premium
    }



    const sortedItems = useMemo(() => {
        const sortableItems = [...items]
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {

                const { key } = sortConfig
                
                
                const [valA, valB] = key === 'Premium' 
                ? [CalculatePremium(a['vehicles'], a['coverage']), CalculatePremium(b['vehicles'], b['coverage'])] : 
                key === 'Effective Date' ? [new Date(a['policy']['effectiveDate']), new Date(b['policy']['effectiveDate'])] : 
                [a['policy'][headersMap[key]], b['policy'][headersMap[key]]]

                console.log(valA, valB, 'slal')
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

const PoliciesTable = ({ policies }: { policies: PolicyType[] }) => {
    const { items, requestSort, sortConfig } = useSortableData(policies);

    console.log(sortConfig, 'all')
    //const items = policies
    //const sortConfig = undefined
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


    const CalculatePremium = (vehicles, coverage) => {
        let premium = 0.00

        for (const i in vehicles.values) {
           
                if (!isNaN(parseFloat(vehicles.values[i].overallPremium))) {
                    premium+=parseFloat(vehicles.values[i].overallPremium)
                }
                if (!isNaN(parseFloat(vehicles.values[i].personalInjuryProtectionPremium))) {
                    premium+=parseFloat(vehicles.values[i].personalInjuryProtectionPremium)
                }
                if (!isNaN(parseFloat(vehicles.values[i].pedPipProtectionPremium))) {
                    premium+=parseFloat(vehicles.values[i].pedPipProtectionPremium)
                }
                if (!isNaN(parseFloat(vehicles.values[i].medicalPaymentsPremium))) {
                    premium+=parseFloat(vehicles.values[i].medicalPaymentsPremium)
                }
                if (!isNaN(parseFloat(vehicles.values[i].underinsuredMotoristPremium))) {
                    premium+=parseFloat(vehicles.values[i].underinsuredMotoristPremium)
                }
                if (!isNaN(parseFloat(vehicles.values[i].uninsuredMotoristPremium))) {
                    premium+=parseFloat(vehicles.values[i].uninsuredMotoristPremium)
                }
            
        
        }
        if (!isNaN(parseFloat(coverage.hiredCSLPremium))) {
            premium+=parseFloat(coverage.hiredCSLPremium)
        }

        if (!isNaN(parseFloat(coverage.nonOwnedCSLPremium))) {
            premium+=parseFloat(coverage.nonOwnedCSLPremium)
        }
    
        return premium.toLocaleString('en-US', {minimumFractionDigits: 2})
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
                                    onClick={() => requestSort(name)}
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
                    ({ created_at, id, policy, insured, coverage, vehicles, cancellation }, i) => (
                        //        <StyledLink to={`/policies/${encodeURI(name)}`} key={name}>
                        <TR
                            key={i}
                            onClick={() => {
                                //@ts-ignore
                                console.log()
                                navigate(`/policies/${encodeURI(policy.policyNum)}`)
                            }}
                        >
                            <Name>{policy.name}</Name>
                            <TD>{(policy.policyNum) ? (policy.policyNum) : (id)}</TD>
                            <TD>{(insured.lastName !== 'null') ? (`${insured.firstName} ${insured.lastName}`) : (`${insured.firstName}`)}</TD>
                            <TD>{policy.effectiveDate}</TD>
                            <TD>{(cancellation && cancellation.isCancelled !== undefined && cancellation.isCancelled === 'Yes') ? (
                            <>
                                Cancelled
                            </>) : (
                            (new Date(policy.expirationDate).getTime() > new Date().getTime()) ?
                            (<>
                            In Force
                            </>) :
                            (<>
                               Expired
                            </>))}</TD>
                            <TD>${CalculatePremium(vehicles, policy, coverage)}</TD>
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
