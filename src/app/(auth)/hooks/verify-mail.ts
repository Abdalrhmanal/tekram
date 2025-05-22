import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type UseVerifyMailResult = {
  verifyCode: (code: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: string | null;
};

const useVerifyMail = (): UseVerifyMailResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const verifyCode = async (code: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = Cookies.get("token");

      if (!token) {
        throw new Error("الرمز غير موجود. قم بتسجيل الدخول أولاً.");
      }

      const response = await axios.post(
        "http://145.223.116.44:9993/api/verify-mail",
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = response.data as { message?: string };
      setSuccess(data.message || "تم التحقق من البريد الإلكتروني بنجاح.");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "فشل التحقق من الرمز. حاول مرة أخرى."
      );
    } finally {
      setLoading(false);
    }
  };

  return { verifyCode, loading, error, success };
};

export { useVerifyMail };
