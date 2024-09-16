import {useState, useEffect} from 'react'
import styled from 'styled-components'
import Moralis from 'moralis'
import { APP_ID, SERVER_URL } from '../../../index'
import { SettingsSuggest } from '@mui/icons-material'
import { documents } from '../../../utils/documents/documents'
import { useMoralisFile } from "react-moralis";

const UploadModalApplication = ({policyNum, setOpenUpload, setUploads, uploads}) => {
    const [uploadDoc, setUploadDoc] = useState(null)
    const [label, setLabel] = useState('')
    const [fullNote, setFullNote] = useState('')
    const [uploadName, setUploadName] = useState("Copy of DMV License")
    const { saveFile } = useMoralisFile();

    useEffect(() => {
        console.log(uploadName, 'dl')
        
    }, [uploadName, setUploadName])

    const onSubmit = async() => {

        const appId = APP_ID;
        const serverUrl = SERVER_URL;   

        Moralis.start({ serverUrl, appId });
        const Policies = await (Moralis as any).Object.extend("Applications");

        const query = new (Moralis as any).Query(Policies);
        const policyData = await query.equalTo("policyNum", policyNum).first();

        console.log(policyNum, 'spree')

        console.log(policyData.get("policyJson"))

        const policyJSON = JSON.parse(policyData.get("policyJson"))

        if (!policyJSON.Uploads) {
            policyJSON.Uploads = {}
        }

        console.log(uploadDoc.name, uploadDoc, 'mevel')

        // await saveFile(uploadDoc.name, uploadDoc, {
        //     onSuccess: (result) => {console.log(uploadName); policyJSON.Uploads[uploadName] = result.url();},
        //     onError: (error) => console.log(error),
        // });

        const mergedObj = {};

        // Loop through obj1 and add its properties to mergedObj
        for (const key in uploads) {
        mergedObj[key] = [...uploads[key]];
        }

        // Loop through obj2 and add its properties to mergedObj
        for (const key in policyJSON.Uploads) {
        if (mergedObj.hasOwnProperty(key)) {
            // If the key already exists in mergedObj, concatenate the arrays and remove duplicates
            mergedObj[key] = [...new Set([...mergedObj[key], ...policyJSON.Uploads[key]])];
        } else {
            // If the key doesn't exist in mergedObj, simply add the key-value pair
            mergedObj[key] = [...policyJSON.Uploads[key]];
        }
        }

        const fileLinks = [];
        for (let i = 0; i < uploadDoc.length; i++) {
            const file = uploadDoc.item(i);
            console.log(file, file.name, 'revel')
            let filename
            if (file.name.includes("&")) {
                filename = file.name.replace("&", "and")
            } else {
                filename = file.name
            }
            await saveFile(filename, file, {
            onSuccess: (result) => {
                const url = result.url().replace('http','https')
                console.log(result, url, 'sign');
                fileLinks.push(url);},
            onError: (error) => console.log(error),
            });
            
        }



        if (!mergedObj[uploadName]) {
            mergedObj[uploadName] = [];
        }
        mergedObj[uploadName].push(...fileLinks);


        console.log(policyJSON, 'cjor')

        // policyData.set("policyJson", JSON.stringify(policyJSON))
        // console.log(JSON.stringify(policyJSON))
        // policyData.save()

        console.log(mergedObj, 'askdkak')

        setUploads(mergedObj)

        setOpenUpload(false)
        //window.location.reload()

    }


    return (
        <Modal>
            <XButton onClick={()=>setOpenUpload(false)}>X</XButton>
            <TypeLabel htmlFor="severity">Type of Doc</TypeLabel>
            <Severity name="uploadName" id="uploadName" onChange={(e) => setUploadName(e.target.value)}>

                {documents.map((document, index) => (
                    <option value={document}>{document}</option>
                ))}
            </Severity>
            <UploadLabel htmlFor="date">Upload</UploadLabel>
            <Date type="file" multiple id="upload" placeholder="Upload Files" onChange={(e) => setUploadDoc(e.target.files)}/>
            
            <Submit onClick={()=>onSubmit()}>Submit</Submit>
        </Modal>
    )
}

export default UploadModalApplication

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
    top: 50%;
    left: 5%;
    border: solid 1px black;
`

const TypeLabel = styled.label`
    position: absolute;
    top: 40%;
    left: 5%;
    font-style: italic;
`

const UploadLabel = styled.label`
    position: absolute;
    top: 40%;
    right: 35%;
    font-style: italic;
`

const Date = styled.input`
    position: absolute;
    top: 50%;
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