// @ts-nocheck
import { usePDF, PDFRenderer, Document, Page, StyleSheet, Text, View, Image } from '@react-pdf/renderer'
import { useRef } from 'react'
import { pdfjs } from 'react-pdf';
import pdfLib from 'pdf-lib';
import { saveAs } from 'file-saver';
import JDSignature from '../../../images/JDSignature.png'

const styles = StyleSheet.create({
    /* Control the left side */

 headerLarge: {
    fontSize: 18, // Adjusted for more prominent header size
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    margin: 20, // More space above and below the header
  },
  headerSmall: {
    fontSize: 15, // Adjusted size for sub-headers
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    margin: 10, // Adjusted margin for spacing
  },
  normalText: {
    fontSize: 12, // Larger text for better readability
    fontFamily: 'Helvetica',
    lineHeight: 1.4, // Adjusted line height for closer text lines
    marginVertical: 4, // Space before and after paragraphs
  },
  normalTextBold: {
    fontSize: 12, // Consistent text size with normal text
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.4,
  },
  documentTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  documentSectionHeader: {
    fontSize: 15,
    fontFamily: 'Helvetica-Bold',
    marginVertical: 5,
  },
  documentSubsection: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    marginVertical: 3,
  },
  documentFooter: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    marginTop: 5,
  },
  scheduleBox: {
    borderWidth: 1,
    borderColor: '#000', // Ensure black border
    padding: 8, // Slightly reduced padding
    marginVertical: 8, // Space above and below the box
  },
  scheduleHeader: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6, // Space below the "SCHEDULE" header
    textAlign: 'left', // Align text to the left
  },
  scheduleContent: {
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        fontFamily: 'Times-Roman',
    },
    boldTextLeft: {
        fontSize: 14,
        fontFamily: 'Times-Bold',
    },
    boldTextRight: {
        fontSize: 14,
        fontFamily: 'Times-Bold',
    },
    text: {
        fontSize: 14,
        fontFamily: 'Times-Roman',
        left: 10,
    },

    container: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        justifyContent: 'center',
    },

    textSmall: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
        left: 10,
        right: 10,
    },

    textSmallNormal: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
    },

    textSmallUnderline: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
        left: 10,
        right: 10,
        textDecoration: 'underline',
    },

    textSmallHelveticaBoldUnderline: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        left: 10,
        right: 10,
        textDecoration: 'underline',
    },

    boldTextSmall: {
        fontSize: 12,
        fontFamily: 'Times-Bold',
        left: 10,
        right: 10,
    },
    textSmallHelvetica: {
        fontSize: 12,
        fontFamily: 'Helvetica',
    },

    textSmallHelveticaSpaced: {
        fontSize: 12,
        fontFamily: 'Helvetica',
        lineHeight: 1.5,
    },

    textSmallHelveticaBold: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
    },
    boldTextCenterSmall: {
        fontSize: 12,
        fontFamily: 'Times-Bold',
        textAlign: 'center',
        left: 10,
        right: 10,
    },

    italicTextSmall: {
        fontSize: 12,
        fontFamily: 'Times-Italic',
        left: 10,
        right: 10,
    },

    /* Control the right side */

    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 25,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
    },
    boldTitle: {
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'Times-Bold',
    },
    miniBoldTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Times-Bold',
    },
    minMiniBoldTitle: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Times-Bold',
    },

    boldText: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Bold',
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 14,
        //marginBottom: 20,
        //textAlign: "center",
        color: 'black',
        fontFamily: 'Times-Roman',
    },

    boldHeader: {
        fontSize: 14,
        //marginBottom: 20,
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Times-Bold',
    },

    border: {
        border: '1px',
        padding: '10px',
    },

    innerBorder: {
        border: '0px',
    },

    borderSmall: {
        border: '1px',
        paddingTop: '5px',
        paddingBottom: '10px',
        paddingLeft: '2px',
        paddingRight: '25px',
    },

    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },

    AutoDec: {
        fontSize: 12,
        left: 0,
        right: 0,
        textAlign: 'right',
        color: 'black',
        flex: 1,
    },

    AutoCenter: {
        fontSize: 12,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'black',
        flex: 1,
    },

    AutoCenterLarge: {
        fontSize: 18,
        top: 5,
        textAlign: 'center',
        color: 'black',
        flex: 1,
        fontFamily: 'Helvetica-Bold'
    },
    policyNumber: {
        fontSize: 12,
        left: 0,
        right: 0,
        textAlign: 'left',
        color: 'black',
        flex: 1,
    },

    table: {
        fontSize: 10,
        width: 550,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'stretch',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
    },
    tableCollapsed: {
        fontSize: 10,
        width: 550,
        borderCollapse: 'collapsed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'stretch',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
    },
    rowLarge: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderCollapse: 'collapsed',
        alignContent: 'stretch',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 62,
        marginRight: 5,
    },
    rowXLarge: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderCollapse: 'collapsed',
        alignContent: 'stretch',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 110,
        marginRight: 5,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'stretch',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        flexGrow: 0,
        flexShrink: 0,
        marginRight: 5,
    },
    cell: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderCollapse: 'collapsed',
        borderWidth: 1.25,
        padding: '10px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Helvetica',
        flexBasis: 'auto',
        alignSelf: 'stretch',
    },
    cellRoman: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderCollapse: 'collapsed',
        borderWidth: 1.25,
        padding: '10px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Times-Roman',
        flexBasis: 'auto',
        alignSelf: 'stretch',
    },

    cellRomanNormal: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderCollapse: 'collapsed',
        borderWidth: 1.25,
        padding: '10px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Times-Roman',
        flexBasis: 'auto',
        alignSelf: 'stretch',
        fontSize: 12
    },

    cellRomanSmall: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderCollapse: 'collapsed',
        borderWidth: 1.25,
        padding: '10px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Times-Roman',
        flexBasis: 'auto',
        alignSelf: 'stretch',
        fontSize: 7
    },

    cellRomanXSmall: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderCollapse: 'collapsed',
        borderWidth: 1.25,
        padding: '10px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Times-Roman',
        flexBasis: '15%',
        alignSelf: 'stretch',
        fontSize: 10
    },

    cellRomanBold: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderCollapse: 'collapsed',
        borderWidth: 1.25,
        padding: '8px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Times-Bold',
        fontSize: 14,
        flexBasis: 'auto',
        alignSelf: 'stretch',
    },

    cellRomanBoldXSmall: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderCollapse: 'collapsed',
        borderWidth: 1.25,
        padding: '10px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Times-Bold',
        fontSize: 14,
        flexBasis: '15%',
        alignSelf: 'stretch',
    },

    cellBold: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderCollapse: 'collapsed',
        borderWidth: 1.25,
        padding: '10px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Helvetica-Bold',
        flexBasis: 'auto',
        alignSelf: 'stretch',
    },
    headerCell: {
        borderColor: 'black',
        borderStyle: 'solid',
        fontFamily: 'Times-Bold',
        borderWidth: 1,
        paddingTop: '2px',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        alignSelf: 'stretch',
    },
    // header: {
    //   backgroundColor: "#eee"
    // },
    headerText: {
        fontSize: 11,
        fontWeight: 1200,
        color: '#1a245c',
        margin: 8,
    },
    tableText: {
        margin: 8,
        fontSize: 10,
        color: 'neutralDark',
    },
})
function PDFFile({ policy }: any) {

    const getWaiverPremium = () => {
        let waiverPremium = 0
 
        if (policy.insured?.additionalInsured?.values) {
            
            for (const i in policy.insured.additionalInsured?.values) {
                if (policy.insured.additionalInsured?.values[i].isWaiver === true) {
                    waiverPremium += 500
                }
            }
        }
        
        return waiverPremium
    }

    const effectiveDate = new Date(policy.policy.effectiveDate);
    const comparisonDate = new Date('09/01/2024');

    const addValue = effectiveDate >= comparisonDate ? 500.00 : 250.00;


    const getAddInsuredPremium = () => {
        let addPremium = 0
        console.log(policy.insured, "lsoll")

        
        
        if (policy.insured.additionalInsured?.values) {
            
            for (const i in policy.insured.additionalInsured?.values) {
                if (policy.insured.additionalInsured?.values[i].isAddPremium === true) {
                    addPremium += addValue
                }
            }
        }
        
        return addPremium
    }



    const additionalInsuredAmount = policy.insured.additionalInsured?.values.length

    const isPolicyIssFee = new Date(policy.policy.effectiveDate).getTime() > new Date('08/01/2023').getTime() ? true : false

    const stateToTaxFee = {
        'New Jersey': 0.05,
        'Texas': 0.036,
        'California': 0.036,
        'Ohio': 0.05,
        'Pennsylvania': 0.036,
        'Arizona': 0.036,
        'Virginia': 0.036,
        'Alabama': 0.036,
        'Oregon': 0.036,
        'Connecticut': 0.04,
        'Indiana': 0.025
        }

    const stateToCodeMap = {
        'New Jersey': 'NJ',
        'Texas': 'TX',
        'California': 'CA',
        'Ohio': 'OH',
        'Pennsylvania': 'PA',
        'Arizona': 'AZ',
        'Virginia': 'VA',
        'Alabama': 'AL',
        'Oregon': 'OR',
        'Connecticut': 'CT',
        'Indiana': 'IN'
        }

    const CalculateVehicles = () => {
        let vehicles = 0
        for (const i in policy.vehicles.values) {
            if (policy.vehicles.values[i].baseEffDate === policy.policy.effectiveDate) {
                vehicles += 1
            }
        }
        console.log(vehicles, "sla")

        return vehicles
    }

    const CalculatePremium = () => {

        let premium = 0.00
        for (const i in policy.vehicles.values) {
            if (policy.vehicles.values[i].baseEffDate === policy.policy.effectiveDate) {
                if (!isNaN(parseFloat(policy.coverage.overallPremium))) {
                    premium+=parseFloat(policy.coverage.overallPremium)
                }
                if (!isNaN(parseFloat(policy.coverage.personalInjuryProtectionPremium))) {
                    premium+=parseFloat(policy.coverage.personalInjuryProtectionPremium)
                }
                if (!isNaN(parseFloat(policy.coverage.pedPipProtectionPremium))) {
                    premium+=parseFloat(policy.coverage.pedPipProtectionPremium)
                }
                if (!isNaN(parseFloat(policy.coverage.medicalPaymentsPremium))) {
                    premium+=parseFloat(policy.coverage.medicalPaymentsPremium)
                }
                if (!isNaN(parseFloat(policy.coverage.underinsuredMotoristPremium))) {
                    premium+=parseFloat(policy.coverage.underinsuredMotoristPremium)
                }
                if (!isNaN(parseFloat(policy.coverage.uninsuredMotoristPremium))) {
                    premium+=parseFloat(policy.coverage.uninsuredMotoristPremium)
                }
                
            }
            
        }
        if (!isNaN(parseFloat(policy.coverage.hiredCSLPremium))) {
            premium+=parseFloat(policy.coverage.hiredCSLPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.nonOwnedCSLPremium))) {
            premium+=parseFloat(policy.coverage.nonOwnedCSLPremium)
        }
        premium+=getWaiverPremium()
        premium+=getAddInsuredPremium()
        console.log(premium, "KUSH")
        return parseFloat(premium).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }

    const CalculateOnePremium = () => {

        let premium = 0.00


        if (!isNaN(parseFloat(policy.coverage.overallPremium))) {
            premium+=parseFloat(policy.coverage.overallPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.personalInjuryProtectionPremium))) {
            premium+=parseFloat(policy.coverage.personalInjuryProtectionPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.pedPipProtectionPremium))) {
            premium+=parseFloat(policy.coverage.pedPipProtectionPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.medicalPaymentsPremium))) {
            premium+=parseFloat(policy.coverage.medicalPaymentsPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.underinsuredMotoristPremium))) {
            premium+=parseFloat(policy.coverage.underinsuredMotoristPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.uninsuredMotoristPremium))) {
            premium+=parseFloat(policy.coverage.uninsuredMotoristPremium)
        }
                
    
            
        return parseFloat(premium).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }


    const CalculateTax = () => {
        const premium = parseFloat(CalculatePremium().replace(',',''))
        const tax = stateToTaxFee[policy.policy.states]*premium
        console.log(premium, tax, "KUSH")
        return parseFloat(tax).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})

    }

    const CalculateSubFee = () => {
        const premium = parseFloat(CalculatePremium().replace(',',''))
        const subFee = premium*0.12
        console.log(subFee, "KUSH")
        return parseFloat(subFee).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }

    

    const value = effectiveDate >= comparisonDate ? 500.00 : 350.00;

    const Total = () => {
        const effectiveDate = new Date(policy.policy.effectiveDate);
        const comparisonDate = new Date('09/01/2024');

        const value = effectiveDate >= comparisonDate ? 500.00 : 350.00;

        if (isPolicyIssFee) {

            return (value + parseFloat(Math.abs(parseFloat(CalculatePremium().replace(',','')) + parseFloat(CalculateTax().replace(',','')) + parseFloat(CalculateSubFee().replace(',',''))))).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
        } else {
            return parseFloat(Math.abs(parseFloat(CalculatePremium().replace(',','')) + parseFloat(CalculateTax().replace(',','')) + parseFloat(CalculateSubFee().replace(',','')))).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
        }

    }
        
    return (
        <Document>
            <Page style={styles.body}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 1,
                        marginBottom: 5,
                    }}
                >
                    <Text style={styles.policyNumber}>
                        Policy Number: {policy.policy.policyNum}
                    </Text>
                    <Text style={styles.AutoDec}>
                        Business Auto Declarations{'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View>
                    <Text style={styles.title}>
                        BUSINESS AUTO COVERAGE PART{'\n'}
                        BUSINESS AUTO DECLARATIONS{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        SURYA INSURANCE COMPANY, INC. A RISK RETENTION GROUP
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmallUnderline}>
                        Mailing Address:{'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                    1430 Gadsden Hwy, Suite 116-669
                    {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                    Birmingham, AL 35235{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.boldTextSmall}>
                        ITEM ONE:{'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View style={styles.borderSmall}>
                    <Text style={styles.textSmall}>
                        {'\n'}NAMED INSURED: {policy.policy.name}
                        {'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View style={styles.borderSmall}>
                    <Text style={styles.textSmall}>
                        {'\n'}MAILING ADDRESS: {policy.insured.address1}{' '}
                        {policy.insured.city}, {stateToCodeMap[policy.policy.states]}{' '}
                        {policy.insured.zipCode}
                        {'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View style={{ lineHeight: 1.5 }}>
                    <Text style={styles.textSmallHelvetica}>
                        {'\n'}Note:{' '}
                        <Text style={styles.textSmallHelveticaBold}>
                            The insurance policy is issued by Surya Insurance
                            Company Inc., a Risk Retention Group. Your Risk
                            Retention Group may not be subject to all of the
                            insurance laws or regulations of your State. State
                            insurance insolvency guaranty funds are not
                            available for your Risk Retention Group. Read your
                            policy and its coverage conditions thoroughly.
                        </Text>
                    </Text>
                </View>
                <View style={{ lineHeight: 2 }}>
                    <Text style={styles.textSmallHelvetica}>
                        {'\n'}POLICY PERIOD:
                    </Text>
                    <Text style={styles.textSmallHelvetica}>
                        FROM: {policy.policy.effectiveDate} TO:{' '}
                        {policy.policy.expirationDate}{' '}
                    </Text>
                    <Text style={styles.textSmallHelvetica}>
                        (AT 12:01 STANDARD TIME AT YOUR MAILING ADDRESS){'\n'}
                        {'\n'}
                        {'\n'}{' '}
                    </Text>
                    <Text style={styles.textSmallHelvetica}>
                        Business Description: {(policy.policy.policyNum.charAt(4) === "N") ? (<>NEMT</>) : (policy.policy.policyNum.charAt(4) === "T") ? (<>Taxi</>) : (<>Limousine</>)}
                        {'\n'}
                        Policy Type: {(policy.policy.lineOfBusiness !== 'Livery') ? ("Commercial") : ("Public or Livery")}
                        {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmallHelvetica}>
                        IN RETURN FOR THE PAYMENT OF PREMIUM, AND SUBJECT TO ALL
                        TERMS OF THIS POLICY AND THE INFORMATION PROVIDED ON THE
                        SIGNED APPLICATION, WE AGREE WITH YOU TO PROVIDE THE
                        INSURANCE AS STATED IN THIS POLICY.
                    </Text>
                </View>
            </Page>
            <Page style={styles.body}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 1,
                        marginBottom: 5,
                    }}
                >
                    <Text style={styles.policyNumber}>
                        Policy Number: {policy.policy.policyNum}
                    </Text>
                    <Text style={styles.AutoDec}>
                        Business Auto Declarations{'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View>
                    <Text style={styles.textSmallHelveticaBold}>
                        {'\n'}ITEM TWO- SCHEDULE OF COVERAGES AND COVERED AUTOS
                        {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmallHelvetica}>
                        {'\n'}THIS POLICY CONSISTS OF THE FOLLOWING COVERAGE
                        PARTS FOR WHICH A PREMIUM IS INDICATED. THIS PREMIUM MAY
                        BE SUBJECT TO ADJUSTMENT.{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmallHelvetica}>
                        This policy provides only those coverages where a charge
                        is shown in the premium column below. Each of these
                        coverages will apply only to those “Autos” shown as
                        covered autos, which must be reported to the Company
                        prior to effecting coverage.{'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View style={styles.tableCollapsed}>
                    <View style={[styles.row]} wrap={false}>
                        <Text style={[styles.cellBold]}>COVERAGES</Text>
                        <Text style={[styles.cell]}>
                            COVERED AUTOS Symbol Entry
                        </Text>
                        <Text style={[styles.cell]}>LIMIT</Text>
                        <Text style={[styles.cell]}>PREMIUM</Text>
                    </View>

                    {policy.coverage.overall === 'Combined Single Limit' ? (
                        <View style={[styles.rowLarge]} wrap={false}>
                            <Text style={[styles.cell]}>
                                BODILY INJURY AND PROPERTY DAMAGE {'\n'}
                                LIABILITY
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.combinedSectionEntry}
                            </Text>
                            <Text style={[styles.cell]}>
                                {parseInt(policy.coverage.combinedSectionLimit.replace(/,/g, '')).toLocaleString()}
                            </Text>
                            <Text style={[styles.cell]}>
                                ${(parseFloat(policy.coverage.overallPremium)*CalculateVehicles()).toLocaleString('en-US', {maximumFractionDigits: 2})}
                            </Text>
                        </View>
                    ) : (
                        <View style={[styles.rowLarge]} wrap={false}>
                            <Text style={[styles.cell]}>
                                BODILY INJURY AND PROPERTY DAMAGE {'\n'}
                                LIABILITY
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.splitSectionAutoEntryOptions}
                            </Text>
                            <Text style={[styles.cell]}>
                                {parseInt(policy.coverage.splitSectionBodyPerPerson.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}/
                                {parseInt(policy.coverage.splitSectionBodyPerAccidentOptions.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}/
                                {
                                    parseInt(policy.coverage
                                        .splitSectionPropertyDamageOptions.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})
                                }
                            </Text>
                            <Text style={[styles.cell]}>
                                ${(parseFloat(policy.coverage.overallPremium)*CalculateVehicles()).toLocaleString('en-US', {maximumFractionDigits: 2})}
                            </Text>
                        </View>
                    )}

                    {(policy.coverage.pedPipSingleLimit ===
                    'yes' || policy.coverage.pedPipSingleLimit ===
                    'Yes' || policy.coverage.pedPipSingleLimit === 'Up to $250,000' || policy.coverage.pedPipSingleLimit === 'Up to $15,000') ? (
                        <View style={[styles.rowLarge]} wrap={false}>
                            <Text style={[styles.cell]}>
                                PEDESTRIAN INJURY {'\n'}PROTECTION (OR {'\n'}
                                EQUIVALENT NO FAULT COVERED)
                            </Text>
                            <Text style={[styles.cell]}>
                                17
                            </Text>
                            <Text style={[styles.cell]}>
                                {(policy.coverage.pedPipSingleLimit ===
                    'yes' || policy.coverage.pedPipSingleLimit ===
                    'Yes' || policy.coverage.pedPipSingleLimit === 'Up to $250,000') ? (<>Up to $250,000</>) : (<>Up to $15,000</>)}
                            </Text>
                            <Text style={[styles.cell]}>
                                ${(parseFloat(policy.coverage.pedPipProtectionPremium)*CalculateVehicles()).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </Text>
                        </View>
                    ) : (
                        // <View style={[styles.rowLarge]} wrap={false}>
                        //     <Text style={[styles.cell]}>
                        //         PEDESTRIAN INJURY {'\n'}PROTECTION (OR {'\n'}
                        //         EQUIVALENT NO FAULT COVERED)
                        //     </Text>
                        //     <Text style={[styles.cell]}>
                        //         Excluded
                        //     </Text>
                        //     <Text style={[styles.cell]}>
                        //         0
                        //     </Text>
                        //     <Text style={[styles.cell]}>
                        //         $0
                        //     </Text>
                        // </View>
                        <>
                        </>
                    )}

                    {(policy.coverage.pIProtectionSingleEntry !== "Excluded") ? ((policy.coverage.personalInjury ===
                    'Combined Single Limit') ? (
                        <View style={[styles.rowLarge]} wrap={false}>
                            <Text style={[styles.cell]}>
                                PERSONAL INJURY {'\n'}PROTECTION (OR {'\n'}
                                EQUIVALENT NO FAULT COVERED)
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.pIProtectionSingleEntry}
                            </Text>
                            <Text style={[styles.cell]}>
                                {parseInt(policy.coverage.pIProtectionSingleLimit.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}
                            </Text>
                            <Text style={[styles.cell]}>
                                ${(parseFloat(policy.coverage.personalInjuryProtectionPremium)*CalculateVehicles()).toLocaleString('en-US', {maximumFractionDigits: 2})}
                            </Text>
                        </View>
                    ) : (
                        <View style={[styles.rowLarge]} wrap={false}>
                            <Text style={[styles.cell]}>
                                PERSONAL INJURY {'\n'}PROTECTION (OR {'\n'}
                                EQUIVALENT NO FAULT COVERED)
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.pIProtectionSplitAutoEntry}
                            </Text>
                            <Text style={[styles.cell]}>
                                {parseInt(policy.coverage.pIProtectionSplitBodyPerPerson.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}
                                /
                                {
                                    parseInt(policy.coverage
                                        .pIProtectionSplitBodyPerAccident.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})
                                }
                                /
                                {
                                    parseInt(policy.coverage
                                        .pIProtectionSplitPropertyDamage.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})
                                }
                            </Text>
                            <Text style={[styles.cell]}>
                                ${(policy.coverage.personalInjuryProtectionPremium*CalculateVehicles()).toLocaleString('en-US', {maximumFractionDigits: 2})}
                            </Text>
                        </View>
                    )) : (
                        <View style={[styles.rowLarge]} wrap={false}>
                            <Text style={[styles.cell]}>
                                PERSONAL INJURY {'\n'}PROTECTION (OR {'\n'}
                                EQUIVALENT NO FAULT COVERED)
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.pIProtectionSplitAutoEntry}
                            </Text>
                            <Text style={[styles.cell]}>
                                0
                            </Text>
                            <Text style={[styles.cell]}>
                                $0
                            </Text>
                        </View>
                    )}

                    

                    {policy.coverage.uninsuredMotorist ===
                    'Combined Single Limit' ? (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>
                                UNINSURED MOTORIST
                            </Text>
                            <Text style={[styles.cell]}>
                                {
                                    policy.coverage
                                        .uninsuredMotoristSingleAutoEntry
                                }
                            </Text>
                            <Text style={[styles.cell]}>
                                {parseInt(policy.coverage.uninsuredMotoristSingleLimit.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}
                            </Text>
                            <Text style={[styles.cell]}>
                                ${(parseFloat(policy.coverage.uninsuredMotoristPremium)*CalculateVehicles()).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </Text>
                        </View>
                    ) : (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>
                                UNINSURED MOTORIST
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.unMotoristAuto}
                            </Text>
                            <Text style={[styles.cell]}>
                                {parseInt(policy.coverage.unMotoristBodyPerPerson.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}/
                                {parseInt(policy.coverage.unMotoristBodyPerAccident.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}/
                                {parseInt(policy.coverage.unMotoristProperty.includes(',')
                                    ? policy.coverage.unMotoristProperty.replace(/,/g, '')
                                    : policy.coverage.unMotoristProperty,
                                    10).toLocaleString('en-US', {maximumFractionDigits: 2})}
                            </Text>
                            <Text style={[styles.cell]}>
                                ${(parseFloat(policy.coverage.uninsuredMotoristPremium)*CalculateVehicles()).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </Text>
                        </View>
                    )}

                    {policy.coverage.underinsuredMotorist ===
                    'Combined Single Limit' ? (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>
                                UNDERINSURED{'\n'} MOTORIST
                            </Text>
                            <Text style={[styles.cell]}>
                                {
                                    policy.coverage
                                        .underinsuredMotoristSingleAutoEntry
                                }
                            </Text>
                            <Text style={[styles.cell]}>
                                {
                                    parseInt(policy.coverage
                                        .underinsuredMotoristSingleLimit.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})
                                }
                            </Text>
                            <Text style={[styles.cell]}>
                                ${
                                    (parseFloat(policy.coverage
                                        .underinsuredMotoristPremium)*CalculateVehicles()).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
                                }
                            </Text>
                        </View>
                    ) : (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>
                                UNDERINSURED{'\n'} MOTORIST
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.underMotoristAuto}
                            </Text>
                            <Text style={[styles.cell]}>
                                {parseInt(policy.coverage.underMotoristBodyPerPerson.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}/
                                {parseInt(policy.coverage.underMotoristBodyPerAccident.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}/
                                {parseInt(policy.coverage.underMotoristProperty.includes(',')
          ? policy.coverage.underMotoristProperty.replace(/,/g, '')
          : policy.coverage.underMotoristProperty,
        10).toLocaleString('en-US', {maximumFractionDigits: 2})}
                            </Text>
                            <Text style={[styles.cell]}>
                                ${(parseFloat(policy.coverage.underinsuredMotoristPremium)*CalculateVehicles()).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </Text>
                        </View>
                    )}
                    {(policy.coverage.medicalSingleEntry !== "Excluded") ? ((policy.coverage.medicalPayments ===
                    'Combined Single Limit') ? (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>MEDICAL PAYMENT</Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.medicalSingleEntry}
                            </Text>
                            <Text style={[styles.cell]}>
                                {parseInt(policy.coverage.medicalSingleLimit.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}
                            </Text>
                            <Text style={[styles.cell]}>
                                ${(parseFloat(policy.coverage.medicalPaymentsPremium))*CalculateVehicles()}
                            </Text>
                        </View>
                    ) : (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>MEDICAL PAYMENT</Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.medicalSplitAutoEntry}
                            </Text>
                            <Text style={[styles.cell]}>
                                {parseInt(policy.coverage.medicalSplitBodyPerPerson.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}/
                                {parseInt(policy.coverage.medicalSplitBodyPerAccident.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}/
                                {parseInt(policy.coverage.medicalSplitPropertyDamage.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}
                            </Text>
                            <Text style={[styles.cell]}>
                                ${(parseFloat(policy.coverage.medicalPaymentsPremium))*CalculateVehicles()}
                            </Text>
                        </View>
                    )) : (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>MEDICAL PAYMENT</Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.medicalSplitAutoEntry}
                            </Text>
                            <Text style={[styles.cell]}>
                                0
                            </Text>
                            <Text style={[styles.cell]}>
                                $0
                            </Text>
                        </View>
                    )}
                    {(policy.coverage.csl !== "No") ? ((parseInt(policy.coverage.hiredCSLPremium) > 0) ? (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>HIRED</Text>
                            <Text style={[styles.cell]}>18</Text>
                            <Text style={[styles.cell]}>{parseInt(policy.coverage.combinedSectionLimit.replace(/,/g, '')).toLocaleString()}</Text>
                            <Text style={[styles.cell]}>${policy.coverage.hiredCSLPremium}</Text>
                        </View>
                    ) : ((policy.coverage.cslSplitAuto !== "Excluded") ? (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>HIRED</Text>
                            <Text style={[styles.cell]}>18</Text>
                            <Text style={[styles.cell]}>{parseInt(policy.coverage.cslBodyPerPerson.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}/
                            {parseInt(policy.coverage.cslBodyPerAccident.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}/
                            {parseInt(policy.coverage.cslProperty.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}</Text>
                            <Text style={[styles.cell]}>${policy.coverage.hiredCSLPremium}</Text>
                        </View>
                    ) : (<View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>HIRED</Text>
                            {(policy.insured.additionalInsured?.values[0]?.insName && policy.insured.additionalInsured?.values[0]?.insName !== "None") ? (<Text style={[styles.cell]}>18</Text>) : (<Text style={[styles.cell]}>Not Covered</Text>)}
                            {(policy.insured.additionalInsured?.values[0]?.insName && policy.insured.additionalInsured?.values[0]?.insName !== "None") ? (<Text style={[styles.cell]}>{parseInt(policy.coverage.combinedSectionLimit.replace(/,/g, '')).toLocaleString()}</Text>) : (<Text style={[styles.cell]}>N/A</Text>)}
                            <Text style={[styles.cell]}>$0</Text>
                        </View>)
                        )
                        
                    ) : (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>HIRED</Text>
                            {(policy.insured.additionalInsured?.values[0]?.insName && policy.insured.additionalInsured?.values[0]?.insName !== "None") ? (<Text style={[styles.cell]}>18</Text>) : (<Text style={[styles.cell]}>Not Covered</Text>)}
                            {(policy.insured.additionalInsured?.values[0]?.insName && policy.insured.additionalInsured?.values[0]?.insName !== "None") ? (<Text style={[styles.cell]}>{parseInt(policy.coverage.combinedSectionLimit.replace(/,/g, '')).toLocaleString()}</Text>) : (<Text style={[styles.cell]}>N/A</Text>)}
                            <Text style={[styles.cell]}>$0</Text>
                        </View>
                    )}

                    {(policy.coverage.nonOwnedCSL !== "No") ? ((parseInt(policy.coverage.nonOwnedCSLPremium) > 0) ? (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>NON-OWNED</Text>
                            <Text style={[styles.cell]}>19</Text>
                            <Text style={[styles.cell]}>{parseInt(policy.coverage.combinedSectionLimit.replace(/,/g, '')).toLocaleString()}</Text>
                            <Text style={[styles.cell]}>${policy.coverage.nonOwnedCSLPremium}</Text>
                        </View>
                    ) : ((policy.coverage.cslSplitAuto !== "Excluded") ? (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>NON-OWNED</Text>
                            <Text style={[styles.cell]}>19</Text>
                            <Text style={[styles.cell]}>{parseInt(policy.coverage.nonCslBodyPerPerson.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}/
                            {parseInt(policy.coverage.nonCslBodyPerAccident.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}/
                            {parseInt(policy.coverage.nonCslProperty.replace(/,/g, '')).toLocaleString('en-US', {maximumFractionDigits: 2})}</Text>
                            <Text style={[styles.cell]}>${policy.coverage.nonOwnedCSLPremium}</Text>
                        </View>
                    ) : (<View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>NON-OWNED</Text>
                            {(policy.insured.additionalInsured?.values[0]?.insName && policy.insured.additionalInsured?.values[0]?.insName !== "None") ? (<Text style={[styles.cell]}>19</Text>) : (<Text style={[styles.cell]}>Not Covered</Text>)}
                            {(policy.insured.additionalInsured?.values[0]?.insName && policy.insured.additionalInsured?.values[0]?.insName !== "None") ? (<Text style={[styles.cell]}>{parseInt(policy.coverage.combinedSectionLimit.replace(/,/g, '')).toLocaleString()}</Text>) : (<Text style={[styles.cell]}>N/A</Text>)}
                            <Text style={[styles.cell]}>$0</Text>
                        </View>)
                        )
                        
                    ) : (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>NON-OWNED</Text>
                            {(policy.insured.additionalInsured?.values[0]?.insName && policy.insured.additionalInsured?.values[0]?.insName !== "None") ? (<Text style={[styles.cell]}>19</Text>) : (<Text style={[styles.cell]}>Not Covered</Text>)}
                            {(policy.insured.additionalInsured?.values[0]?.insName && policy.insured.additionalInsured?.values[0]?.insName !== "None") ? (<Text style={[styles.cell]}>{parseInt(policy.coverage.combinedSectionLimit.replace(/,/g, '')).toLocaleString()}</Text>) : (<Text style={[styles.cell]}>N/A</Text>)}
                            <Text style={[styles.cell]}>$0</Text>
                        </View>
                    )}
                    {(policy.coverage.deductable !== "No" && typeof policy.coverage.deductableAmount !== 'undefined') ? (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>LIABILITY DEDUCTIBLE</Text>
                            <Text style={[styles.cell]}>{policy.coverage.deductableAutoEntry}</Text>
                            <Text style={[styles.cell]}>{policy.coverage.deductableAmount}</Text>
                            <Text style={[styles.cell]}>N/A</Text>
                            
                        </View>
                    ) : (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>LIABILITY DEDUCTIBLE</Text>
                            <Text style={[styles.cell]}>Excluded</Text>
                            <Text style={[styles.cell]}>N/A</Text>
                            <Text style={[styles.cell]}>$0</Text>
                        </View>
                    )}

                    {(getWaiverPremium() > 0 ) ? (
                        <View style={[styles.row]}>
                        
                            <Text style={[styles.cell]}>
                                Waiver of Subrogation Premium
                            </Text>
                            <Text style={[styles.cell]}>
                                Included
                            </Text>
                            <Text style={[styles.cell]}>
                                $500
                            </Text>
                            <Text style={[styles.cell]}>
                                {getWaiverPremium()}
                            </Text>
                        </View>
                    ) : (
                        <></>
                    )}

                    {(getAddInsuredPremium() > 0 ) ? (
                        <View style={[styles.row]}>
                        
                            <Text style={[styles.cell]}>
                                Additional Insured Premium
                            </Text>
                            <Text style={[styles.cell]}>
                                Included
                            </Text>
                            <Text style={[styles.cell]}>
                                ${addValue}
                            </Text>
                            <Text style={[styles.cell]}>
                                {getAddInsuredPremium()}
                            </Text>
                        </View>
                    ) : (
                        <></>
                    )}
                    
                </View>
            </Page>
            <Page style={styles.body}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 1,
                        marginBottom: 5,
                    }}
                >
                    <Text style={styles.policyNumber}>
                        Policy Number: {policy.policy.policyNum}
                    </Text>
                    <Text style={styles.AutoDec}>
                        Business Auto Declarations{'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View>
                    <Text style={styles.textSmallHelveticaBold}>{'\n'}**</Text>
                    <Text style={styles.textSmallHelveticaBold}>
                        Single Limit:{' '}
                        <Text style={styles.textSmallHelvetica}>
                            The Most We Will Pay for Any One Accident or Loss
                        </Text>
                    </Text>
                    <Text style={styles.textSmallHelveticaBold}>
                        Split Limits:{' '}
                        <Text style={styles.textSmallHelvetica}>
                            The Most We Will Pay; Per Person/Per Accident/
                            Property Damage{'\n'}
                            {'\n'}
                        </Text>
                    </Text>
                </View>
                <View style={styles.tableCollapsed}>
                    <View style={[styles.row]} wrap={false}>
                        <Text style={[styles.cellBold]}>Line</Text>
                        <Text style={[styles.cellBold]}>DESCRIPTION</Text>
                        <Text style={[styles.cell]}>
                            Coverage Premium, Taxes and Subscription Fee
                        </Text>
                    </View>
                    <View style={[styles.row]} wrap={false}>
                        <Text style={[styles.cellBold]}>1.</Text>
                        <Text style={[styles.cell]}>
                            Commercial Automobile Bodily Injury and Property
                            Damage
                        </Text>
                        <Text style={[styles.cell]}>${CalculatePremium()}</Text>
                    </View>
                    <View style={[styles.row]} wrap={false}>
                        <Text style={[styles.cellBold]}>2.</Text>
                        <Text style={[styles.cell]}>Premium Tax</Text>
                        <Text style={[styles.cell]}>${CalculateTax()}</Text>
                    </View>
                    <View style={[styles.row]} wrap={false}>
                        <Text style={[styles.cellBold]}>3.</Text>
                        <Text style={[styles.cell]}>
                            Shareholder Subscription Fee
                        </Text>
                        <Text style={[styles.cell]}>${CalculateSubFee()}</Text>
                    </View>
                    {isPolicyIssFee && <View style={[styles.row]} wrap={false}>
                        <Text style={[styles.cellBold]}>3.</Text>
                        <Text style={[styles.cell]}>
                            Policy Issuance Fee (Non-refundable)
                        </Text>
                        <Text style={[styles.cell]}>${value}</Text>
                    </View>}
                    
                    <View style={[styles.row]} wrap={false}>
                        <Text style={[styles.cellBold]}>4.</Text>
                        <Text style={[styles.cell]}>Total</Text>
                        <Text style={[styles.cell]}>${Total()}</Text>
                    </View>
                    <View style={[styles.row]} wrap={false}>
                        <Text style={[styles.cellBold]}></Text>
                        <Text style={[styles.cell]}>
                            This Coverage is issued subject to a {'\n'}25%
                            minimum earned premium
                        </Text>
                        <Text style={[styles.cell]}></Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.textSmallHelveticaBold}>
                        {'\n'}
                        {'\n'}Premiums:{'\n'}
                        {'\n'}
                        {'\n'}
                        <Text style={styles.textSmallHelvetica}>
                            The first Named Insured shown in the Declarations is
                            responsible for the payment of all premiums and will
                            be the payee for any return premium we pay.
                        </Text>
                    </Text>
                </View>
            </Page>
            <Page style={styles.body}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 1,
                        marginBottom: 5,
                    }}
                >
                    <Text style={styles.policyNumber}>
                        Policy Number: {policy.policy.policyNum}
                    </Text>
                    <Text style={styles.AutoDec}>
                        Business Auto Declarations{'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View>
                    <Text style={styles.textSmallHelveticaBold}>
                        {'\n'}ITEM THREE:{' '}
                        <Text style={styles.textSmallHelveticaBoldUnderline}>
                            COVERED AUTOS YOU OWN
                        </Text>
                    </Text>
                    <Text style={styles.textSmallHelvetica}>
                        {'\n'}
                        {'\n'}The Coverage afforded here under only covers such
                        automobiles as scheduled with the Carrier.
                    </Text>
                    <Text style={styles.textSmallHelveticaBold}>
                        {'\n'}SCHEDULE OF COVERED AUTOS
                    </Text>
                    <Text style={styles.textSmallHelveticaBold}>
                        {'\n'}DESCRIPTION{'\n'}
                        (LIST ADDITIONAL VEHICLES ON SEPARATE SCHEDULE){'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View style={styles.tableCollapsed}>
                    <View style={[styles.rowXLarge]} wrap={false}>
                        <Text style={[styles.cellRomanBold]}>MAKE</Text>
                        <Text style={[styles.cellRomanBold]}>YEAR</Text>
                        <Text style={[styles.cellRomanBold]}>MODEL</Text>
                        <Text style={[styles.cellRomanBold]}>
                            SEATING CAPACITY
                        </Text>
                        <Text style={[styles.cellRomanBoldXSmall]}>VIN</Text>
                        <Text style={[styles.cellRomanBold]}>
                            Principle Garage Address
                        </Text>
                        <Text style={[styles.cellRomanBold]}>Premium</Text>
                    </View>
                    {policy.vehicles.values.map((value) => (
                        (value.baseEffDate === policy.policy.effectiveDate) ?
                        (<View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRoman]}>{value.make}</Text>
                            <Text style={[styles.cellRoman]}>
                                {value.modelYear}
                            </Text>
                            <Text style={[styles.cellRoman]}>
                                {value.model}
                            </Text>
                            <Text style={[styles.cellRoman]}>
                                {value.seating}
                            </Text>
                            <Text style={[styles.cellRomanXSmall]}>{value.vin.replace("-", "")}</Text>
                            <Text style={[styles.cellRoman]}>
                                {(value.garageAddress1 !== "null") ? (value.garageAddress1+", "+value.garageCity+" "+value.garageState+", "+value.garageZipCode) : (policy.insured.address1)}
                            </Text>
                            <Text style={[styles.cellRoman]}>
                                ${CalculateOnePremium()}
                            </Text>
                        </View>) : (<></>)
                        
                    ))}
                </View>
            </Page>
            <Page style={styles.body}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 1,
                        marginBottom: 5,
                    }}
                >
                    <Text style={styles.policyNumber}>
                        Policy Number: {policy.policy.policyNum}
                    </Text>
                    <Text style={styles.AutoDec}>
                        Business Auto Declarations{'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View>
                    <Text style={styles.textSmallHelveticaBold}>
                        {'\n'}ITEM FOUR:{' '}
                        <Text style={styles.textSmallHelveticaBoldUnderline}>
                            COVERED DRIVERS
                        </Text>
                    </Text>
                    <Text style={styles.textSmallHelvetica}>
                        {'\n'}
                        {'\n'}The coverage afforded here under is limited to
                        those named drivers, as scheduled with the Carrier, and
                        attached here to with the following information:
                        (Provide such information on a Separate Sheet){'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View style={styles.tableCollapsed}>
                    <View style={[styles.rowLarge]} wrap={false}>
                        {/* <Text style={[styles.cellRomanBold]}>Date No.</Text> */}
                        <Text style={[styles.cellRomanBold]}>
                            Driver {'\n'}Name
                        </Text>
                        <Text style={[styles.cellRomanBold]}>
                            Date {'\n'}Added
                        </Text>
                        <Text style={[styles.cellRomanBold]}>
                            Date of {'\n'}Birth
                        </Text>
                        <Text style={[styles.cellRomanBold]}>
                            Driver {'\n'}License {'\n'}Number
                        </Text>
                        <Text style={[styles.cellRomanBold]}>
                            State of {'\n'}License
                        </Text>
                    </View>
                    {policy.drivers.values.map((value) => (
                        (value.driverEffDate === policy.policy.effectiveDate) ?
                        (<View style={[styles.row]} wrap={false}>
                            {/* <Text style={[styles.cellRoman]}>
                                {value.dateNo}
                            </Text> */}
                            <Text style={[styles.cellRoman]}>
                                {value.driverFirstName} {value.driverMiddleName} {value.driverLastName}
                            </Text>
                            <Text style={[styles.cellRoman]}>
                                {value.driverEffDate}
                            </Text>
                            <Text style={[styles.cellRoman]}>
                                {value.driverBirthDate}
                            </Text>
                            <Text style={[styles.cellRoman]}>
                                {value.licenseNumber}
                            </Text>
                            <Text style={[styles.cellRoman]}>
                                {value.states}
                            </Text>
                        </View>) : (<></>)
                    ))}
                </View>
            </Page>
            <Page style={styles.body}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 1,
                        marginBottom: 5,
                    }}
                >
                    <Text style={styles.policyNumber}>
                        Policy Number: {policy.policy.policyNum}
                    </Text>
                    <Text style={styles.AutoDec}>
                        Business Auto Declarations{'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View>
                    <Text style={styles.textSmallHelveticaBold}>
                        {'\n'}ITEM FIVE:{' '}
                        <Text style={styles.textSmallHelveticaBoldUnderline}>
                            {' '}
                            LIABILITY DEDUCTIBLE
                        </Text>
                    </Text>
                    <Text style={styles.textSmallHelvetica}>
                        {'\n'}
                        {'\n'}The Liability Coverage is changed as follows:
                        {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmallHelveticaSpaced}>
                        The damages, including loss adjustment expense caused in
                        any one “accident” that would otherwise be payable under
                        the Liability Coverage, will be reduced by the Liability
                        Deductible as shown in the Coverage Schedule on page
                        two, prior to the application of the Limit of Insurance
                        provision. Such Deductible is the obligation of the
                        Named Insured and will be invoiced by Surya Insurance
                        Company. Such invoice will be paid within ten (10)
                        business days, and failure to do so will be subject to
                        policy cancellation.{'\n'}
                        {'\n'}
                    </Text>
                </View>
            </Page>
            <Page style={styles.body}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 1,
                        marginBottom: 5,
                    }}
                >
                    <Text style={styles.policyNumber}>
                        Policy Number: {policy.policy.policyNum}
                    </Text>
                    <Text style={styles.AutoDec}>
                        Business Auto Declarations{'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View>
                    <Text style={styles.textSmallHelveticaBold}>
                        {'\n'}Endorsements Attached to this Policy:{'\n'}
                        {'\n'}
                    </Text>
                    <View style={styles.borderSmall}>
                        <Text style={styles.textSmallHelveticaBold}>
                            Additional Insured:{'\n'}{'\n'}
                            {(policy.insured.additionalInsured?.values[0]?.insName && policy.insured.additionalInsured?.values[0]?.insName !== "None") ? (<>Refer to Designated Insured endorsement</>) : (<></>)}
                            {'\n'}
                            {'\n'}
                            {'\n'}
                        </Text>
                    </View>
                </View>
                <Text>
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                </Text>
                <View style={styles.borderSmall}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: 1,
                            marginBottom: 5,
                        }}
                    >
                        <Text style={styles.policyNumber}>
                            Counter signed:JANAK DAVE
                        </Text>
                        <Text style={styles.AutoCenter}>By: </Text>
           
                        <Image style={{height: "20px", width: "50px", display: 'flex'}} src={JDSignature}/>
                      
                    </View>
                </View>
                <View style={styles.borderSmall}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: 1,
                            marginBottom: 5,
                        }}
                    >
                        <Text style={styles.policyNumber}>Date: {policy.policy.effectiveDate}</Text>
                        <Text style={styles.AutoCenter}>
                            (Authorized Representative)
                        </Text>
                    </View>
                </View>
            </Page>
            {
                policy.insured.additionalInsured?.values.map((val, index) => {
                    if (val.insName !== "None") {

                        return (
                            <>
                            <Page style={styles.body}>
                                
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        marginTop: 1,
                                        marginBottom: 5,
                                    }}
                                >
                                    <Text style={styles.policyNumber}>
                                        Policy Number: {policy.policy.policyNum}
                                    </Text>
                                    <Text style={styles.AutoDec}>
                                        Business Auto Declarations{'\n'}
                                        {'\n'}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.AutoCenterLarge}>
                                        DESIGNATED INSURED
                                    </Text>
                                    
                                    <Text style={styles.textSmallHelvetica}>
                                    {'\n'}
                                    {'\n'}
                                    {'\n'}
                                    This endorsement modifies insurance provided under the following:
                                    </Text>
                                    <Text style={styles.textSmallHelveticaBold}>
                                    {'\n'}
                                    BUSINESS AUTO COVERAGE FORM
                                    </Text>
                                    <Text style={styles.textSmallNormal}>
                                    {'\n'}
                                    {'\n'}
                                    With respect to coverage provided by this endorsement, the provisions of the Coverage Form apply unless modified by this
                                    endorsement.
                                    {'\n'}
                                    {'\n'}
                                    This endorsement identifies person(s) or organization(s) who are additional named insureds under the Who Is An Insured
                                    Provision of the Coverage Form. This endorsement does not alter or broaden the coverage provided in the Coverage Form.
                                    {'\n'}
                                    {'\n'}
                                    This endorsement is effective on the date indicated below.
                                    {'\n'}
                                    {'\n'}
                                    </Text>
                                    <View style={[styles.row]} wrap={false}>
                                        <Text style={[styles.cellRomanNormal]}>
                                            Endorsement Effective: {policy.policy.effectiveDate}
                                        </Text>
                                        <View style={[styles.borderSmall]}>
                                            <Text style={[styles.textSmall]}>Countersigned By: </Text> 
                                            <Image style={{height: "20px", width: "50px", display: 'flex'}} src={JDSignature}/>
                                        </View>
             
                                        
                           
                                    </View>
                                    <View style={[styles.row]} wrap={false}>
                                        <Text style={[styles.cellRomanNormal]}>
                                            Named Insured: {policy.policy.name}
                                            {'\n'}
                                            {'\n'}
                                        </Text>
                                    </View>
                                    <Text style={styles.textSmallHelveticaBold}>
                                    {'\n'}
                                    SCHEDULE
                                    </Text>
                                    <View style={[styles.row]} wrap={false}>
                                        <Text style={[styles.cellRomanNormal]}>
                                            <Text style={[styles.boldTextSmall]}>
                                                Name of Person(s) or Organization(s)
                                            </Text>
                                            {'\n'}
                                            {'\n'}
                                            {val.insName}
                                            {'\n'}
                                            {'\n'}
                                            {val.address}
                                            {'\n'}
                                            {'\n'}
                                            {val.city} {val.state} {val.zipCode}
                                        </Text>
                                        
                                    </View>
                                    <View>
                                        <Text style={[styles.textSmallNormal]}>
    
                                        {'\n'}
                                        {'\n'}
                                        The above Schedule is to be fully completed to effect coverage.
                                        {'\n'}
                                        {'\n'}
                                        Each person or organization shown in the Schedule is an insured for Liability Coverage, but only to the extent that person or organization 
                                        qualifies as an additional named insured under the Who Is An Insured Provision contained in Section II of the Coverage Form.
                                        {'\n'}
                                        {'\n'}
                                        All policies shall provide that {val.insName} {val.address} {val.city} {val.state} {val.zipCode} will be given at least 
                                        thirty (30) days advance notice of cancellation for any reason, including non-payment of premium.
                                        {'\n'}
                                        {'\n'}
                                        </Text>
                                    </View>
                                    
                                </View>
    
    
                            </Page>
                            
                            {(val.isWaiver === true) ? (

                                <Page style={styles.page}>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            marginTop: 1,
                                            marginBottom: 5,
                                        }}
                                    >
                                        <Text style={styles.policyNumber}>
                                            Policy Number: {policy.policy.policyNum}
                                        </Text>
                                        <Text style={styles.AutoDec}>
                                            COMMERCIAL AUTO CA 04 44 10 13
                                            {'\n'}
                                            {'\n'}
                                        </Text>
                                    </View>
                                    <Text style={styles.documentTitle}>
                                    COMMERCIAL AUTO
                                    </Text>
                                    <Text style={styles.headerSmall}>
                                    WAIVER OF TRANSFER OF RIGHTS OF RECOVERY 
                                    AGAINST OTHERS TO US (WAIVER OF SUBROGATION)
                                    </Text>
                                    <Text style={styles.normalText}>
                                    This endorsement modifies insurance provided under the following:
                                    {'\n'}
                                    </Text>
                                    <Text style={styles.normalTextBold}>
                                    AUTO DEALERS COVERAGE FORM
                                    {'\n'}
                                    BUSINESS AUTO COVERAGE FORM
                                    {'\n'}
                                    MOTOR CARRIER COVERAGE FORM
                                    {'\n'}
                                    </Text>
                                    <Text style={styles.normalText}>
                                    With respect to coverage provided by this endorsement, the provisions of the Coverage Form apply unless 
                                    modified by the endorsement.
                                    {'\n'}
                                    This endorsement changes the policy effective on the inception date of the policy unless another date is indicated below.
                                    {'\n'}
                                    </Text>
                                    <View style={styles.scheduleBox}>
                                    <Text style={styles.scheduleContent}>
                                        <Text style={styles.normalTextBold}>Named Insured:</Text> {policy.policy.name}
                                        {'\n'}
                                        {'\n'}
                                        <Text style={styles.normalTextBold}>Endorsement Effective Date: </Text> {policy.policy.effectiveDate}
                                        {'\n'}
                                        {'\n'}
                                    </Text>
                                    </View>
                                    <Text style={styles.scheduleHeader}>
                                    SCHEDULE
                                    </Text>
                                    <View style={styles.scheduleBox}>
                                    <Text style={styles.scheduleContent}>
                                        <Text style={styles.normalTextBold}>Name(s) Of Person(s) Or Organization(s): </Text>
                                        {'\n'}
                                        {'\n'}
                                        {val.insName}
                                        {'\n'}
                                        {'\n'}
                                        {val.address}
                                        {'\n'}
                                        {'\n'}
                                        {val.city} {val.state} {val.zipCode}
                                        {'\n'}
                                        {'\n'}
                                        <Text style={styles.normalTextBold}>
                                        Information required to complete this Schedule, if not shown above, will be shown in the Declarations.
                                        </Text>
                                        {'\n'}
                                        {'\n'}
                                    </Text>
                                    </View>
                                    <Text style={styles.normalText}>
                                    The Transfer Of Rights Of Recovery Against Others To Us condition does not apply to the person(s) or organization(s) shown in the Schedule, 
                                    but only to the extent that subrogation is waived prior to the "accident" or the "loss" under a contract with that person or organization.
                                    {'\n'}
                                    </Text>
                                </Page>

                            ) : (
                                <></>

                            )}
                            </>
                        )

                    }
                    
                })
            }
            

        </Document>
    )
}

export default PDFFile
