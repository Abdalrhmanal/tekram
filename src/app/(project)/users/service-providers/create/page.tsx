"use client";
import React from 'react'
import DynamicForm, { FormData } from '../../components/dynamic-form';


function CreateCustomar() {
    const handleSubmit = (data: FormData) => {
        console.log('Submitted Data:', data);
    };
    const initialData: FormData = {
    city: 'حلب',
    name: 'علي حمضي',
    address: 'جمعية الزهراء',
    email: 'kareem.happal@gmail.com',
    phone: '0978654111',
    services: ['أجار شاليهات', 'أجار غرف فندقية'],
    // يمكنك إضافة صورة مبدئية إذا كنت ترغب في ذلك
    // image: new File([''], 'example.jpg', { type: 'image/jpeg' }),
  };

    return (
        <>
            <DynamicForm mode="add" onSubmit={handleSubmit} />

            <DynamicForm mode="edit" initialData={initialData} onSubmit={handleSubmit} />
        </>
    )
}

export default CreateCustomar