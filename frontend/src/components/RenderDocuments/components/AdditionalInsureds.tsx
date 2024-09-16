// @ts-nocheck
import { Document, Page, StyleSheet, Text, View, Image } from '@react-pdf/renderer'
import JDSignature from '../../../images/JDSignature.png'

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
function AdditionalInsureds({ policy, keyOne, oldValue, newValue, endDate, endNumber }) {
    const current = new Date()
    const date = `${
        current.getMonth() + 1
    }/${current.getDate()}/${current.getFullYear()}`

    console.log(newValue, 'foolio')
    const getValues = (newValue) => {
        console.log(newValue, newValue[0], 'foolio')
        if (newValue?.length === 1) {
            if (newValue[0] === undefined) {
                return newValue
            } else {
                return newValue[0]
            }
            

        }

        for (const i in newValue) {
            console.log(typeof newValue[i], newValue[i], 'flems')
            if (typeof newValue[i] === 'object') {
                if (newValue[i][0] === undefined) {
                    return newValue[i]
                } else {
                    return newValue[i][0]
                }
                
            }
        }


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

    // const addInsuredToAddressMapping =  {
    //     "VEYO LLC": {"address": "605 N Courthouse Road, Suite 103", "cityStateZip": "Richmond, VA 23236"},
    //     "SUSSEX COUNTY REGIONAL COOP": {"address": "2 Windsor Ave PO Box 1029", "cityStateZip": "Hopatcong, NJ 07843"},
    //     "AMERICAN LOGISTICS COMPANY, LLC": {"address": "1492 S SILICON WAY", "cityStateZip": "SAINTGEORGE, UT 84770"},
    //     "MODIVCARE SOLUTIONS LLC": {"address": "602 VIRGINIA STREET EAST 6TH FL", "cityStateZip": "CHARLESTON, WV 25301"},
    //     "MODIVCARE SOLUTIONS, LLC": {"address": "7441 LINCOLN WAYSUITE #200", "cityStateZip": "GARDEN GROVE, CALIFORNIA 92841"},
    //     "ALLY FINANICAL": {"address": },
    //     "MODIVCARE SOLUTIONS AND DMAHS",
    //     "SUSSEX COUNTY REGIONAL TRANSPORTATION COOPERATIVE",
    //     "FACILITATING ACCESS TO COORDINATION TRANSPORTATION",
    //     "AMERICAN LOGISTICS CO LLC",
    //     "PRIORITY TRANSPORTATION SERVICES",
    //     "ORTEGA LUIS",
    //     "CITY OF FRESNO - BUSINESS TAX/PERMITS",
    //     "NEW JERSEY DEPARTMENT OF HEALTH",
    //     "None"
    // }

    return (
    <>
    {newValue.map((newVal, index) => {
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
                        {getValues(newVal).insName}
                        {'\n'}
                        {'\n'}
                        {getValues(newVal).address}
                        {'\n'}
                        {'\n'}
                        {getValues(newVal).city} {getValues(newVal).state} {getValues(newVal).zipCode}
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
    </Document>
    })}
    </>
    
    )
}

export default AdditionalInsureds
