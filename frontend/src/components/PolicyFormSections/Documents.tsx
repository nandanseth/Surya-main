import { CreateButton } from '../Buttons'
import {
    Document,
    Page,
    PDFDownloadLink,
    StyleSheet,
    Text,
    View,
} from '@react-pdf/renderer'
import { Form } from '../../styles/styles'
import documentOptions from '../../utils/documents/documents'
import React from 'react'
import styled from 'styled-components'
import SuryaSelect from '../PolicyFormSelect'

const { Section, Flex } = Form

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
})

const DocumentsSection = ({ store }) => {
    const { documents: docStates } = store
    const { values: documents, setValues: setDocument } = docStates

    //const validate = () => document !== undefined;

    // Create Document Component

    const makeDoc = (document) => {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>Document #1</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>Stuff about me #2</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>44{documents?.value} </Text>
                    </View>
                </Page>
            </Document>
        )
    }

    console.log(documents, documents?.value)

    return (
        <div>
            <Section>
                <Flex>
                    <SuryaSelect
                        label="Document"
                        onChange={(v) => {
                            setDocument(v)
                        }}
                        options={documentOptions}
                        placeholder="Type Of Document"
                        value={documents}
                    />
                </Flex>
                <Flex>
                    <Upload> Upload </Upload>
                </Flex>
                <Upload>
                    <PDFDownloadLink
                        document={makeDoc(document)}
                        fileName="example.pdf"
                        style={{ width: '100%', height: '100%' }}
                    >
                        Sample Download (Try me)
                    </PDFDownloadLink>
                </Upload>
            </Section>
        </div>
    )
}

const Upload = styled(CreateButton)`
    margin-bottom: 12px;
    margin-right: auto;
    flex: 1 1 auto;
    padding: 12px 20px;
    margin-left: 0px;
    margin-top: 48px;
    font-size: 18px;
    font-weight: 700;
    border: solid 1px;
    width: 100%;
    margin: 0;
    margin-top: 12px;
    max-width: 400px;
    margin-left: auto;
`

export default DocumentsSection
