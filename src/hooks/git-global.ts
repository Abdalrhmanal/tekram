"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs"; // مكتبة لتنسيق الـ Query Parameters

type QueryPayload = {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
  sort_SortBy?: string;
  sort_Ascending?: boolean;
  filter_Conditions?: Record<string, any>[];
  filter_Logic?: string;
  [key: string]: any; // Allow dynamic keys for filter conditions
};

type UseGlobalDataOptions<T> = {
  dataSourceName: string;
  enabled?: boolean;
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
  sort_SortBy?: string;
  sort_Ascending?: boolean;
  filter_Conditions?: Record<string, any>[];
  filter_Logic?: string;
  setOldDataAsPlaceholder?: boolean;
};

type UseGlobalDataResult<T> = {
  data: T | null;
  isLoading: boolean;
  isFetching: boolean;
  isError: string | null;
  refetch: () => void;
};

const BASE_URL = "http://145.223.116.44:9993";

const useGlobalDataT = function <T>({
  dataSourceName,
  enabled = true,
  pageNumber = 1,
  pageSize = 10,
  keyword,
  sort_SortBy,
  sort_Ascending,
  filter_Conditions = [],
  filter_Logic = "AND",
}: UseGlobalDataOptions<T>): UseGlobalDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  // تحويل بيانات الفلترة إلى شكل Query Params المناسب
  const buildQueryParams = () => {
    const queryPayload: QueryPayload = {
      pageNumber,
      pageSize,
      keyword,
      sort_SortBy,
      sort_Ascending,
      filter_Logic,
    };

    // تحويل filter_Conditions إلى الشكل المطلوب
    filter_Conditions.forEach((condition, index) => {
      queryPayload[`Filter.Conditions[${index}][field]`] = condition.field;
      queryPayload[`Filter.Conditions[${index}][operator]`] =
        condition.operator;
      queryPayload[`Filter.Conditions[${index}][value]`] = condition.value;
    });

    return qs.stringify(queryPayload, { encode: false });
  };

  const fetchData = async () => {
    if (!enabled) return;

    setIsFetching(true);
    setIsError(null);

    try {
      const token = Cookies.get("a_user");
      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const url = `${BASE_URL}/${dataSourceName}`;
      const queryString = buildQueryParams();

      console.log(`Fetching data from: ${url}?${queryString}`);

      const response = await axios.get(`${url}?${queryString}`, { headers });

      setData(response.data as T);
    } catch (error) {
      /* if (axios.isAxiosError(error)) {
        setIsError(error.response?.data?.message || error.message);
      } else */ if (error instanceof Error) {
        setIsError(error.message);
      } else {
        setIsError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      setIsLoading(true);
      fetchData();
    }
  }, [
    dataSourceName,
    enabled,
    pageNumber,
    pageSize,
    keyword,
    sort_SortBy,
    sort_Ascending,
    filter_Logic,
    JSON.stringify(filter_Conditions),
  ]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, isFetching, isError, refetch };
};

export default useGlobalDataT;
