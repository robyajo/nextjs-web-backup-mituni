import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useActiveOutlet } from "@/store/useOutletStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MITUNI_API_KEY = process.env.NEXT_PUBLIC_MITUNI_API_KEY;
const apiUrl = `${API_URL}/api/perfume`;
export const usePerfumeData = () => {
    const { outlet_id_active } = useActiveOutlet();
    const { data: session } = useSession();

    return useQuery<any>({
      queryKey: ["perfume", outlet_id_active],
      queryFn: async () => {
        if (!outlet_id_active) return null;
        const response = await axios.post(
          apiUrl,
          {
            branch_id: outlet_id_active,
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
export const usePerfumeDataById = (id: string | number) => {
    const { outlet_id_active } = useActiveOutlet();
    const { data: session } = useSession();
    return useQuery<any>({
      queryKey: ["perfume-id", id],
      queryFn: async () => {
        if (!outlet_id_active) return null;
        const response = await axios.post(
          apiUrl ,
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
export const usePerfumeDeleteDataById = (id: string | number) => {
    const { outlet_id_active } = useActiveOutlet();
    const { data: session } = useSession();
    return useQuery<any>({
      queryKey: ["perfume-delete-id", id],
      queryFn: async () => {
        if (!outlet_id_active) return null;
        const response = await axios.post(
          apiUrl + "/delete" ,
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