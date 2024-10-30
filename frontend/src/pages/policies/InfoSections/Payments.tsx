import { Flex, Section, SubSection, TileItem, Title } from '../shared'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SortByHeader, Table, TD, Th, TR } from '../../../styles/styles'
import { truncateSync } from 'fs'
import moment from "moment"
import PaymentsModal from '../InfoSections/PaymentsModal'
import { APP_ID, SERVER_URL } from '../../../index'
import Moralis from 'moralis'
import { usePDF, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import Invoice from '../../../components/RenderDocuments/components/Invoice'
import BrokerInvoice from '../../../components/RenderDocuments/components/BrokerInvoice'
import { CSVLink } from 'react-csv';

const headers = ['Date', 'Premium', 'Subscription Fee', 'Policy Issuance Fee', 'Tax', "Installment Fee"]

const Payments = ({ payments, policy }) => {

    const [depositPercent, setDepositPercent] = useState(0);
    const [installmentNum, setInstallmentNum] = useState(0);
    const [fee, setFee] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);
    const [installmentAmount, setInstallmentAmount] = useState(0);
    const [depositTaxAmount, setDepositTaxAmount] = useState(0);
    const [installmentTaxAmount, setInstallmentTaxAmount] = useState(0);
    const [piFeeDepositAmount, setPIFeeDepositAmount] = useState(() => {
        const effectiveDate = new Date(policy.policy.effectiveDate);
        if (effectiveDate >= new Date("09/01/2024")) {
            return 500.00;
        } else if (effectiveDate > new Date("07/31/2023")) {
            return 350.00;
        } else {
            return 0.00;
        }
    });
    const [depositSubAmount, setDepositSubAmount] = useState(0);
    const [installmentSubAmount, setInstallmentSubAmount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [installmentDates, setInstallmentDates] = useState([]);
    const [installmentTempAmounts, setInstallmentTempAmounts] = useState([])
    const [taxTempAmounts, setTaxTempAmounts] = useState([])
    const [subTempAmounts, setSubTempAmounts] = useState([])
    const [feeTempAmounts, setFeeTempAmounts] = useState([])
    const [piFeeTempAmounts, setPIFeeTempAmounts] = useState([])
    const [paymentIndex, setPaymentIndex] = useState(0)
    const [invoiceFile, setInvoiceFile] = useState(null)
    const [additionalCharges, setAdditionalCharges] = useState([])

    const [paymentMapping, setPaymentMapping] = useState([])

    const [openPaymentModule, setOpenPaymentModule] = useState(false)

    const getWaiverPremium = () => {
        let waiverPremium = 0
        console.log(policy.insured, "lsoll")
        
        if (policy.insured.additionalInsured?.values) {
            
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


    useEffect(() => {
        let paymentPlan = ""
        if (payments?.paymentType) {
            if (payments?.paymentType === "FULLPAY_POL" || payments?.paymentType === "Paid in Full" || payments?.paymentType === "100% DEPOSIT") {
                paymentPlan = "100% DEPOSIT PLUS 0 Monthly INSTALLMENTS-$0 FEE"
            } else {
                console.log(payments, "GLD")
                paymentPlan = payments.paymentType
            }
            
        } else {
            if (payments.payment === "FULLPAY_POL" || payments.payment === "Paid in Full") {
                paymentPlan = "100% DEPOSIT PLUS 0 Monthly INSTALLMENTS-$0 FEE"
            } else {
                console.log(payments, policy, "GLDB")
                paymentPlan = payments.payment
            }
        }

        // if (payments?.paymentType === "FULLPAY_POL" || payments?.paymentType === "Paid in Full" || payments?.paymentType === "100% DEPOSIT") {
        //     paymentPlan = "100% DEPOSIT PLUS 0 Monthly INSTALLMENTS-$0 FEE"
        // } else {
        //     paymentPlan = payments.paymentType
        // }
        

        const depositRegex = /(\d+)%/;
        const deposit = depositRegex.exec(paymentPlan)[1];
        setDepositPercent(parseInt(deposit))
        const depositPercentage = parseInt(deposit)
        const installmentRegex = /(\d+) Monthly/;
        console.log(depositRegex.exec(paymentPlan), installmentRegex.exec(paymentPlan))
        const installmentNum = parseInt(installmentRegex.exec(paymentPlan)[1]);
        const feeRegex = /\$(\d+) FEE/;
        const fee = feeRegex.exec(paymentPlan)[1];
        setFee(parseInt(fee))

        const grossPremium = parseFloat(CalculatePremium())



        console.log(grossPremium, (grossPremium * depositPercentage) / 100, (grossPremium - ((grossPremium * depositPercentage) / 100)) / installmentNum, "CARLOS")
        const depositAmountTrue = (grossPremium * depositPercentage) / 100

        setDepositAmount((grossPremium * depositPercentage) / 100);
        setInstallmentAmount((grossPremium - depositAmountTrue) / installmentNum);
        setDepositTaxAmount((parseFloat(CalculateTax()) * depositPercentage) / 100);
        setInstallmentTaxAmount((parseFloat(CalculateTax()) - depositTaxAmount) / installmentNum);
        setDepositSubAmount((parseFloat(CalculateSubFee()) * depositPercentage) / 100);
        setInstallmentSubAmount((parseFloat(CalculateSubFee()) - depositSubAmount) / installmentNum);
        setTotalCost(depositAmount + (installmentNum * (installmentAmount + parseFloat(fee))));

        const tempDates = [policy.policy.effectiveDate];
        const tempAmounts = [((grossPremium * depositPercentage) / 100)];
        const tempFees = [parseFloat(fee)];
        const tempPIFee = [0.00]
        const tempTaxes = [((parseFloat(CalculateTax()) * depositPercentage) / 100)];
        const tempSubs = [((parseFloat(CalculateSubFee()) * depositPercentage) / 100)];
        const date = moment(policy.policy.effectiveDate);
        
        let tempPremium = 0;
        for (let i = 1; i <= installmentNum; i++) {
            const currentDate = date.clone();
            currentDate.add(i, 'months');
            console.log(currentDate.format('MM/DD/YYYY'))
            let currentPremium = 0;
            

            for (const j in policy.vehicles.values) {
                let vehiclePremium = 0;
                if (policy.vehicles?.values[j].baseEffDate === policy.policy?.effectiveDate && policy.vehicles.values[j].baseExpDate === policy.policy.expirationDate) {
                    if (!isNaN(parseFloat(policy.vehicles.values[j].overallPremium))) {
                        vehiclePremium+=(parseFloat(policy.vehicles.values[j].overallPremium)-((depositPercentage/100)*parseFloat(policy.vehicles.values[j].overallPremium)))/installmentNum
                    }
                    if (!isNaN(parseFloat(policy.vehicles.values[j].personalInjuryProtectionPremium))) {
                        vehiclePremium+=(parseFloat(policy.vehicles.values[j].personalInjuryProtectionPremium)-((depositPercentage/100)*parseFloat(policy.vehicles.values[j].personalInjuryProtectionPremium)))/installmentNum
                    }
                    if (!isNaN(parseFloat(policy.vehicles.values[j].pedPipProtectionPremium))) {
                        vehiclePremium+=(parseFloat(policy.vehicles.values[j].pedPipProtectionPremium)-((depositPercentage/100)*parseFloat(policy.vehicles.values[j].pedPipProtectionPremium)))/installmentNum
                    }
                    if (!isNaN(parseFloat(policy.vehicles.values[j].medicalPaymentsPremium))) {
                        vehiclePremium+=(parseFloat(policy.vehicles.values[j].medicalPaymentsPremium)-((depositPercentage/100)*parseFloat(policy.vehicles.values[j].medicalPaymentsPremium)))/installmentNum
                    }
                    if (!isNaN(parseFloat(policy.vehicles.values[j].underinsuredMotoristPremium))) {
                        vehiclePremium+=(parseFloat(policy.vehicles.values[j].underinsuredMotoristPremium)-((depositPercentage/100)*parseFloat(policy.vehicles.values[j].underinsuredMotoristPremium)))/installmentNum
                    }
                    if (!isNaN(parseFloat(policy.vehicles.values[j].uninsuredMotoristPremium))) {
                        vehiclePremium+=(parseFloat(policy.vehicles.values[j].uninsuredMotoristPremium)-((depositPercentage/100)*parseFloat(policy.vehicles.values[j].uninsuredMotoristPremium)))/installmentNum
                    }
                    
                    currentPremium+=vehiclePremium

                    console.log(vehiclePremium, currentPremium,i, j,currentDate, 'singsl')

                } else {
                    const vehicleDate = moment(policy.vehicles.values[j].baseEffDate);
                    const vehicleExpDate = moment(policy.vehicles.values[j].baseExpDate);
      
                    let installmentNumEnd = 0

                    for (let k = 1; k <= installmentNum; k++) {
                        const currentDateEnd = date.clone();

                        currentDateEnd.add(k, 'months');

                        if (vehicleDate.isBefore(currentDateEnd) && vehicleExpDate.isAfter(currentDateEnd)) {
                            installmentNumEnd+=1
                        }
                        
                    }

                    console.log(installmentNumEnd)
                    let vehiclePremium = 0;

                    if (vehicleDate.isBefore(currentDate) && policy.vehicles?.values[j].baseEffDate !== policy.policy?.effectiveDate && vehicleExpDate.isAfter(currentDate)) {
                        console.log(j, 'alla')
                        if (!isNaN(parseFloat(policy.vehicles.values[j].overallPremium))) {
                            vehiclePremium+=parseFloat(policy.vehicles.values[j].overallPremium)/installmentNumEnd
                        }
                        if (!isNaN(parseFloat(policy.vehicles.values[j].personalInjuryProtectionPremium))) {
                            vehiclePremium+=parseFloat(policy.vehicles.values[j].personalInjuryProtectionPremium)/installmentNumEnd
                        }
                        if (!isNaN(parseFloat(policy.vehicles.values[j].pedPipProtectionPremium))) {
                            vehiclePremium+=parseFloat(policy.vehicles.values[j].pedPipProtectionPremium)/installmentNumEnd
                        }
                        if (!isNaN(parseFloat(policy.vehicles.values[j].medicalPaymentsPremium))) {
                            vehiclePremium+=parseFloat(policy.vehicles.values[j].medicalPaymentsPremium)/installmentNumEnd
                        }
                        if (!isNaN(parseFloat(policy.vehicles.values[j].underinsuredMotoristPremium))) {
                            vehiclePremium+=parseFloat(policy.vehicles.values[j].underinsuredMotoristPremium)/installmentNumEnd
                        }
                        if (!isNaN(parseFloat(policy.vehicles.values[j].uninsuredMotoristPremium))) {
                            vehiclePremium+=parseFloat(policy.vehicles.values[j].uninsuredMotoristPremium)/installmentNumEnd
                        }
                        currentPremium += vehiclePremium;
                    }
                    if (vehicleDate.isBefore(currentDate) && policy.vehicles.values[j].baseEffDate === policy.policy.effectiveDate && vehicleExpDate.isAfter(currentDate)) {

                        if (!isNaN(parseFloat(policy.vehicles.values[j].overallPremium))) {
                            vehiclePremium+=(parseFloat(policy.vehicles.values[j].overallPremium)-((depositPercentage/100)*parseFloat(policy.vehicles.values[j].overallPremium)))/installmentNumEnd
                        }
                        if (!isNaN(parseFloat(policy.vehicles.values[j].personalInjuryProtectionPremium))) {
                            vehiclePremium+=(parseFloat(policy.vehicles.values[j].personalInjuryProtectionPremium)-((depositPercentage/100)*parseFloat(policy.vehicles.values[j].personalInjuryProtectionPremium)))/installmentNumEnd
                        }
                        if (!isNaN(parseFloat(policy.vehicles.values[j].pedPipProtectionPremium))) {
                            vehiclePremium+=(parseFloat(policy.vehicles.values[j].pedPipProtectionPremium)-((depositPercentage/100)*parseFloat(policy.vehicles.values[j].pedPipProtectionPremium)))/installmentNumEnd
                        }
                        if (!isNaN(parseFloat(policy.vehicles.values[j].medicalPaymentsPremium))) {
                            vehiclePremium+=(parseFloat(policy.vehicles.values[j].medicalPaymentsPremium)-((depositPercentage/100)*parseFloat(policy.vehicles.values[j].medicalPaymentsPremium)))/installmentNumEnd
                        }
                        if (!isNaN(parseFloat(policy.vehicles.values[j].underinsuredMotoristPremium))) {
                            vehiclePremium+=(parseFloat(policy.vehicles.values[j].underinsuredMotoristPremium)-((depositPercentage/100)*parseFloat(policy.vehicles.values[j].underinsuredMotoristPremium)))/installmentNumEnd
                        }
                        if (!isNaN(parseFloat(policy.vehicles.values[j].uninsuredMotoristPremium))) {
                            vehiclePremium+=(parseFloat(policy.vehicles.values[j].uninsuredMotoristPremium)-((depositPercentage/100)*parseFloat(policy.vehicles.values[j].uninsuredMotoristPremium)))/installmentNumEnd
                        }
                        currentPremium += vehiclePremium;
                    }
                    
                    console.log(currentPremium, j, 'all')
                }
            }

            // if (!isNaN(parseFloat(policy.coverage.hiredCSLPremium))) {
            //     currentPremium += (parseFloat(policy.coverage.hiredCSLPremium)-((depositPercent/100)*parseFloat(policy.coverage.hiredCSLPremium)))/installmentNum
            // }
    
            // if (!isNaN(parseFloat(policy.coverage.nonOwnedCSLPremium))) {
            //     currentPremium += (parseFloat(policy.coverage.nonOwnedCSLPremium)-((depositPercent/100)*parseFloat(policy.coverage.nonOwnedCSLPremium)))/installmentNum
            // }
            console.log(currentPremium, 'death')
            if (!isNaN(parseFloat(policy.coverage.hiredCSLPremium))) {
                console.log((parseFloat(policy.coverage.hiredCSLPremium)-(parseFloat(policy.coverage.hiredCSLPremium)*(depositPercentage/100)))/installmentNum, parseFloat(policy.coverage.hiredCSLPremium), (parseFloat(policy.coverage.hiredCSLPremium)*(depositPercentage/100)), parseFloat(policy.coverage.hiredCSLPremium) - (parseFloat(policy.coverage.hiredCSLPremium)*(depositPercentage/100)), installmentNum, 'fee')
                currentPremium+=(parseFloat(policy.coverage.hiredCSLPremium)-(parseFloat(policy.coverage.hiredCSLPremium)*(depositPercentage/100)))/installmentNum
            }
            console.log(currentPremium, 'reath')
    
            if (!isNaN(parseFloat(policy.coverage.nonOwnedCSLPremium))) {
                console.log((parseFloat(policy.coverage.nonOwnedCSLPremium)-(parseFloat(policy.coverage.nonOwnedCSLPremium)*(depositPercentage/100)))/installmentNum, 'fee')
                currentPremium+=(parseFloat(policy.coverage.nonOwnedCSLPremium)-(parseFloat(policy.coverage.nonOwnedCSLPremium)*(depositPercentage/100)))/installmentNum
            }
            console.log(currentPremium, 'teath')
            currentPremium += getWaiverPremium()-(getWaiverPremium()*(depositPercentage/100))/installmentNum
            console.log(currentPremium, 'ceath')
            currentPremium += (getAddInsuredPremium()-(getAddInsuredPremium()*(depositPercentage/100)))/installmentNum
            console.log(currentPremium, 'peath')
            console.log(currentPremium, i, 'al')

            tempPremium += currentPremium;
            tempDates.push(currentDate);
            tempAmounts.push(currentPremium);
            tempPIFee.push(0.00)
            tempFees.push(parseFloat(fee))

            
            tempTaxes.push(currentPremium * (stateToTaxFee[policy.policy.states]));
            tempSubs.push(currentPremium * (0.12));

        }
        

        const realPayments = policy.payments

        const allAmounts = [tempAmounts, tempTaxes, tempSubs, tempPIFee, tempFees]
        console.log(allAmounts, 'deal')

        const paymentLabels = ["Installment", "Tax", "SubscriptionFee", "Policy Issuance Fee", "InstallmentFee"]

        let realPay

        const additionalCharge = Array(allAmounts[0].length).fill(0);

        
        

        

        if (realPayments.values) {

            console.log(realPayments.values, 'deal')

            for (const k in allAmounts) {
                const label = paymentLabels[k]
                console.log(k, paymentLabels, paymentLabels[k], label, 'eel')

                

                for (let i = 0; i < allAmounts[k].length; i++) {
                    
                    
                    for (let m = 0; m < allAmounts[k].length; m++) {
                        realPay = {}
                        if (realPayments.values[m] && realPayments.values[m].InstallmentNum === i) {
                            realPay = realPayments.values[m]
                            console.log(realPay, i, m, "PUS")
                            break
                        } else {
                            console.log("FREE")
                            continue
                        }
                    }


                    const remainder = allAmounts[k][i] - parseFloat(realPay[label]); // paidAmounts is an array of amounts paid by the insured for each installment
                    console.log(remainder, allAmounts[k][i], realPay[label], label, realPay, 'feal')
               
                    if (remainder > 0) {
                      allAmounts[k][i+1] += remainder;
                      additionalCharge[i+1] += remainder
                        
                      // distribute positive remainder as additional charge
                    //   for (let j = i+1; j < allAmounts[k].length; j++) {
                    //     console.log(remainder /(allAmounts[k].length - i), "FLALS")
                        
                    //     allAmounts[k][j] += (remainder / (allAmounts[k].length - i));
                    //   }
                    } else if (remainder < 0) {
                      // distribute negative remainder as rebate
                      for (let j = i+1; j < allAmounts[k].length; j++) {
                        allAmounts[k][j] += remainder / (allAmounts[k].length - i);
                      }
                    }
                }

            }

        }

        console.log(tempAmounts, tempTaxes, "RARLOS")

        setInstallmentDates(tempDates);
        setInstallmentTempAmounts(tempAmounts)
        setSubTempAmounts(tempSubs)
        setTaxTempAmounts(tempTaxes)
        console.log(tempTaxes, 'meal')
        setPIFeeTempAmounts(tempPIFee)
        setFeeTempAmounts(tempFees)
        setAdditionalCharges(additionalCharge)

        
        setFeeTempAmounts(tempFees)

        const paymentData = {
            installmentDates: tempDates,
            tempAmounts: tempAmounts,
            tempSubs: tempSubs,
            tempTaxes: tempTaxes,
            tempFees: tempFees,
            tempPIFees: piFeeTempAmounts
        }

        const paymentDataRows = paymentData.installmentDates.map((date, index) => [
                moment(date).format('MM/DD/YYYY'),
                paymentData.tempAmounts[index].toFixed(2),
                paymentData.tempSubs[index].toFixed(2),
                piFeeDepositAmount,
                paymentData.tempTaxes[index].toFixed(2),
                paymentData.tempFees[index].toFixed(2)
        ]
        )

        setPaymentMapping(paymentDataRows)



       
    }, [policy])




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


    const CalculatePremium = () => {
        let premium = 0.00

        for (const i in policy.vehicles.values) {
            console.log(policy.vehicles.values[i].baseEffDate, policy.policy.effectiveDate, policy.vehicles.values[i].baseExpDate === policy.policy.expirationDate, "are vehicles being logged")
            if (policy.vehicles.values[i].baseEffDate === policy.policy.effectiveDate && policy.vehicles.values[i].baseExpDate === policy.policy.expirationDate) {

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
                console.log(premium, i, 'vehicleprem')
            }
        
        }
        if (!isNaN(parseFloat(policy.coverage.hiredCSLPremium))) {
            premium+=parseFloat(policy.coverage.hiredCSLPremium)
        }

        if (!isNaN(parseFloat(policy.coverage.nonOwnedCSLPremium))) {
            premium+=parseFloat(policy.coverage.nonOwnedCSLPremium)
        }
        console.log(policy.vehicles.values, premium, getWaiverPremium(), getAddInsuredPremium(), 'rarlmos')
        premium += getWaiverPremium()
        premium += getAddInsuredPremium()
    
        return premium.toFixed(2)
    }

    const CalculateTax = () => {
        const premium = parseFloat(CalculatePremium())
        const tax = stateToTaxFee[policy.policy.states]*premium
        return tax.toFixed(2)

    }

    const CalculateSubFee = () => {
        const premium = parseFloat(CalculatePremium())
        const subFee = premium*0.12
        return subFee.toFixed(2)
    }

    const openPayments = (index) => {
        console.log(index, "FREEDOME")
        setPaymentIndex(index)
        setOpenPaymentModule(true)
    }


    return (
        <>
        <Section>
            <Title>Payments</Title>
            <br/>
            <CSVLink data={paymentMapping} headers={headers} filename="payments.csv">
                <DownloadButton>Download CSV</DownloadButton>
            </CSVLink>
            
                    <SubSection>
                        
                        <Flex>
                            <TileItem title="Payments" value={payments.paymentType} />
                        </Flex>
                    </SubSection>
                    <StyledSection>
                        <Table>
                            <thead>
                                <tr>
                                    <Th><SortByHeader>Payment Type</SortByHeader></Th>
                                    <Th><SortByHeader>Amount</SortByHeader></Th>
                                    <Th><SortByHeader>Subscription Fee</SortByHeader></Th>
                                    
                                    <Th><SortByHeader>Tax</SortByHeader></Th>
                                    <Th><SortByHeader>Policy Issuance Fee</SortByHeader></Th>
                                    <Th><SortByHeader>Fee</SortByHeader></Th>
                                    <Th><SortByHeader>Total</SortByHeader></Th>
                                    <Th><SortByHeader>Due Date</SortByHeader></Th>
                                    <Th><SortByHeader>Enter Payment</SortByHeader></Th>
                                    <Th><SortByHeader>Insured Invoice</SortByHeader></Th>
                                    <Th><SortByHeader>Broker Invoice</SortByHeader></Th>
                                </tr>
                            </thead>
                            <tbody>
                                <TR>
                                    <TD>Deposit</TD>
                                    <TD>{depositAmount.toFixed(2)}</TD>
                                    <TD>{depositSubAmount.toFixed(2)}</TD>
                                    <TD>{depositTaxAmount.toFixed(2)}</TD>
                                    <TD>{piFeeDepositAmount.toFixed(2)}</TD>
                                    <TD>{fee.toFixed(2)}</TD>
                                    <TD>{(depositAmount+depositSubAmount+depositTaxAmount+piFeeDepositAmount+fee).toFixed(2)}</TD>
                                    <TD>{policy.policy.effectiveDate}</TD>
                                    <TD><button onClick={()=>openPayments(0)}>💳</button></TD>
                                    <TD><PDFDownloadLink
                                        document={<Invoice policy={policy} index={0} installmentDate={policy.policy.effectiveDate}
                                        piFeeAmount={piFeeDepositAmount.toFixed(2)}
                                        installmentAmount={depositAmount.toFixed(2)} subAmount={depositSubAmount.toFixed(2)} taxAmount={depositTaxAmount.toFixed(2)}
                                        feeAmount={fee.toFixed(2)} totalAmount={(depositAmount+depositSubAmount+depositTaxAmount+fee+piFeeDepositAmount).toFixed(2)} additionalCharges={additionalCharges[0]}/>}
                                        fileName="FORM"
                                    >
                                
                                                <button>📄</button>
                                           
                                    </PDFDownloadLink></TD>
                                    <TD><PDFDownloadLink
                                        document={<BrokerInvoice policy={policy} index={0} installmentDate={policy.policy.effectiveDate}
                                        piFeeAmount={piFeeDepositAmount.toFixed(2)}
                                        installmentAmount={depositAmount.toFixed(2)} subAmount={depositSubAmount.toFixed(2)} taxAmount={depositTaxAmount.toFixed(2)}
                                        feeAmount={fee.toFixed(2)} totalAmount={(depositAmount+depositSubAmount+depositTaxAmount+fee+piFeeDepositAmount).toFixed(2)} additionalCharges={additionalCharges[0]}/>}
                                        fileName="FORM"
                                    >
                                
                                                <button>📄</button>
                                           
                                    </PDFDownloadLink></TD>
                                    
                                </TR>
                                {installmentDates.map((date, index) => (
                                    (index !== 0) ? 
                                    (<TR key={index}>
                                        <TD>Installment</TD>
                                        <TD>{installmentTempAmounts[index].toFixed(2)}</TD>
                                        <TD>{subTempAmounts[index].toFixed(2)}</TD>
                                        <TD>{taxTempAmounts[index].toFixed(2)}</TD>
                                        <TD>{piFeeTempAmounts[index].toFixed(2)}</TD>
                                        <TD>{feeTempAmounts[index].toFixed(2)}</TD>
                                        <TD>{(installmentTempAmounts[index]+subTempAmounts[index]+piFeeTempAmounts[index]+taxTempAmounts[index]+feeTempAmounts[index]).toFixed(2)}</TD>
                                        <TD>{date.format('MM/DD/YYYY')}</TD>
                                        <TD><button onClick={()=>openPayments(index)}>💳</button></TD>
                                        <TD><PDFDownloadLink
                                        document={<Invoice policy={policy} index={index} installmentDate={date.format('MM/DD/YYYY')}
                                        installmentAmount={installmentTempAmounts[index].toFixed(2)} subAmount={subTempAmounts[index].toFixed(2)} taxAmount={taxTempAmounts[index].toFixed(2)}
                                        
                                        feeAmount={feeTempAmounts[index].toFixed(2)} totalAmount={(installmentTempAmounts[index]+subTempAmounts[index]+taxTempAmounts[index]+feeTempAmounts[index]).toFixed(2)}
                                        additionalCharges={additionalCharges[index]}/>}
                                        fileName="FORM"
                                    >
                                
                                                <button>📄</button>
                                           
                                    </PDFDownloadLink></TD>
                                    <TD><PDFDownloadLink
                                        document={<BrokerInvoice policy={policy} index={index} installmentDate={date.format('MM/DD/YYYY')}
                                        
                                        installmentAmount={installmentTempAmounts[index].toFixed(2)} subAmount={subTempAmounts[index].toFixed(2)} taxAmount={taxTempAmounts[index].toFixed(2)}
                                        feeAmount={feeTempAmounts[index].toFixed(2)} totalAmount={(installmentTempAmounts[index]+subTempAmounts[index]+taxTempAmounts[index]+feeTempAmounts[index]).toFixed(2)}
                                        additionalCharges={additionalCharges[index]}/>}
                                        fileName="FORM"
                                    >
                                
                                                <button>📄</button>
                                           
                                    </PDFDownloadLink></TD>

                                    </TR>) : (<></>)
                                ))}
                               
                                <TR>
                                    <TD>Totals</TD>
                                    <TD>{installmentTempAmounts.reduce((partialSum, a) => partialSum + a, 0).toFixed(2)}</TD>
                                    <TD>{subTempAmounts.reduce((partialSum, a) => partialSum + a, 0).toFixed(2)}</TD>
                                    <TD>{taxTempAmounts.reduce((partialSum, a) => partialSum + a, 0).toFixed(2)}</TD>
                                    <TD>{piFeeTempAmounts.reduce((partialSum, a) => partialSum + a, 0)+piFeeDepositAmount}</TD>
                                    <TD>{feeTempAmounts.reduce((partialSum, a) => partialSum + a, 0).toFixed(2)}</TD>

                                    <TD>-</TD>
                                </TR>
                            </tbody>
                        </Table>
                    </StyledSection>
        </Section>
        {openPaymentModule && 
        <PaymentsModal policyNum={policy.policy.policyNum} index={paymentIndex} setOpenPaymentModule={setOpenPaymentModule}/>}
        </>
    )
}

export default Payments


const StyledSection = styled.div`
    border-bottom: solid 1px #00000017;
    margin-bottom: 42px;
    padding-bottom: 24px;
`


const DownloadButton = styled.button`
    border: 1px solid black;
    border-radius: 2rem;
    padding: 10px;
`