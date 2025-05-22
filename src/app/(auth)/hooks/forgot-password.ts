import { useState } from "react";
import axios from "axios";

type ForgetPasswordData = {
    email: string;
};

type UseForgetPasswordResult = {
    forgetPassword: (data: ForgetPasswordData) => Promise<void>;
    loading: boolean;
    error: string | null;
    success: string | null;
};

const useForgetPassword = (): UseForgetPasswordResult => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const forgetPassword = async (data: ForgetPasswordData) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post("http://145.223.116.44:9993/api/forget-password", data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });

            setLoading(false);
            setSuccess(response.data.message || "Password recovery link has been sent to your email!");

        } catch (err: any) {
            setLoading(false);
            setError(err.response?.data?.message || "Failed to process your request. Please try again.");
        }
    };

    return { forgetPassword, loading, error, success };
};

export default useForgetPassword;
