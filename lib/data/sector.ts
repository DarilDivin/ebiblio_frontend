import { useSector } from "@/services/queries";
import { CreateSectorSpecialityProps, UpdateSectorSpecialityProps } from "@/types/sector";
import { csrf } from ".";
import axios from "../axios";
import { toast } from "sonner";

export const getAllFiliere = () => {
  // const { data: sectorResponse } = useSWR<GetAllSectorResponse>("api/sector", fetcher);
  const { data: sectorResponse, isLoading, error } = useSector();

  return {
    sectorsAndSpecialities: sectorResponse?.data,
    specialities: sectorResponse?.data.filter((sector) => sector.type === "Spécialité"),
    sectors: sectorResponse?.data.filter((sector) => sector.type === "Filière"),
    isLoading,
    error
  };
};

export const createSector = async ({setErrors, ...props}: CreateSectorSpecialityProps) => {
  await csrf();
  setErrors({})

  console.log(props);
  
  await axios
    .post('/api/sector', props )
    .then(() => toast.success('La filière à bien été créée. 👍🏾'))
    .catch(error => {
      if (error.response.status === 422) {
        console.log(error.response.data.errors);
        toast.error('Erreur de validation des champs 🧐')
      } else {
        toast.error('Une erreur inattendu est survenue 🧐')
      }
    })
} 

export const updateSector = async ({setErrors, sector, ...props }: UpdateSectorSpecialityProps) => {
  await csrf();
  setErrors({})

  await axios
    .put(`/api/sector/${sector}`, props)
    .then(() => toast.success('La filière à été modifié avec succès 👍🏾'))
    .catch((error) => {
      if (error.response.status === 422 ) {
        console.log(error.response.data.errors);
        toast.error('Erreur de validation des champs 🧐')
      } else {
        toast.error('Une erreur inattendu est survenue 🧐')
      }
    })
}


export const deleteSector = async ({sector}: {sector: number}) => {
  await csrf();
  
  await axios
    .delete(`/api/sector/${sector}`)
    .then(() => toast.success('La filière à été supprimée avec succès 👍🏾'))
    .catch((error) => {
      console.log(error.response.data.errors);
      if (error.response.status === 404) {
        toast.error('La soutenance ne peut être supprimé 😕')
      } else {
        toast.error('Une erreur inattendue est survenue 🧐')
      }
    })

}