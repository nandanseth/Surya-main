import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import PDFFile from './components/PDFFile'
import policyJSON from './components/PDFs/pretty.js'
import RRGDecFile from './components/RRGDecFile'
import Shareholder from './components/Shareholder'
import styled from 'styled-components'

const DownloadButton = styled.button`
    border-radius: 2rem;
    padding: 10px;
    border: 1px solid black;
    &:hover {
        box-sizing: border-box;
        box-shadow: 2px 2px 2px 2px grey;
    }
`

const RenderDocuments = ({ policy }) => {
    //const policyNumber = '21NJ0000189'

    const showJson = () => {
        console.log(policyJSON[0].insured.gender)
    }
    return (
        <div className="App">
            <div style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                Download Files
            </div>
            <br></br>
            <br></br>
            <PDFDownloadLink
                document={<PDFFile policy={policy} />}
                fileName="FORM"
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>
                            Download your Policy Form
                        </DownloadButton>
                    )
                }
            </PDFDownloadLink>
            <br></br>
            <br></br>
            <PDFDownloadLink
                document={<RRGDecFile policy={policy} />}
                fileName="FORM"
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>
                            Download your RRG Declaration Form
                        </DownloadButton>
                    )
                }
            </PDFDownloadLink>
            <br></br>
            <br></br>
            <PDFDownloadLink
                document={<Shareholder policy={policy} />}
                fileName="FORM"
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>
                            Download your Shareholder Agreement Form
                        </DownloadButton>
                    )
                }
            </PDFDownloadLink>
            {/* <PDFViewer
                children={
                    <PDFFile
                        policy={policy}
                    />
                }
                height="1000"
                width="1000"
            ></PDFViewer>
            <PDFViewer
                children={
                    <RRGDecFile
                        policy={policyJSON[0]}
                    />
                }
                height="1000"
                width="1000"
            ></PDFViewer>
            <PDFViewer
                children={
                    <Shareholder
                        policy={policyJSON[0]}
                    />
                }
                height="1000"
                width="1000"
            ></PDFViewer> */}
        </div>
    )
}

export default RenderDocuments
