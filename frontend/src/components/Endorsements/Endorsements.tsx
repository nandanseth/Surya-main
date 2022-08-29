import { Colors, fonts, transitionCss } from '../../styles/styles'
import { DarkSubmit } from '../Buttons'
import { OverlayWrapper, Row } from '../../pages/policies/shared'
import { preSubmit, urls } from '../../shared'
import { useAlert } from 'react-alert'
import AlertDialog from './AlertDialog'
import Coverage from './Coverage'
import Drivers from './Drivers'
import Overlay from '../Overlay'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SuryaSelect from '../PolicyForm/PolicyFormSelect'
import Vehicles from './Vehicles'

const driversText = 'Drivers'
const vehiclesText = 'Vehicles'
const coverageText = 'Coverage'

type EndorsmentsKey = 'Drivers' | 'Vehicles' | 'Coverage'

const componentMap: Record<EndorsmentsKey, React.FC> = {
    [driversText]: Drivers,
    [vehiclesText]: Vehicles,
    [coverageText]: Coverage,
}

const endorsementValues = [driversText, vehiclesText, coverageText]
const options = endorsementValues.map((item) => ({ value: item, label: item }))
interface Props {
    toggleEndorsements?: boolean
    endorsementsToggle: () => void
    policy: any
    policyId: string
}

const initialEType = endorsementValues[0]

const Endorsements = ({
    toggleEndorsements,
    endorsementsToggle,
    policy,
    policyId,
}: Props) => {
    const alert = useAlert()

    const [endorsementType, setEndorsementType] = useState(initialEType)

    const { coverage, drivers, vehicles } = policy

    const [initials, setInitials] = useState(undefined)
    const [editedValues, setEdited] = useState(undefined)

    const [submitting, setSubmitting] = useState(false)

    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        setInitials({
            coverage: JSON.parse(JSON.stringify(coverage)),
            drivers: JSON.parse(JSON.stringify(drivers)),
            vehicles: JSON.parse(JSON.stringify(vehicles)),
        })
    }, [coverage, drivers, vehicles])

    useEffect(() => {
        setEdited({
            coverage: JSON.parse(JSON.stringify(coverage)),
            drivers: JSON.parse(JSON.stringify(drivers)),
            vehicles: JSON.parse(JSON.stringify(vehicles)),
        })
    }, [])

    const setCoverage = (val) => {
        setEdited({
            ...editedValues,
            coverage: val,
        })
    }

    const setDrivers = (val) => {
        console.log({ editedValues, val }, 'this is being called')
        setEdited({
            ...editedValues,
            drivers: { values: val },
        })
    }

    const setVehicles = (val) => {
        setEdited({
            ...editedValues,
            vehicles: { values: val },
        })
    }

    const reset = () => {
        setEndorsementType(initialEType)
        setEdited(initials)
    }

    const close = () => {
        reset()
        endorsementsToggle()
    }

    const onSubmit = () => {
        const postStore = async () => {
            try {
                //we can do some verification here
                setSubmitting(true)
                const newPolicy = { ...policy, ...editedValues }
                const stringifiedBody = JSON.stringify(preSubmit(newPolicy))
                const requestOptions = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: stringifiedBody,
                }
                console.log(stringifiedBody)
                const res = await fetch(
                    urls.updatePolicy(policyId),
                    requestOptions
                )
                const data = await res.json()
                console.log({ data }, 'test')
                setSubmitting(false)

                return true
            } catch (error) {
                alert.error('Error getting endorsements')
                console.log(error)
                setSubmitting(false)
                return false
            }
        }
        return postStore()
    }

    const CurrentComponent = componentMap[endorsementType]

    if (!toggleEndorsements) {
        return null
    }

    return (
        <Overlay show={toggleEndorsements}>
            <OverlayWrapper
                onClick={(e) => {
                    if (e.currentTarget !== e.target) return

                    close()
                }}
            >
                <EditModal>
                    <StickyRow>
                        <Row
                            style={{
                                paddingBottom: 12,
                                width: '100%',
                            }}
                        >
                            <EditTitle>Edit Endorsements</EditTitle>
                            <EditExit onClick={close}>X</EditExit>
                        </Row>
                        <Row
                            style={{
                                width: '100%',
                            }}
                        >
                            <SubText>
                                Switch between the sections you want to edit.
                            </SubText>
                            <SuryaSelect
                                label="Endorsement Type"
                                onChange={(e) =>
                                    setEndorsementType(e.target.value)
                                }
                                options={options}
                                value={endorsementType}
                            />
                            <DarkSubmit
                                disabled={submitting}
                                onClick={handleClickOpen}
                                style={{ marginTop: 'auto' }}
                            >
                                Submit
                            </DarkSubmit>
                        </Row>
                    </StickyRow>
                    <Padding>
                        {editedValues && (
                            <CurrentComponent
                                coverage={editedValues.coverage}
                                drivers={editedValues.drivers}
                                setCoverage={setCoverage}
                                setDrivers={setDrivers}
                                setVehicles={setVehicles}
                                vehicles={editedValues.vehicles}
                            />
                        )}
                    </Padding>
                </EditModal>
            </OverlayWrapper>
            <AlertDialog
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                open={open}
                submit={async () => {
                    const check = await onSubmit()
                    if (check) {
                        alert.success('Success')
                        reset()
                        window.location.reload()
                        return
                    }
                }}
            />
        </Overlay>
    )
}

const EditModal = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    background: white;
    border-radius: 8px;
    box-shadow: 4px 4px 12px #00000021;
    display: flex;
    flex-direction: column;
    align-self: center;
    margin-bottom: auto;
`

const Padding = styled.div`
    padding: 24px;
`

const StickyRow = styled(Row)`
    flex-direction: column;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 999;
    padding: 24px;
    border-bottom: solid 1px #0000000f;
    backdrop-filter: blur(4px);
    background: ${Colors.blueGrey};
`

const EditTitle = styled.h1`
    font-size: ${fonts.size.medium};
    color: ${Colors.black};
`

const EditExit = styled.div`
    margin-left: auto;
    font-size: ${fonts.size.default};
    color: ${Colors.black};
    cursor: pointer;
    opacity: 0.3;
    ${transitionCss};
    :hover {
        opacity: 0.7;
    }
`

const SubText = styled.div`
    color: ${Colors.black};
    opacity: 0.6;
    font-size: ${fonts.size.small};
    max-width: 160px;
`

export default Endorsements
