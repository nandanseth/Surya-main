import { Colors, Form } from '../../styles/styles'
import { Add } from '../Buttons'
import { ButtonHolder } from '../../styles/styles'
import { useEffect } from 'react'
import styled from 'styled-components'
import Papa from 'papaparse'
import ExcelJS from 'exceljs';
import RenderDocumentsForm from '../../components/RenderDocuments/RenderDocumentsForm'
const { Section, SectionTitle, Flex } = Form


const UploadSection = ({store, from}) => {

    const { policy, coverage, insured, lossHistory, drivers, vehicles, reinsurance, payments, Uploads } = store
    const { values: policyValues, setValues: setPolicyValues } = policy
    const { values: coverageValues, setValues: setCoverageValues } = coverage
    const { values: insuredValues, setValues: setInsuredValues } = insured
    const { values: driverValues, setValues: setDriverValues } = drivers
    const { values: vehicleValues, setValues: setVehicleValues } = vehicles
    const { values: lossHistoryValues, setValues: setLossHistoryValues } = lossHistory
    const { values: reinsuranceValues, setValues: setReinsuranceValues } = reinsurance
    const { values: paymentValues, setValues: setPaymentValues } = payments


    useEffect(() => {
        console.log(store, 'filip')
    }, [store])


    const valuesList = {'policy' : [policyValues, setPolicyValues], 'coverage' : [coverageValues, setCoverageValues], 'insured': [insuredValues, setInsuredValues], 
    'drivers' : [driverValues, setDriverValues], 'vehicles' : [vehicleValues, setVehicleValues], 'lossHistory' : [lossHistoryValues, setLossHistoryValues], 
    'reinsurance' : [reinsuranceValues, setReinsuranceValues], 'payments' :  [paymentValues, setPaymentValues]}


    const changeHandler = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();

        reader.onload = async () => {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(reader.result as ArrayBuffer);

            for (let i = 0; i < workbook.worksheets.length; i++) {
                if (workbook.worksheets[i].name !== "utils") {
                    const worksheet = workbook.worksheets[i];
                    const values = valuesList[worksheet.name][0]
                    const setValues = valuesList[worksheet.name][1]
                    const copy = {}
                    const copyList = []
                    
                
                    if (worksheet.name !== "lossHistory" && worksheet.name !== "vehicles" && worksheet.name !== "drivers") {
                    // access the data from the worksheet and do what you need to do
                        
                        worksheet.columns.forEach((column, columnNumber) => {
                   
                            if (typeof(column.values[1]) === 'string') {
                                
                                
                                const keyOne = column.values[1]
                                if (keyOne === 'effectiveDate' || keyOne === 'expirationDate') {
                                    const date = new Date(column.values[2].toLocaleString())

                                    const month = date.getMonth() + 1;
                                    const day = date.getDate()+1;
                                    const year = date.getFullYear().toString();
                                    const formattedDate = `${month}/${day}/${year}`;
                                    console.log(formattedDate, 'forein')
                                    copy[keyOne] = formattedDate
                                } else if (typeof(column.values[2]) === 'number' && column.values[1] === 'zipCode') {

                                    const newValues = column.values[2]
                                    copy[keyOne] = newValues

                                }
                                else if (typeof(column.values[2]) === 'number' && (column.values[1].includes("Limit") || column.values[1].includes("Person") || column.values[1].includes("Accident") || column.values[1].includes("Property"))) {
                                    const newValues = column.values[2].toLocaleString('en-US', {maximumFractionDigits: 2})
                                    
                                    copy[keyOne] = newValues
                                } else {
                                    
                                    
                                    const newValues = column.values[2]
                                    copy[keyOne] = newValues
                                }

                                
                                
                            } 
                        });
                        console.log(copy, "SAL")
                        if (worksheet.name === 'insured') {
                            copy['additionalInsured'] = {'values': [
                                {
                                    insName: "None",
                                    address: null,
                                    city: null,
                                    zipCode: null,
                                    state: "TX"
                                }
                            ]}
                        }
                        setValues(copy)
                    } else {
                

                        worksheet.eachRow((row, rowNumber) => {
                            if (rowNumber === 1) return;
                            const copyArray = {}
                            row.eachCell((cell, columnNumber) => {
                                const columnNameCell = worksheet.getCell(1, columnNumber).value as string;
                                console.log(columnNameCell, 'lsls')
                                if (columnNameCell.includes('Date') && !columnNameCell.includes('accidentDate') && !columnNameCell.includes('reportedDate') && !columnNameCell.includes('originalInceptionDate') && !columnNameCell.includes('expirationDate')) {
                                    // copyArray[columnNameCell] = new Date(cell.text).toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' })
                                    console.log(cell.text, 'frle')
                                    // const date = new Date(cell.text.toLocaleString())

                                    // const month = date.getMonth() + 1;
                                    // const day = date.getDate();
                                    // const year = date.getFullYear().toString();
                                    // const formattedDate = `${month}/${day}/${year}`;
                                    // copyArray[columnNameCell] = formattedDate

                                    const date = new Date(cell.text);
                                    console.log(date, 'fle')
                                    date.setDate(date.getDate()+1);
                                    const formatter = new Intl.DateTimeFormat('en-US');
                                    const formattedDate = formatter.format(date);
                                    
                                    copyArray[columnNameCell] = formattedDate
                                } else {
                                    copyArray[columnNameCell] = cell.text
                                }
                                
                    
                                
                                
                            })
                            copyList.push(copyArray)
                        })
                        setValues(copyList)

                    }
                }
            }
        };

        reader.readAsBinaryString(new Blob([file]));
    };


    return (
        <Wrapper>
            <Center>
                <StyledTitle>Save Time! Upload the Full Policy Form</StyledTitle>
                <StyledHolder>
                    <input type="file" name="file" onChange={changeHandler}/>
                </StyledHolder>
            </Center>

            <RenderDocumentsForm policy={store} from={from} />


            
        </Wrapper>
    )
}

export const Wrapper = styled.div`
    padding: 8px;
    width: 100%;
`

export const StyledHolder = styled(ButtonHolder)`
    margin: 0;
    margin-right: 5rem;
    margin-left: auto;
`

export const StyledTitle = styled(SectionTitle)`
    width: auto;
`

export const Center = styled(Flex)`
    align-items: center;
    margin-bottom: 8px;
`

export default UploadSection;

