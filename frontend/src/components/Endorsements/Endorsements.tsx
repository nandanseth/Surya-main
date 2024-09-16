import { Colors, fonts, transitionCss } from '../../styles/styles'
import { DarkSubmit } from '../Buttons'
import { OverlayWrapper, Row } from '../../pages/policies/shared'
import { preSubmit, urls } from '../../shared'
import { useAlert } from 'react-alert'
import AlertDialog from './AlertDialog'
import Coverage from './Coverage'
import Drivers from './Drivers'
import Insured from './Insured'
import Reinsurance from './Reinsurance'
import LossHistory from './LossHistory'
import Overlay from '../Overlay'
import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import SuryaSelect from '../PolicyForm/PolicyFormSelect'
import Vehicles from './Vehicles'
import Policy from './Policy'
import { compareJSONObjects } from '../../utils/endorsements/compareJSONObjects'
import { replaceOldToNew } from '../../utils/endorsements/replaceOldToNew'
import fixDeletedVehiclePremiums from '../../utils/endorsements/fixDeletedVehiclePremiums'
import fixCoverageVehiclePremiums from '../../utils/endorsements/fixCoverageVehiclePremiums'

import { APP_ID, SERVER_URL } from '../../index'
import Moralis from "moralis"
import { constants } from 'buffer'
//import { useMoralisQuery } from "react-moralis";

const driversText = 'Drivers'
const vehiclesText = 'Vehicles'
const coverageText = 'Coverage'
const lossHistoryText = 'LossHistory'
const insuredText = 'Insured'
const reinsuranceText = 'Reinsurance'
const policyText = 'Policy'

type EndorsmentsKey = 'Drivers' | 'Vehicles' | 'Coverage' | 'LossHistory' | 'Insured' | 'Reinsurance' | 'Policy'

const componentMap: Record<EndorsmentsKey, React.FC> = {
    [driversText]: Drivers,
    [vehiclesText]: Vehicles,
    [coverageText]: Coverage,
    [lossHistoryText]: LossHistory,
    [insuredText]: Insured,
    [reinsuranceText]: Reinsurance,
    [policyText]: Policy
}

const endorsementValues = [driversText, vehiclesText, coverageText, lossHistoryText, insuredText, reinsuranceText, policyText]
const options = endorsementValues.map((item) => ({ value: item, label: item }))
interface Props {
    toggleEndorsements?: boolean
    endorsementsToggle: () => void
    policyMain: any
    policyId: string
}

const initialEType = endorsementValues[0]

