import { Flex, Section, SubSection, TileItem, Title } from '../shared'
import styled from 'styled-components'
import AddedDriver from '../../../components/RenderDocuments/components/AddedDriver'
import DeletedDriver from '../../../components/RenderDocuments/components/DeletedDriver'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { CSVLink } from 'react-csv';
import moment from 'moment'
import RejectedDriversModal from './RejectedDriversModal'
import { SortByHeader, Table, TD, Th, TR } from '../../../styles/styles'
import { useState } from 'react'
import { APP_ID, SERVER_URL } from '../../../index'
import Moralis from "moralis"

const RejectedDrivers = ({ driversList, policy}) => {
    const headers = ['Driver First Name', 'Driver Last Name', 'Driver Middle Name', 'License Number', 'License Eff Date', 'License Exp Date',  'State', 'Driver Eff Date', 'Driver Exp Date', 'Driver Birth Date']
    const headersInfo = ['ID','Driver First Name', 'Driver Last Name', 'Driver Middle Name', 'State', 'Driver Eff Date', 'Driver Exp Date', 'Driver Birth Date']
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const closeModal = () => setModalIsOpen(false);

    const formattedItems = driversList.map(driver => [
        driver.driverFirstName,
        driver.driverLastName,
        driver.driverMiddleName,
        driver.licenseNumber,
        driver.licenseExpDate,
        driver.licenseEffDate,
        driver.states,
        driver.driverEffDate,
        driver.driverExpDate,
        driver.driverBirthDate
        ])
    const [driverStates, setDriverStates] = useState(driversList ? driversList : [
                {
            driverFirstName: null,
            driverMiddleName: null,
            driverLastName: null,
            states: 'OR',
            licenseNumber: null,
            licenseEffDate: null,
            licenseExpDate: null,
            driverEffDate: null,
            driverExpDate: null,
            driverBirthDate: null
        }
    ])
  // Function to add a new rejected driver
  const addRejectedDrivers = async (newDrivers) => {
    try {
        const appId = APP_ID; // Make sure this is defined or imported
        const serverUrl = SERVER_URL; // Make sure this is defined or imported
        const policyNum = policy.policyNum; // Assuming policyNum is accessible like this

        Moralis.start({ serverUrl, appId });
        const RejectedDrivers = Moralis.Object.extend("RejectedDrivers");

        const query = new Moralis.Query(RejectedDrivers);
        let rejectedDriverRecord = await query.equalTo("policyNum", policyNum).first();

        if (rejectedDriverRecord) {
            // If existing record is found, parse and update the array with new drivers
            const existingRejectedDrivers = JSON.parse(rejectedDriverRecord.get("rejectedDrivers"));
            // Use spread operator to add all new drivers to the existing array
            rejectedDriverRecord.set("rejectedDrivers", JSON.stringify([...existingRejectedDrivers, ...newDrivers]));
        } else {
            // If no record exists, create a new one with the array of new drivers
            rejectedDriverRecord = new RejectedDrivers();
            rejectedDriverRecord.set("policyNum", policyNum);
            rejectedDriverRecord.set("rejectedDrivers", JSON.stringify(newDrivers));
        }

        await rejectedDriverRecord.save();
        alert("Rejected drivers added successfully.");

    } catch (error) {
        console.error("Error adding rejected drivers:", error);
    }
};
    
    return (
        <>
        <CSVLink data={formattedItems} headers={headers} filename="vehicles.csv">
            <DownloadButton>Download CSV</DownloadButton>
             
        </CSVLink>
        <DownloadButton onClick={() => setModalIsOpen(true)}>+ Add New Rejected Driver</DownloadButton>
        <Section>
            <Title>Drivers (Total: {driversList.length})</Title>

            <Table>
            <thead>
                <tr>
                    {headersInfo.map((name, i) => {
                        
                        const green = i === headers.length - 1
                        return (
                            <Th key={name}>   
                                    {name}
                            </Th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {driversList.map(
                    (driver, index) => {
                        const {effectiveDate, expirationDate, name, policyNum} = policy

                        
                        //const expDate = expirationDate
                        const {
                            driverFirstName,
                            driverLastName,
                            driverMiddleName,
                            licenseNumber,
                            licenseExpDate,
                            licenseEffDate,
                            states,
                            driverEffDate,
                            driverExpDate,
                            driverBirthDate
                        } = driver

                        const isDriverAdded = () => {
                            if (new Date(effectiveDate).getTime() < new Date(driverEffDate).getTime()) {
                                return true
                            } else {
                                return false
                            }
                        }

                        const isDriverDeleted = () => {
                            if (new Date(expirationDate).getTime() > new Date(driverExpDate).getTime()) {
                                return true
                            } else {
                                return false
                            }
                        }
         
                   
                        return (
                            <TR
                                key={licenseNumber}
                                onClick={() => {
        

                                    //open(i)
                                    //TODO: lets clean this view up tremendously during the feedback period with a thoughtful view of exactly what we want.
                                }}
                                style={{backgroundColor: isDriverDeleted() ? "#f29da2" : isDriverAdded() ? "#f5f7a8" : "none"}}
                            >
                                <TD>{index+1}</TD>
                                <TD>{driverFirstName}</TD>
                                <TD>{driverLastName}</TD>
                                <TD>{driverMiddleName}</TD>
                                {/* <TD>{licenseNumber}</TD>
                                <TD>{licenseEffDate}</TD>
                                <TD>{licenseExpDate}</TD> */}
                                <TD>{states}</TD>
                                <TD>{driverEffDate}</TD>
                                <TD>{driverExpDate}</TD>
                                <TD>{driverBirthDate}</TD>
                                
                            </TR>
                        )
                    }
                )}
            </tbody>
        </Table>


            {/* {driversList.map((driver, i) => {
                const {effectiveDate, expirationDate, name, policyNum} = policy
                //const expDate = expirationDate
                const {
                    driverFirstName,
                    driverLastName,
                    driverMiddleName,
                    licenseNumber,
                    licenseExpDate,
                    licenseEffDate,
                    states,
                    driverEffDate,
                    driverExpDate,
                    driverBirthDate
                } = driver

                return (
                    <SubSection key={i}>
                        <Flex>
                            <TileItem title="Driver First Name" value={driverFirstName} />
                            <TileItem title="Driver Middle Name" value={driverMiddleName} />
                            <TileItem title="Driver Last Name" value={driverLastName} />
                            <TileItem title="License #" value={licenseNumber} />
                            <TileItem
                                title="License Effective Date"
                                value={licenseEffDate}
                            />
                            <TileItem
                                title="License Expiration Date"
                                value={licenseExpDate}
                            />
                            <TileItem title="State" value={states} />
                            <TileItem
                                title="Effective Date"
                                value={driverEffDate}
                            />
                            <TileItem
                                title="Expiration Date"
                                value={driverExpDate}
                            />
                            <TileItem
                                title="Birth Date"
                                value={driverBirthDate}
                            />
                            
                           
                        </Flex>
                    </SubSection>
                )
            })} */}
        </Section>
        {modalIsOpen && <RejectedDriversModal store={policy} values={driverStates} setValues={setDriverStates} onClose={closeModal} onSubmit={addRejectedDrivers}/>}
        </>
    )
}

const DownloadButton = styled.button`
    border: 1px solid black;
    border-radius: 2rem;
    padding: 10px;
`

export default RejectedDrivers
