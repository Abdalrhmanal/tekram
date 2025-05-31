"use client";
import React, { useState } from 'react'
import DynamicForm, { CustomerFormData } from '../../components/dynamic-form';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function CreateCustomar() {
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const router = useRouter();
    const token = Cookies.get("a_user");

    const handleSubmit = async (data: CustomerFormData) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((item, idx) => {
                        formData.append(`${key}[${idx}]`, item);
                    });
                } else if (value !== undefined && value !== null) {
                    formData.append(key, value as string);
                }
            });
            const response = await fetch("http://145.223.116.44:9993/api/hosts", {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const result = await response.json();
            if (response.ok) {
                setAlertMessage("تمت إضافة المنصة بنجاح!");
                setAlertSeverity("success");
                setOpenAlert(true);
                router.back();
            } else {
                setAlertMessage(`خطأ: ${result.message || "حدث خطأ أثناء الإرسال"}`);
                setAlertSeverity("error");
                setOpenAlert(true);
            }
        } catch (error) {
            setAlertMessage("حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.");
            setAlertSeverity("error");
            setOpenAlert(true);
        } finally {
            setIsLoading(false);
        }
    };

    const initialData: CustomerFormData = {
        name: '',
        email: '',
        phone: '',
        password: '',
        host_name: '',
        bio: '',
        city: '',
        location: '',
        address: '',
        services: [],
    };

    return (
        <>
            <DynamicForm mode="add" initialData={initialData} onSubmit={handleSubmit} />
            {/* يمكنك هنا إضافة كود Snackbar لعرض التنبيهات إذا رغبت */}
        </>
    );
}

export default CreateCustomar;
{/*  <DynamicForm mode="edit" initialData={initialData} onSubmit={handleSubmit} /> */ }

