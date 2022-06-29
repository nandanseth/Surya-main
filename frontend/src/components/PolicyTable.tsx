import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import { SortByHeader, Table, TD, Th, TR } from '../styles/styles'
import { useHistory } from 'react-router-dom'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

const headers = [
    'Name',
    'Insured',
    'Broker',
    'Period',
    'Gross Billed',
    'Net Billed',
]

const useSortableData = (items: Policy[], config = null) => {
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

const PoliciesTable = ({ policies }: { policies: Policy[] }) => {
    //const { items, requestSort, sortConfig } = useSortableData(policies);
    const items = policies
    const sortConfig = undefined
    const history = useHistory()
    console.log(items, 'test')

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
                {items.map(({ created_at, id }, i) => (
                    //        <StyledLink to={`/policies/${encodeURI(name)}`} key={name}>
                    <TR
                        key={i}
                        onClick={() => {
                            //@ts-ignore
                            history.push(`/policies/${encodeURI(id)}`)
                        }}
                    >
                        <Name>{id}</Name>
                        <TD>tbd</TD>
                        <TD>{created_at}</TD>
                        <TD>tbd</TD>
                        <TD>tbd</TD>
                        <TD>tbd</TD>
                    </TR>
                ))}
            </tbody>
        </Table>
    )
}

const Name = styled(TD)`
    font-weight: 600;
`

interface IObjectKeys {
    [key: string]: string | number | undefined
}

interface Policy extends IObjectKeys {
    name: string
    insured: string
    broker: string
    period: string
    grossBilled: string
    netBilled: string
}

export const makeSampleInfo = (num: number) => {
    const sample: Policy[] = []
    for (let i = 0; i <= num; i += 1) {
        const name = `21PAT00083 - 0${i}`
        const insured = `POCONO MOUNTAIN TRANSPORTATION, INC.${i}`
        const broker = `QRSBRK${i}`
        const period = '05/16/2021 - 05/16/2022'
        const grossBilled = `$${(750.12 + i) * (i + 1)}`
        const netBilled = `$${(750.12 + i) * (i + 1)}`
        sample.push({
            name,
            insured,
            broker,
            period,
            grossBilled,
            netBilled,
        })
    }
    return sample
}

export default PoliciesTable
