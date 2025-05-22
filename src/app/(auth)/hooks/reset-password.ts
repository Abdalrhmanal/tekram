import { useState } from "react";
import axios from "axios";

type ResetPasswordData = {
    email: string;
};

type UseResetPasswordResult = {
    resetPassword: (data: ResetPasswordData) => Promise<void>;
    loading: boolean;
    error: string | null;
    success: string | null;
};

const useResetPassword = (): UseResetPasswordResult => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const resetPassword = async (data: ResetPasswordData) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post("http://145.223.116.44:9993/api/reset-password", data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });

            setLoading(false);
            setSuccess(response.data.message || "Password reset link sent to your email!");

        } catch (err: any) {
            setLoading(false);
            setError(err.response?.data?.message || "Failed to send password reset link. Please try again.");
        }
    };

    return { resetPassword, loading, error, success };
};

export default useResetPassword;
