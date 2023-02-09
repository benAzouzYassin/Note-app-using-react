import React, { useState } from 'react'
import { MultiValue, components } from 'react-select';
import CreatableSelect from 'react-select/creatable'
import { Tag } from '../routes/HomePage';





const Menu = (props: any) => {
    const optionSelectedLength = props.getValue().length || 0;
    return (
        <components.Menu {...props}>
            {optionSelectedLength < 5 ? (props.children) : (<div style={{ margin: 15 }}>Max limit achieved</div>)}
        </components.Menu>
    );
};

const isValidNewOption = (inputValue: string) => false

interface Props {
    tags: Tag[]
    handleChange: (options: MultiValue<Tag>) => void
}

export default function CreatableTags(props: Props) {

    return (
        <CreatableSelect onChange={props.handleChange} components={{ Menu }} isValidNewOption={isValidNewOption} placeholder="search tags" isMulti options={props.tags} className="w-full lg:w-1/2 s" />
    )
}
//TO REUSE JUST CHANGE THE PROP OF HANDLE CHANGE