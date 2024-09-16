import {useState, useEffect} from 'react'
import styled from 'styled-components'
import Moralis from 'moralis'
import { APP_ID, SERVER_URL } from '../../../index'

const NotesModal = ({notesList, policyNum, setOpenNotesModal}) => {
    const [noteDate, setNoteDate] = useState('')
    const [severity, setSeverity] = useState('')
    const [fullNote, setFullNote] = useState('')

    const onSubmit = async() => {

        const appId = APP_ID;
        const serverUrl = SERVER_URL;   

        Moralis.start({ serverUrl, appId });
        const Policies = await (Moralis as any).Object.extend("Policies");

        const query = new (Moralis as any).Query(Policies);
        const policyData = await query.equalTo("policyNum", policyNum).first();

        console.log(policyData.get("policyJson"))

        const policyJSON = JSON.parse(policyData.get("policyJson"))

        let documents = policyJSON.documents

        if (documents.values === undefined) {
            documents = {values:[]}
        }

        const note = {
            Date: noteDate,
            Severity: severity,
            Note: fullNote
        }

        documents.values.push(note)

        policyJSON.documents = documents

        console.log(policyJSON)

        policyData.set("policyJson", JSON.stringify(policyJSON))
        policyData.save()

        setOpenNotesModal(false)
        window.location.reload()

    }


    return (
        <Modal>
            <XButton onClick={()=>setOpenNotesModal(false)}>X</XButton>
            <Severity name="severity" id="severity" onChange={(e) => setSeverity(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </Severity>
            <Date value={noteDate} placeholder="Date" onChange={(e) => setNoteDate(e.target.value)}/>
            
            <NotesBox onChange={(e)=>setFullNote(e.target.value)}>
            
            </NotesBox>
            <Submit onClick={()=>onSubmit()}>Submit</Submit>
        </Modal>
    )
}

export default NotesModal

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

const NotesBox = styled.textarea`
    position: absolute;
    top: 25%;
    left: 5%;
    height: 60%;
    width: 90%;
    border: solid 1px black;
`

const Severity = styled.select`
    position: absolute;
    top: 15%;
    left: 5%;
    border: solid 1px black;
`

const Date = styled.input`
    position: absolute;
    top: 15%;
    right: 5%;
    border: solid 1px black;
`

const Submit = styled.button`
    position: absolute;
    bottom: 5%;
    right: 5%;
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