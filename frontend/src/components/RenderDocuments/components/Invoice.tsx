// @ts-nocheck
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { useState, useEffect } from 'react'

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
        fontSize: 10,
        fontFamily: 'Times-Roman',
    },

    textSmallCenter: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
        left: 10,
        right: 10,
        textAlign: 'right'
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

    textHelveticaBoldUnderline: {
        fontSize: 14,
        fontFamily: 'Helvetica-Bold',
        textDecoration: 'underline',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
    },

    textTimesBoldUnderline: {
        fontSize: 14,
        fontFamily: 'Times-Bold',
        textDecoration: 'underline',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
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
        paddingTop: 50,
        paddingBottom: 50,
        paddingHorizontal: 80,
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

    // boldText: {
    //     fontSize: 18,
    //     textAlign: 'left',
    //     fontFamily: 'Times-Bold',
    //     display: 'flex',
    //     flexDirection: 'row',
    // },
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
    boldTextUnderline: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Bold',
        textDecoration: "underline"
    },

    boldTextUnderlineSmall: {
        margin: 12,
        fontSize: 12,
        textAlign: 'justify',
        fontFamily: 'Times-Bold',
        textDecoration: "underline"
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
        width: 420,
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
        flexBasis: 22,
        marginRight: 5,
    },
    rowNoBorder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'stretch',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 100,
        marginRight: 5,
    },
    cell: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderCollapse: 'collapsed',
        borderWidth: 1.25,
        paddingLeft: '10px',
        paddingTop: '10px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Helvetica',
        flexBasis: 'auto',
        alignSelf: 'stretch',
    },
    cellRoman: {
        borderColor: 'black',
        borderStyle: 'solid',
        fontSize: 10,
        borderWidth: 1.25,
        flexGrow: 1,
        flexShrink: 1,
        paddingLeft: '15px',
        paddingTop: '15px',
        fontFamily: 'Times-Roman',
        flexBasis: 'auto',
        alignSelf: 'stretch',
        flex: 1
    },
    cellRomanTwo: {
        borderColor: 'black',
        borderStyle: 'solid',
        fontSize: 10,
        borderWidth: 1.25,
        flexGrow: 1,
        flexShrink: 1,
        paddingLeft: '5px',
        paddingTop: '5px',
        fontFamily: 'Times-Roman',
        flexBasis: 'auto',
        alignSelf: 'stretch',
        flex: 1
    },

    cellRomanSmall: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderCollapse: 'collapsed',
        fontSize: 8,
        borderWidth: 1.25,
        paddingLeft: '10px',
        paddingTop: '10px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Times-Roman',
        flexBasis: 'auto',
        alignSelf: 'stretch',
        flex: 1
    },

    cellRomanBold: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderCollapse: 'collapsed',
        borderWidth: 1.25,
        paddingLeft: '5px',
        paddingTop: '5px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Times-Bold',
        fontSize: 10,
        flexBasis: 'auto',
        alignSelf: 'stretch',
    },
    cellBold: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderCollapse: 'collapsed',
        borderWidth: 1.25,
        paddingLeft: '10px',
        paddingTop: '10px',
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

    space: {
        marginTop: 10,
        marginBottom: 10
    }

    

})
function Invoice({ policy, index, installmentDate, installmentAmount, piFeeAmount, subAmount, taxAmount, feeAmount, totalAmount, additionalCharges }) {

    const idToBroker = {
        'PRABRK': "Preferred Risk Associates",
        "CLUTBRK": "Cluett Commercial Insurance Agency Inc.",
        "QRSBRK":'Quantum Risk Solutions',
        "ABIBRK": 'American Business Insurance',
        "TIPSBRK": 'Transportation Insurance Placement Services',
        "BRBRK": 'Big Rigs',
        "CLUETTBRK": 'Cluett Insurance Agency',
        "CORNBRK":'Cornell Insurance Agency',
        "LPISBRK": 'Laguna Pacific Insurance Services'
    }

    function addTenDays(date) {
        const result = new Date(date);
        result.setDate(result.getDate() + 10);
        const mm = result.getMonth() + 1; // getMonth() returns a 0-based value, so we need to add 1 to get the correct month
        const dd = result.getDate();
        const yyyy = result.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    }
      




    return (
        <Document>
            <Page style={styles.body}>
                <View>
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanBold]}>
                                INVOICE # 00{index+1}
                            </Text>
                        </View>
                        <View style={[styles.space]} wrap={false}>
                            <Text style={[styles.textSmall]}>
                                Date: {installmentDate}
                            </Text>
                        </View>     
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanBold]}>
                                INSURED DETAILS
                            </Text>
                            <Text style={[styles.cellRomanBold]}>
                                PRODUCER DETAILS
                            </Text>
                        </View>       

                        <View style={[styles.rowNoBorder]} wrap={false}>
                            <Text style={[styles.cellRoman]}>
                                {policy.policy.name}{'\n'}{'\n'}
                                {policy.insured.address1}{'\n'}{'\n'}
                                {policy.insured.city} {policy.insured.state}, {policy.insured.zipCode} 
                            </Text>
                            <Text style={[styles.cellRoman]}>
                                {(policy.policy.agent.includes("BRK") ? (
                                    <>
                                        {idToBroker[policy.policy.agent]}
                                    </>
                                ) : (
                                    <>
                                        {policy.policy.agent}
                                    </>
                                ))}
                            </Text>
                        </View>
                        {'\n'}{'\n'}{'\n'}{'\n'}
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanBold]}>
                                POLICY NUMBER
                            </Text>
                            <Text style={[styles.cellRomanBold]}>
                                EFFECTIVE DATE
                            </Text>
                            <Text style={[styles.cellRomanBold]}>
                                EXPIRATION DATE
                            </Text>
                        </View>    
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanBold]}>
                                {policy.policy.policyNum}
                            </Text>
                            <Text style={[styles.cellRomanBold]}>
                                {policy.policy.effectiveDate}
                            </Text>
                            <Text style={[styles.cellRomanBold]}>
                                {policy.policy.expirationDate}
                            </Text>
                        </View>
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanBold]}>
                                DUE DATE:   <Text style={styles.textSmall}>{addTenDays(installmentDate)}</Text>
                            </Text>
                        </View>    
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanBold]}>
                                DUE AMOUNT:   <Text style={styles.textSmall}>${totalAmount}</Text>
                            </Text>
                        </View> 
                        <View style={[styles.space]} wrap={false}>
                            <Text style={[styles.textSmall]}>
                                Dear Policyholder, Your Policy is premium financed.  Please make payments directly to the Producer at the address above. 
                            </Text>
                        </View> 
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanBold]}>
                                BILLING DETAILS
                            </Text>
                        </View>   
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanTwo]}>
                                Due Date
                            </Text>
                            <Text style={[styles.cellRomanTwo]}>
                                {addTenDays(installmentDate)}
                            </Text>
                        </View>    
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanTwo]}>
                                Bill No.
                            </Text>
                            <Text style={[styles.cellRomanTwo]}>
                                INSPAY{index+1}
                            </Text>
                        </View>    
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanTwo]}>
                                Prior Outstanding Balance
                            </Text>
                            <Text style={[styles.cellRomanTwo]}>
                                ${additionalCharges}
                            </Text>
                        </View>    
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanTwo]}>
                                Premium Balance
                            </Text>
                            <Text style={[styles.cellRomanTwo]}>
                                ${installmentAmount}
                            </Text>
                        </View>    
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanTwo]}>
                                Installment Fee
                            </Text>
                            <Text style={[styles.cellRomanTwo]}>
                                ${feeAmount}
                            </Text>
                        </View> 
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanTwo]}>
                                Policy Issuance Fee (Non-refundable)
                            </Text>
                            <Text style={[styles.cellRomanTwo]}>
                                ${piFeeAmount}
                            </Text>
                        </View>    
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanTwo]}>
                                Reinstatement Fee
                            </Text>
                            <Text style={[styles.cellRomanTwo]}>
                                $0.00
                            </Text>
                        </View>
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanTwo]}>
                                Tax Fee
                            </Text>
                            <Text style={[styles.cellRomanTwo]}>
                                ${taxAmount}
                            </Text>
                        </View>  
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanTwo]}>
                                Subscription Fee
                            </Text>
                            <Text style={[styles.cellRomanTwo]}>
                                ${subAmount}
                            </Text>
                        </View>
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanTwo]}>
                                Other Fee
                            </Text>
                            <Text style={[styles.cellRomanTwo]}>
                                $0.00
                            </Text>
                        </View>  
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanBold]}>
                                Due Amount
                            </Text>
                            <Text style={[styles.cellRomanTwo]}>
                                ${totalAmount}
                            </Text>
                        </View> 
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanTwo]}>
                                Credit Amount
                            </Text>
                            <Text style={[styles.cellRomanTwo]}>
                                $0.00
                            </Text>
                        </View> 
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cellRomanBold]}>
                                Total Due Amount
                            </Text>
                            <Text style={[styles.cellRomanTwo]}>
                                ${totalAmount}
                            </Text>
                        </View>  
                        <View style={[styles.space]} wrap={false}>
                            <Text style={[styles.boldTextSmall]}>
                            Deposit payment is due in 10 days regardless of payment method. Payment must be received on or before DUE DATE to avoid Cancellation. If you have any Questions or Concerns, please feel free to contact your Broker or Surya Insurance Company Inc. RRG at 212-489-5300.  
                            </Text>
                        </View> 
                        <View style={[styles.space]} wrap={false}>
                            <Text style={[styles.boldTextCenterSmall]}>
                                INSURED COPY
                            </Text>
                        </View> 

                </View>
            </Page>
        </Document>
    )
}

export default Invoice
