import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

type LoginData = {
  email: string;
  password: string;
};

const useLogin = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const login = async (data: LoginData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      interface ApiResponse {
        data: {
          token: string;
          id: number;
          user_id: number;
          email: string;
          username: string;
          name?: string;
          phone_number?: string;
          avatar?: string | null;
          is_active: number;
          gender?: string | null;
          city?: string | null;
          address?: string | null;
          role?: string;
          permissions?: string[];
        };
        [key: string]: any;
      }

      const response = await axios.post<ApiResponse>(
        "http://145.223.116.44:9993/api/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Full Response Data:", response.data);

      const resData = response.data.data;
      const token = resData.token;

      if (!token) {
        throw new Error("Token is missing from the response");
      }

      const extractedUser = {
        id: String(resData.id),
        userId: resData.user_id,
        email: resData.email,
        username: resData.username,
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

      console.log("Extracted Token:", token);
      console.log("Extracted User Data:", extractedUser);

      Cookies.set("auth_user", token, { expires: 7 });
      Cookies.set("user_data", JSON.stringify(extractedUser), { expires: 7 });

      setSuccess("تم تسجيل الدخول بنجاح");
      setUser(extractedUser);
      router.push("/");
    } catch (err: any) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "فشل في تسجيل الدخول. حاول مرة أخرى."
      );
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
};

export default useLogin;
