import { useState } from "react";
import axios from "axios";

type ChangePasswordData = {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
};

type UseChangePasswordResult = {
    changePassword: (data: ChangePasswordData) => Promise<void>;
    loading: boolean;
    error: string | null;
    success: string | null;
};

const useChangePassword = (): UseChangePasswordResult => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    type ChangePasswordResponse = {
        message: string;
        [key: string]: any;
    };

    const changePassword = async (data: ChangePasswordData) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post<ChangePasswordResponse>("http://145.223.116.44:9993/api/change-password", data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "Accept-Language": "en",
                },
            });

            setLoading(false);
            setSuccess(response?.data?.message || "Password changed successfully!");

        } catch (err: any) {
            setLoading(false);
            setError(err.response?.data?.message || "Failed to change the password. Please try again.");
        }
    };

    return { changePassword, loading, error, success };
};

export default useChangePassword;
