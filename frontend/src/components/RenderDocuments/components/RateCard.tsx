// @ts-nocheck
import {
    Document,
    Image,
    Page,
    StyleSheet,
    Text,
    View,
} from '@react-pdf/renderer'
import React from 'react'

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
        return indexNumber['index'] + 1
    }

    const SubFee = (premium) => {
        console.log(premium)
        return (premium * 0.12).toFixed(2)
    }

    const StateTax = (premium) => {
        const states = {
            'New Jersey': 0.05,
            Texas: 0.036,
            California: 0.036,
            Ohio: 0.05,
            Pennsylvania: 0.036,
            Arizona: 0.036,
            Virginia: 0.036,
            Alabama: 0.036,
            Oregon: 0.036,
            Connecticut: 0.04,
        }
        const TaxFee = states[policy.policy.states]
        return (premium * TaxFee).toFixed(2)
    }

    const TotalPremium = () => {
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

        return parseFloat(premium).toFixed(2)
    }

    const TotalVehiclePremium = (i) => {
        let premium = 0.00

        
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

        if (!isNaN(parseFloat(policy.coverage.hiredCSLPremium))) {
            premium+=parseFloat(policy.coverage.hiredCSLPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.nonOwnedCSLPremium))) {
            premium+=parseFloat(policy.coverage.nonOwnedCSLPremium)
        }

        return parseFloat(premium).toFixed(2)
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
            'Connecticut': 0.04,
        }
        return (states[policy.policy.states] * 100).toFixed(2)
    }

    const Total = (premium) => {
        console.log(
            premium,
            parseFloat(StateTax(premium)),
            parseFloat(SubFee(premium))
        )
        return (
            parseFloat(premium) +
            parseFloat(StateTax(premium)) +
            parseFloat(SubFee(premium))
        ).toFixed(2)
    }

    const ifNaN = (limit) => {
        if (isNaN(limit)) {
            return "100000"
        } else {
            return limit
        }
    }

    const ifNum = (limit) => {

        if (typeof(limit) === 'number') {
            return limit.toString()
        } else {
            return limit
        }
    }

    return (
        <Document>
            <Page style={styles.body}>
                <View style={{ paddingTop: '300px' }}>
                    <Text style={styles.boldTitle}>
                        SURYA INSURANCE COMPANY, INC. RRG{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmallCenter}>
                        608 Fifth Ave Suite #903, New York, NY 10020{'\n'}
                        Phone: 212-489-5300 Fax: 212-489-0420{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.miniBoldTitle}>
                        Rate Worksheet{'\n'}
                    </Text>
                </View>
            </Page>
            {policy.vehicles.values.map((value, index) => (
                (value.baseEffDate === policy.policy.effectiveDate) ? (
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
                            <Text style={[styles.titleCell]}></Text>
                            <Text style={[styles.titleCellBold]}>
                                Zone Code:
                            </Text>
                            <Text style={[styles.titleCell]}></Text>
                        </View>
                        <View style={[styles.titleRow]}>
                            <Text style={[styles.titleCellBold]}>
                                Class Code:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {value.rateClassCode}
                            </Text>
                            <Text style={[styles.titleCellBold]}></Text>
                            <Text style={[styles.titleCell]}></Text>
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
                                {'\n'}
                                {'\n'}
                                Applicable Discounts and Surcharges
                                {'\n'}
                                {'\n'}
                                {'\n'}
                            </Text>
                        </View>
                        <View style={[styles.row]}>
                            <Text style={[styles.cellBoldSmall]}>SI. No</Text>
                            <Text style={[styles.cellBoldSmall]}>
                                Coverage Type
                            </Text>
                            <Text style={[styles.cellBoldSmall]}>Limits</Text>
                            <Text style={[styles.cellBoldSmall]}>Formula</Text>
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
                                {indexFormula({ index })}
                            </Text>
                            <Text style={[styles.cell]}>
                                Overall {policy.coverage.overall}
                            </Text>
                            <Text style={[styles.cell]}>
                                {(policy.coverage.overall !== 'Split Limit')
                                    ? (policy.coverage.combinedSectionLimit)
                                    : (policy.coverage.splitSectionBodyPerPerson.split(',')[0]+'/'+
                                    policy.coverage.splitSectionBodyPerAccidentOptions.split(',')[0]+'/'+
                                    policy.coverage.splitSectionPropertyDamageOptions.split(',')[0]
                                    )}
                            </Text>
                            <Text style={[styles.cell]}>Base Rate</Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.overallPremium}
                            </Text>
                            <Text style={[styles.cell]}>
                                ${policy.coverage.overallPremium}
                            </Text>
                        </View>

                        {/* pIProtection */}
                        {(policy.coverage.pIProtectionSingleEntry !== 'Excluded' || policy.coverage.pIProtectionSplitAutoEntry !== 'Excluded') ? (
                            <View style={[styles.row]}>
                                <Text style={[styles.cell]}>
                                    {indexFormula({ index })}
                                </Text>
                                <Text style={[styles.cell]}>
                                    Personal Injury {policy.coverage.personalInjury}
                                </Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.personalInjury !==
                                    'Split Limit'
                                        ? policy.coverage.pIProtectionSingleLimit
                                        : policy.coverage.pIProtectionSplitBodyPerPerson.split(',')[0]+'/'+
                                          policy.coverage.pIProtectionSplitBodyPerAccident.split(',')[0]+'/'+
                                          policy.coverage.pIProtectionSplitPropertyDamage.split(',')[0]
                                          }
                                </Text>
                                <Text style={[styles.cell]}>Base Rate</Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.personalInjuryProtectionPremium}
                                </Text>
                                <Text style={[styles.cell]}>
                                    ${policy.coverage.personalInjuryProtectionPremium}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}

                        {/* medical Payments */}

                        {(policy.coverage.medicalSingleEntry !== 'Excluded' || policy.coverage.medicalSplitAutoEntry !== 'Excluded') ? (
                            <View style={[styles.row]}>
                                <Text style={[styles.cell]}>
                                    {indexFormula({ index })}
                                </Text>
                                <Text style={[styles.cell]}>
                                    Medical Payments {policy.coverage.medicalPayments}
                                </Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.medicalPayments !== 'Split Limit'
                                        ? policy.coverage.medicalSingleLimit
                                        : policy.coverage.medicalSplitBodyPerPerson.split(',')[0]+'/'+
                                          policy.coverage.medicalSplitBodyPerAccident.split(',')[0]+'/'+
                                          policy.coverage.medicalSplitPropertyDamage.split(',')[0]}
                                </Text>
                                <Text style={[styles.cell]}>Base Rate</Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.medicalPaymentsPremium}
                                </Text>
                                <Text style={[styles.cell]}>
                                    ${policy.coverage.medicalPaymentsPremium}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}


                        {(policy.coverage.pedPipSingleLimit !== 'No') ? (
                            <View style={[styles.row]}>
                                <Text style={[styles.cell]}>
                                    {indexFormula({ index })}
                                </Text>
                                <Text style={[styles.cell]}>
                                    Ped PIP Combined Single Limit
                                </Text>
                                <Text style={[styles.cell]}>
                                    Up to $250,000
                                </Text>
                                <Text style={[styles.cell]}>Base Rate</Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.pedPipProtectionPremium}
                                </Text>
                                <Text style={[styles.cell]}>
                                    ${policy.coverage.pedPipProtectionPremium}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}

                        {/* Underinsured Motorist */}

                        {(policy.coverage.underinsuredMotoristSingleAutoEntry !== 'Excluded' || policy.coverage.underMotoristAuto !== 'Excluded') ? (
                            <View style={[styles.row]}>
                                <Text style={[styles.cell]}>
                                    {indexFormula({ index })}
                                </Text>
                                <Text style={[styles.cell]}>
                                    Underinsured Motorist {policy.coverage
                                        .underinsuredMotorist}
                                </Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage
                                        .underinsuredMotorist !== 'Split Limit'
                                        ? policy.coverage
                                              .underinsuredMotoristSingleLimit
                                        : policy.coverage.underMotoristBodyPerPerson.split(',')[0]+'/'+
                                          policy.coverage.underMotoristBodyPerAccident.split(',')[0]+'/'+
                                          policy.coverage.underMotoristProperty.split(',')[0]}
                                </Text>
                                <Text style={[styles.cell]}>Base Rate</Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.underinsuredMotoristPremium}
                                </Text>
                                <Text style={[styles.cell]}>
                                    ${policy.coverage.underinsuredMotoristPremium}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}

                        {/* Uninsured Motorist */}

                        {(policy.coverage.uninsuredMotoristSingleAutoEntry !== 'Excluded' || policy.coverage.unMotoristAuto !== 'Excluded') ? (
                            <View style={[styles.row]}>
                                <Text style={[styles.cell]}>
                                    {indexFormula({ index })}
                                </Text>
                                <Text style={[styles.cell]}>
                                    Uninsured Motorist {policy.coverage.uninsuredMotorist}
                                </Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage
                                        .uninsuredMotorist !== 'Split Limit'
                                        ? policy.coverage
                                              .uninsuredMotoristSingleLimit
                                        : policy.coverage.unMotoristBodyPerPerson.split(',')[0]+'/'+
                                          policy.coverage.unMotoristBodyPerAccident.split(',')[0]+'/'+
                                          policy.coverage.unMotoristProperty.split(',')[0]}
                                </Text>
                                <Text style={[styles.cell]}>Base Rate</Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.uninsuredMotoristPremium}
                                </Text>
                                <Text style={[styles.cell]}>
                                    ${policy.coverage.uninsuredMotoristPremium}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}
                        
                        <View style={[styles.row]}>
                            <Text style={[styles.cell]}></Text>
                            <Text style={[styles.cellBoldSmall]}>Total</Text>
                            <Text style={[styles.cell]}></Text>
                            <Text style={[styles.cell]}>-</Text>
                            <Text style={[styles.cell]}>-</Text>
                            <Text style={[styles.cellBoldSmall]}>
                                ${TotalVehiclePremium(index)}
                            </Text>
                        </View>
                    </View>
                </Page>
            ) : (<></>)))}
            <Page style={styles.body}>
                <View style={[styles.row]}>
                    <Text style={[styles.cellBold]}>Total Premium</Text>
                    <Text style={[styles.cellBold]}>${TotalPremium()}</Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={[styles.cellBold]}>Subscription Fees 12%</Text>
                    <Text style={[styles.cellBold]}>${SubFee(TotalPremium())}</Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={[styles.cellBold]}>
                        Tax {StateTaxNumber()}%
                    </Text>
                    <Text style={[styles.cellBold]}>${StateTax(TotalPremium())}</Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={[styles.cellBold]}>Total</Text>
                    <Text style={[styles.cellBold]}>${Total(TotalPremium())}</Text>
                </View>
            </Page>
        </Document>
    )
}

export default RateCard
