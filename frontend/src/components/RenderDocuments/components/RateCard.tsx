import React from 'react'
import {
    View,
    Page,
    Text,
    Image,
    Document,
    StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    /* Control the left side */
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
    },


    textSmallCenter: {
        fontSize: 10,
        fontFamily: 'Times-Roman',
        textAlign: 'center',
    },

    boldTextCenterHelvetica: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        textAlign: 'center',
    },

    textSmallUnderline: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
        textDecoration: 'underline',
    },

    textSmallHelveticaBoldUnderline: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        textDecoration: 'underline',
    },

    boldTextSmall: {
        fontSize: 12,
        fontFamily: 'Times-Bold',
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
    },

    italicTextSmall: {
        fontSize: 12,
        fontFamily: 'Times-Italic',
    },

    /* Control the right side */

    body: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
    },
    boldTitle: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Times-Bold',
        display: 'flex',
        flexDirection: 'row',
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
        borderCollapse: 'collapsed',
        alignContent: 'stretch',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        flexGrow: 0,
        flexShrink: 0,
        marginRight: 5,
    },

    titleRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderCollapse: 'collapsed',
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
        fontSize: 10,
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
        fontSize: 12,
    },

    cellBoldSmall: {
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
        fontSize: 10,
    },

    titleCell: {
        padding: '5px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Helvetica',
        flexBasis: 'auto',
        alignSelf: 'stretch',
        fontSize: 10,
    },

    titleCellBold: {
        padding: '5px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Helvetica-Bold',
        flexBasis: 'auto',
        alignSelf: 'stretch',
        fontSize: 10,
    },

    cellRoman: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderCollapse: 'collapsed',
        borderWidth: 1.25,
        paddingLeft: '10px',
        paddingTop: '10px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Times-Roman',
        flexBasis: 'auto',
        alignSelf: 'stretch',
    },

    cellRomanBold: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderCollapse: 'collapsed',
        borderWidth: 1.25,
        paddingLeft: '10px',
        paddingTop: '10px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Times-Bold',
        fontSize: 14,
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
function RateCard({ policy }) {
    const current = new Date()
    const date = `${
        current.getMonth() + 1
    }/${current.getDate()}/${current.getFullYear()}`

    const indexFormula = (indexNumber) => {
        return indexNumber["index"]+1
    }

    const SubFee = (premium) => {
        console.log(premium)
        return (premium*0.12).toFixed(2)
    }

    const StateTax = (premium) => {
        const states = {
            'New Jersey': 0.05,
            'Texas': 0.036,
            'California': 0.036,
            'Ohio': 0.05,
            'Pennsylvania': 0.036,
            'Arizona': 0.036,
            'Virginia': 0.036,
            'Alabama': 0.036,
            'Oregon': 0.036,
            'Connecticut': 0.04
            }
        const TaxFee = states[policy.policy.states]
        return (premium*TaxFee).toFixed(2)
    }

    const TotalPremium = () => {
        return(policy.coverage.overallPremium+policy.coverage.personalInjuryProtectionPremium+policy.coverage.medicalPaymentsPremium+policy.coverage.underinsuredMotoristPremium+policy.coverage.uninsuredMotoristPremium)
    }

    const StateTaxNumber = () => {
        const states = {
            'New Jersey': 0.05,
            'Texas': 0.036,
            'California': 0.036,
            'Ohio': 0.05,
            'Pennsylvania': 0.036,
            'Arizona': 0.036,
            'Virginia': 0.036,
            'Alabama': 0.036,
            'Oregon': 0.036,
            'Connecticut': 0.04
            }
        return ((states[policy.policy.states])*100).toFixed(2)
    }
  
    const Total = (premium) => {
        console.log(premium, parseFloat(StateTax(premium)), parseFloat(SubFee(premium)))
        return (parseFloat(premium)+parseFloat(StateTax(premium))+parseFloat(SubFee(premium))).toFixed(2)
    }

    return (
        <Document>
            <Page style={styles.body}>
                <View style={{paddingTop: "300px"}}>
                    <Text style={styles.boldTitle}>
                    SURYA INSURANCE COMPANY, INC. RRG{'\n'}{'\n'}
                    </Text>
                    <Text style={styles.textSmallCenter}>
                    608 Fifth Ave Suite #901, New York, NY 10020{'\n'}
                    Phone: 212-489-5300     Fax: 212-489-0420{'\n'}{'\n'}
                    </Text>
                    <Text style={styles.miniBoldTitle}>
                    Rate Worksheet{'\n'}
                    </Text>
                    
                </View>
            </Page>
                {policy.vehicles.values.map((value, index) => (
                <Page style={styles.body}>
                    <View>
                        <View style={[styles.titleRow]}>
                            <Text style={[styles.titleCellBold]}>
                                Insured Name:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {policy.policy.name}
                            </Text>
                            <Text style={[styles.titleCellBold]}>
                                Application No.:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {policy.policy.policyNum}
                            </Text>
                        </View>
                        <View style={[styles.titleRow]}>
                            <Text style={[styles.titleCellBold]}>
                                Producer Code:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {policy.policy.agent}
                            </Text>
                            <Text style={[styles.titleCellBold]}>
                                Effective Date:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {policy.policy.effectiveDate}
                            </Text>
                        </View>
                        <View style={[styles.titleRow]}>
                            <Text style={[styles.titleCellBold]}>
                                Vehicle VIN - Year:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {value.vin} - {value.modelYear}
                            </Text>
                            <Text style={[styles.titleCellBold]}>
                                Vehicle Make/Model
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {value.make} / {value.model}
                            </Text>
                        </View>
                        <View style={[styles.titleRow]}>
                            <Text style={[styles.titleCellBold]}>
                                Territory Code:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                
                            </Text>
                            <Text style={[styles.titleCellBold]}>
                                Zone Code:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                
                            </Text>
                        </View>
                        <View style={[styles.titleRow]}>
                            <Text style={[styles.titleCellBold]}>
                                Class Code:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {value.rateClassCode}
                            </Text>
                            <Text style={[styles.titleCellBold]}>
                                
                            </Text>
                            <Text style={[styles.titleCell]}>
                                
                            </Text>
                        </View>
                        <View style={[styles.titleRow]}>
                            <Text style={[styles.titleCellBold]}>
                                Policy Line Item:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {policy.policy.policyLineItem}
                            </Text>
                            <Text style={[styles.titleCellBold]}>
                                Classification:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {policy.policy.businessUseClass}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.boldTextCenterHelvetica}>
                                {'\n'}{'\n'}
                                Applicable Discounts and Surcharges
                                {'\n'}{'\n'}{'\n'}
                            </Text>
                        </View>
                        <View style={[styles.row]}>
                            <Text style={[styles.cellBoldSmall]}>
                                SI. No
                            </Text>
                            <Text style={[styles.cellBoldSmall]}>
                                Coverage Type
                            </Text>
                            <Text style={[styles.cellBoldSmall]}>
                                Limits
                            </Text>
                            <Text style={[styles.cellBoldSmall]}>
                                Formula
                            </Text>
                            <Text style={[styles.cellBoldSmall]}>
                                Formula Value
                            </Text>
                            <Text style={[styles.cellBoldSmall]}>
                                Calculated Amt
                            </Text>
                        </View>

                        {/* Overall */}

                        <View style={[styles.row]}>
                            <Text style={[styles.cell]}>
                                {indexFormula({index})}
                            </Text>
                            <Text style={[styles.cell]}>
                                {(policy.coverage.combinedSectionLimit !== "0") ? ("Combined Single Limit") : ("Split Limit")}
                            </Text>
                            <Text style={[styles.cell]}>
                                {(policy.coverage.combinedSectionLimit !== "0") ? (policy.coverage.combinedSectionLimit) : ((policy.coverage.splitSectionBodyPerPerson).slice(0,2)/(policy.coverage.splitSectionBodyPerAccidentOptions).slice(0,2)/(policy.coverage.splitSectionPropertyDamageOptions).slice(0,2))}
                            </Text>
                            <Text style={[styles.cell]}>
                                Base Rate
                            </Text>
                            <Text style={[styles.cell]}>
                                {value.overallPremium}
                            </Text>
                            <Text style={[styles.cell]}>
                                ${value.overallPremium}.00
                            </Text>
                        </View>

                        {/* pIProtection */}
                        { (policy.coverage.personalInjuryProtectionPremium !== "0") ? (
                        <View style={[styles.row]}>
                            <Text style={[styles.cell]}>
                                {indexFormula({index})}
                            </Text>
                            <Text style={[styles.cell]}>
                                {(policy.coverage.pIProtectionSingleLimit !== "0") ? ("Personal Injury Protection CSL") : ("Personal Injury Protection Split Limit")}
                            </Text>
                            <Text style={[styles.cell]}>
                                {(policy.coverage.pIProtectionSingleLimit !== "0") ? (policy.coverage.pIProtectionSingleLimit) : ((policy.coverage.pIProtectionSplitBodyPerPerson).slice(0,2)/(policy.coverage.pIProtectionSplitBodyPerAccident).slice(0,2)/(policy.coverage.pIProtectionSplitPropertyDamage).slice(0,2))}
                            </Text>
                            <Text style={[styles.cell]}>
                                Base Rate
                            </Text>
                            <Text style={[styles.cell]}>
                                {value.personalInjuryProtectionPremium}
                            </Text>
                            <Text style={[styles.cell]}>
                                ${value.personalInjuryProtectionPremium}.00
                            </Text>
                        </View>
                        ) : (<></>)}

                        {/* medical Payments */}

                        { (policy.coverage.medicalPaymentsPremium !== "0") ? (
                        <View style={[styles.row]}>
                            <Text style={[styles.cell]}>
                                {indexFormula({index})}
                            </Text>
                            <Text style={[styles.cell]}>
                                {(policy.coverage.medicalSingleLimit !== "0") ? ("Medical Payments CSL") : ("Medical Payments Split Limit")}
                            </Text>
                            <Text style={[styles.cell]}>
                                {(policy.coverage.medicalSingleLimit !== "0") ? (policy.coverage.medicalSingleLimit) : ((policy.coverage.medicalSplitBodyPerPerson).slice(0,2)/(policy.coverage.medicalSplitBodyPerAccident).slice(0,2)/(policy.coverage.medicalSplitPropertyDamage).slice(0,2))}
                            </Text>
                            <Text style={[styles.cell]}>
                                Base Rate
                            </Text>
                            <Text style={[styles.cell]}>
                                {value.medicalPaymentsPremium}
                            </Text>
                            <Text style={[styles.cell]}>
                                ${value.medicalPaymentsPremium}.00
                            </Text>
                        </View>
                        ) : (<></>)}

                        {/* Underinsured Motorist */}

                        { (policy.coverage.underinsuredMotoristPremium !== "0") ? (
                        <View style={[styles.row]}>
                            <Text style={[styles.cell]}>
                                {indexFormula({index})}
                            </Text>
                            <Text style={[styles.cell]}>
                                {(policy.coverage.underinsuredMotoristSingleLimit !== "0") ? ("Underinsured Motorist CSL") : ("Underinsured Motorist Split Limit")}
                            </Text>
                            <Text style={[styles.cell]}>
                                {(policy.coverage.underinsuredMotoristSingleLimit !== "0") ? (policy.coverage.underinsuredMotoristSingleLimit) : ((policy.coverage.underMotoristBodyPerPerson).slice(0,2)/(policy.coverage.underMotoristBodyPerAccident).slice(0,2)/(policy.coverage.underMotoristProperty).slice(0,2))}
                            </Text>
                            <Text style={[styles.cell]}>
                                Base Rate
                            </Text>
                            <Text style={[styles.cell]}>
                                {value.underinsuredMotoristPremium}
                            </Text>
                            <Text style={[styles.cell]}>
                                ${value.underinsuredMotoristPremium}.00
                            </Text>
                        </View>
                        ) : (<></>)}

                        {/* Uninsured Motorist */}

                        { (policy.coverage.uninsuredMotoristPremium !== "0") ? (
                        <View style={[styles.row]}>
                            <Text style={[styles.cell]}>
                                {indexFormula({index})}
                            </Text>
                            <Text style={[styles.cell]}>
                                {(policy.coverage.uninsuredMotoristSingleLimit !== "0") ? ("Uninsured Motorist CSL") : ("Uninsured Motorist Split Limit")}
                            </Text>
                            <Text style={[styles.cell]}>
                                {(policy.coverage.uninsuredMotoristSingleLimit !== "0") ? (policy.coverage.uninsuredMotoristSingleLimit) : ((policy.coverage.unMotoristBodyPerPerson).slice(0,2)/(policy.coverage.unMotoristBodyPerAccident).slice(0,2)/(policy.coverage.unMotoristProperty).slice(0,2))}
                            </Text>
                            <Text style={[styles.cell]}>
                                Base Rate
                            </Text>
                            <Text style={[styles.cell]}>
                                {value.uninsuredMotoristPremium}
                            </Text>
                            <Text style={[styles.cell]}>
                                ${value.uninsuredMotoristPremium}.00
                            </Text>
                        </View>
                        ) : (<></>)}
                        <View style={[styles.row]}>
                            <Text style={[styles.cell]}>
                            </Text>
                            <Text style={[styles.cellBoldSmall]}>
                                Total
                            </Text>
                            <Text style={[styles.cell]}>
                            </Text>
                            <Text style={[styles.cell]}>
                                -
                            </Text>
                            <Text style={[styles.cell]}>
                                -
                            </Text>
                            <Text style={[styles.cellBoldSmall]}>
                                ${TotalPremium()}.00
                            </Text>
                        </View>
                    </View>
                </Page>
                ))}
                <Page style={styles.body}>
                    <View style={[styles.row]}>
                        <Text style={[styles.cellBold]}>
                            Total Premium
                        </Text>
                        <Text style={[styles.cellBold]}>
                            $30.00
                        </Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={[styles.cellBold]}>
                            Subscription Fees 12%
                        </Text>
                        <Text style={[styles.cellBold]}>
                            ${SubFee(30)}
                        </Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={[styles.cellBold]}>
                            Tax {StateTaxNumber()}%
                        </Text>
                        <Text style={[styles.cellBold]}>
                            ${StateTax(30)}
                        </Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={[styles.cellBold]}>
                            Total 
                        </Text>
                        <Text style={[styles.cellBold]}>
                            ${Total(30)}
                        </Text>
                    </View>
                </Page>
        </Document>
    )
}

export default RateCard