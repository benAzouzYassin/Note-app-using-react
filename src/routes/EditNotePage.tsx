import { useNavigate, useParams } from "react-router-dom"
import NoteForm, { Inputs } from "../components/NoteForm"
import { Note } from "./HomePage"
import useLocalStorage from "use-local-storage"

type NoteSearchType = (notes: Note[], targetId: string | undefined, start?: number, end?: number) => number
const noteSearch: NoteSearchType = (notes, targetId, start = 0, end = notes.length - 1) => {

    if (start > end) return -1;


    let mid = Math.floor((start + end) / 2);

    if (notes[mid].id === targetId) return mid;


    if (targetId && notes[mid].id > targetId)
        return noteSearch(notes, targetId, start, mid - 1);
    else


        return noteSearch(notes, targetId, mid + 1, end);
}
export default function EditNotePage() {

    //creat edit note function which saves the edited note 
    const [notes, setNotes] = useLocalStorage<Note[]>("notes", [])
    const { id } = useParams()
    const Navigate = useNavigate()

    function updateNote(newNoteData: Inputs) {
        //should update a  note
        const target = noteSearch(notes, id)
        const newNotes = [...notes]
        newNotes.splice(target, 1, { title: newNoteData.noteTitle, id: id!, body: newNoteData.noteBody, tags: [newNoteData.noteTag] });
        localStorage.setItem("notes", JSON.stringify(newNotes))
        Navigate('/')
    }
    const selectedNote: Note[] = notes.filter(note => note.id === id)
    if (noteSearch(notes, id) < 0) {
        return <h1> note is not found</h1>
    }
    return (<NoteForm submitAction={updateNote} isEditing={true} noteData={selectedNote[0]} />)
}