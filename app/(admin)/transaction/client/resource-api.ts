import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useActiveOutlet } from "@/store/useOutletStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MITUNI_API_KEY = process.env.NEXT_PUBLIC_MITUNI_API_KEY;
const apiUrl = `${API_URL}/api/transactions`;
export const useTransactionData = (
  search: string,
  status: string,
  per_page: number,
  page: number
) => {
  const { outlet_id_active } = useActiveOutlet();
  const { data: session } = useSession();

  return useQuery<any>({
    queryKey: ["transaction", outlet_id_active, search, status, page, per_page],
    queryFn: async () => {
      if (!outlet_id_active) return null;
      if (status && Number(status) > 0) status = Number(status).toString();
      // Prepare the request body with filters
      const requestBody: any = {
        branch_id: outlet_id_active,
        search: search,
        status: status,
        page: page,
        per_page: per_page,
      };
      console.log("API Request:", {
        url: apiUrl,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-mituni-key": "***",
          Authorization: `Bearer ${
            session?.accessToken ? "***" : "not-provided"
          }`,
        },
        data: requestBody,
      });

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          Accept: "application/json",
          "x-mituni-key": `${MITUNI_API_KEY}`,
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      console.log("API Response:", {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      });

      if (!response.data || !response.data.data) {
        console.warn("Empty or invalid response data:", response.data);
      }

      return response.data;
    },
    enabled: !!session?.accessToken && !!outlet_id_active,
    // Add staleTime to prevent excessive refetching
    staleTime: 30000, // 30 seconds
    // Keep previous data while fetching new data
  });
};
export const useTransactionDataById = (id: string | number) => {
  const { outlet_id_active } = useActiveOutlet();
  const { data: session } = useSession();
  return useQuery<any, AxiosError>({
    queryKey: ["transaction-id", id, outlet_id_active],
    queryFn: async () => {
      if (!outlet_id_active) return null;
      const response = await axios.post(
        apiUrl,
        {
          branch_id: outlet_id_active,
          id: id,
        },
        {
          headers: {
            Accept: "application/json",
            "x-mituni-key": `${MITUNI_API_KEY}`,
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      return response.data.data;
    },
    enabled: !!session?.accessToken && !!outlet_id_active,
  });
};
export const useCustomerDeleteDataById = (id: string | number) => {
  const { outlet_id_active } = useActiveOutlet();
  const { data: session } = useSession();
  return useQuery<{ data: any }, AxiosError>({
    queryKey: ["customer-delete-id", id, outlet_id_active],
    queryFn: async () => {
      if (!outlet_id_active) return null;
      const response = await axios.post(
        apiUrl + "/delete",
        {
          branch_id: outlet_id_active,
          id: id,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-mituni-key": `${MITUNI_API_KEY}`,
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!session?.accessToken && !!outlet_id_active,
  });
};
