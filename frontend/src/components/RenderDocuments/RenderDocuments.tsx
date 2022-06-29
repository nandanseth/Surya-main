import PDFFile from './components/PDFFile'
import RRGDecFile from './components/RRGDecFile'
import Shareholder from './components/Shareholder'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import policyJSON from './components/PDFs/pretty.js'

const RenderDocuments = ({ policyNumber }) => {
    //const policyNumber = '21NJ0000189'

    const showJson = () => {
        console.log(policyJSON[0].insured.gender)
    }
    return (
        <div className="App">
            <PDFDownloadLink
                document={<PDFFile policyNumber={policyNumber} />}
                fileName="FORM"
            >
                {({ loading }) =>
                    loading ? (
                        <button>Loading Document...</button>
                    ) : (
                        <button>Download</button>
                    )
                }
            </PDFDownloadLink>
            <PDFViewer
                children={
                    <PDFFile
                        policyNumber={policyNumber}
                        policy={policyJSON[0]}
                    />
                }
                height="1000"
                width="1000"
            ></PDFViewer>
            <PDFViewer
                children={
                    <RRGDecFile
                        policyNumber={policyNumber}
                        policy={policyJSON[0]}
                    />
                }
                height="1000"
                width="1000"
            ></PDFViewer>
            <PDFViewer
                children={
                    <Shareholder
                        policyNumber={policyNumber}
                        policy={policyJSON[0]}
                    />
                }
                height="1000"
                width="1000"
            ></PDFViewer>
        </div>
    )
}

export default RenderDocuments
