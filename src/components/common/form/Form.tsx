// pages/InputExample.tsx
import React, { useState } from "react";
import Input from "../../ui/input/Input";
import { Box, Button } from "@mui/material";

interface Field {
    label: string;
    name: string;
    type?: string;
    value?: string;
    placeholder?: string;
    error?: boolean;
    helperText?: string;
}
// const fields: Field[] = [
//     {
//         label: "Username",
//         name: "username",
//         placeholder: "Enter your username",
//     },
//     {
//         label: "Email",
//         name: "email",
//         type: "email",
//         placeholder: "Enter your email",
//         error: false,
//         helperText: "",
//     },
//     {
//         label: "Password",
//         name: "password",
//         type: "password",
//         placeholder: "Enter your password",
//     },
// ];

interface FormProps {
    fields: Field[];
    onSubmit: (data: Record<string, string>) => void;
}
const Form = (prors: FormProps) => {
    const [formData, setFormData] = useState<Record<string, string>>(
        prors.fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // لمنع التحديث الافتراضي للصفحة
        prors.onSubmit(formData); // تمرير البيانات إلى الدالة المُعالجة
    };

    return (
        <Box>
            <form onSubmit={handleSubmit} style={{ padding: "16px", maxWidth: "400px", margin: "0 auto" }}>
                {prors.fields.length === 0 ? (
                    <Box>No Input Fields</Box>
                ) : (
                    prors.fields.map((field) => (
                        <Input
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            type={field.type || "text"}
                            placeholder={field.placeholder}
                            error={field.error}
                            helperText={field.helperText}
                        />
                    ))
                )}
                <Button sx={{ width: "100%" }} type="submit" variant="contained">
                    Contained
                </Button>
            </form>

        </Box>
    );

};

export default Form;
