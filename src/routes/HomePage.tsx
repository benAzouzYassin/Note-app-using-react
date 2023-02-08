import { useContext, useEffect, useState } from "react";
import { TagsConext } from "../contexts/TagsContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { useWatch } from "react-hook-form/dist/useWatch";
import Note from "../components/Note";
import { useNavigate } from "react-router-dom";

type Inputs = {
    noteTitle: string;
    noteTag: string;

};
export interface Note {
    title: string
    body: string
    tags: string[]
    id: string
}
export default function HomePage() {

    const [notes, setNotes] = useState<Note[]>(JSON.parse(localStorage.getItem("notes") || "[]"))

    const { register, formState: { errors } } = useForm<Inputs>();

    const Navigate = useNavigate()

    const tagsContext = useContext(TagsConext);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])


    function deleteNote(id: string | undefined) {

        setNotes(oldNotes => {
            return oldNotes.filter(note => note.id != id)
        })

    }


    console.log(tagsContext?.tags)


    const notesElem = notes.map(note => {
        return <Note key={note.id} title={note.title} body={note.body} tags={note.tags} id={note.id} delete={deleteNote} />

    })

    return (

        <div className="w-screen h-screen lg:pl-[200px] lg:pr-[200px] pt-3 pr-10 pl-10">
            <h1 className="text-center text-4xl font-[500] mt-5">Notes app</h1>
            <div className="w-full flex justify-end pt-4"><button onClick={() => Navigate('/newNote')} className="p-3 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl">Create new Note</button></div>
            <form className="w-full mt-10 ">
                <div className="flex flex-col lg:flex-row w-full mb-10 gap-7 justify-center h-12">

                    <input type="text" {...register("noteTitle", { required: true })} placeholder="Note title" className="border-[2px] lg:w-1/2 rounded-lg border-gray-400 p-2 focus:border-blue-600 focus:shadow-sm focus:border-[2px] focus:outline-blue-600 outline-2" />
                    <input type="text" {...register("noteTag")} placeholder="Note Tag" className="border-[2px] lg:w-1/2 rounded-lg border-gray-400 shadow-md p-2 focus:border-blue-600 focus:border-[2px] focus:outline-blue-600 focus:shadow-md outline-2    " />

                </div>
            </form>
            {/* the note comp shold be generated automaticly */}
            <div className="grid ml-auto grid-cols-1  pt-4 lg:pt-0 gap-4  md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 lg:gap-2 xl:gap-x-16 xl:gap-y-10  xl:grid-cols-4">
                {notes.length === 0 ? <h1>there is no notes</h1> : ""}
                {notesElem}
            </div>
        </div>
    );
}
