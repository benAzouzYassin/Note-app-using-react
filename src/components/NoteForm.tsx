import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Note } from "../routes/HomePage";
export interface Inputs {
    noteTitle: string;
    noteTag: string;
    noteBody: string;

};
interface Props {
    submitAction: (data: Inputs) => void
    noteData?: Note
    isEditing?: boolean
    //if editing is true we are gonna display the note data
}
////////////////////////////the component///////////////////////
export default function NoteForm(props: Props) {
    const Navigate = useNavigate();



    const {
        register,
        setValue,
        handleSubmit,//this will pass form data to the function that is passed to her
        formState: { errors },
    } = useForm<Inputs>();

    useEffect(() => {
        if (props.noteData && props.isEditing) {
            setValue("noteTitle", props.noteData!.title)
            setValue("noteBody", props.noteData!.body)
            setValue("noteTag", props.noteData!.tags[0])
        }
        else if (props.isEditing) {
            throw new Error("there is no note to edit")

        }

    }, [])


    return <div className="w-screen h-screen lg:pl-[200px] lg:pr-[200px] pt-3 pr-10 pl-10">
        <div className="w-full flex justify-end pt-4">
            <button
                onClick={() => Navigate("..")}
                className="p-3 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl mb-10 lg:mb-2"
            >
                Back
            </button>
        </div>
        <form onSubmit={handleSubmit(props.submitAction)} className="w-full h-full mt-10 ">
            <div className="flex flex-col lg:flex-row w-full mb-10 gap-7 justify-center h-12">
                <div className="flex flex-col lg:w-1/2">
                    <input
                        type="text"
                        {...register("noteTitle", { required: true, maxLength: 24 })}
                        placeholder="Note title"
                        className="border-[2px] lg:w-full rounded-lg border-black p-2 focus:border-blue-600 focus:border-[2px] focus:shadow-xl focus:outline-none" />
                    {errors.noteTitle?.type == "required" && (
                        <label className="text-sm text-red-600 mb-[-10px] inline-block">
                            {" "}
                            note title is required{" "}
                        </label>
                    )}
                    {errors.noteTitle?.type == "maxLength" && (
                        <label className="text-sm text-red-600 mb-7 inline-block">
                            {" "}
                            max length is 24{" "}
                        </label>
                    )}
                </div>
                <div className="flex flex-col lg:w-1/2">
                    {" "}
                    <input
                        type="text"
                        {...register("noteTag", { required: true, maxLength: 24 })}
                        placeholder="Note Tag"
                        className="border-[2px]  rounded-lg border-black p-2 focus:border-blue-600 focus:border-[2px] border-spacing-0 w-full focus:shadow-md focus:outline-none    " />
                    {errors.noteTag?.type == "required" && (
                        <label className="text-sm text-red-600 mb-7 inline-block">
                            {" "}
                            tags are required{" "}
                        </label>
                    )}
                    {errors.noteTag?.type == "maxLength" && (
                        <label className="text-sm text-red-600 mb-7 inline-block">
                            {" "}
                            max length is 24{" "}
                        </label>
                    )}
                </div>
            </div>
            <input
                type="text "
                {...register("noteBody", { required: true })}
                placeholder="Note Body"
                className=" border-black border-2 w-full pb-[300px] mb-2 rounded-[15px] pt-2 pl-2 mt-2 lg:mt-0" />

            <div className="w-full flex">
                <button className="border-black border-2 ml-auto p-2 rounded-xl text-white bg-indigo-600 outline-none border-none hover:bg-indigo-800 pl-5 pr-5">
                    Save
                </button>
                <button
                    className=" border-solid border-2 ml-3 p-2 rounded-xl text-indigo-700 border-indigo-800 bg-white-600 outline-none  hover:bg-indigo-100 pl-5 pr-5"
                    onClick={(e) => {
                        e.preventDefault;
                        Navigate("..");
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>;
}

