import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import { SortByHeader, Table, TD, Th, TR } from '../styles/styles'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

const headers = ['Vin', 'Model', 'Insured', 'Period', 'Seating', 'Net Billed']

interface IObjectKeys {
    [key: string]: string | number | undefined
}

interface Vehicle extends IObjectKeys {
    vin: string
    insured: string
    model: string
    period: string
    seating: string | number
    totalPremium: string
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
}: {
    vehicles: Vehicle[]
    open: any
}) => {
    const { items, requestSort, sortConfig } = useSortableData(vehicles)
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
                        insured,
                        period,
                        seating,
                        totalPremium,
                    }) => (
                        <TR key={vin} onClick={open}>
                            <Name>{vin}</Name>
                            <TD>{model}</TD>
                            <TD>{insured}</TD>
                            <TD>{period}</TD>
                            <TD>{seating}</TD>
                            <TD>{totalPremium}</TD>
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

export const makeSampleInfo = (num: number) => {
    const sample: Vehicle[] = []
    for (let i = 0; i <= num; i += 1) {
        const vin = `21PAT00083 - 0${i}`
        const insured = `POCONO MOUNTAIN TRANSPORTATION, INC.${i}`
        const model = 'BENZ'
        const period = '05/16/2021 - 05/16/2022'
        const seating = 4
        const totalPremium = `$${(750.12 + i) * (i + 1)}`
        sample.push({
            vin,
            model,
            insured,
            period,
            seating,
            totalPremium,
        })
    }
    return sample
}

export default VehiclesTable