const Endorsements = ({
    toggleEndorsements,
    endorsementsToggle,
    policyMain,
    policyId,
}: Props) => {
    const alert = useAlert()

    const [endorsementType, setEndorsementType] = useState(initialEType)
    const [endEffDate, setEndEffDate] = useState('')

    const { coverage, drivers, vehicles, insured, lossHistory, reinsurance, policy } = policyMain

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
        console.log(JSON.parse(JSON.stringify(drivers)), "HELLO")
        
        
        setInitials({
            coverage: JSON.parse(JSON.stringify(coverage ?? {})),
            drivers: JSON.parse(JSON.stringify(drivers ?? {})),
            vehicles: JSON.parse(JSON.stringify(vehicles ?? {})),
            lossHistory: JSON.parse(JSON.stringify(lossHistory ?? {})),
            insured: JSON.parse(JSON.stringify(insured ?? {})),
            reinsurance: JSON.parse(JSON.stringify(reinsurance ?? {})),
            policy: JSON.parse(JSON.stringify(policy ?? {}))
            
        })

        console.log(policyMain)
    }, [coverage, drivers, vehicles, lossHistory, insured, reinsurance, policy])

    

    useEffect(() => {
        setEdited({
            coverage: JSON.parse(JSON.stringify(coverage ?? {})),
            drivers: JSON.parse(JSON.stringify(drivers ?? {})),
            vehicles: JSON.parse(JSON.stringify(vehicles ?? {})),
            lossHistory: JSON.parse(JSON.stringify(lossHistory ?? {})),
            insured: JSON.parse(JSON.stringify(insured ?? {})),
            reinsurance: JSON.parse(JSON.stringify(reinsurance ?? {})),
            policy: JSON.parse(JSON.stringify(policy ?? {}))
        })
        console.log(policyMain, editedValues)
    }, [coverage, drivers, vehicles, lossHistory, insured, reinsurance, policy])

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

    const setLossHistory = (val) => {
        setEdited({
            ...editedValues,
            lossHistory: val,
        })
    }

    const setInsured = (val) => {
        console.log({ editedValues, val }, 'this is being called')
        setEdited({
            ...editedValues,
            insured: val,
        })
    }


    const setPolicy = (val) => {
        console.log({ editedValues, val }, 'this is being called')
        setEdited({
            ...editedValues,
            policy: val,
        })
    }

    const setReinsurance = (val) => {
        setEdited({
            ...editedValues,
            reinsurance: { values: val },
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
        // const postStore = async () => {
        //     try {
        //         //we can do some verification here
        //         setSubmitting(true)
        //         const newPolicy = { ...policy, ...editedValues }
        //         const stringifiedBody = JSON.stringify(preSubmit(newPolicy))
        //         const requestOptions = {
        //             method: 'PUT',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: stringifiedBody,
        //         }
        //         console.log(stringifiedBody)
        //         const res = await fetch(
        //             urls.updatePolicy(policyId),
        //             requestOptions
        //         )
        //         const data = await res.json()
        //         console.log({ data }, 'test')
        //         setSubmitting(false)

        //         return true
        //     } catch (error) {
        //         alert.error('Error getting endorsements')
        //         console.log(error)
        //         setSubmitting(false)
        //         return false
        //     }
        // }




        function appendChanges(existingChanges, newChanges) {
            
            Object.keys(newChanges).forEach(key => {
              console.log(existingChanges, key, "HLE")
              if (!existingChanges[key]) {
                existingChanges[key] = { values: [] };
              }
              existingChanges[key].values.push(newChanges[key].values[0]);
            });
            
            return existingChanges;
          }

          


        const postStore = async () => {
            try {
                const appId = APP_ID;
                const serverUrl = SERVER_URL;  

                Moralis.start({ serverUrl, appId });

                setSubmitting(true)

                
                const newPolicy = { ...policyMain, ...editedValues }

                


                const differences = compareJSONObjects(policyMain, editedValues, endEffDate)

                const Endorsements = (Moralis as any).Object.extend("Endorsements")  
                const endorsement = new Endorsements()
                const queryEnd = new (Moralis as any).Query(Endorsements);
                const dataEnd = await queryEnd.equalTo("policyNum", newPolicy.policy.policyNum).first();

                let totalChanges

                

                if (dataEnd === undefined) {
                    
                    endorsement.set("endorsementsJson", JSON.stringify(differences))
                    totalChanges = differences
                    
                    endorsement.set("policyNum", newPolicy.policy.policyNum)
                    await endorsement.save()
                } else {
                    console.log(dataEnd)
                    const dataOfEnd = dataEnd.get("endorsementsJson")
                    console.log(dataOfEnd)

                    totalChanges = appendChanges(JSON.parse(dataOfEnd), differences)

                    
                    
                    
                    dataEnd.set("endorsementsJson", JSON.stringify(totalChanges))
                    await dataEnd.save()
                }

                
                
                const stringifiedBody = JSON.stringify(newPolicy)

                console.log(newPolicy, 'skal')

                
                const finalPolOne = fixDeletedVehiclePremiums(totalChanges, newPolicy)

                console.log(finalPolOne, 'slal')

                const finalPol = fixCoverageVehiclePremiums(totalChanges, finalPolOne)

                console.log(finalPol, 'spal')

                const newPolicyFinal = replaceOldToNew(policyMain, finalPol, endEffDate)

                console.log(newPolicyFinal, 'smal') 


     
                const Policy = (Moralis as any).Object.extend("Policies")

                const query = new (Moralis as any).Query(Policy);
                const data = await query.equalTo("policyNum", newPolicy.policy.policyNum).first();

                data.set("policyJson", JSON.stringify(newPolicyFinal))
                await data.save()

                return true

            } catch (error) {
                alert.error('Error submitting endorsements')
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
                            lossHistory={editedValues.lossHistory}
                            setLossHistory={setLossHistory}
                            insured={editedValues.insured}
                            setInsured={setInsured}
                            reinsurance={editedValues.reinsurance}
                            setReinsurance={setReinsurance}
                            policy={editedValues.policy}
                            setPolicy={setPolicy}
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
                        // window.location.reload()
                        return
                    }
                }}
                endEffDate={endEffDate}
                setEndEffDate={setEndEffDate}
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
