import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type UseDeleteDataOptions = {
    dataSourceName: string;
};

type UseDeleteDataResult = {
    isLoading: boolean;
    isError: string | null;
    success: boolean;
    deleteData: (ids: string[]) => Promise<boolean>; // ✅ رجع قيمة boolean
};

const BASE_URL = "http://145.223.116.44:9993";

const useOffUsersData = ({
    dataSourceName,
}: UseDeleteDataOptions): UseDeleteDataResult => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const deleteData = async (ids: string[]): Promise<boolean> => {
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
            await axios.request({
                url,
                method: "DELETE",
                headers,
                data: { ids },
            });

            setSuccess(true);
            return true; 
        } catch (error: unknown) {
            setIsError(error instanceof Error ? error.message : "An unknown error occurred.");
            return false; 
        } finally {
            setIsLoading(false);
        }
    };


    return { isLoading, isError, success, deleteData };
};

export default useOffUsersData;
