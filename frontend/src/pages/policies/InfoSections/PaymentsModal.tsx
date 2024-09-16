import {useState, useEffect} from 'react'
import styled from 'styled-components'
import Moralis from 'moralis'
import { APP_ID, SERVER_URL } from '../../../index'
import { SettingsSuggest } from '@mui/icons-material'
import SuryaInput from '../../components/PolicyForm/PolicyFormInput'


const PaymentsModal = ({policyNum, index, setOpenPaymentModule}) => {
    const [installment, setInstallment] = useState("")
    const [tax, setTax] = useState("")
    const [subFee, setSubFee] = useState("")
    const [installmentFee, setInstallmentFee] = useState("")
    const [test, setTest] = useState("")
    const [installmentDate, setInstallmentDate] = useState("")

    useEffect(() => {
        onOpen()
    }, [])

    const onOpen = async() => {

        const appId = APP_ID;
        const serverUrl = SERVER_URL;   

        Moralis.start({ serverUrl, appId });
        const Policies = await (Moralis as any).Object.extend("Policies");

        const query = new (Moralis as any).Query(Policies);
        const policyData = await query.equalTo("policyNum", policyNum).first();

        const policyJSON = JSON.parse(policyData.get("policyJson"))
        if (policyJSON.payments.values) {
            for (const i in policyJSON.payments.values) {
                if (policyJSON.payments.values[i].InstallmentNum === index) {
                    setInstallment(policyJSON.payments.values[i].Installment)
                    setTax(policyJSON.payments.values[i].Tax)
                    setSubFee(policyJSON.payments.values[i].SubscriptionFee)
                    setInstallmentFee(policyJSON.payments.values[i].InstallmentFee)
                    setInstallmentDate(policyJSON.payments.values[i].date)
                } 
            }
        }
        
    }
    const formatPaymentAmount = (amount) => {
        return `$${parseInt(amount).toFixed(2)}`;
    }

    const onSubmit = async() => {

        const appId = APP_ID;
        const serverUrl = SERVER_URL;   

        Moralis.start({ serverUrl, appId });
        const Policies = await (Moralis as any).Object.extend("Policies");

        const query = new (Moralis as any).Query(Policies);
        const policyData = await query.equalTo("policyNum", policyNum).first();

        console.log(policyData.get("policyJson"))

        const policyJSON = JSON.parse(policyData.get("policyJson"))

        let payments = policyJSON.payments
        console.log(payments)

        const paymentType = payments.paymentType

        const indexList = []
        const indexArray = {}

        

        const payment = {
            InstallmentNum: index,
            Installment: installment,
            Tax: tax,
            SubscriptionFee: subFee,
            InstallmentFee: installmentFee,
            date: installmentDate
        }

        if (payments.values === undefined) {
            payments = {
                paymentType,
                values:[]}

            payments.values.push(payment)

            policyJSON.payments = payments

            
        } else {


                for (const i in policyJSON.payments.values) {
                    indexList.push(policyJSON.payments.values[i].InstallmentNum)
                    indexArray[i] = policyJSON.payments.values[i].InstallmentNum
                }
                if (indexList.indexOf(index) >= 0) {
                    policyJSON.payments.values[index] = payment
                } else {
                    policyJSON.payments.values.push(payment)
                }

        }
            
            
        

        
        

        // payments.values[index] = payment

        

        console.log(policyJSON, 'ldls')

        policyData.set("policyJson", JSON.stringify(policyJSON))
        policyData.save()

        setOpenPaymentModule(false)
        // window.location.reload()


    }


    return (
        <Modal>
            <XButton onClick={()=>setOpenPaymentModule(false)}>X</XButton>
            {(index===0) ? (<TitleBox>Payments on Initial Deposit</TitleBox>) : (<TitleBox>Payments on Installment #{index}</TitleBox>)}
            
            <InstallmentLabel htmlFor="installment">Installment</InstallmentLabel>
            <InstallmentAmount type="number" name="installment" id="installment" value={installment} placeholder="Installment" onChange={(e) => setInstallment(e.target.value)}/>
            <TaxLabel htmlFor="tax">Tax</TaxLabel>
            <TaxAmount type="number" name="tax" id="tax" value={tax} placeholder="Tax Fee" onChange={(e) => setTax(e.target.value)}/>
            <SubFeeLabel htmlFor="sub">Sub Fee</SubFeeLabel>
            <SubAmount type="number" value={subFee} name="sub" id="sub" placeholder="Subscription Fee" onChange={(e) => setSubFee(e.target.value)}/>
            <FeeLabel htmlFor="fee">Fee</FeeLabel>
            <FeeAmount type="number" name="fee" value={installmentFee} id="fee" placeholder="Installment Fee" onChange={(e) => setInstallmentFee(e.target.value)}/>
            <DateLabel htmlFor="date">Date</DateLabel>
            <InstallmentDate type="date" name="date" value={installmentDate} id="fee" placeholder="Installment Date" onChange={(e) => setInstallmentDate(e.target.value)}/>
            <Submit onClick={()=>onSubmit()}>Submit</Submit>
            
        </Modal>
    )
}

export default PaymentsModal

const Modal = styled.div`
    position: fixed;
    width: 50vw;
    height: 50vh;
    z-index: 4;
    left: 25%;
    top: 25%;
    border-radius: 1rem;
    border: solid 1px black;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);

    background: white;
`

const NotesBox = styled.textarea`
    position: absolute;
    top: 25%;
    left: 5%;
    height: 60%;
    width: 90%;
    border: solid 1px black;
`

const XButton = styled.button`
    position: absolute;
    top: 5%;
    right: 5%;
    width: 20px;
    &:hover {
        box-sizing: border-box;
        box-shadow: 2px 2px 2px 2px #00000008;
        font-weight: bold;
    }

`

const TitleBox = styled.div`
    position: absolute;
    top: 5%;
    left: 10%;
    font-weight: bold;

`

const InstallmentAmount = styled.input`
    position: absolute;
    top: 25%;
    left: 10%;
    border: solid 1px black;

`

const InstallmentDate = styled.input`
    position: absolute;
    top: 75%;
    left: 40%;
    border: solid 1px black;

`

const Test = styled.input`
    position: absolute;
    top: 35%;
    left: 10%;
    border: solid 1px black;

`

const InstallmentLabel = styled.label`
    position: absolute;
    top: 20%;
    left: 10%;
    font-style: italic;
`

const TaxLabel = styled.label`
    position: absolute;
    top: 20%;
    right: 28%;
    font-style: italic;
`

const SubFeeLabel = styled.label`
    position: absolute;
    top: 45%;
    left: 10%;
    font-style: italic;
`

const FeeLabel = styled.label`
    position: absolute;
    top: 45%;
    right: 28%;
    font-style: italic;
`

const DateLabel = styled.label`
    position: absolute;
    top: 70%;
    right: 50%;
    font-style: italic;
`


const TaxAmount = styled.input`
    position: absolute;
    top: 25%;
    right: 10%;
    border: solid 1px black;
`

const SubAmount = styled.input`
    position: absolute;
    top: 50%;
    left: 10%;
    border: solid 1px black;
`


const FeeAmount = styled.input`
    position: absolute;
    top: 50%;
    right: 10%;
    border: solid 1px black;
`

const Submit = styled.button`
    position: absolute;
    bottom: 10%;
    right: 10%;
    border: solid 1px black;
    border-radius: 1rem;
    padding: 5px;
    width: 100px;
    &:hover {
        box-sizing: border-box;
        box-shadow: 2px 2px 2px 2px #00000008;
        font-weight: bold;
    }

`