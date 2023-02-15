import { v4 as uuid } from "uuid"
import { Note as NoteType } from "../routes/HomePage"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

interface Props extends NoteType {
    delete: (id: string | undefined) => void
}
export default function Note(props: Props) {
    const [containerClass, setContainerClass] = useState("pl-4 pt-2 w-full lg:w-[250px] flex flex-col bg-white border-black border-[3px] shadow-sm hover:shadow-2xl hover:cursor-pointer border-solid  h-[120px] xl:h-[170px] rounded-xl pr-2 ")

    const Navigate = useNavigate()
    const handleClick = () => {
        Navigate(`edit/${props.id}`)
    }
    function handleDelete() {

        props.delete(props.id)
        setContainerClass("hidden")

    }
    return <>
        <div className={containerClass}>
            <FontAwesomeIcon onClick={handleDelete} className="ml-auto mb-[-10px] font-bold pr-2  p-1 hover:w-5 hover:h-5 " color="#cf2129" icon={faX} />
            <div onClick={handleClick} className="">
                <h1 className="text-xl font-[500]" >{props.title}</h1>
                <p className="text-sm">{props.body}</p>
                <ul className="flex gap-1 mt-auto mb-5 text-white">
                    {props.tags.map(tag => <li className=" bg-emerald-600 rounded-lg  p-1 font-[600] w-12 min-w-fit hover:bg-emerald-800 text-center text-white text-[10px] " key={uuid()}>{tag} </li>)}
                </ul></div>
        </div>
    </>
}