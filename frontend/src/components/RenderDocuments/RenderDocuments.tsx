import { usePDF, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import PDFFile from './components/PDFFile'
import policyJSON from './components/PDFs/pretty.js'
import RateCard from './components/RateCard'
import RRGDecFile from './components/RRGDecFile'
import Shareholder from './components/Shareholder'
import CancellationEndorsement from './components/CancellationEndorsement'
import RenewalNotice from './components/RenewalNotice'
import NonRenewalNotice from './components/NonRenewalNotice'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import FileSaver from 'file-saver';
import ReactDOMServer from 'react-dom/server';
import attachmentPDF from './components/policy_attachment.pdf'
import renewalPDF from './components/Conditional_Renewal_Notice.pdf'
import nonrenewalPDF from './components/NONRENEWAL_TEST_DNR.pdf'
import { PDFDocument } from 'pdf-lib'
import { addTextToPDF, addTextToCameraPDF, addTextToDelayPDF } from '../../utils/documents/addTextToUM'
import { addTextToRenewal } from '../../utils/documents/addTextToRenewal'
import { addTextToNonRenewal } from '../../utils/documents/addTextToNonRenewal'
import { AddButton } from '../../pages/policies/shared'
import UploadModal from './components/UploadModal'
import { writeUsers } from '../../utils/users/getWriteUsers'
import { useMoralis } from 'react-moralis'
import Moralis from 'moralis'
import { APP_ID, SERVER_URL } from '../../index'
import { brokerInfo } from '../../utils/insured/getBrokerInfo'

const DownloadButton = styled.button`
    border-radius: 2rem;
    padding: 10px;
    border: 1px solid black;
    &:hover {
        box-sizing: border-box;
        box-shadow: 2px 2px 2px 2px grey;
        font-weight: bold;
    }
`

const RenderDocuments = ({ policy }: any) => {
    //const policyNumber = '21NJ0000189'

    const [decPage, setDecPage] = useState(null)
    const [rrgDecFile, setRRGDecFile] = useState(null)
    const {authenticate, isAuthenticated, isAuthenticating, hasAuthError, authError, user, logout, account} = useMoralis();
    const [shareholder, setShareholder] = useState(null)
    const [rateCard, setRateCard] = useState(null)
    const [renewalNotice, setRenewalNotice] = useState(null)
    const [nonRenewalNotice, setNonRenewalNotice] = useState(null)
    const [cancellationEndorsement, setCancellationEndorsement] = useState(null)
    const [pdfData, setPdfData] = useState(null)
    const [openUpload, setOpenUpload] = useState(false)

    const OpenUploadModule = (e) => {
        e.stopPropagation();
        setOpenUpload(true)
    }

    const [uploadKeys, setUploadKeys] = useState([])
    

    useEffect(() => {
        setDecPage(<PDFFile policy={policy} />)
        setRRGDecFile(<RRGDecFile policy={policy} />)
        setShareholder(<Shareholder policy={policy} />)
        setRateCard(<RateCard policy={policy} />)
        setCancellationEndorsement(<CancellationEndorsement policy={policy} />)
        if (policy.renewal && policy.renewal.renewalDecision === 'rejected') {
            setNonRenewalNotice(true)
        } else if (policy.renewal && policy.renewal.renewalDecision === 'accepted') {
            setRenewalNotice(true)
        }
        

        if (policy.Uploads) {
            setUploadKeys(Object.keys(policy.Uploads))
        }

        

        

    }, [policy])

    useEffect(() => {

        const loadNewDocs = async() => {
            const appId = APP_ID;
            const serverUrl = SERVER_URL;   

            Moralis.start({ serverUrl, appId });
            const Policies = await (Moralis as any).Object.extend("Policies");

            const query = new (Moralis as any).Query(Policies);
            const policyData = await query.equalTo("policyNum", policy.policy.policyNum).first();

            const policyJSON = JSON.parse(policyData.get("policyJson"))

            if (policyJSON.Uploads) {
                setUploadKeys(Object.keys(policyJSON.Uploads))
            }


        }

        loadNewDocs()

        


    }, [openUpload])

    const [instance] = usePDF({document: <PDFFile policy={policy} />})

    const [instanceRenewal] = usePDF({document: <RenewalNotice policy={policy} />})

    const [instanceNonRenewal] = usePDF({document: <RenewalNotice policy={policy} />})

    const MergeRenewalNotice = async() => {
        

        const pdfData1 = await instanceRenewal.blob.arrayBuffer()

        const pdfDoc1 = await PDFDocument.load(pdfData1);

        const name = brokerInfo[policy.policy?.agent]['Name']
        const email = brokerInfo[policy.policy?.agent]['Email']
        const number = brokerInfo[policy.policy?.agent]['Number']


        const texts = [new Date(policy.renewal.dateOfDecision).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        policy.policy.name, policy.policy.policyNum, new Date(policy.policy.expirationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        new Date(policy.policy.expirationDate).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' }), name, email, number]

        const textPdfUrl = await addTextToRenewal(texts)
        const responseText = await fetch(textPdfUrl)
        const pdfDataText = await responseText.arrayBuffer()
        const pdfDocText = await PDFDocument.load(pdfDataText);

        const response2 = await fetch(renewalPDF)
        const pdfData2 = await response2.arrayBuffer()
        const pdfDoc2 = await PDFDocument.load(pdfData2);

        const pdf1NumPages = pdfDoc1.getPageCount();
        const pdfTextNumPages = pdfDocText.getPageCount()
        const pdf2NumPages = pdfDoc2.getPageCount();

        for (let i = 0; i < pdfTextNumPages; i++) {
            const copiedPage = await pdfDoc1.copyPages(pdfDocText, [i]);
            pdfDoc1.addPage(copiedPage[0]);
          }


        // for (let i = 0; i < pdf2NumPages; i++) {
        //     const copiedPage = await pdfDoc1.copyPages(pdfDoc2, [i]);
        //     console.log(copiedPage[0])
        //     pdfDoc1.addPage(copiedPage[0]);
        //   }
      
          // Serialize the PDFDocument to an ArrayBuffer
        const pdfBytes = await pdfDoc1.save();
        setPdfData(pdfBytes);

        

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        console.log(pdfBytes, blob)
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Renewal.pdf';
        link.click();

    }


    const MergeNonRenewalNotice = async() => {

        const agentMapping = {
            'Quantum Risk Solutions (QRSBRK)': {
                "address": "92 Main",
                "city": "Somerville",
                "state": "NJ",
                "zipCode": "08876"
            },
            'Preferred Risk Associates (PRABRK)': {
                "address": "26 Columbia Turnpike #103",
                "city": "Florham Park",
                "state": "NJ",
                "zipCode": "07932"
            },
            'American Business Insurance (ABIBRK)': {
                "address": "32107 Lindero Canyon Road #120",
                "city": "Westlake Village",
                "state": "CA",
                "zipCode": "91361"
            },
            'Transportation Insurance Placement Services (TIPSBRK)': {
                "address": "7178 Marshall Road",
                "city": "Upper Darby",
                "state": "PA",
                "zipCode": "19082"
            },
            'Cluett Insurance Agency (CLUETT)': {
                "address": "8 Pembroke St #1109",
                "city": "Kingston",
                "state": "MA",
                "zipCode": "02364"
            },
            'Cornell Insurance Agency (CORN)': {
                "address": "105 Fieldcrest Ave",
                "city": "Edison",
                "state": "NJ",
                "zipCode": "08837"
            },
            'Laguna Pacific Insurance Services (LPIS)': {
                "address": "23537 Moulton Pkwy",
                "city": "Laguna Hills",
                "state": "CA",
                "zipCode": "92653"
            },
            'None': {
                "address": "None",
                "city": "None",
                "state": "None",
                "zipCode": "None"
            }
        }

        let prodAddress
        let prodCity
        let prodState
        let prodZipCode

        for (const i in Object.keys(agentMapping)) {
            if (policy.insured.agent === Object.keys(agentMapping)[i]) {
                prodAddress = agentMapping[Object.keys(agentMapping)[i]].address
                prodCity = agentMapping[Object.keys(agentMapping)[i]].city
                prodState = agentMapping[Object.keys(agentMapping)[i]].state
                prodZipCode = agentMapping[Object.keys(agentMapping)[i]].zipCode
            }
        }
        

        const pdfData1 = await instanceNonRenewal.blob.arrayBuffer()

        const pdfDoc1 = await PDFDocument.load(pdfData1);

        const cityStateZip = policy.insured.city.concat(' ',policy.insured.state, ', ', policy.insured.zipCode)
        const prodCityStateZip = prodCity.concat(' ', prodState, ', ', prodZipCode)
        const texts = [new Date(policy.renewal.dateOfDecision).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        policy.policy.name, policy.policy.policyNum, new Date(policy.policy.expirationDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/(\d+)\/(\d+)\/(\d+)/, "$1/$2/$3"),
        policy.insured.address1, cityStateZip, policy.insured.agent,prodAddress, prodCityStateZip,
        policy.policy.name,policy.insured.address1, cityStateZip, policy.insured.agent,prodAddress, prodCityStateZip, policy.policy.name, policy.policy.policyNum ]

        const textPdfUrl = await addTextToNonRenewal(texts)
        const responseText = await fetch(textPdfUrl)
        const pdfDataText = await responseText.arrayBuffer()
        const pdfDocText = await PDFDocument.load(pdfDataText);

        const response2 = await fetch(nonrenewalPDF)
        const pdfData2 = await response2.arrayBuffer()
        const pdfDoc2 = await PDFDocument.load(pdfData2);

        const pdf1NumPages = pdfDoc1.getPageCount();
        const pdfTextNumPages = pdfDocText.getPageCount()
        const pdf2NumPages = pdfDoc2.getPageCount();

        for (let i = 0; i < pdfTextNumPages; i++) {
            const copiedPage = await pdfDoc1.copyPages(pdfDocText, [i]);
            pdfDoc1.addPage(copiedPage[0]);
          }


        // for (let i = 0; i < pdf2NumPages; i++) {
        //     const copiedPage = await pdfDoc1.copyPages(pdfDoc2, [i]);
        //     console.log(copiedPage[0])
        //     pdfDoc1.addPage(copiedPage[0]);
        //   }
      
          // Serialize the PDFDocument to an ArrayBuffer
        const pdfBytes = await pdfDoc1.save();
        setPdfData(pdfBytes);

        

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        console.log(pdfBytes, blob)
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Renewal.pdf';
        link.click();

    }


    const MergePDFs = async() => {
        const pdfData1 = await instance.blob.arrayBuffer()

        const pdfDoc1 = await PDFDocument.load(pdfData1);

        let perPersonUM
        let perAccidentUM

        if (policy.coverage.underinsuredMotorist === 'Split Limit') {
            perPersonUM = '$'+(parseInt(policy.coverage.underMotoristBodyPerPerson.replace(/,/g, '')).toLocaleString("en-US"))
            perAccidentUM = '$'+(parseInt(policy.coverage.underMotoristBodyPerAccident.replace(/,/g, '')).toLocaleString("en-US"))
        } else {
            perPersonUM = '$'+(parseInt(policy.coverage.underinsuredMotoristSingleLimit.replace(/,/g, '')).toLocaleString("en-US"))
            perAccidentUM = '$'+(parseInt(policy.coverage.underinsuredMotoristSingleLimit.replace(/,/g, '')).toLocaleString("en-US"))
        }

        const texts = [policy.policy.policyNum, policy.policy.name, policy.policy.name, policy.policy.effectiveDate, perPersonUM, perAccidentUM]

        const textPdfUrl = await addTextToPDF(texts, policy.policy.states, policy.coverage.underinsuredMotorist)
        const responseText = await fetch(textPdfUrl)
        const pdfDataText = await responseText.arrayBuffer()
        const pdfDocText = await PDFDocument.load(pdfDataText);


        const textsCamera = [policy.policy.policyNum, policy.policy.name, policy.policy.effectiveDate]
        const textsDelay = [policy.policy.policyNum, policy.policy.name, policy.policy.effectiveDate, policy.policy.effectiveDate, policy.policy.name]

        const textCameraPdfUrl = await addTextToCameraPDF(textsCamera)
        const responseTextCamera = await fetch(textCameraPdfUrl)
        const pdfDataTextCamera = await responseTextCamera.arrayBuffer()
        const pdfDocTextCamera = await PDFDocument.load(pdfDataTextCamera);

        const textDelayPdfUrl = await addTextToDelayPDF(textsDelay)
        const responseTextDelay = await fetch(textDelayPdfUrl)
        const pdfDataTextDelay = await responseTextDelay.arrayBuffer()
        const pdfDocTextDelay = await PDFDocument.load(pdfDataTextDelay);



        

        const response2 = await fetch(attachmentPDF)
        const pdfData2 = await response2.arrayBuffer()
        const pdfDoc2 = await PDFDocument.load(pdfData2);




        

        const pdf1NumPages = pdfDoc1.getPageCount();
        const pdfTextNumPages = pdfDocText.getPageCount()
        const pdf2NumPages = pdfDoc2.getPageCount();
        const pdfTextCameraPages = pdfDocTextCamera.getPageCount()
        const pdfTextDelayPages = pdfDocTextDelay.getPageCount()

        for (let i = 0; i < pdfTextNumPages; i++) {
            const copiedPage = await pdfDoc1.copyPages(pdfDocText, [i]);
            pdfDoc1.addPage(copiedPage[0]);
          }


        for (let i = 0; i < pdf2NumPages; i++) {
            const copiedPage = await pdfDoc1.copyPages(pdfDoc2, [i]);
            console.log(copiedPage[0])
            pdfDoc1.addPage(copiedPage[0]);
          }
        

        if (policy?.underwriting?.isCamera) {
            for (let i = 0; i < pdfTextCameraPages; i++) {
                const copiedPage = await pdfDoc1.copyPages(pdfDocTextCamera, [i]);
                pdfDoc1.addPage(copiedPage[0]);
            }
        }

        for (let i = 0; i < pdfTextDelayPages; i++) {
            const copiedPage = await pdfDoc1.copyPages(pdfDocTextDelay, [i]);
            pdfDoc1.addPage(copiedPage[0]);
        }
        

          // Serialize the PDFDocument to an ArrayBuffer
        const pdfBytes = await pdfDoc1.save();
        setPdfData(pdfBytes);

        

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        console.log(pdfBytes, blob)
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `dec_page_${policy.policy.name}.pdf`;
        link.click();
  

    }


    const downloadFile = async(docName, doc) => {
        const downloadDelay = 500;
        for (let i = 0; i < doc.length; i++) {
            const response = await fetch(doc[i]);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${docName}_${i}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            await new Promise((resolve) => setTimeout(resolve, downloadDelay));
        }
    }


    return (
        <>
        <div className="App">
            
            <div
                style={{
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    fontSize: '20px',
                }}
            >
                Dynamic Documents
            </div>
            <br></br>
            <br></br>

            {(isAuthenticated && writeUsers.includes(user.get('username'))) ? (
                <DownloadButton style={{float: "right", cursor: "pointer", marginTop: "-3rem"}} onClick={OpenUploadModule}>
                    <span style={{ pointerEvents: "none" }}>Upload</span>
                </DownloadButton>
            ) : (
                <></>
            )}
            
            {/* <PDFDownloadLink
                document={decPage}
                fileName="FORM"
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Policy Form</DownloadButton>
                    )
                }
            </PDFDownloadLink> */}
            <DownloadButton onClick={() => MergePDFs()}>Policy Form (Dec Page)</DownloadButton>
            <br></br>
            <br></br>
            <PDFDownloadLink
                document={rrgDecFile}
                fileName="RRGDecForm"
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>RRG Declaration Form</DownloadButton>
                    )
                }
            </PDFDownloadLink>
            <br></br>
            <br></br>
            <PDFDownloadLink
                document={shareholder}
                fileName="ShareholderAgreement"
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>
                            Shareholder Agreement Form
                        </DownloadButton>
                    )
                }
            </PDFDownloadLink>
            <br></br>
            <br></br>
            <PDFDownloadLink
                document={rateCard}
                fileName="RateCard"
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Vehicle Rate Card</DownloadButton>
                    )
                }
            </PDFDownloadLink>
            <br></br>
            <br></br>
            {policy.cancellation?.isCancelled && policy.cancellation.isCancelled === 'Yes' &&
                <PDFDownloadLink
                document={cancellationEndorsement}
                fileName="CancellationEnd"
                >
                    {({ loading }) =>
                        loading ? (
                            <DownloadButton>Loading Document...</DownloadButton>
                        ) : (
                            <DownloadButton>Cancellation Endorsement</DownloadButton>
                        )
                    }
                </PDFDownloadLink>}
            <br></br>
            <br></br>
            {renewalNotice && <DownloadButton onClick={() => MergeRenewalNotice()}>Conditional Renewal Notice</DownloadButton> }
            {nonRenewalNotice && <DownloadButton onClick={() => MergeNonRenewalNotice()}>Non-Renewal Notice</DownloadButton>}
            {uploadKeys.map((key, index) => (
                <>
                
                
                <DownloadButton onClick={() => downloadFile(key, policy.Uploads[key])}>{key}</DownloadButton>
                <br></br>
                <br></br>
                </>
            ))}

            
            
            
        </div>
        {
            openUpload && <UploadModal policyNum={policy.policy.policyNum} setOpenUpload={setOpenUpload}/>
        }
        </>
    )
}

export default RenderDocuments
