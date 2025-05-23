import { Metadata } from 'next';
import React from 'react'
import ForgotPasswordPage from './ForgotPassword';


export const metadata: Metadata = {
    title: "Tekram | Forgot Password",
};
function ForgotPassword() {
    return <ForgotPasswordPage />
}

export default ForgotPassword