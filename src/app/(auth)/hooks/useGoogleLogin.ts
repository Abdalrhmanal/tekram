import { useState } from "react";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

type UseGoogleLoginResult = {
  loginWithGoogle: () => Promise<void>;
  loading: boolean;
  error: string | null;
  success: string | null;
  userName: string | null;
};

const useGoogleLogin = (): UseGoogleLoginResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.get(
        "http://145.223.116.44:9993/api/auth/google",
        {
          withCredentials: true,
        }
      );
      // console.log(response.data.data.url);
      const URL = response.data.data.url;
      // console.log(URL);

      if (response.status === 200 && URL) {
        window.location.href = URL;
      } else {
        throw new Error("Failed to retrieve Google login URL.");
      }

      const userResponse = await axios.get(
        "http://145.223.116.44:9993/api/auth/google/callback",
        {
          withCredentials: true,
        }
      );

      const user = userResponse.data.user;

      if (user) {
        setUserName(user.name); // حفظ اسم المستخدم
        setSuccess("Successfully logged in with Google!");
        router.push("/dashboard"); // توجيه المستخدم إلى لوحة التحكم
      } else {
        throw new Error("Failed to retrieve user information.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred during Google login."
      );
    } finally {
      setLoading(false);
    }
  };

  return { loginWithGoogle, loading, error, success, userName };
};

export default useGoogleLogin;
