import { Flex, Section, SubSection, TileItem, Title, AddButton } from '../shared'
import { useState, useEffect } from 'react'
import NotesModal from '../InfoSections/NotesModal'
import EditNotesModal from '../InfoSections/EditNotesModal'

const Notes = ({ notesList, policyNum }) => {
    const [addNote, setAddNote] = useState(false)
    const [editNote, setEditNote] = useState(false)
    const [docValues, setDocValues] = useState(notesList.values)
    const [editedNote, setEditedNote] = useState(null)
    const [indexVal, setIndexVal] = useState(0)

    const openNote = () => {
        setAddNote(true)
    }
    const closeNote = () => {
        setAddNote(false)
    }

    return (
        <>
        <Section>
                <Title>Notes</Title>
                <AddButton onClick={()=>openNote()}>Add Note +</AddButton>
                    {docValues && docValues.map((val, i) => {
                        return (
                        <SubSection>
                            <Flex>
                                <TileItem title="Date" value={val.Date}/>
                                <TileItem title="Severity" value={val.Severity}/>
                                <TileItem title="Note" value={val.Note.slice(0,20)}/>
                                <TileItem title="Edit Note" value={<button onClick={()=>{setEditNote(true); setEditedNote(val); setIndexVal(i)}}>✏️</button>}/>

                            </Flex>
                        </SubSection>
                        )
                    })}
        </Section>
        {addNote && 
        <NotesModal notesList={notesList} policyNum={policyNum} setOpenNotesModal={setAddNote} />}
        {editNote && 
            <EditNotesModal notesList={notesList} policyNum={policyNum} setEditNotesModal={setEditNote} editedNote={editedNote} index={indexVal}/>
        }
        </> 
    )
}

export default Notes
