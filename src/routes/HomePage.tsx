import { useEffect, useRef, useState } from "react";
import Note from "../components/Note";
import { useNavigate } from "react-router-dom";
import CreatableTags from "../components/CreatableTags";
import { MultiValue } from "react-select";

export interface Note {
    title: string
    body: string
    tags: string[]
    id: string
}
export interface Tag {
    value: string
    label: string
}
export default function HomePage() {

    const [notes, setNotes] = useState<Note[]>(JSON.parse(localStorage.getItem("notes") || "[]"))

    const Navigate = useNavigate()

    const AllNotesElems = notes.map(note => {
        return <Note key={note.id} title={note.title} body={note.body} tags={note.tags} id={note.id} delete={deleteNote} />

    })
    const [renderedNotes, setRenderedNotes] = useState<any>(AllNotesElems)


    useEffect(() => {

        localStorage.setItem("notes", JSON.stringify(notes))

    }, [notes])


    function deleteNote(id: string | undefined) {

        setNotes(oldNotes => {
            return oldNotes.filter(note => note.id != id)
        })

    }

    function handleTagChange(data: MultiValue<Tag>) {
        if (data.length > 0) {
            const selectedTags: string[] = data.map(tag => tag.label)
            const flitredNotes = notes.filter(note => {
                let test = true
                note.tags.forEach(tag => {
                    if (!selectedTags.includes(tag)) {
                        test = false
                    }
                })
                return test
            })
            const notesElem = flitredNotes.map(note => {
                return <Note key={note.id} title={note.title} body={note.body} tags={note.tags} id={note.id} delete={deleteNote} />

            })
            setRenderedNotes(notesElem)
        }
        else {
            const notesElem = notes.map(note => {
                return <Note key={note.id} title={note.title} body={note.body} tags={note.tags} id={note.id} delete={deleteNote} />

            })
            setRenderedNotes(notesElem)
        }
    }

    const tags = notes.flatMap(note => note.tags)
    const filtredTags = tags.filter((item, index) => tags.indexOf(item) === index);
    const filtredTagsObj: Tag[] = filtredTags.map(tag => { return { value: tag, label: tag } })


    return (

        <div className="w-screen h-screen lg:pl-[200px] lg:pr-[200px] pt-3 pr-10 pl-10">
            <h1 className="text-center text-4xl font-[500] mt-5">Notes app</h1>
            <div className="w-full flex justify-end pt-4"><button onClick={() => Navigate('/newNote')} className="p-3 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl">Create new Note</button></div>

            <div className="flex flex-col lg:flex-row w-full mb-10 gap-7 justify-center mt-7 h-12">

                <CreatableTags handleChange={handleTagChange} tags={filtredTagsObj} />

            </div>

            <div className="grid ml-auto grid-cols-1  pt-4 lg:pt-0 gap-4  md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 lg:gap-2 xl:gap-x-16 xl:gap-y-10  xl:grid-cols-4">
                {notes.length === 0 ? <h1>there is no notes</h1> : ""}
                {renderedNotes}
            </div>
        </div>
    );
}
