import useSWR from "swr";
import { fetcher } from ".";
import { GetAllSoutenanceResponse } from "@/types/soutenance";
import { useSoutenance } from "@/services/queries";

export const getAllSoutenance = () => {
  // const { data: soutenanceResponse } = useSWR<GetAllSoutenanceResponse>("api/soutenance", fetcher);
  const { data: soutenanceResponse } = useSoutenance();

  return soutenanceResponse?.data;
};