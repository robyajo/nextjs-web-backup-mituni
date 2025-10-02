import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useActiveOutlet } from "@/store/useOutletStore";

export const useCustomerData = () => {
  const { outlet_id_active } = useActiveOutlet();

  return useQuery<{ data: any }, AxiosError>({
    queryKey: ["customer-data", outlet_id_active],
    queryFn: async () => {
      if (!outlet_id_active) return null;

      const response = await axios.post("/api/customers", {
        branch_id: outlet_id_active,
      });

      return response.data;
    },
    enabled: !!outlet_id_active,
  });
};
