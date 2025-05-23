import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

type RegisterData = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  gender: "male" | "female";
};

type ApiResponse = {
  message?: string;
  data: {
    token: string;
    id: string;
    user_id: string;
    email: string;
    name?: string;
    phone_number?: string;
    avatar?: string | null;
    is_active?: number;
    gender?: string | null;
    city?: string | null;
    address?: string | null;
    role?: string;
    permissions?: string[];
    [key: string]: any;
  };
};

type UseRegisterResult = {
  register: (data: RegisterData) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: string | null;
  userData: any | null;
};

const useRegister = (): UseRegisterResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  const { setUser } = useAuth();
  const router = useRouter();

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setUserData(null);

    try {
      const response = await axios.post<ApiResponse>(
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

      const resData = response.data.data;
      const token = resData.token;

      if (!token) {
        throw new Error("Token is missing from the response");
      }

      const extractedUser = {
        id: String(resData.id),
        userId: resData.user_id,
        email: resData.email,
        username: resData.username || resData.name || "Unknown",
        fullName: resData.name || "Unknown",
        phoneNumber: resData.phone_number || "N/A",
        avatar: resData.avatar || null,
        isActive: resData.is_active === 1,
        gender: resData.gender || null,
        city: resData.city || null,
        address: resData.address || null,
        role: resData.role || "user",
        permissions: resData.permissions || [],
      };

      Cookies.set("a_user", token, { expires: 7 });
      Cookies.set("user_data", JSON.stringify(extractedUser), { expires: 7 });

      setSuccess(response.data.message || "تم إنشاء الحساب بنجاح");
      setUserData(extractedUser);
      setUser(extractedUser); // تخزينه في الـ Context
     // router.push("/verify"); // إعادة التوجيه (تقدر تغيّر الوجهة حسب منطقك)
    } catch (err: any) {
      console.error("Register Error:", err.response?.data || err.message);
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
