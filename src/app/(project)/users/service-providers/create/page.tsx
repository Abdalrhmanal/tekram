"use client";
import React from 'react'
import DynamicForm, { FormData } from '../../components/dynamic-form';
import useCreateData from '@/hooks/post-global';


function CreateCustomar() {
    const { isLoading, isError, success, createData } = useCreateData({
        dataSourceName: `api/host`
    });

    const handleSubmit = (data: FormData) => {
        createData(data); // إرسال البيانات إلى الـ API
    };

    const initialData: FormData = {
        full_name: '',
        email: '',
        phone: '',
        password: '',
        host_name: '',
        bio: '',
        logo: new File([''], 'example.jpg', { type: 'image/jpeg' }),
        avatar: new File([''], 'example.jpg', { type: 'image/jpeg' }),
        city: '',
        location: '',
        address: '',
        services: ['', ''],
        image: new File([''], 'example.jpg', { type: 'image/jpeg' }),
    };

    return (
        <>
            {/* <DynamicForm mode="add" onSubmit={handleSubmit} /> */}
        <DynamicForm mode="add" initialData={initialData} onSubmit={handleSubmit} />
        </>
    );
}

export default CreateCustomar;
{/*  <DynamicForm mode="edit" initialData={initialData} onSubmit={handleSubmit} /> */ }

