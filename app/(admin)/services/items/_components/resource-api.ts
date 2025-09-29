import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MITUNI_API_KEY = process.env.NEXT_PUBLIC_MITUNI_API_KEY;
const apiUrl = `${API_URL}/api/services/unit`;
export const useServicesUnitData = () => {
    const { data: session } = useSession();
    return useQuery<any>({
      queryKey: ["services-unit"],
      queryFn: async () => {
        const response = await axios.get(
          apiUrl,
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
      enabled: !!session?.accessToken,
    });
  };
