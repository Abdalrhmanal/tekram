import { useState } from "react";
import axios from "axios";

// Types for Register
type RegisterData = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  gender: "male" | "female"; // لتحديد القيم المسموحة فقط
};

type UserData = {
  token: string;
  email: string;
  id: string;
  user_id: string;
  name: string;
  avatar: string;
  phone_number: string;
  gender: string;
  city: string | null;
  address: string | null;
  mail_verify_code: number;
  mail_code_attempts_left: number;
  mail_verify_code_sent_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type UseRegisterResult = {
  register: (data: RegisterData) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: string | null;
  userData: UserData | null;
};

// useRegister Hook
const useRegister = (): UseRegisterResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setUserData(null);

    try {
      const response = await axios.post(
        "http://145.223.116.44:9993/api/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": "en",
          },
        }
      );

      const responseData = response.data as { message?: string; data: UserData };

      // تخزين التوكن في localStorage أو في الكوكيز
      localStorage.setItem("token", responseData.data.token);

      setSuccess(responseData.message || "تم إنشاء الحساب بنجاح");
      setUserData(responseData.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "فشل في إنشاء الحساب. حاول مرة أخرى."
      );
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success, userData };
};

export { useRegister };
