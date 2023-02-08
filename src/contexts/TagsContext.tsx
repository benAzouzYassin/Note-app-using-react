import { createContext, useEffect, useState } from "react"
//this context contains all the tags used in the up so i can suggegst the later
interface Props {
    children: React.ReactElement
}
interface ContextType {
    tags: string[]
    addTag: (tag: string) => void
}
export const TagsConext = createContext<ContextType | null>(null)
export function TagsConextProvider({ children }: Props) {

    const [tags, setTags] = useState<string[]>(JSON.parse(localStorage.getItem("tags") || "[]"))
    useEffect(() => {
        localStorage.setItem("tags", JSON.stringify(tags))
    }, [tags])
    //gonna add tag if it does not exist
    function addTag(tag: string) {
        if (tags.indexOf(tag) != -1) {
            setTags(oldTags => [...oldTags, tag])
        }
    }

    return <TagsConext.Provider value={{ tags, addTag }}> {children}</TagsConext.Provider >
}