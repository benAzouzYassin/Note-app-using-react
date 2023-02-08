
import { useNavigate } from "react-router-dom";
import { Note as NoteType } from "./HomePage";
import { v4 as uuid } from "uuid";
import NoteForm, { Inputs/** this is a type*/ } from "../components/NoteForm";
type SubmitActionFunction = (data: Inputs) => void

export default function HomePage() {

    const Navigate = useNavigate()


    const notes: NoteType[] = JSON.parse(localStorage.getItem("notes") || "[]");



    const addNewNote: SubmitActionFunction = (data) => {
        const newNotes = [

            {
                title: data.noteTitle,
                body: data.noteBody,
                tags: [data.noteTag],
                id: uuid(),
            }, ...notes,
        ];
        localStorage.setItem("notes", JSON.stringify(newNotes));
        Navigate("/");
    };

    return (
        <NoteForm submitAction={addNewNote} />
    );
}
