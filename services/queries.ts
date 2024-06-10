import { GetAllBookResponse } from "@/types/book";
import { LastConfigResponse } from "@/types/configuration";
import { GetAllCycleResponse } from "@/types/cycle";
import { GetAllKeywordResponse } from "@/types/keyword";
import { GetAllMemoryResponse } from "@/types/memory";
import { GetAllSchoolYearResponse } from "@/types/schoolyear";
import { GetAllSectorResponse } from "@/types/sector";
import { GetAllSoutenanceResponse } from "@/types/soutenance";
import useSWR from "swr";

export function useMemory() {
  return useSWR<GetAllMemoryResponse>('/api/supportedMemory/no-pagination');
}

export function useBook() {
  return useSWR<GetAllBookResponse>('/api/article/no-pagination')
}

export function useBookByLink(url: string) {
  return useSWR<GetAllBookResponse>(url)
}

export function useMemoryByLink(url: string) {
  console.log(url)
  return useSWR<GetAllMemoryResponse>(url);
}

export function useSchoolYear() {
  return useSWR<GetAllSchoolYearResponse>('/api/schoolYear')
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

export function useKeyword() {
  return useSWR<GetAllKeywordResponse>('api/keywords');
}