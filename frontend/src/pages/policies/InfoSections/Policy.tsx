import { CreateButton } from '../../../components/Buttons'
import { Flex, Section, Tile, Title, TitleInfo, TitleTitle } from '../shared'
import styled from 'styled-components'
import Moralis from 'moralis'
import { useState, useEffect} from 'react'
import { SortByHeader, Table, TD, Th, TR } from '../../../styles/styles'
import AddedVehicle from '../../../components/RenderDocuments/components/AddedVehicle'
import DeletedVehicle from '../../../components/RenderDocuments/components/DeletedVehicle'
import ReplacedVehicle from '../../../components/RenderDocuments/components/ReplacedVehicle'
import AddedDriver from '../../../components/RenderDocuments/components/AddedDriver'
import DeletedDriver from '../../../components/RenderDocuments/components/DeletedDriver'
import ReplacedDriver from '../../../components/RenderDocuments/components/ReplacedDriver'
import CoverageEndorsement from '../../../components/RenderDocuments/components/CoverageEndorsement'
import OtherEndorsement from '../../../components/RenderDocuments/components/OtherEndorsement'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { useMoralis } from 'react-moralis'
import { writeUsers } from '../../../utils/users/getWriteUsers'
import AdditionalInsured from '../../../components/RenderDocuments/components/AdditionalInsured'
import AdditionalInsureds from '../../../components/RenderDocuments/components/AdditionalInsureds'
import UploadModal from './UploadModalEndorsements'


