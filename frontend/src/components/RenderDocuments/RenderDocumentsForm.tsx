import { usePDF, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import PDFFile from './components/PDFFile'
import policyJSON from './components/PDFs/pretty.js'
import RateCard from './components/RateCard'
import QuoteSheet from './components/QuoteSheet'
import QuoteSheetBroker from './components/QuoteSheetBroker'
import ShareholderApp from './components/ShareholderApp'
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
import { addTextToPDF } from '../../utils/documents/addTextToUM'
import { addTextToRenewal } from '../../utils/documents/addTextToRenewal'
import { addTextToNonRenewal } from '../../utils/documents/addTextToNonRenewal'
import { AddButton } from '../../pages/policies/shared'
import UploadModalApplication from './components/UploadModalApplication'
import { writeUsers } from '../../utils/users/getWriteUsers'
import { useMoralis } from 'react-moralis'
import JSZip from 'jszip';



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

const DownloadAllButton = styled.button`
    border-radius: 0.5rem;
    padding: 10px;
    border: 1px solid black;
    &:hover {
        box-sizing: border-box;
        box-shadow: 2px 2px 2px 2px grey;
        
    }
    font-weight: bold;
    color: white;
    background: #26a7de;
`

const RenderDocumentsForm = ({ policy, from }: any) => {
    //const policyNumber = '21NJ0000189'

    const [decPage, setDecPage] = useState(null)
    const [rrgDecFile, setRRGDecFile] = useState(null)
    const {authenticate, isAuthenticated, isAuthenticating, hasAuthError, authError, user, logout, account} = useMoralis();
    const [quoteSheet, setQuoteSheet] = useState(null)
    const [shareholder, setShareholder] = useState(null)
    const [quoteSheetBroker, setQuoteSheetBroker] = useState(null)
    const [cancellationEndorsement, setCancellationEndorsement] = useState(null)
    const [pdfData, setPdfData] = useState(null)
    const [openUpload, setOpenUpload] = useState(false)
    const [quoteSheetUrl, setQuoteSheetUrl] = useState('')
    const [instance] = usePDF({document: <QuoteSheet policy={policy} />})
    const [quoteName, setQuoteName] = useState(`QuoteSheet_${policy.policy.values.name}`)
    const [quoteNameBroker, setQuoteNameBroker] = useState(`QuoteSheet_Broker_${policy.policy.values.name}`)
    const [shareName, setShareName] = useState(`ShareholderAgreement_Broker_${policy.policy.values.name}`)

    const OpenUploadModule = (e) => {
        e.stopPropagation();
        setOpenUpload(true)
    }

    const [uploadKeys, setUploadKeys] = useState([])
    

    useEffect(() => {

        setShareholder(<ShareholderApp policy={policy} />)
        
        if (policy.policy.values.name !== undefined) {
            setQuoteSheet(<QuoteSheet policy={policy}/>)

        }
        if (policy.policy.values.name !== undefined) {
            setQuoteSheetBroker(<QuoteSheetBroker policy={policy}/>)

        }
        
        console.log(policy, 'sprele')

        

        if (policy.Uploads.values !== undefined) {
            setUploadKeys(Object.keys(policy.Uploads.values))
        }

        

        

    }, [policy])

    const downloadZip = async() => {
        const zip = new JSZip();
 
        for (const key in policy.Uploads.values) {
            const files = policy.Uploads.values[key];
            for (let i = 0; i < files.length; i++) {
                const response = await fetch(files[i]);
                let last
                if (response.url.slice(-1) === 'x') {
                    last = response.url.slice(-4)
                } else {
                    last = response.url.slice(-3)
                }
                console.log(last)
                const blob = await response.blob();
                const filename = `${key}_${i}_${policy.policy.values.name}.${last}`;
                zip.file(filename, blob);
            }
        }

        if (instance.url) {
            const response = await fetch(instance.url);
            const blob = await response.blob();
            const filename = `QuoteSheet_${policy.policy.values.name}.pdf`;
            zip.file(filename, blob);
        }

        

        zip.generateAsync({type:"blob"}).then(function(content) {
            FileSaver.saveAs(content, `files_${policy.policy.values.name}.zip`);
        });
    }

    // const [instance] = usePDF({document: <PDFFile policy={policy} />})

    // const [instanceRenewal] = usePDF({document: <RenewalNotice policy={policy} />})

    // const [instanceNonRenewal] = usePDF({document: <RenewalNotice policy={policy} />})

   

   

    const downloadFile = async(docName, doc) => {
        const downloadDelay = 500;
        for (let i = 0; i < doc.length; i++) {
            const response = await fetch(doc[i]);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            console.log(link.href, 'mems')
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
                <>
                <DownloadAllButton style={{float: "right", cursor: "pointer", marginTop: "-7rem"}} onClick={downloadZip}>
                    <span style={{ pointerEvents: "none" }}>Download All Files</span>
                </DownloadAllButton>
                <DownloadButton style={{float: "right", cursor: "pointer", marginTop: "-3rem"}} onClick={OpenUploadModule}>
                    <span style={{ pointerEvents: "none" }}>Upload</span>
                </DownloadButton>

                
                </>
            ) : (
                <></>
            )}

            {(from !== "new") ? (
                <PDFDownloadLink
                    document={quoteSheet}
                    fileName={quoteName}
                >
                    {({ loading }) =>
                        loading ? (
                            <DownloadButton>Loading Document...</DownloadButton>
                        ) : (
                            <DownloadButton>Quote Sheet</DownloadButton>
                        )
                    }
                </PDFDownloadLink>
            ) : (
                <>
                </>
            )}
            <br></br>
            <br></br>
            {(from !== "new") ? (
                <PDFDownloadLink
                    document={quoteSheetBroker}
                    fileName={quoteNameBroker}
                >
                    {({ loading }) =>
                        loading ? (
                            <DownloadButton>Loading Document...</DownloadButton>
                        ) : (
                            <DownloadButton>Quote Sheet Broker (Download Separately)</DownloadButton>
                        )
                    }
                </PDFDownloadLink>
            ) : (
                <>
                </>
            )}
            <br/>
            <br/>
            {(from !== "new") ? (
                <PDFDownloadLink
                    document={shareholder}
                    fileName={shareName}
                >
                    {({ loading }) =>
                        loading ? (
                            <DownloadButton>Loading Document...</DownloadButton>
                        ) : (
                            <DownloadButton>Shareholder Agreement (Download Separately)</DownloadButton>
                        )
                    }
                </PDFDownloadLink>
            ) : (
                <>
                </>
            )}

            
            <br></br>
            <br></br>

            {uploadKeys.map((key, index) => (
                <>
                
                
                <DownloadButton onClick={() => downloadFile(key, policy.Uploads.values[key])}>{key}</DownloadButton>
                <br></br>
                <br></br>
                </>
            ))}

            
            
            
        </div>
        {
            openUpload && <UploadModalApplication policyNum={policy.policy.values.policyNum} setOpenUpload={setOpenUpload} setUploads={policy.Uploads.setValues} uploads={policy.Uploads.values}/>
        }
        </>
    )
}

export default RenderDocumentsForm
