import { Metadata } from 'next';
import React from 'react'
import CreatePasswordPage from './CreatePassword';

export const metadata: Metadata = {
    title: "Tekram | Create Password",
};
function CreatePassword() {
    return <CreatePasswordPage />
}

export default CreatePassword