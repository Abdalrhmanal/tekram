"use client";
import React from 'react'
import DynamicForm, { FormData } from '../../components/dynamic-form';


function CreateCustomar() {
    const handleSubmit = (data: FormData) => {
        console.log('Submitted Data:', data);
    };
    return (
        <>
            <DynamicForm mode="add" onSubmit={handleSubmit} />
        </>
    )
}

export default CreateCustomar