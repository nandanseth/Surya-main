// @ts-nocheck
import { Document, Page, StyleSheet, Text, View, Image } from '@react-pdf/renderer'
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
function AdditionalInsured({ policy, keyOne, oldValue, newValue, endDate, endNumber }) {
    const current = new Date()
    const date = `${
        current.getMonth() + 1
    }/${current.getDate()}/${current.getFullYear()}`

    
    console.log(newValue, 'cleal')

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

    const getValues = (value) => {

        if (value?.length === 1) {
            if (value[0] === undefined) {
                return value
            } else {
                return value[0]
            }
            

        }

        for (const i in value) {

            if (typeof value[i] === 'object') {
                if (value[i][0] === undefined) {
                    return value[i]
                } else {
                    return value[i][0]
                }
                
            }
        }

        console.log(value, 'dems')

        return value


    }
    
    const getUniqueValues = (oldVal, newVal) => {
        // Convert oldVal and newVal to arrays if they are not already arrays
        const oldArr = Array.isArray(oldVal) ? oldVal : [oldVal];
        const newArr = Array.isArray(newVal) ? newVal : [newVal];

        // Filter newArr for objects that are not in oldArr
        const uniqueObjs = newArr.filter(obj => {
            const strObj = JSON.stringify(obj);
            return !oldArr.some(oldObj => JSON.stringify(oldObj) === strObj);
        });

        console.log(uniqueObjs, 'flems')

        return uniqueObjs[0];
    }

    const effectiveDate = new Date(policy.policy.effectiveDate);
    const comparisonDate = new Date('09/01/2024');

    const value = effectiveDate >= comparisonDate ? 500.00 : 250.00;

    const totalPremium = () => {
        let waiverPremium = 0
        let additionalPremium = 0
        let totalPremium = 0
        console.log(getValues(newValue).isAddPremium, 'deammy')

        if (getValues(newValue).isWaiver === true) {
            waiverPremium += 500
            totalPremium += 500
        }
        if (getValues(newValue).isAddPremium === true) {

            

            additionalPremium += value
            totalPremium += value
        }
        console.log(additionalPremium, 'deammy')
        return {
            waiver: waiverPremium, 
            addPrem: additionalPremium, 
            total: totalPremium}
    }

    const totalTax = () => {
        const tax = stateToTaxFee[policy.policy.states]
        const premiumAdded = totalPremium().total
        const taxAdded = premiumAdded*tax
        return taxAdded.toFixed(2)
    }

    const totalSubFee = () => {
        const premiumAdded = totalPremium().total
        const subAdded = premiumAdded*0.12
        return subAdded.toFixed(2)
    }

    const Total = () => {
        return (parseFloat(totalPremium().total) + parseFloat(totalTax()) + parseFloat(totalSubFee())).toFixed(2)
    }

    return (
    <Document>
    {(newValue.length > 1) ? 
    (
        newValue.map((newValue, index) => {
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
                            Endorsement Effective: {endDate}
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
                            {getValues(newValue).insName}
                            {'\n'}
                            {'\n'}
                            {getValues(newValue).address}
                            {'\n'}
                            {'\n'}
                            {getValues(newValue).city} {getValues(newValue).state} {getValues(newValue).zipCode}
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
                        {'\n'}
                        {'\n'}
                        </Text>
                    </View>
                    
                </View>


            </Page>

            {((getValues(newValue).isWaiver) === true) && (

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
                            Policy Number: {policy.policy.policyNum} {totalPremium()[2]}
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
                        {getValues(newValue).insName}
                        {'\n'}
                        {'\n'}
                        {getValues(newValue).address}
                        {'\n'}
                        {'\n'}
                        {getValues(newValue).city} {getValues(newValue).state} {getValues(newValue).zipCode}
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

            )}
        </>
        )}
        )
    ) : 
    (
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
                        Endorsement Effective: {endDate}
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
                        {getValues(newValue).insName}
                        {'\n'}
                        {'\n'}
                        {getValues(newValue).address}
                        {'\n'}
                        {'\n'}
                        {getValues(newValue).city} {getValues(newValue).state} {getValues(newValue).zipCode}
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
                    {'\n'}
                    {'\n'}
                    </Text>
                </View>
                
            </View>


        </Page>
        {((getValues(newValue).isWaiver) === true) && (

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
                    {getValues(newValue).insName}
                    {'\n'}
                    {'\n'}
                    {getValues(newValue).address}
                    {'\n'}
                    {'\n'}
                    {getValues(newValue).city} {getValues(newValue).state} {getValues(newValue).zipCode}
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

        )}
        </>
    )
    }
    {(totalPremium().total > 0) && (
    <Page style={styles.body}>
        <View>
            <Text style={styles.textHelveticaBoldUnderline}>
                SURYA INSURANCE COMPANY
                {'\n'}
                {'\n'}
                {'\n'}
            </Text>
            <Text style={styles.boldTextSmall}>
                ENDORSEMENT #: <Text style={styles.textSmall}>{endNumber}</Text>
                {'\n'} {'\n'}
                ENDORSEMENT EFFECTIVE: <Text style={styles.textSmall}>{endDate}</Text>
                {'\n'} {'\n'} {'\n'}
            </Text>
            <Text style={styles.textSmall}>
                NAMED INSURED: {policy.policy.policyName}
                {'\n'} {'\n'}
                POLICY NUMBER: {policy.policy.policyNum}
                {'\n'} {'\n'}
                POLICY PERIOD: {policy.policy.effectiveDate} - {policy.policy.expirationDate}
                {'\n'} {'\n'} {'\n'}
            </Text>
            
            <Text style={styles.boldTextCenterSmall}>
            THIS ENDORSEMENT CHANGED THE POLICY. PLEASE READ IT {'\n'}CAREFULLY
            COVERAGE PARTS AFFECTED: <Text style={styles.boldTextUnderlineSmall}>BUSINESS AUTO COVERAGE FORM</Text>
                {'\n'}
                {'\n'}
                {'\n'}
                THIS IS ALSO THE INVOICE FOR THE ENDORSEMENT AND PAYMENT IS DUE IN 10 DAYS. IF PAYMENT IS NOT RECEIVED IN 10 DAYS THEN NOC WILL ISSUE AND POLICY WILL BE CANCELED AFTER 10 DAYS.
            </Text>
            <Text style={styles.textTimesBoldUnderline}>
            Changes
                {'\n'}
                {'\n'}
            </Text>
            <View style={[styles.row]} wrap={false}>
                <Text style={[styles.cellRomanSmall]}>
                    <>Additional Insured Premium</>
                </Text>
                <Text style={[styles.cellRomanSmall]}>
                    BASE RATE
                </Text>
                <Text style={[styles.cellRomanSmall]}>
                    ${value}
                </Text>
                <Text style={[styles.cellRomanSmall]}>
                    TOTAL RATE
                </Text>
                <Text style={[styles.cellRomanSmall]}>
                    {totalPremium().addPrem}
                </Text>
                {'\n'} {'\n'}{'\n'}
            </View>
            <View style={[styles.row]} wrap={false}>
                <Text style={[styles.cellRomanSmall]}>
                    <>WAIVER OF SUB Premium</>
                </Text>
                <Text style={[styles.cellRomanSmall]}>
                    BASE RATE
                </Text>
                <Text style={[styles.cellRomanSmall]}>
                    ${value}
                </Text>
                <Text style={[styles.cellRomanSmall]}>
                    TOTAL RATE
                </Text>
                <Text style={[styles.cellRomanSmall]}>
                    {totalPremium().waiver}
                </Text>
                {'\n'} {'\n'}{'\n'}
            </View>
            <Text style={styles.boldTextSmall}>
            {'\n'} {'\n'}{'\n'}{'\n'}PREMIUM CHANGE: <Text style={styles.textSmallCenter}> ${totalPremium().total}{'\n'} {'\n'}{'\n'}</Text>
                
            </Text>
            
            <Text style={styles.boldTextSmall}>
            TAX CHANGE: <Text style={styles.textSmallCenter}> ${totalTax()}{'\n'} {'\n'}{'\n'}</Text>
            </Text>
            <Text style={styles.boldTextSmall}>
            SUBSCRIPTION FEE CHANGE: <Text style={styles.textSmallCenter}>${totalSubFee()}{'\n'} {'\n'}{'\n'}</Text>
            </Text>
            <Text style={styles.boldTextSmall}>
            TOTAL: <Text style={styles.textSmallCenter}>${Total()}{'\n'} {'\n'}{'\n'}</Text>
            </Text>
        </View>

    </Page>
    )}
    
    </Document>
)}

export default AdditionalInsured
