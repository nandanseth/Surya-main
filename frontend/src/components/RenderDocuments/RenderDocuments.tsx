import PDFFile from './components/PDFFile'
import RRGDecFile from './components/RRGDecFile'
import Shareholder from './components/Shareholder'
import RateCard from './components/RateCard'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import policyJSON from './components/PDFs/pretty.js'
import styled from 'styled-components'

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

const RenderDocuments = ({ policy }) => {
    //const policyNumber = '21NJ0000189'

    const showJson = () => {
        console.log(policyJSON[0].insured.gender)
    }
    return (
        <div className="App">
            <div style={{fontWeight: "bold", fontStyle: "italic", fontSize: "20px"}}>Dynamic Documents</div> 
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
                        <DownloadButton>Policy Form</DownloadButton>
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
                        <DownloadButton>RRG Declaration Form</DownloadButton>
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
                        <DownloadButton>Shareholder Agreement Form</DownloadButton>
                    )
                }
            </PDFDownloadLink>
            <br></br>
            <br></br>
            <PDFDownloadLink
                document={<RateCard policy={policy} />}
                fileName="FORM"
            >
                {({ loading }) =>
                    loading ? (
                        <DownloadButton>Loading Document...</DownloadButton>
                    ) : (
                        <DownloadButton>Vehicle Rate Card</DownloadButton>
                    )
                }
            </PDFDownloadLink>
            {/* <PDFViewer
                children={
                    <RateCard
                        policy={policy}
                    />
                }
                height="1000"
                width="1000"
            ></PDFViewer> */}
            {/* <PDFViewer
                children={
                    <RRGDecFile
                        policy={policyJSON[0]}
                    />
                }
                height="1000"
                width="1000"
            ></PDFViewer>
             */}
        </div>
    )
}

export default RenderDocuments
