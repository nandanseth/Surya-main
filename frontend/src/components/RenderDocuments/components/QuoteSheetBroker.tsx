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
    textSmallSpaced: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
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

        padding: '10px',
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
function QuoteSheetBroker({ policy }) {
    const current = new Date()
    const date = `${
        current.getMonth() + 1
    }/${current.getDate()}/${current.getFullYear()}`

    const indexFormula = (indexNumber) => {
        return indexNumber['index'] + 1
    }

    const getWaiverPremium = () => {
        let waiverPremium = 0
        console.log(policy.insured, "lsoll")
        
        if (policy.insured.values.additionalInsured?.values) {
            
            for (const i in policy.insured.values.additionalInsured?.values) {
                if (policy.insured.values.additionalInsured?.values[i].isWaiver === true) {
                    waiverPremium += 500
                }
            }
        }
        
        return waiverPremium
    }

    const effectiveDate = new Date(policy.policy.values.effectiveDate);
    const comparisonDate = new Date('09/01/2024');

    const addValue = effectiveDate >= comparisonDate ? 500.00 : 250.00;



    const getAddInsuredPremium = () => {
        let addPremium = 0
        console.log(policy.insured, "lsoll")
        
        if (policy.insured.values.additionalInsured?.values) {

            
            
            for (const i in policy.insured.values.additionalInsured?.values) {
                if (policy.insured.values.additionalInsured?.values[i].isAddPremium === true) {
                    addPremium += addValue
                }
            }
        }
        
        return addPremium
    }


    const agentMapping = {
        'Quantum Risk Solutions (QRSBRK)': {
            "address": "92 Main",
            "city": "Somerville",
            "state": "NJ",
            "zipCode": "08876"
        },
        'Preferred Risk Associates (PRABRK)': {
            "address": "26 Columbia Turnpike #103",
            "city": "Florham Park",
            "state": "NJ",
            "zipCode": "07932"
        },
        'American Business Insurance (ABIBRK)': {
            "address": "32107 Lindero Canyon Road #120",
            "city": "Westlake Village",
            "state": "CA",
            "zipCode": "91361"
        },
        'Transportation Insurance Placement Services (TIPSBRK)': {
            "address": "7178 Marshall Road",
            "city": "Upper Darby",
            "state": "PA",
            "zipCode": "19082"
        },
        'Cluett Insurance Agency (CLUETT)': {
            "address": "8 Pembroke St #1109",
            "city": "Kingston",
            "state": "MA",
            "zipCode": "02364"
        },
        'Cornell Insurance Agency (CORN)': {
            "address": "105 Fieldcrest Ave",
            "city": "Edison",
            "state": "NJ",
            "zipCode": "08837"
        },
        'Laguna Pacific Insurance Services (LPIS)': {
            "address": "23537 Moulton Pkwy",
            "city": "Laguna Hills",
            "state": "CA",
            "zipCode": "92653"
        },
        'None': {
            "address": "None",
            "city": "None",
            "state": "None",
            "zipCode": "None"
        }
    }

    let prodAddress
    let prodCity
    let prodState
    let prodZipCode

    for (const i in Object.keys(agentMapping)) {
        if (policy.insured.values.agent === Object.keys(agentMapping)[i]) {
            prodAddress = agentMapping[Object.keys(agentMapping)[i]].address
            prodCity = agentMapping[Object.keys(agentMapping)[i]].city
            prodState = agentMapping[Object.keys(agentMapping)[i]].state
            prodZipCode = agentMapping[Object.keys(agentMapping)[i]].zipCode
        }
    }

    const SubFee = (premium) => {
        console.log(premium)
        return (premium * 0.12).toFixed(2)
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
            'Indiana': 0.025,
            'Connecticut': 0.04
        }
        const TaxFee = states[policy.policy.values.states]
        console.log((premium * TaxFee).toFixed(2), 'taxfee')
        return (premium * TaxFee).toFixed(2)
    }

    const TotalVehicles = () => {
        let totalVeh = 0
        for (const i in policy.vehicles.values) {
            
            totalVeh += 1

        }
        console.log(totalVeh, 'ponis')
        return totalVeh
    }

    const TotalPremium = () => {
        let premium = 0.00

    
        for (const i in policy.vehicles.values) {
     
            if (!isNaN(parseFloat(policy.coverage.values.overallPremium))) {
                premium+=parseFloat(policy.coverage.values.overallPremium)
            }
            if (!isNaN(parseFloat(policy.coverage.values.personalInjuryProtectionPremium))) {
                premium+=parseFloat(policy.coverage.values.personalInjuryProtectionPremium)
            }
            if (!isNaN(parseFloat(policy.coverage.values.pedPipProtectionPremium))) {
                premium+=parseFloat(policy.coverage.values.pedPipProtectionPremium)
            }
            if (!isNaN(parseFloat(policy.coverage.values.medicalPaymentsPremium))) {
                premium+=parseFloat(policy.coverage.values.medicalPaymentsPremium)
            }
            if (!isNaN(parseFloat(policy.coverage.values.underinsuredMotoristPremium))) {
                premium+=parseFloat(policy.coverage.values.underinsuredMotoristPremium)
            }
            if (!isNaN(parseFloat(policy.coverage.values.uninsuredMotoristPremium))) {
                premium+=parseFloat(policy.coverage.values.uninsuredMotoristPremium)
            }
                
            
            
        }

        if (!isNaN(parseFloat(policy.coverage.values.hiredCSLPremium))) {
            premium+=parseFloat(policy.coverage.values.hiredCSLPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.values.nonOwnedCSLPremium))) {
            premium+=parseFloat(policy.coverage.values.nonOwnedCSLPremium)
        }
        premium+=getWaiverPremium()
        premium+=getAddInsuredPremium()

        

        return parseFloat(premium).toFixed(2)
    }

    const TotalVehiclePremium = (i) => {
        let premium = 0.00

        

        if (!isNaN(parseFloat(policy.coverage.values.overallPremium))) {
            premium+=parseFloat(policy.coverage.values.overallPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.values.personalInjuryProtectionPremium))) {
            premium+=parseFloat(policy.coverage.values.personalInjuryProtectionPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.values.pedPipProtectionPremium))) {
            premium+=parseFloat(policy.coverage.values.pedPipProtectionPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.values.medicalPaymentsPremium))) {
            premium+=parseFloat(policy.coverage.values.medicalPaymentsPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.values.underinsuredMotoristPremium))) {
            premium+=parseFloat(policy.coverage.values.underinsuredMotoristPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.values.uninsuredMotoristPremium))) {
            premium+=parseFloat(policy.coverage.values.uninsuredMotoristPremium)
        }
        
            
        

        if (!isNaN(parseFloat(policy.coverage.values.hiredCSLPremium))) {
            premium+=parseFloat(policy.coverage.values.hiredCSLPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.values.nonOwnedCSLPremium))) {
            premium+=parseFloat(policy.coverage.values.nonOwnedCSLPremium)
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
            'Indiana': 0.025
        }
        return (states[policy.policy.values.states] * 100).toFixed(2)
    }

    const value = effectiveDate >= comparisonDate ? 500.00 : 350.00;

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
            + value
        ).toFixed(2)
    }

    const CalculateOnePremium = () => {

        let premium = 0.00


        if (!isNaN(parseFloat(policy.coverage.values.overallPremium))) {
            premium+=parseFloat(policy.coverage.values.overallPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.values.personalInjuryProtectionPremium))) {
            premium+=parseFloat(policy.coverage.values.personalInjuryProtectionPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.values.pedPipProtectionPremium))) {
            premium+=parseFloat(policy.coverage.values.pedPipProtectionPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.values.medicalPaymentsPremium))) {
            premium+=parseFloat(policy.coverage.values.medicalPaymentsPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.values.underinsuredMotoristPremium))) {
            premium+=parseFloat(policy.coverage.values.underinsuredMotoristPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.values.uninsuredMotoristPremium))) {
            premium+=parseFloat(policy.coverage.values.uninsuredMotoristPremium)
        }
                
    
            
        return parseFloat(premium).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
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
            <Page style={styles.body}>
                <View>
                    <Text style={styles.textSmallSpaced}>
                        {'\n'}
                     
                        Subject To:{'\n'}{'\n'}
                        •	25 % Minimum Earned Premium. {'\n'}
                        •	Reinstatement fee of $ 50 applies for refiling and reinstating a cancelled policy or government agency filing. (State or federal){'\n'}
                        •	The Policy will be issued with the Company’s standard commercial automobile Liability Policy forms and endorsements.{'\n'}
                        •	This is a scheduled auto policy. All unscheduled vehicles and drivers must be reported, meet company guidelines, and be approved in writing prior to use.{'\n'}
                        •	It’s required that you submit all driver information and vehicle registrations for all units.{'\n'}
                        •	Any Additional Vehicles must be submitted for reinsurance referral to prior to adding to the policy.{'\n'}
                        •	All coverage is written with a Risk Retention Group (RRG). This policy is not backed by the State Guarantee Fund.{'\n'}
                        •	Need at binding: All Completed & Signed forms; Acord Applications, Acord UM/UIM selection / rejection forms, Signed Surya RRG Subscription Agreement, Signed Surya RRG Disclosure form.{'\n'}{'\n'}

                        Quotation Valid for 30 days.  Only Coverages shown are Provided. Please note this quotation does not represent all policy conditions, exclusions, and coverage information.{'\n'}

                    </Text>
                </View>
            </Page>
            <Page style={styles.body}>
                    <View>
                        <View style={[styles.titleRow]}>
                            <Text style={[styles.titleCellBold]}>
                                Insured Name:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {policy.policy?.values.name}
                            </Text>
                            <Text style={[styles.titleCellBold]}>
                                Application No.:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {policy.policy?.values.policyNum}
                            </Text>
                        </View>
                        <View style={[styles.titleRow]}>
                            <Text style={[styles.titleCellBold]}>
                                Producer Code:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {policy.policy?.values.agent}
                            </Text>
                            <Text style={[styles.titleCellBold]}>
                                Issue Date:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </Text>
                        </View>
                        <View style={[styles.titleRow]}>
                            <Text style={[styles.titleCellBold]}>
                                Address
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {policy.insured?.values.address1 + ' ' + policy.insured?.values.city + ' ' + policy.insured?.values.state + ', ' + policy.insured?.values.zipCode}
                            </Text>
                            <Text style={[styles.titleCellBold]}>
                                Number of Vehicles
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {TotalVehicles()}
                            </Text>
                        </View>
                    </View>
                    

                    <View>
                        <Text style={styles.boldTextCenterHelvetica}>
                            {'\n'}
                            {'\n'}
                            Coverage Details
                            {'\n'}
                            {'\n'}
                            {'\n'}
                        </Text>
                    </View>
                    <View>
                        <View style={[styles.row]}>
                   
                            <Text style={[styles.cellBoldSmall]}>
                                Coverage Type
                            </Text>
                            <Text style={[styles.cellBoldSmall]}>Limits</Text>
                            <Text style={[styles.cellBoldSmall]}>Formula</Text>
                            <Text style={[styles.cellBoldSmall]}>
                                Formula Value / Vehicle
                            </Text>
                            <Text style={[styles.cellBoldSmall]}>
                                Calculated Amt
                            </Text>
                        </View>

                        {/* Overall */}

                        <View style={[styles.row]}>
              
                            <Text style={[styles.cell]}>
                                Overall {policy.coverage.values.overall}
                            </Text>
                            <Text style={[styles.cell]}>
                                {(policy.coverage.values.overall !== 'Split Limit')
                                    ? (policy.coverage.values.combinedSectionLimit)
                                    : (policy.coverage.values.splitSectionBodyPerPerson.split(',')[0]+'/'+
                                    policy.coverage.values.splitSectionBodyPerAccidentOptions.split(',')[0]+'/'+
                                    policy.coverage.values.splitSectionPropertyDamageOptions.split(',')[0]
                                    )}
                            </Text>
                            <Text style={[styles.cell]}>Base Rate</Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.values.overallPremium}
                            </Text>
                            <Text style={[styles.cell]}>
                                ${parseFloat(Math.abs(policy.coverage.values.overallPremium*TotalVehicles()).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </Text>
                        </View>

                        {/* pIProtection */}
                        {(policy.coverage.values.pIProtectionSingleEntry !== 'Excluded' || policy.coverage.values.pIProtectionSplitAutoEntry !== 'Excluded') ? (
                            <View style={[styles.row]}>
               
                                <Text style={[styles.cell]}>
                                    Personal Injury {policy.coverage.values.personalInjury}
                                </Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.values.personalInjury !==
                                    'Split Limit'
                                        ? policy.coverage.values.pIProtectionSingleLimit
                                        : policy.coverage.values.pIProtectionSplitBodyPerPerson.split(',')[0]+'/'+
                                          policy.coverage.values.pIProtectionSplitBodyPerAccident.split(',')[0]+'/'+
                                          policy.coverage.values.pIProtectionSplitPropertyDamage.split(',')[0]
                                          }
                                </Text>
                                <Text style={[styles.cell]}>Base Rate</Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.values.personalInjuryProtectionPremium}
                                </Text>
                                <Text style={[styles.cell]}>
                                    ${parseFloat(Math.abs(policy.coverage.values.personalInjuryProtectionPremium*TotalVehicles()).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}

                        {/* medical Payments */}

                        {(policy.coverage.values.medicalSingleEntry !== 'Excluded' || policy.coverage.values.medicalSplitAutoEntry !== 'Excluded') ? (
                            <View style={[styles.row]}>
                   
                                <Text style={[styles.cell]}>
                                    Medical Payments {policy.coverage.values.medicalPayments}
                                </Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.values.medicalPayments !== 'Split Limit'
                                        ? policy.coverage.values.medicalSingleLimit
                                        : policy.coverage.values.medicalSplitBodyPerPerson.split(',')[0]+'/'+
                                          policy.coverage.values.medicalSplitBodyPerAccident.split(',')[0]+'/'+
                                          policy.coverage.values.medicalSplitPropertyDamage.split(',')[0]}
                                </Text>
                                <Text style={[styles.cell]}>Base Rate</Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.values.medicalPaymentsPremium}
                                </Text>
                                <Text style={[styles.cell]}>
                                    ${parseFloat(Math.abs(policy.coverage.values.medicalPaymentsPremium*TotalVehicles()).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}


                        {(policy.coverage.values.pedPipSingleLimit === 'Yes' || policy.coverage.values.pedPipSingleLimit === 'Up to $250,000' || policy.coverage.values.pedPipSingleLimit === 'Up to $15,000') ? (
                            <View style={[styles.row]}>
                           
                                <Text style={[styles.cell]}>
                                    Ped PIP Combined Single Limit
                                </Text>
                                <Text style={[styles.cell]}>
                                    {(policy.coverage.values.pedPipSingleLimit === 'Yes' || policy.coverage.values.pedPipSingleLimit === 'Up to $250,000') ? (<>Up to $250,000</>) : (<>Up to $15,000</>)}
                                </Text>
                                <Text style={[styles.cell]}>Base Rate</Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.values.pedPipProtectionPremium}
                                </Text>
                                <Text style={[styles.cell]}>
                                    ${parseFloat(Math.abs(policy.coverage.values.pedPipProtectionPremium*TotalVehicles()).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}

                        {/* Underinsured Motorist */}

                        {(policy.coverage.values.underinsuredMotoristSingleAutoEntry !== 'Excluded' || policy.coverage.values.underMotoristAuto !== 'Excluded') ? (
                            <View style={[styles.row]}>
                          
                                <Text style={[styles.cell]}>
                                    Underinsured Motorist {policy.coverage
                                        .underinsuredMotorist}
                                </Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.values
                                        .underinsuredMotorist !== 'Split Limit'
                                        ? policy.coverage.values
                                              .underinsuredMotoristSingleLimit
                                        : policy.coverage.values.underMotoristBodyPerPerson.split(',')[0]+'/'+
                                          policy.coverage.values.underMotoristBodyPerAccident.split(',')[0]+'/'+
                                          policy.coverage.values.underMotoristProperty.split(',')[0]}
                                </Text>
                                <Text style={[styles.cell]}>Base Rate</Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.values.underinsuredMotoristPremium}
                                </Text>
                                <Text style={[styles.cell]}>
                                    ${parseFloat(Math.abs(policy.coverage.values.underinsuredMotoristPremium*TotalVehicles()).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}

                        {/* Uninsured Motorist */}

                        {(policy.coverage.values.uninsuredMotoristSingleAutoEntry !== 'Excluded' || policy.coverage.values.unMotoristAuto !== 'Excluded') ? (
                            <View style={[styles.row]}>
                       
                                <Text style={[styles.cell]}>
                                    Uninsured Motorist {policy.coverage.values.uninsuredMotorist}
                                </Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.values
                                        .uninsuredMotorist !== 'Split Limit'
                                        ? policy.coverage.values
                                              .uninsuredMotoristSingleLimit
                                        : policy.coverage.values.unMotoristBodyPerPerson.split(',')[0]+'/'+
                                          policy.coverage.values.unMotoristBodyPerAccident.split(',')[0]+'/'+
                                          policy.coverage.values.unMotoristProperty.split(',')[0]}
                                </Text>
                                <Text style={[styles.cell]}>Base Rate</Text>
                                <Text style={[styles.cell]}>
                                    {policy.coverage.values.uninsuredMotoristPremium}
                                </Text>
                                <Text style={[styles.cell]}>
                                    ${parseFloat(Math.abs(policy.coverage.values.uninsuredMotoristPremium*TotalVehicles()).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}

                        {(parseInt(policy.coverage.values.hiredCSLPremium) > 0 ) ? (
                            <View style={[styles.row]}>
                          
                                <Text style={[styles.cell]}>
                                    Hired/Non-Owned CSL
                                </Text>
                                <Text style={[styles.cell]}>
                                    {(policy.coverage.values.overall !== 'Split Limit') ? (policy.coverage.values.combinedSectionLimit) : (policy.coverage.values.splitSectionBodyPerAccidentOptions)}
                                </Text>
                                <Text style={[styles.cell]}>Base Rate</Text>
                                <Text style={[styles.cell]}>
                                    {parseFloat(Math.abs(policy.coverage.values.hiredCSLPremium*2).toFixed(2))}
                                </Text>
                                <Text style={[styles.cell]}>
                                    ${parseFloat(Math.abs(policy.coverage.values.hiredCSLPremium*2).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
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
                                    
                                </Text>
                                <Text style={[styles.cell]}>Base Rate</Text>
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

                        {(getWaiverPremium() > 0 ) ? (
                            <View style={[styles.row]}>
                          
                                <Text style={[styles.cell]}>
                                    Waiver of Subrogation Premium
                                </Text>
                                <Text style={[styles.cell]}>
                                    
                                </Text>
                                <Text style={[styles.cell]}>Base Rate</Text>
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
                        
                        <View style={[styles.row]}>
                            <Text style={[styles.cell]}></Text>
                            <Text style={[styles.cellBoldSmall]}>Total Premium</Text>
                            <Text style={[styles.cell]}></Text>
                            <Text style={[styles.cell]}>-</Text>
                            <Text style={[styles.cellBoldSmall]}>
                                ${parseFloat(TotalPremium()).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </Text>
                        </View>
                        <View style={[styles.row]}>
                            <Text style={[styles.cell]}></Text>
                            <Text style={[styles.cellBoldSmall]}>Subscription Fee</Text>
                            <Text style={[styles.cell]}></Text>
                            <Text style={[styles.cell]}>-</Text>
                            <Text style={[styles.cellBoldSmall]}>
                                ${parseFloat(SubFee(TotalPremium())).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </Text>
                        </View>
                        <View style={[styles.row]}>
                            <Text style={[styles.cell]}></Text>
                            <Text style={[styles.cellBoldSmall]}>Policy Issuance Fee</Text>
                            <Text style={[styles.cell]}></Text>
                            <Text style={[styles.cell]}>-</Text>
                            <Text style={[styles.cellBoldSmall]}>
                                ${value}
                            </Text>
                        </View>
                        <View style={[styles.row]}>
                            <Text style={[styles.cell]}></Text>
                            <Text style={[styles.cellBoldSmall]}>Tax {StateTaxNumber()}%</Text>
                            <Text style={[styles.cell]}></Text>
                            <Text style={[styles.cell]}>-</Text>
                            <Text style={[styles.cellBoldSmall]}>
                                ${parseFloat(StateTax(TotalPremium())).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </Text>
                        </View>
                        <View style={[styles.row]}>
                            <Text style={[styles.cell]}></Text>
                            <Text style={[styles.cellBoldSmall]}>Total</Text>
                            <Text style={[styles.cell]}></Text>
                            <Text style={[styles.cell]}>-</Text>
                            <Text style={[styles.cellBoldSmall]}>
                                ${parseFloat(Total(TotalPremium())).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </Text>
                        </View>
                    </View>



            </Page>
            <Page style={styles.body}>
                    <View>
                        <View style={[styles.titleRow]}>
                            <Text style={[styles.titleCellBold]}>
                                Insured Name:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {policy.policy?.values.name}
                            </Text>
                            <Text style={[styles.titleCellBold]}>
                                Application No.:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {policy.policy?.values.policyNum}
                            </Text>
                        </View>
                        <View style={[styles.titleRow]}>
                            <Text style={[styles.titleCellBold]}>
                                Producer Code:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {policy.policy?.values.agent}
                            </Text>
                            <Text style={[styles.titleCellBold]}>
                                Effective Date:
                            </Text>
                            <Text style={[styles.titleCell]}>
                                {policy.policy?.values.effectiveDate}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.boldTextCenterHelvetica}>
                            {'\n'}
                            {'\n'}
                            Drivers List
                            {'\n'}
                            {'\n'}
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

                            <View style={[styles.row]} wrap={false}>
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
                            </View>
                        ))}
                    </View>
            </Page>
            
            <Page style={styles.body}>
     
                <View>
                    <View style={[styles.titleRow]}>
                        <Text style={[styles.titleCellBold]}>
                            Insured Name:
                        </Text>
                        <Text style={[styles.titleCell]}>
                            {policy.policy?.values.name}
                        </Text>
                        <Text style={[styles.titleCellBold]}>
                            Application No.:
                        </Text>
                        <Text style={[styles.titleCell]}>
                            {policy.policy?.values.policyNum}
                        </Text>
                    </View>
                    <View style={[styles.titleRow]}>
                        <Text style={[styles.titleCellBold]}>
                            Producer Code:
                        </Text>
                        <Text style={[styles.titleCell]}>
                            {policy.policy?.values.agent}
                        </Text>
                        <Text style={[styles.titleCellBold]}>
                            Effective Date:
                        </Text>
                        <Text style={[styles.titleCell]}>
                            {policy.policy?.values.effectiveDate}
                        </Text>
                    </View>
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
                        
                        <Text style={[styles.cellRomanBold]}>Premium</Text>
                    </View>
                    {policy.vehicles.values.map((value) => (
                        <View style={[styles.row]} wrap={false}>
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
                                ${CalculateOnePremium()}
                            </Text>
                        </View>
                        
                    ))}
                </View>
            </Page>
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
                    <Text style={[styles.cellBold]}>Policy Issuance Fee (Non-refundable)</Text>
                    <Text style={[styles.cellBold]}>${value}</Text>
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
            <Page style={styles.body}>
                <Text style={styles.textSmallHelvetica}>
                    {'\n'}
                    {'\n'}Named Applicant Insured _________________________________________________
                    {'\n'}
                    {'\n'}
                    Insured or Authorized Representative: _________________________________________
                    {'\n'}
                    {'\n'}
                    Date: __________________________
                </Text>
            </Page>
        </Document>
    )
}

export default QuoteSheetBroker
