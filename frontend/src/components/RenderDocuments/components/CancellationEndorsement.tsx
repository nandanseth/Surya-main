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
        fontSize: 12,
        fontFamily: 'Times-Roman',
        left: 10,
        right: 10,
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
        flexBasis: 37,
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
        borderCollapse: 'collapsed',
        fontSize: 10,
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
        paddingLeft: '10px',
        paddingTop: '10px',
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Times-Bold',
        fontSize: 14,
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
})
function CancellationEndorsement({ policy }) {

    const polName = policy.policy.name
    const polNum = policy.policy.policyNum
    const state = policy.policy.states
    const effDate = policy.policy.effectiveDate
    const expDate = policy.policy.expirationDate

    const dateObject = new Date(policy.cancellation.cancellationDate);
    const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const formattedDate = `${monthNames[dateObject.getMonth()]} ${dateObject.getDate()} ${dateObject.getFullYear()}`;


    const daysBetween = (expDate, effDate) => {
        const difference = new Date(expDate) - new Date(effDate)
        console.log(new Date(expDate), new Date(effDate),effDate, 'cat')
        const days = Math.ceil(difference / (1000 * 3600 * 24));
        return days
    }


    const CalculateOriginalPremium = () => {
        const premiums = Object.keys(policy.coverage).filter(key => key.includes("Premium") && !key.includes("hiredCSLPremium") && !key.includes("nonOwnedCSLPremium")).map(key => policy.coverage[key]);
        const vehicles = policy.vehicles.values

        let totalPremium = 0

        for (const i in premiums) {
            const coveragePremium = parseFloat(premiums[i])

            for (const j in vehicles) {
                const effDate = vehicles[j].baseEffDate
                const expDate = vehicles[j].baseExpDate
                const cancelDate = policy.cancellation.cancellationDate

                if (new Date(cancelDate).getTime() === new Date(expDate).getTime() || new Date(cancelDate).getTime() < new Date(expDate).getTime()) {
                    const totalDays = daysBetween(policy.policy.expirationDate, effDate)
                    const covPremium = (totalDays/365)*coveragePremium
                    console.log(premiums, coveragePremium, totalDays, 'origcov')

                    totalPremium += covPremium

                } /* else {

                    const totalDays = daysBetween(expDate, effDate)
                    totalPremium += coveragePremium*(totalDays/365)
                } */

                

            }
        }
        console.log(totalPremium, 'orig')

        return totalPremium
    }

    const CalculateCancellationPremium = () => {
        const premiums = Object.keys(policy.coverage).filter(key => key.includes("Premium") && !key.includes("hiredCSLPremium") && !key.includes("nonOwnedCSLPremium")).map(key => policy.coverage[key]);
        const vehicles = policy.vehicles.values
        console.log(premiums, 'clem')
        let totalPremium = 0

        for (const i in premiums) {
            const coveragePremium = parseFloat(premiums[i])

            console.log(coveragePremium, 'coveragePrem', i)

            for (const j in vehicles) {
                const effDate = vehicles[j].baseEffDate
                const effDateBase = policy.policy.effectiveDate

                const expDate = vehicles[j].baseExpDate
                const cancelDate = policy.cancellation.cancellationDate

                console.log(cancelDate, 'cdate')

                if (new Date(cancelDate).getTime() === new Date(expDate).getTime() || new Date(cancelDate).getTime() < new Date(expDate).getTime()) {


                    const totalDays = daysBetween(cancelDate, effDate)
                    console.log(totalDays, coveragePremium, 'cancel')

                    if (new Date(cancelDate).getTime() !== new Date(effDate).getTime()) {
                        if (policy.cancellation.cancellationReason === 'Cancel / Rewrite at Different Limit') {
                            
                            totalPremium += coveragePremium*(totalDays/365)
                        } else if (new Date(effDate).getTime() === new Date(effDateBase).getTime()) {
                            console.log(coveragePremium*0.25, coveragePremium*(totalDays/365), vehicles[j], 'miel')
                            totalPremium += Math.max(coveragePremium*0.25, coveragePremium*(totalDays/365))
                        } else {
                            totalPremium += coveragePremium*(totalDays/365)
                            console.log(coveragePremium*(totalDays/365), 'ciel')
                        }
                        
                    }

                    
                }

                

            }
        }
        console.log(totalPremium, 'cancelPrem')
        

        return totalPremium
    }

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
        'Connecticut': 0.04
        }

    const differencePremiums = () => {
        console.log(CalculateOriginalPremium(), CalculateCancellationPremium(), 'origandcancprem')
        return (CalculateOriginalPremium() - CalculateCancellationPremium()).toFixed(2)
    }

    const vehicleTax = () => {
        const tax = stateToTaxFee[state]
        const premiumAdded = differencePremiums()
        const taxAdded = premiumAdded*tax
        return taxAdded.toFixed(2)
    }

    const vehicleSubFee = () => {
        const premiumAdded = differencePremiums()
        const subAdded = premiumAdded*0.12
        return subAdded.toFixed(2)
    }

    const Total = () => {
        return (parseFloat(differencePremiums()) + parseFloat(vehicleTax()) + parseFloat(vehicleSubFee())).toFixed(2)
    }






    return (
        <Document>
            <Page style={styles.body}>
                <View>
                    <Text style={styles.textHelveticaBoldUnderline}>
                        SURYA INSURANCE COMPANY
                        {'\n'}
                        {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.boldTextSmall}>
                        ENDORSEMENT #: <Text style={styles.textSmall}>{}</Text>
                        {'\n'} {'\n'}
                        ENDORSEMENT EFFECTIVE: <Text style={styles.textSmall}>{policy.cancellation.cancellationDate}</Text>
                        {'\n'} {'\n'} {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        NAMED INSURED: {polName}
                        {'\n'} {'\n'}
                        POLICY NUMBER: {polNum}
                        {'\n'} {'\n'}
                        POLICY PERIOD: {effDate} - {expDate}
                        {'\n'} {'\n'} {'\n'}
                    </Text>
                    
                    <Text style={styles.boldTextCenterSmall}>
                    THIS ENDORSEMENT CHANGED THE POLICY. PLEASE READ IT {'\n'}CAREFULLY
                    COVERAGE PARTS AFFECTED: <Text style={styles.boldTextUnderlineSmall}>BUSINESS AUTO COVERAGE FORM</Text>
                        {'\n'}
                        {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        POLICY CANCEL EFFECTIVE: {formattedDate.toUpperCase()}
                        {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        REASON: {policy.cancellation.cancellationReason === 'null' || policy.cancellation.cancellationReason === '' ? (
                            <>
                            UNDERWRITING REASON
                            </>
                        ) : (
                            <>
                            {policy.cancellation.cancellationReason.toUpperCase()}
                            </>
                        )}
                        {'\n'}
                        {'\n'}
                    </Text>
    
                    <Text style={styles.boldTextSmall}>
                    {'\n'} {'\n'}{'\n'}{'\n'}PREMIUM CHANGE: <Text style={styles.textSmallCenter}>(${Math.abs(differencePremiums()).toLocaleString('en-US', {maximumFractionDigits: 2})}){'\n'} {'\n'}{'\n'}</Text>
                        
                    </Text>
                    
                    <Text style={styles.boldTextSmall}>
                    TAX CHANGE: <Text style={styles.textSmallCenter}>(${Math.abs(vehicleTax()).toLocaleString('en-US', {maximumFractionDigits: 2})}){'\n'} {'\n'}{'\n'}</Text>
                    </Text>
                    <Text style={styles.boldTextSmall}>
                    SUBSCRIPTION FEE CHANGE: <Text style={styles.textSmallCenter}>(${Math.abs(vehicleSubFee()).toLocaleString('en-US', {maximumFractionDigits: 2})}){'\n'} {'\n'}{'\n'}</Text>
                    </Text>
                    <Text style={styles.boldTextSmall}>
                    TOTAL: <Text style={styles.textSmallCenter}>(${Math.abs(Total()).toLocaleString('en-US', {maximumFractionDigits: 2})}){'\n'} {'\n'}{'\n'}</Text>
                    </Text>
                </View>
            </Page>
        </Document>
    )
}

export default CancellationEndorsement
