import React from 'react'
import { View, Page, Text, Document, StyleSheet } from '@react-pdf/renderer'

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
        flexBasis: 37,
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

    cellRomanBold: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderCollapse: 'collapsed',
        borderWidth: 1.25,
        padding: '10px',
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
                        Policy Number: {policy.policy.policyNumber}
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
                        5151 Hampstead High Street Suite 200{'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        Montgomery, AL 36104{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.boldTextSmall}>
                        ITEM ONE:{'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View style={styles.borderSmall}>
                    <Text style={styles.textSmall}>
                        {'\n'}NAMED INSURED: {policy.insured.contactName}
                        {'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View style={styles.borderSmall}>
                    <Text style={styles.textSmall}>
                        {'\n'}MAILING ADDRESS: {policy.insured.address1}{' '}
                        {policy.insured.city}, {policy.insured.state}{' '}
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
                        Business Description: {policy.policy.policyCategory}
                        {'\n'}
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
                        Policy Number: {policy.policy.policyNumber}
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
                                {policy.coverage.combinedSectionLimit}
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.combinedSectionPremium}
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
                                {policy.coverage.splitSectionBodyPerPerson}/
                                {policy.coverage.splitSectionBodyPerAccident}/
                                {
                                    policy.coverage
                                        .splitSectionPropertyDamageOptions
                                }
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.splitSectionPremium}
                            </Text>
                        </View>
                    )}

                    {policy.coverage.personalInjury ===
                    'Combined Single Limit' ? (
                        <View style={[styles.rowLarge]} wrap={false}>
                            <Text style={[styles.cell]}>
                                PEDESTRIAN INJURY {'\n'}PROTECTION (OR {'\n'}
                                EQUIVALENT NO FAULT COVERED)
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.pIProtectionSingleEntry}
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.pIProtectionSingleLimit}
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.pIProtectionSinglePremium}
                            </Text>
                        </View>
                    ) : (
                        <View style={[styles.rowLarge]} wrap={false}>
                            <Text style={[styles.cell]}>
                                PEDESTRIAN INJURY {'\n'}PROTECTION (OR {'\n'}
                                EQUIVALENT NO FAULT COVERED)
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.pIProtectionSplitAutoEntry}
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.pIProtectionSplitBodyPerPerson}
                                /
                                {
                                    policy.coverage
                                        .pIProtectionSplitBodyPerAccident
                                }
                                /
                                {
                                    policy.coverage
                                        .pIProtectionSplitPropertyDamage
                                }
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.pIProtectionPremium}
                            </Text>
                        </View>
                    )}

                    <View style={[styles.rowLarge]} wrap={false}>
                        <Text style={[styles.cell]}>
                            PERSONAL INJURY {'\n'}PROTECTION (OR {'\n'}
                            EQUIVALENT NO FAULT COVERED)
                        </Text>
                        <Text style={[styles.cell]}>Not Covered</Text>
                        <Text style={[styles.cell]}>Column 3 Row 1</Text>
                        <Text style={[styles.cell]}>Column 4 Row 1</Text>
                    </View>

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
                                {policy.coverage.uninsuredMotoristSingleLimit}
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.uninsuredMotoristSinglePremium}
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
                                {policy.coverage.unMotoristBodyPerPerson}/
                                {policy.coverage.unMotoristBodyPerAccident}/
                                {policy.coverage.unMotoristProperty}
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.unMotoristPremium}
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
                                    policy.coverage
                                        .underinsuredMotoristSingleLimit
                                }
                            </Text>
                            <Text style={[styles.cell]}>
                                {
                                    policy.coverage
                                        .underinsuredMotoristSinglePremium
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
                                {policy.coverage.underMotoristBodyPerPerson}/
                                {policy.coverage.underMotoristBodyPerAccident}/
                                {policy.coverage.underMotoristProperty}
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.underMotoristPremium}
                            </Text>
                        </View>
                    )}
                    {policy.coverage.medicalPayments ===
                    'Combined Single Limit' ? (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>MEDICAL PAYMENT</Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.medicalSingleEntry}
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.medicalSingleLimit}
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.medicalSinglePremium}
                            </Text>
                        </View>
                    ) : (
                        <View style={[styles.row]} wrap={false}>
                            <Text style={[styles.cell]}>MEDICAL PAYMENT</Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.medicalSplitAutoEntry}
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.medicalSplitBodyPerPerson}/
                                {policy.coverage.medicalSplitBodyPerAccident}/
                                {policy.coverage.medicalSplitPropertyDamage}
                            </Text>
                            <Text style={[styles.cell]}>
                                {policy.coverage.medicalSplitPremium}
                            </Text>
                        </View>
                    )}

                    <View style={[styles.row]} wrap={false}>
                        <Text style={[styles.cell]}>HIRED</Text>
                        <Text style={[styles.cell]}>Not Covered</Text>
                        <Text style={[styles.cell]}>Column 3 Row 1</Text>
                        <Text style={[styles.cell]}>Column 4 Row 1</Text>
                    </View>
                    <View style={[styles.row]} wrap={false}>
                        <Text style={[styles.cell]}>NON-OWNED</Text>
                        <Text style={[styles.cell]}>Not Covered</Text>
                        <Text style={[styles.cell]}>Column 3 Row 1</Text>
                        <Text style={[styles.cell]}>Column 4 Row 1</Text>
                    </View>
                    <View style={[styles.row]} wrap={false}>
                        <Text style={[styles.cell]}>DEDUCTIBLE</Text>
                        <Text style={[styles.cell]}>Not Covered</Text>
                        <Text style={[styles.cell]}>Column 3 Row 1</Text>
                        <Text style={[styles.cell]}>Column 4 Row 1</Text>
                    </View>
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
                        Policy Number: {policy.policy.policyNumber}
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
                        <Text style={[styles.cell]}></Text>
                    </View>
                    <View style={[styles.row]} wrap={false}>
                        <Text style={[styles.cellBold]}>2.</Text>
                        <Text style={[styles.cell]}>Premium Tax</Text>
                        <Text style={[styles.cell]}></Text>
                    </View>
                    <View style={[styles.row]} wrap={false}>
                        <Text style={[styles.cellBold]}>3.</Text>
                        <Text style={[styles.cell]}>
                            Shareholder Subscription Fee
                        </Text>
                        <Text style={[styles.cell]}></Text>
                    </View>
                    <View style={[styles.row]} wrap={false}>
                        <Text style={[styles.cellBold]}>4.</Text>
                        <Text style={[styles.cell]}>Total</Text>
                        <Text style={[styles.cell]}></Text>
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
                        Policy Number: {policy.policy.policyNumber}
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
                            BODY TYPE w/ No. of {'\n'}PASSENGER SEATS
                        </Text>
                        <Text style={[styles.cellRomanBold]}>VIN</Text>
                        <Text style={[styles.cellRomanBold]}>
                            Principle Garage Address
                        </Text>
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
                            <Text style={[styles.cellRoman]}>{value.vin}</Text>
                            <Text style={[styles.cellRoman]}>
                                {value.garageAddress1}
                            </Text>
                            <Text style={[styles.cellRoman]}>
                                {value.premium}
                            </Text>
                        </View>
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
                        Policy Number: {policy.policy.policyNumber}
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
                        <Text style={[styles.cellRomanBold]}>Date No.</Text>
                        <Text style={[styles.cellRomanBold]}>
                            Driver {'\n'}Name
                        </Text>
                        <Text style={[styles.cellRomanBold]}>
                            Date of {'\n'}Hire
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
                            <Text style={[styles.cellRoman]}>
                                {value.dateNo}
                            </Text>
                            <Text style={[styles.cellRoman]}>
                                {value.driverName}
                            </Text>
                            <Text style={[styles.cellRoman]}>
                                {value.dateOfHire}
                            </Text>
                            <Text style={[styles.cellRoman]}>
                                {value.dateOfBirth}
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
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 1,
                        marginBottom: 5,
                    }}
                >
                    <Text style={styles.policyNumber}>
                        Policy Number: {policy.policy.policyNumber}
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
                        Policy Number: {policy.policy.policyNumber}
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
                            Additional Insured:
                            {policy.insured.additionalInsured}
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
                        <Text style={styles.policyNumber}>Date:</Text>
                        <Text style={styles.AutoCenter}>
                            (Authorized Representative)
                        </Text>
                    </View>
                </View>
            </Page>

            {/*       <Page style={styles.body}>
        <View>
          <Text style={styles.boldTextSmall}>Policy Period From:      <Text style={styles.textSmall}>11/27/2021 to 11/27/2022{'\n'}</Text></Text>
          <Text style={styles.boldTextSmall}>You are a:      <Text style={styles.textSmall}>LLC{'\n'}</Text></Text>
          <Text style={styles.boldTextSmall}>Your Business/Operation is:      <Text style={styles.textSmall}>NEMT{'\n'}</Text></Text>
          <Text style={styles.boldTextSmall}>Risk Purchasing Group:      <Text style={styles.textSmall}>Surya Insurance Company RRG{'\n'}</Text></Text>
        </View>
        <View style={styles.borderSmall}>
          <Text style={styles.textSmall}>IN RETURN FOR THE PAYMENT OF PREMIUM, AND SUBJECT TO ALL THE TERMS OF THIS POLICY, 
          WE AGREE WITH YOU TO PROVIDE THE INSURANCE AS STATED IN THIS POLICY, THERE ARE EXCLUSIONS, CONDITIONS AND LIMITATIONS 
          CONTAINED IN THE POLICY FORMS AND ENDORSEMENTS{'\n'}
            <Text style={styles.boldTextSmall}>PLEASE NOTE THAT YOUR POLICY WILL BE SUBJECT TO AN ENDORSEMENT THAT PROVIDES THAT COVERAGE 
            WILL NOT EXCEED THE MINIMUM FINANCIAL RESPONSIBILITY LIMITS REQUIRED BY LAW FOR SUCH COVERED AUTO, IN THE EVENT THE DRIVER OF 
            THE COVERED AUTO HAS NOT BEEN PREVIOUSLY SUBMITTED TO, APPROVED BY AND LISTED ON THE DRIVER SCHEDULE BY THE CARRIER AS A QUALIFIED 
            OPERATOR AT THE TIME OF THE ACCIDENT.{'\n'}{'\n'}</Text>
          </Text>
          <Text style={styles.minMiniBoldTitle}>
            {'\n'}2. SCHEDULE OF COVERAGES AND COVERED AUTOS
          </Text>
        </View>
        <View style={styles.borderSmall}>
          <Text style={styles.textSmall}>This policy provides only those coverages where a charge is shown in the premium column below. 
          Each of these coverages will apply only to those “Autos” shown as Covered “Autos”. “Autos” are shown as covered “Autos” for a 
          particular coverage by entry of one or more of the symbols from the Covered Auto Section of the Commercial Auto Coverage Form next 
          to the name of the coverage.</Text>
        </View>
        <View style={styles.table}>
          <View style={[styles.row, styles.header]}>
              <Text style={[styles.headerText, styles.headerCell]}>Coverages</Text>
              <Text style={[styles.headerText, styles.headerCell]}>Covered Auto Symbols</Text>
              <Text style={[styles.headerText, styles.headerCell]}>Limit</Text>
              <Text style={[styles.headerText, styles.headerCell]}>Premium</Text>
          </View>
        </View>
        <View style={styles.tableCollapsed}>
          <View style={[styles.row]} wrap={false}>
            <Text style={[styles.cell]}>Liability</Text>
            <Text style={[styles.cell]}>Not Covered</Text>
            <Text style={[styles.cell]}>Column 3 Row 1</Text>
            <Text style={[styles.cell]}>Column 4 Row 1</Text>
          </View>
          <View style={[styles.row]} wrap={false}>
            <Text style={[styles.cell]}>Medical Payments</Text>
            <Text style={[styles.cell]}>Not Covered</Text>
            <Text style={[styles.cell]}></Text>
            <Text style={[styles.cell]}>Column 4 Row 1</Text>
          </View>
          <View style={[styles.row]} wrap={false}>
            <Text style={[styles.cell]}>Personal Injury Protection (PIP)</Text>
            <Text style={[styles.cell]}>Not Covered</Text>
            <Text style={[styles.cell]}>Column 3 Row 1</Text>
            <Text style={[styles.cell]}>Column 4 Row 1</Text>
          </View>
          <View style={[styles.row]} wrap={false}>
            <Text style={[styles.cell]}>Optional No-Fault Benefits</Text>
            <Text style={[styles.cell]}>Not Covered</Text>
            <Text style={[styles.cell]}>Column 3 Row 1</Text>
            <Text style={[styles.cell]}>Column 4 Row 1</Text>
          </View>
          <View style={[styles.row]} wrap={false}>
            <Text style={[styles.cell]}>Uninsured and Underinsured Motorist</Text>
            <Text style={[styles.cell]}>Not Covered</Text>
            <Text style={[styles.cell]}>Column 3 Row 1</Text>
            <Text style={[styles.cell]}>Column 4 Row 1</Text>
          </View>
          <View style={[styles.row]} wrap={false}>
            <Text style={[styles.cell]}>Comprehensive</Text>
            <Text style={[styles.cell]}>Not Covered</Text>
            <Text style={[styles.cell]}>Column 3 Row 1</Text>
            <Text style={[styles.cell]}>Column 4 Row 1</Text>
          </View>
          <View style={[styles.row]} wrap={false}>
            <Text style={[styles.cell]}>Collision</Text>
            <Text style={[styles.cell]}>Not Covered</Text>
            <Text style={[styles.cell]}>Column 3 Row 1</Text>
            <Text style={[styles.cell]}>Column 4 Row 1</Text>
          </View>
          <View style={[styles.row]} wrap={false}>
            <Text style={[styles.cell]}>Towing and Labor</Text>
            <Text style={[styles.cell]}>Not Covered</Text>
            <Text style={[styles.cell]}>Column 3 Row 1</Text>
            <Text style={[styles.cell]}>Column 4 Row 1</Text>
          </View>
        </View>
        <View style={{display: "flex", flexDirection: "row", marginTop: 8, marginBottom: 15}}>
          <Text style={{flex: 1}}>
            <Text style={styles.text}>Premium for Endorsements (not included in A through H above)</Text>
          </Text>
          <Text style={{flex: 1, textAlign: "right"}}>
            <Text style={styles.text}>$1000</Text>
          </Text>
        </View>
        <View style={styles.border}>
          <View style={{display: "flex", flexDirection: "row", marginTop: 1, marginBottom: 2}}>
            <Text style={{flex: 1}}>
              <Text style={styles.text}>Total Annual Premium</Text>
            </Text>
            <Text style={{flex: 1, textAlign: "right"}}>
              <Text style={styles.text}>$97,430.00</Text>
            </Text>
          </View>
          <View style={{display: "flex", flexDirection: "row", marginTop: 1, marginBottom: 2}}>
            <Text style={{flex: 1}}>
              <Text style={styles.text}>Surplus Lines Tax</Text>
            </Text>
            <Text style={{flex: 1, textAlign: "right"}}>
              <Text style={styles.text}>$2,922.90</Text>
            </Text>
          </View>
          <View style={{display: "flex", flexDirection: "row", marginTop: 1, marginBottom: 2}}>
            <Text style={{flex: 1}}>
              <Text style={styles.text}>Stamping Fee</Text>
            </Text>
            <Text style={{flex: 1, textAlign: "right"}}>
              <Text style={styles.text}>$243.58</Text>
            </Text>
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
      <Page orientation="landscape">

      </Page> */}
        </Document>
    )
}

export default PDFFile