const Policy = ({ policy, policyFull, endorsements, endorsementsOnclick }) => {
    const {
        policyNum,
        effectiveDate,
        expirationDate,
        coverageTerm,
        radius,
        secondaryCategory,
        lineOfBusiness,
        agent,
        underwritingCode,
        states,
        classification,
        policyLineItem,
        businessUseClass,
        policyCategory,
        classCode,
    } = policyFull


    const [end, setEnd] = useState({})
    const {authenticate, isAuthenticated, isAuthenticating, hasAuthError, authError, user, logout, account} = useMoralis();
    const [openUpload, setOpenUpload] = useState(false)
    const [docsRendered, setDocsRendered] = useState(false)
    const [isDocAvailable, setIsDocAvailable] = useState({})
    const convertDate = (oldDate) => {
        const utcDate = oldDate;
        console.log(utcDate)
        const dateObj = new Date(utcDate);

        // console.log(dateObj)
        // // Convert the UTC date to EST by adding the timezone offset
        // dateObj.setHours(dateObj.getHours() - 5);

        // console.log(dateObj)

        // Format the date as "hh:mm:ss AM/PM mm-dd-yyyy"
        const formattedDate = dateObj.toLocaleString("en-US", {
            timeZone: "America/New_York",
            hour12: true,
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        });

        return formattedDate
    }

    useEffect(() => {

        
        
        const renderEndorsementsMoralis = async() => {

            const Endorsements = (Moralis as any).Object.extend("Endorsements")  
            const queryEnd = new (Moralis as any).Query(Endorsements);
            const dataEnd = await queryEnd.equalTo("policyNum", policyNum).first();
            let appendedChanges
            if (dataEnd !== undefined) {
                appendedChanges = dataEnd.get("endorsementsJson")
                setEnd(JSON.parse(appendedChanges))
            }  
        };
        renderEndorsementsMoralis()

    }, [])

    const getEndDocStatus = async(index) => {
        const Endorsements = (Moralis as any).Object.extend("EndorsementDocs")  
        const queryEnd = new (Moralis as any).Query(Endorsements);
        const dataEnd = await queryEnd.equalTo("policyNum", policyNum).first();
        let appendedChanges
        console.log(dataEnd, isDocAvailable, 'eeel')
        if (dataEnd) {
            appendedChanges = JSON.parse(dataEnd.get("documents"))
           
            if (Object.keys(appendedChanges).includes(index.toString())) {
                return true
            } else {
                return false
            }
        }  

    }

    const downloadFile = async(doc, index) => {
        console.log(doc, 'click')
        const downloadDelay = 500;
        for (let i = 0; i < doc.length; i++) {
            const response = await fetch(doc);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `Endorsement_Doc__${i}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            await new Promise((resolve) => setTimeout(resolve, downloadDelay));
        }
    }

    const getEndDoc = async(index) => {

        const Endorsements = (Moralis as any).Object.extend("EndorsementDocs")  
        const queryEnd = new (Moralis as any).Query(Endorsements);
        const dataEnd = await queryEnd.equalTo("policyNum", policyNum).first();
        let appendedChanges
        if (dataEnd) {
            appendedChanges = JSON.parse(dataEnd.get("documents"))
            if (appendedChanges[index]) {
                console.log(appendedChanges[index], index, 'click')
                await downloadFile(appendedChanges[index], index)
            } 
        }  

    }

    const endKeys = Object.keys(end);
    const groupedValues = {};
    
    console.log(endKeys, 'endkeys')
    // Group values by timestamp
    endKeys.forEach((key) => {
    const values = end[key].values;
    console.log(values, 'values these')
    if (values !== undefined && values.length > 0) {
        values.forEach((value) => {
        const time = value.time;
        if (groupedValues.hasOwnProperty(time)) {
            if (key.startsWith('vehicles.values') || key.startsWith('drivers.values')) {
            // Handle array values
            const oldValue = Array.isArray(value.oldValue) ? value.oldValue : value.oldValue;
            const newValue = Array.isArray(value.newValue) ? value.newValue : value.newValue;
            groupedValues[time][key] = {
                oldValue: oldValue || '',
                newValue: newValue || '',
                effDate: value.effDate || ''
            };
            } else {
            groupedValues[time][key] = {
                oldValue: value.oldValue,
                newValue: value.newValue,
                effDate: value.effDate
            };
            }
        } else {
            if (key.startsWith('vehicles.values') || key.startsWith('drivers.values')) {
            // Handle array values
            const oldValue = Array.isArray(value.oldValue) ? value.oldValue : value.oldValue;
            const newValue = Array.isArray(value.newValue) ? value.newValue : value.newValue;
            groupedValues[time] = { [key]: { oldValue: oldValue || '', newValue: newValue || '', effDate: value.effDate || '' } };
            } else {
            groupedValues[time] = { [key]: { oldValue: value.oldValue, newValue: value.newValue, effDate: value.effDate || ''  } };
            }
        }
        });
    }
    });
    const getStatuses = async() => {
            const tempStatuses = []
            

            for (const i in Object.keys(groupedValues).sort((time1, time2) => time1.localeCompare(time2))) {
            
                console.log(await getEndDocStatus(parseInt(i)+1), 'sleal')
                const endStatus = await getEndDocStatus(parseInt(i)+1)
                if (endStatus) {
                    tempStatuses[parseInt(i)+1] = true
                    // setIsDocAvailable(prevArray => [...prevArray, endStatus])
                }
            }

            
            
            

            setIsDocAvailable(tempStatuses);
            
      }


  useEffect(() => {

    getStatuses()

  }, [isDocAvailable])

  

// Render the modified array
  const modifiedEndKeys = Object.keys(groupedValues).sort((time1, time2) => time1.localeCompare(time2)).map((time, index) => {
  const keys = Object.keys(groupedValues[time]);
  console.log(keys, 'these are keys')
  const fileName = "ENDORSEMENT" + (index+1).toString() + policy.policy.policyNum
  if (keys.length === 1) {
    const key = keys[0];
    const value = groupedValues[time][key];
    
    return (
    <>
      <TR key={`${key}-${time}`}>
        <TDCenter>
            {index+1}
        </TDCenter>


        <TDCenter>
        
        {(key.startsWith("drivers")) ? (
            <>Driver </>
        ) : (
            (key.startsWith("vehicles"))
            ? (<>Vehicle </>) : ((key.startsWith("coverage")) ? (<>Coverage </>) : ((key.startsWith("insured.additionalInsured")) ? (<>Additional Insured </>) : (<>Policy </>))))}

        {(key.endsWith("ExpDate")) ? (
            <>Deletion</>
        ) : (
            (key.endsWith("values"))
            ? (<>Addition</>) : ((key.endsWith("vin")) ? (<>Replacement</>) : (<>Change</>)))}
        
        </TDCenter>



        {/* <TDCenter>{Array.isArray(value.oldValue) ? "Multiple Changes" : value.oldValue}</TDCenter>
        <TDCenter>{Array.isArray(value.newValue) ? "Multiple Changes" : value.newValue}</TDCenter> */}
        <TDCenter>{convertDate(time)}</TDCenter>
        <TDCenter>{value.effDate ? value.effDate : 'Unknown'}</TDCenter>
        <TDCenter>
        {(key.startsWith('vehicles.values')) ? (
            
        (key === 'vehicles.values') ? (
            
            <PDFDownloadLink
            document={<AddedVehicle policy={policy} key={key} oldValue={value.oldValue} newValue={value.newValue} endDate={value.effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>

        ) : (key.endsWith('baseExpDate')) ? (

            <PDFDownloadLink
            document={<DeletedVehicle policy={policy} keyOne={key} oldValue={value.oldValue} newValue={value.newValue} endDate={value.effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>

        ) : (

            <PDFDownloadLink
            document={<ReplacedVehicle policy={policy} keyOne={key} oldValue={value.oldValue} newValue={value.newValue} keys={keys} endDate={value.effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>

        )
        ) : ((
            key.startsWith('drivers.values') 
        ) ? ( (key === 'drivers.values') ? (

            <PDFDownloadLink
            document={<AddedDriver policy={policy} key={key} oldValue={value.oldValue} newValue={value.newValue} endDate={value.effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>

        ) : (key.endsWith('driverExpDate')) ? (

            <PDFDownloadLink
            document={<DeletedDriver policy={policy} keyOne={key} oldValue={value.oldValue} newValue={value.newValue} endDate={value.effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>
        ) : (

            <PDFDownloadLink
            document={<ReplacedDriver policy={policy} key={key} oldValue={value.oldValue} newValue={value.newValue} keys={keys} endDate={value.effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>

        )
            
        ) : ((key.startsWith('coverage')) ? (
            <PDFDownloadLink
            document={<CoverageEndorsement policy={policy} keyOne={key} oldValue={value.oldValue} newValue={value.newValue} endDate={value.effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>
        ) : ((key.startsWith('insured.additionalInsured') && (!key.includes('['))) ? (
            <PDFDownloadLink
            document={<AdditionalInsured policy={policy} keyOne={key} oldValue={value.oldValue} newValue={value.newValue} endDate={value.effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>
        ) : (
            <PDFDownloadLink
            document={<OtherEndorsement policy={policy} keyOne={key} oldValue={value.oldValue} newValue={value.newValue} endDate={value.effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>
        )
            
        )))}
        </TDCenter>
        <TDCenter>
            {isDocAvailable[parseInt(index)+1] ? (<DownloadButton onClick={async() => await getEndDoc(parseInt(index)+1)}>Download Uploaded Doc</DownloadButton>) : (<DownloadButton onClick={() => setOpenUpload(true)}>Upload</DownloadButton>)}
        </TDCenter>
        <TDCenter>
            {isDocAvailable[parseInt(index)+1] ? (<DownloadButton onClick={() => setOpenUpload(true)}>Re-Upload</DownloadButton>) : (<></>)}
        </TDCenter>
      </TR>
        {
            openUpload && <UploadModal policyNum={policy.policy.policyNum} setOpenUpload={setOpenUpload} keyOne={parseInt(index)+1}/>
        }
    </>
    );
  } else {
    const values = keys.reduce(
      (acc, key) => {
        const value = groupedValues[time][key];
        acc.oldValues.push(value.oldValue);
        acc.newValues.push(value.newValue);
        acc.effDates.push(value.effDate);
        return acc;
      },
      { oldValues: [], newValues: [] , effDates: []}
    );

    const oldValue = values.oldValues.length > 1 ? values.oldValues : values.oldValues[0];
    const newValue = values.newValues.length > 1 ? values.newValues : values.newValues[0];
    const effDate = values.effDates[0];
    console.log(keys, 'flal')
    return (
        <>
      <TR key={`${keys.join('-')}-${time}`}>
        <TDCenter>
            {index+1}
        </TDCenter>
        <TDCenter>

        {(keys[0].startsWith("drivers")) ? (
            <>Driver </>
        ) : (
            (keys[0].startsWith("vehicles"))
            ? (<>Vehicle </>) : ((keys[0].startsWith("coverage")) ? (<>Coverage </>) : (<>Policy </>)))}

        {(keys[0].endsWith("ExpDate")) ? (
            <>Deletion</>
        ) : (
            (keys[0].endsWith("values"))
            ? (<>Addition</>) : ((keys.some(element => element.includes("vin"))) ? (<>Replacement</>) : (<>Change</>)))}
        
        
        </TDCenter>
        {/* <TDCenter>{oldValue.length > 1 ? "Multiple Changes" : "Single Change"}</TDCenter>
        <TDCenter>{newValue.length > 1 ? "Multiple Changes" : "Single Change"}</TDCenter> */}
        <TDCenter>{convertDate(time)}</TDCenter>
        <TDCenter>{effDate ? effDate : 'Unknown'}</TDCenter>
        <TDCenter>

        
        
        {(keys[0].startsWith('vehicles.values')) ? (

        (keys[0] === 'vehicles.values') ? (

            <PDFDownloadLink
            document={<AddedVehicle policy={policy} key={keys.join(', ')} oldValue={oldValue} newValue={newValue} endDate={effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>

        ) : (keys[0].endsWith('baseExpDate')) ? (

            <PDFDownloadLink
            document={<DeletedVehicle policy={policy} keyOne={keys.join(', ')} oldValue={oldValue} newValue={newValue} endDate={effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>

        ) : (

            <PDFDownloadLink
            document={<ReplacedVehicle policy={policy} keyOne={keys.join(', ')} oldValue={oldValue} newValue={newValue} keys={keys} endDate={effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>

        )
        ) : ((
            keys[0].startsWith('drivers.values') 
        ) ? ( (keys[0] === 'drivers.values') ? (

            <PDFDownloadLink
            document={<AddedDriver policy={policy} key={keys.join(', ')} oldValue={oldValue} newValue={newValue} endDate={effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>

        ) : (keys[0].endsWith('driverExpDate')) ? (

            <PDFDownloadLink
            document={<DeletedDriver policy={policy} keyOne={keys.join(', ')} oldValue={oldValue} newValue={newValue} endDate={effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>
        ) : (

            <PDFDownloadLink
            document={<ReplacedDriver policy={policy} key={keys.join(', ')} oldValue={oldValue} newValue={newValue} keys={keys} endDate={effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>

        )
            
        ) : ((keys[0].startsWith('coverage')) ? (
            <PDFDownloadLink
            document={<CoverageEndorsement policy={policy} keyOne={keys.join(', ')} oldValue={oldValue} newValue={newValue} endDate={effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>
        ) : ((keys[0].startsWith('insured.additionalInsured') && (!keys[0].includes('['))) ? (
            <PDFDownloadLink
            document={<AdditionalInsured policy={policy} keyOne={keys.join(', ')} oldValue={oldValue} newValue={newValue} endDate={effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>
        ) : (
            <>
            <>{console.log(keys, 'forma')}</>
            <PDFDownloadLink
            document={<OtherEndorsement policy={policy} keyOne={keys.join(', ')} oldValue={oldValue} newValue={newValue} endDate={effDate} endNumber={index+1}/>}
            fileName={fileName}
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Download</DownloadButton>
                    )
                }
            </PDFDownloadLink>
            </>
        )
            
        )))}
        </TDCenter>
       <TDCenter>
            {isDocAvailable[parseInt(index)+1] ? (<DownloadButton onClick={async() => await getEndDoc(parseInt(index)+1)}>Download Uploaded Doc</DownloadButton>) : (<DownloadButton onClick={() => setOpenUpload(true)}>Upload</DownloadButton>)}
        </TDCenter>
        <TDCenter>
            {isDocAvailable[parseInt(index)+1] ? (<DownloadButton onClick={() => setOpenUpload(true)}>Re-Upload</DownloadButton>) : (<></>)}
        </TDCenter>
      </TR>
        {
        openUpload && <UploadModal policyNum={policy.policy.policyNum} setOpenUpload={setOpenUpload} keyOne={parseInt(index)+1}/>
        }
    </>
    );
  }
});


    return (
        <>
            <Section>
                <Title>Policy</Title>
                <Flex>
                    <Tile>
                        <TitleTitle>Policy Number</TitleTitle>
                        <TitleInfo>{policyNum}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Effective Date</TitleTitle>
                        <TitleInfo>{effectiveDate}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Expiration Date</TitleTitle>
                        <TitleInfo>{expirationDate}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Coverage Term</TitleTitle>
                        <TitleInfo>{coverageTerm}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Radius</TitleTitle>
                        <TitleInfo>{radius}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Secondary Category</TitleTitle>
                        <TitleInfo>{secondaryCategory}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Line of Business</TitleTitle>
                        <TitleInfo>{lineOfBusiness}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Agent</TitleTitle>
                        <TitleInfo>{agent}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Underwriting Code</TitleTitle>
                        <TitleInfo>{underwritingCode}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>State</TitleTitle>
                        <TitleInfo>{states}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Classification</TitleTitle>
                        <TitleInfo>{classification}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Policy Line Item</TitleTitle>
                        <TitleInfo>{policyLineItem}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Business Use Class</TitleTitle>
                        <TitleInfo>{businessUseClass}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Policy Category</TitleTitle>
                        <TitleInfo>{policyCategory}</TitleInfo>
                    </Tile>
                    <Tile>
                        <TitleTitle>Class Code</TitleTitle>
                        <TitleInfo>{classCode}</TitleInfo>
                    </Tile>
                </Flex>
            </Section>
            <Section>
                <Row>
                    <Title style={{ marginRight: 'unset' }}>
                        Endorsements{' '}
                    </Title>{' '}
                    {
                        (isAuthenticated && writeUsers.includes(user.get('username'))) ? (
                            <CreateButton onClick={endorsementsOnclick}>
                                {' '}
                                + Edit Endorsements
                            </CreateButton>
                        ) : (
                            <></>
                        )
                    }
                    
                </Row>
                
                <Flex>
            <Table>
            <thead>
              <TR>
              <Th>Endt. #</Th>
                <Th>Key</Th>
                {/* <Th>Old Value</Th>
                <Th>New Value</Th> */}
                <Th>Time</Th>
                <Th>Effective Date</Th>
                <Th>Document</Th>
                <Th>Upload</Th>
                <Th>Re-Upload</Th>
              </TR>
            </thead>
            <tbody>
              {modifiedEndKeys}
            </tbody>
          </Table></Flex>
            </Section>
        </>
    )
}

const Row = styled.div`
    display: flex;
    align-items: center;
`

const TDCenter = styled(TD)`
align-items: center;
text-align: center;
`

const DownloadButton = styled.button`
    border: 1px solid black;
    border-radius: 0.5rem;
    padding: 10px;
`

export default Policy
