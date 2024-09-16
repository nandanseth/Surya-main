import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

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

    textSmallLeft: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
        left: 20,
    },

    textSmallRight: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
        left: 200,
    },

    textSmallRightRight: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
        left: 260,
    },

    textSmallUnderlineCenter: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
        textAlign: 'center',
        textDecoration: 'underline',
    },

    textSmallUnderline: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
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
        left: 10,
        right: 10,
    },

    /* Control the right side */

    body: {
        paddingTop: 60,
        paddingBottom: 60,
        paddingHorizontal: 75,
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
        display: 'flex',
        flexDirection: 'row',
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
        color: 'black',
    },

    footer: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 75,
        right: 0,
        textAlign: 'left',
        color: 'black',
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
    cellNoBorder: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        alignSelf: 'stretch',
        fontFamily: 'Times-Roman',
        fontSize: 12,
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
function ShareholderApp({ policy }) {


    const CalculatePremium = () => {
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

            console.log(premium, 'ming')
                
            
            
        }

        if (!isNaN(parseFloat(policy.coverage.values.hiredCSLPremium))) {
            premium+=parseFloat(policy.coverage.values.hiredCSLPremium)
        }
        if (!isNaN(parseFloat(policy.coverage.values.nonOwnedCSLPremium))) {
            premium+=parseFloat(policy.coverage.values.nonOwnedCSLPremium)
        }

        return parseFloat(premium).toFixed(2)
    }



    const SharesToReceive = () => {
        const premiumTotal = CalculatePremium()
        const subFee = premiumTotal*0.12
        return Math.floor(subFee/2)
    }


    const current = new Date()
    const date = `${
        current.getMonth() + 1
    }/${current.getDate()}/${current.getFullYear()}`

    return (
        <Document>
            <Page style={styles.body}>
                <View>
                    <Text style={styles.boldTextCenterSmall}>
                        SURYA INSURANCE COMPANY, INC., A RISK RETENTION GROUP
                        {'\n'}
                        {'\n'}
                        {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmallUnderlineCenter}>
                        SUBSCRIPTION AND SHAREHOLDERS AGREEMENT{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>INSURED:</Text>
                    <Text style={styles.textSmallUnderline}>
                        {policy.policy.values.name}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>POLICY #:</Text>
                    <Text style={styles.textSmallUnderline}>
                       
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        THIS SUBSCRIPTION AND SHAREHOLDERS AGREEMENT is made and
                        entered into the effective date of the Policy identified
                        above by and between SURYA INSURANCE COMPANY, INC., A
                        RISK RETENTION GROUP, an ALABAMA corporation (the
                        "Company"), and the Shareholder shown on the signature
                        page of this Agreement (the "Shareholder").{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.boldTextCenterSmall}>
                        BACKGROUND{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        A.{' '}
                        <Text style={styles.textSmall}>
                            The Company is a stock corporation and was formed in
                            2018 as a risk retention group under the federal
                            Liability Risk Retention Act of 1986, as amended,
                            and the laws of the State of ALABAMA pertaining to
                            captive insurance companies for the purpose of
                            providing liability insurance to the shareholders
                            and affiliated public livery businesses thereof. The
                            Company is regulated by the ALABAMA Department of
                            Commerce and Insurance (the "Department").{'\n'}
                            {'\n'}
                            {'\r'}
                        </Text>
                    </Text>
                    <Text style={styles.textSmall}>
                        B.{' '}
                        <Text style={styles.textSmall}>
                            The Shareholder is a public livery and/or commercial
                            transportation provider or related entity that as of
                            the effective date of this Agreement meets the
                            eligibility requirements to be a shareholder of the
                            Company.{'\n'}
                            {'\n'}
                            {'\r'}
                        </Text>
                    </Text>
                    <Text style={styles.textSmall}>
                        C.{' '}
                        <Text style={styles.textSmall}>
                            In order to be an insured of the Company, the
                            Shareholder is required to purchase common stock of
                            the Company, par value Two Dollars ($2.00), in such
                            quantity and for such price as are set forth below.
                            The total price being paid by the Shareholder to
                            purchase common stock in the Company shall be called
                            the "Capital Contribution".{'\n'}
                            {'\n'}
                            {'\r'}
                        </Text>
                    </Text>
                    <Text style={styles.textSmall}>
                        D.{' '}
                        <Text style={styles.textSmall}>
                            This Shareholders Agreement is required to be signed
                            by each of the shareholders of the Company.{'\n'}
                            {'\n'}
                        </Text>
                    </Text>
                    <Text style={styles.textSmall}>
                        NOW, THEREFORE, in consideration of the mutual covenants
                        contained herein, the sufficiency of which is hereby
                        acknowledged, the Company and the Shareholder hereby
                        agree as follows:{'\n'}
                        {'\n'}
                    </Text>

                    <Text style={styles.textSmall}>
                        1.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Eligibility.
                        </Text>
                        <Text style={styles.textSmall}>
                            {' '}
                            The Company has established eligibility requirements
                            that each person or entity insured by the Company is
                            required to meet in order to become a shareholder.
                            which shall include without limitation that each
                            shareholder shall at all times be an insured of the
                            Company, and the Company retains the exclusive right
                            to modify such requirements as it deems appropriate.
                            The Shareholder and the Company agree and
                            acknowledge that they have reviewed the eligibility
                            requirements applicable on the effective date of
                            this Agreement, and that the Shareholder meets such
                            requirements.{'\n'}
                            {'\n'}
                        </Text>
                    </Text>
                </View>
                <Text style={styles.footer}>SUR 001 11 18</Text>
                <Text
                    fixed
                    render={({ pageNumber }) => `${pageNumber}`}
                    style={styles.pageNumber}
                />
            </Page>
            <Page style={styles.body}>
                <View>
                    <Text style={styles.textSmall}>
                        2.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Shares and Capital Contribution.
                        </Text>
                        <Text style={styles.textSmall}>
                            {' '}
                            The Capital Contribution and amount of shares are
                            taken from and calculated on the initial insurance
                            premium. The formula used by the Company to
                            determine the total amount of shares issued is as
                            follows: initial premium amount x .12 ÷ 2. The
                            Capital Contribution is taken from the initial
                            premium.{'\n'}
                            {'\n'}
                        </Text>
                    </Text>
                    <Text style={styles.textSmall}>
                        3.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Transfer and Holding of Shares
                        </Text>
                        {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (a) This Agreement at all times shall apply to any and
                        all shares of stock in the Company, whether now held,
                        purchased hereunder, or acquired hereafter by the
                        Shareholder (collectively, the "Shares");{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (b) The Shareholder shall not assign, sell, exchange,
                        give, bequeath, encumber, pledge, alienate, hypothecate,
                        or otherwise in any manner whatsoever, either
                        voluntarily or involuntarily, transfer any of the
                        Shareholder's Shares (any such disposition being
                        hereinafter referred to as a "Transfer"), except (i) in
                        accordance with this Agreement, or (ii) by operation of
                        law in the event of a merger or business combination in
                        which the Shareholder is a party,{' '}
                        <Text style={styles.boldTextSmall}>
                            provided, however,{' '}
                        </Text>
                        that following the merger or business combination the
                        shares are held by an individual or entity whose
                        ownership of the shares satisfies the requirements of
                        the Liability Risk Retention Act of 1986, as amended, as
                        well as the eligibility requirements of the Company. The
                        Company shall not honor or give effect on the books of
                        the Company to any Transfer of, or any attempt to
                        Transfer any Shares until it is satisfied that the
                        requirements of this Agreement have been met;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (c) If the Company so determines, it may cause to be
                        placed on the certificates for Shares the following
                        notation, and the Shareholder shall cooperate with the
                        Company in the placement of such notation on his
                        certificate(s):{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        The holder's power to transfer this stock is limited by
                        an Agreement between the Company and the Shareholder, a
                        copy of which (together with any amendments to the
                        Agreement) is on file at the principal office of the
                        Company.{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        4.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Certain Obligations of The Shareholder.{'\n'}
                            {'\n'}
                        </Text>
                    </Text>
                    <Text style={styles.textSmall}>
                        In addition to the other obligations set forth in this
                        Agreement, the Shareholder agrees to perform and comply
                        with all of the following:{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (a) Pay promptly when due the amounts agreed to be paid
                        for the purchase of the Shares;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (b) Maintain insurance coverage with the Company and pay
                        all premiums in respect of such insurance coverage in
                        full and when due, in accordance with the terms and
                        conditions quoted to the Shareholder for such insurance
                        coverage;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (c) Comply with the terms of this Agreement and the
                        Company's Charter and Bylaws, copies of which have been
                        made available to the Shareholder, provisions of any
                        contract of insurance between the Shareholder and the
                        Company, applicable underwriting standards, and any
                        applicable risk management/loss prevention program
                        developed by the Company.{'\n'}
                        {'\n'}
                    </Text>
                </View>
                <Text style={styles.footer}>SUR 001 11 18</Text>
                <Text
                    fixed
                    render={({ pageNumber }) => `${pageNumber}`}
                    style={styles.pageNumber}
                />
            </Page>
            <Page style={styles.body}>
                <View>
                    <Text style={styles.textSmall}>
                        5.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Dividends.{'\n'}
                            {'\n'}
                        </Text>{' '}
                        The Shareholder acknowledges that the Company may from
                        time to time declare and pay shareholder dividends to
                        the shareholders. The Shareholder further acknowledges
                        and agrees to the following: {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (a) The amount, timing and payment of dividends is
                        within the sole discretion of the Company. No dividends
                        will be paid by the Company unless the Board of
                        Directors determines that such payment is prudent and in
                        the best interests of the Company and unless the Company
                        shall be permitted to make such payment pursuant to
                        ALABAMA law;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (b) The Company may elect in its sole discretion to
                        retain its profits rather than distribute them as
                        dividends;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (c) Any payment of dividends is not assured;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (d) Shareholder dividends shall be declared and payable
                        only from the profits of the Company as a whole, and
                        shareholder dividends may not be paid to the Shareholder
                        even if the Shareholder's individual results are
                        profitable.{'\n'}
                        {'\n'}
                    </Text>

                    <Text style={styles.textSmall}>
                        6.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Termination of Shareholder Status.{'\n'}
                            {'\n'}
                        </Text>{' '}
                        Each of the following events (hereinafter, a
                        "Termination Event") shall require the Shareholder (or
                        his estate or legal or personal representative, as the
                        case may be) to sell all of the Shares back to the
                        Company, shall cause the Shareholder's rights as a
                        shareholder in the Company to immediately and
                        automatically terminate, and shall likewise require the
                        Company to redeem and repurchase all of the Shares owned
                        by the Shareholder, all in accordance with Section 6
                        below: {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (a) The Shareholder no longer satisfies the eligibility
                        requirements applicable to the Shareholder on the
                        effective date of this Agreement;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (b) The Shareholder's insurance policy from the Company
                        is cancelled or non-renewed for any reason whatsoever,
                        or the Shareholder otherwise ceases to have a current
                        policy of insurance in force from the Company for any
                        reason whatsoever;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (c) The death or dissolution of the Shareholder;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (d) All or any part of the Shares are attached or seized
                        in an execution proceeding and such attachment or
                        execution is not discharged or otherwise dissolved
                        within thirty (30) days;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (e) All or any part of the Shares are attached, seized
                        or subject to any order or decree of any court
                        authorizing or directing any Transfer of all or any part
                        of the Shares in any proceeding for divorce, alimony,
                        separate maintenance or distribution of marital
                        property; or{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (g) Bankruptcy or other insolvency of the Shareholder;
                        and{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (h) Failure of the Shareholder to satisfy any deductible
                        within thirty (30) days of demand.{'\n'}
                        {'\n'}
                    </Text>
                </View>
                <Text style={styles.footer}>SUR 001 11 18</Text>
                <Text
                    fixed
                    render={({ pageNumber }) => `${pageNumber}`}
                    style={styles.pageNumber}
                />
            </Page>
            <Page style={styles.body}>
                <View>
                    <Text style={styles.textSmall}>
                        7.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Terms of Redemption.
                        </Text>
                        <Text style={styles.textSmall}>
                            {' '}
                            The Capital Contribution and amount of shares are
                            taken from and calculated on the initial insurance
                            premium. The formula used by the Company to
                            determine the total amount of shares issued is as
                            follows: initial premium amount x .12 ÷ 2. The
                            Capital Contribution is taken from the initial
                            premium.{'\n'}
                            {'\n'}
                        </Text>
                    </Text>
                    <Text style={styles.textSmall}>
                        (a) Upon the occurrence of a Termination Event, the
                        Shareholder or his estate or legal or personal
                        representative, and any other holder of all or any part
                        of the Shares, as the case may be (hereinafter,
                        individually and collectively, the "Transferor") shall
                        immediately tender all Shares to the Company for
                        redemption at the price specified in Section 6(b) below;
                        {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (b) The price to be paid to a Transferor for the
                        redemption of Shares upon a Termination Event shall be
                        determined under the applicable Subsection (i) through
                        (iii) below (as applicable, the "Price"):{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmallLeft}>
                        (i) If the Termination Event occurs four (4) years or
                        more from the initial inception date{'\n'}
                        of the insurance coverage and such policy has been
                        maintained continuously with no {'\n'}interruption of
                        coverage with respect to the Shareholder (the "Inception
                        Date"), the Price{'\n'} shall be determined by the Board
                        of Directors with a total price not to exceed $1000.00;
                        {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmallLeft}>
                        (ii) In the event that coverage has not been
                        continuously maintained for at least four (4){'\n'}
                        years, the Shareholder will not be entitled to any
                        payment;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmallLeft}>
                        (iii) All such payments must meet all applicable
                        regulations as set forth by Department;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (c) All amounts due the Company for any reason from the
                        Shareholder may be offset against any distribution to
                        the Shareholder;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (d) Determination of the amount of the redemption, if
                        any, for the Shares shall be held within sixty (60)
                        business days of the latest of (i) the occurrence of the
                        Termination Event, (ii) the date on which the President
                        of the Company actually learns of the Termination Event
                        (the "Notification Date"), or (iii) the preparation of
                        the Company's regularly-prepared fiscal year-end
                        financial statements;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (e) The payments shall be made annually in equal amounts
                        over five (5) years on each of the five anniversary
                        dates of the Termination Event. Such payments shall be
                        made only in the event that the Shareholder has met all
                        of the obligations of the redemption;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (f) Notwithstanding anything herein to the contrary, the
                        Company shall not be obligated to pay any such amounts
                        in the event that the Company's Board of Directors, in
                        its sole discretion, determines that any such payment
                        would adversely affect the Corporation's operations
                        and/or financial condition. The Company shall have the
                        sole right to eliminate, suspend and/or defer any such
                        payment based upon such determination. Furthermore, any
                        such payment shall be subject to the Company having met
                        any requirements and having obtained any such required
                        approval by the Department.{'\n'}
                        {'\n'}
                    </Text>
                </View>

                <Text style={styles.footer}>SUR 001 11 18</Text>
                <Text
                    fixed
                    render={({ pageNumber }) => `${pageNumber}`}
                    style={styles.pageNumber}
                />
            </Page>
            <Page style={styles.body}>
                <View>
                    <Text style={styles.textSmall}>
                        8.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Waiver of Claims Against Shareholders; Rights of
                            Third Parties.{'\n'}
                            {'\n'}
                        </Text>{' '}
                        (a) The Shareholder hereby agrees to waive any claim it
                        may have against any other shareholder, the
                        administrator, or the manager based on the insolvency of
                        the Company or any related entity thereof; {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (b) No person, except the Company or any shareholder,
                        shall be deemed to have any right conferred upon it by
                        any provision of this Agreement. No term of this
                        Agreement shall be enforceable against the Company or
                        any shareholder except by the Company, its assignee, or
                        one or more shareholders.{'\n'}
                        {'\n'}
                    </Text>

                    <Text style={styles.textSmall}>
                        9.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Shareholder's Representations and Warranties.{'\n'}
                            {'\n'}
                        </Text>
                    </Text>
                    <Text style={styles.textSmall}>
                        The Shareholder hereby represents and warrants to the
                        Company that: {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (a) The Company has made available to the Shareholder
                        and its advisors the opportunity to evaluate an
                        investment in the Company, and to obtain additional
                        information and to evaluate the merits and risks of this
                        investment and to ask questions of, and receive
                        satisfactory answers from, representatives of the
                        Company concerning the terms and conditions of this
                        investment;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (b) The Shareholder understands the risks involved in an
                        investment in the Company. The Shareholder recognizes
                        that an investment in the Company is speculative and
                        involves substantial risk of loss;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (c) The Shareholder is an "accredited investor" as such
                        term is defined in applicable federal and State
                        securities laws, and the Shareholder can afford a loss
                        of the entire investment in the Company;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (d) The Shareholder represents that its knowledge and
                        experience in financial and business matters in general
                        are such that it is capable of evaluating the merits and
                        risks of an investment in the Company;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (e) The Shareholder is purchasing the Shares solely for
                        its own account and not with a view to distribution,
                        sale or subdivision, or for the account of any other
                        individual, corporation, firm or person;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (f) The Shareholder is purchasing the Shares as part of
                        an insurance program, and for the sole purpose of
                        obtaining insurance coverage which may be otherwise
                        unavailable to Shareholder, and the Shareholder is not
                        making this investment with the expectation of profiting
                        from the operations of the Company or from any sale,
                        redemption or repurchase of stock;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (g) The Shareholder recognizes that there will be no
                        public market for the Shares and that the
                        transferability of the Shares is restricted;{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (h) No person or firm is promising or guaranteeing that
                        the Shareholder will receive a return or profit from its
                        investment in the Company, nor is any such return or
                        profit expected or contemplated; and{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (i) The person(s) executing this Agreement on behalf of
                        the Shareholder has/have the authority to execute this
                        Agreement, without the necessity of additional
                        signatories{'\n'}
                        {'\n'}
                    </Text>
                </View>
                <Text style={styles.footer}>SUR 001 11 18</Text>
                <Text
                    fixed
                    render={({ pageNumber }) => `${pageNumber}`}
                    style={styles.pageNumber}
                />
            </Page>
            <Page style={styles.body}>
                <View>
                    <Text style={styles.textSmall}>
                        10. Proxy. The undersigned shareholder of SURYA
                        Insurance Company, Inc., a Risk Retention Group (the
                        "Company"), hereby appoints the Manager of SURYA
                        Insurance Services LLC as the proxy of the undersigned,
                        to attend all shareholders' meetings, and to exercise
                        all shareholder rights of the undersigned, including
                        without limitation the right to vote, for eleven (11)
                        months from the date of the filing of this proxy to the
                        extent permitted under applicable law; provided,
                        however, that the undersigned may revoke this proxy at
                        any time either by (i) attending any such shareholders
                        meeting and declaring this proxy to be revoked, or (ii)
                        submitting a written revocation to the Secretary of the
                        Company at any time prior to any such meeting.{'\n'}
                        {'\n'}
                    </Text>

                    <Text style={styles.textSmall}>
                        11.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Assignment.{'\n'}
                            {'\n'}
                        </Text>
                    </Text>
                    <Text style={styles.textSmall}>
                        (a){' '}
                        <Text style={styles.textSmallUnderline}>
                            By Shareholder.
                        </Text>{' '}
                        The Shareholder may not assign any right, claim, or
                        interest it may have under this Agreement or under any
                        policy issued by the Company or a subsidiary thereof,
                        except (i) as specifically may be agreed to in writing
                        by the Company, or (ii) subject to the limitations set
                        forth in Section 2.b. (ii) above, by operation of law in
                        the event of a merger or business combination to which
                        the Shareholder is a party. No creditor, assignee or
                        third-party beneficiary of the Shareholder shall have
                        any right, claim, or title to any part, share, interest,
                        funds, or assets of the Company except as specifically
                        may be agreed to in writing by the Board of Directors of
                        the Company. Any successor to the assets, liabilities or
                        operations of the Shareholder shall be liable to the
                        Company or its assignee for any amounts due the Company
                        or the Company from such Shareholder; {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        (b){' '}
                        <Text style={styles.textSmallUnderline}>
                            By Company.
                        </Text>{' '}
                        This Agreement may be transferred and assigned by
                        operation of law to any successor entity to the Company
                        in connection with any merger or other business
                        combination to which the Company is a party.{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        12.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Severability.{'\n'}
                            {'\n'}
                        </Text>{' '}
                        Should any portion, term, condition, or provision of
                        this Agreement be determined by a court of competent
                        jurisdiction to be invalid under any applicable law or
                        otherwise rendered unenforceable, the validity of the
                        remaining conditions and provisions shall not be
                        affected thereby.{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        13.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Governing Law.{'\n'}
                            {'\n'}
                        </Text>{' '}
                        This Agreement shall be construed in accordance with the
                        substantive law of the State of Alabama, without regard
                        to principles of conflicts of laws. The term "person"
                        shall mean any individual, entity, unincorporated
                        association, or other juridical person. Any reference to
                        a gender, masculine, feminine, or neuter, shall refer to
                        all genders.{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        14.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Term.{'\n'}
                            {'\n'}
                        </Text>{' '}
                        This Agreement shall continue in effect until it is
                        rescinded by the mutual written consent of the parties
                        hereto or otherwise terminated as provided by this
                        Agreement or applicable law.{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        15.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Amendment.{'\n'}
                            {'\n'}
                        </Text>{' '}
                        This Agreement may be amended upon the mutual written
                        consent of the parties.{'\n'}
                        {'\n'}
                    </Text>
                </View>
                <Text style={styles.footer}>SUR 001 11 18</Text>
                <Text
                    fixed
                    render={({ pageNumber }) => `${pageNumber}`}
                    style={styles.pageNumber}
                />
            </Page>
            <Page style={styles.body}>
                <View>
                    <Text style={styles.textSmall}>
                        16.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Complete Agreement.{'\n'}
                            {'\n'}
                        </Text>{' '}
                        This Agreement, including all counterparts hereof, the
                        Charter, Bylaws, policy terms, and any applicable rules
                        and regulations that may be adopted from time to time by
                        the Board of Directors, constitutes the full and
                        complete terms of this Shareholders Agreement. There are
                        no oral understandings or agreements not set forth in
                        writing herein or in the aforementioned other writings.
                        Shareholder acknowledges the receipt of a copy of the
                        Charter and Bylaws of the Company.{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        This Agreement may be executed in any number of
                        counterparts, all of which taken together shall be
                        deemed one original.{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        17.{' '}
                        <Text style={styles.textSmallUnderline}>
                            Notice.{'\n'}
                            {'\n'}
                        </Text>{' '}
                        All offers, acceptances and notices shall be in writing
                        and sent certified mail, return receipt requested, to
                        the principal office of the Company, when addressed to
                        the Company, or to the address of the Shareholder
                        appearing on the Company's books, when addressed to the
                        Shareholder.{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        IN WITNESS WHEREOF, the parties hereto have caused this
                        Subscription and Shareholders Agreement to be executed
                        and effective as of the date first above written.{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmallRight}>
                        SURYA INSURANCE COMPANY, INC.,{'\n'}A RISK RETENTION
                        GROUP{'\n'}
                        {'\n'}
                        {'\n'}
                        {'\n'}
                        {'\n'}
                        {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        Date : {date} By : {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmallRightRight}>
                        JANAK DAVE CEO{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmallRightRight}>
                        SHAREHOLDER{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmall}>
                        Date :______________________ By
                        :________________________________ {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmallRight}>
                        Name :_____________________________{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.textSmallRight}>
                        Title :_____________________________{'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.boldTextCenterSmall}>
                    {'\n'}{'\n'}{'\n'}
                    Number of Shares Acquired Based Upon Formula: {SharesToReceive()}{'\n'}
                        
                    </Text>
                </View>
                <Text style={styles.footer}>SUR 001 11 18</Text>
                <Text
                    fixed
                    render={({ pageNumber }) => `${pageNumber}`}
                    style={styles.pageNumber}
                />
            </Page>
        </Document>
    )
}

export default ShareholderApp
