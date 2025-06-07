import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type UseDeleteDataOptions = {
  dataSourceName: string; // يجب أن يحتوي على الـ id المطلوب حذفه
};

type UseDeleteDataResult = {
  isLoading: boolean;
  isError: string | null;
  success: boolean;
  deleteData: () => Promise<void>; // بدون معاملات
};

const BASE_URL = "http://145.223.116.44:9993";

const useDeleteData = ({ dataSourceName }: UseDeleteDataOptions): UseDeleteDataResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteData = async (): Promise<void> => {
    setIsLoading(true);
    setIsError(null);
    setSuccess(false);

    try {
      const token = Cookies.get("a_user");
      if (!token) throw new Error("Authentication token is missing.");

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Accept-Language": "en",
      };

      const url = `${BASE_URL}/${dataSourceName}`;
      await axios.delete(url, { headers });

      setSuccess(true);
    } catch (error: unknown) {
      setIsError(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, success, deleteData };
};

export default useDeleteData;
