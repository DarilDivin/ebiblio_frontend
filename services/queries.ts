import { LastConfigResponse } from "@/types/configuration";
import { GetAllCycleResponse } from "@/types/cycle";
import { GetAllMemoryResponse } from "@/types/memory";
import { GetAllSectorResponse } from "@/types/sector";
import { GetAllSoutenanceResponse } from "@/types/soutenance";
import useSWR from "swr";

export function useMemory() {
  return useSWR<GetAllMemoryResponse>('/api/supportedMemory');
}

export function useMemoryByLink(url: string) {
  console.log(url)
  return useSWR<GetAllMemoryResponse>(url);
}

export function useSoutenance() {
  return useSWR<GetAllSoutenanceResponse>('/api/soutenance');
}

export function useSector() {
  return useSWR<GetAllSectorResponse>('api/sector');
}

export function useCycle() {
  return useSWR<GetAllCycleResponse>('api/cycle');
}

export function useLastConfig() {
  return useSWR<LastConfigResponse>('api/config/last');
}

export function useRole() {
  return useSWR('api/role');
}