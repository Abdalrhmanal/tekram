import { Metadata } from 'next';
import React from 'react'
import ForgotPasswordPage from './ForgotPassword';


export const metadata: Metadata = {
    title: "Templeat | Forgot Password",
};
function ForgotPassword() {
    return <ForgotPasswordPage />
}

export default ForgotPassword