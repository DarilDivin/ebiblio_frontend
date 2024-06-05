import { useSector } from "@/services/queries";

export const getAllFiliere = () => {
  // const { data: sectorResponse } = useSWR<GetAllSectorResponse>("api/sector", fetcher);
  const { data: sectorResponse } = useSector();

  return {
    sectorsAndSpecialities: sectorResponse?.data,
    specialities: sectorResponse?.data.filter((sector) => sector.type === "Spécialité"),
    sectors: sectorResponse?.data.filter((sector) => sector.type === "Filière"),
  };
};
