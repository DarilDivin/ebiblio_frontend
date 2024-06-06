import useSWR from "swr";
import { csrf, fetcher } from ".";
import { CreateSoutenanceProps, EditSoutenanceProps, GetAllSoutenanceResponse } from "@/types/soutenance";
import { useSoutenance } from "@/services/queries";
import axios from "../axios";
import { toast } from "sonner";
import { EditCycleProps } from "@/types/cycle";

export const getAllSoutenance = () => {
  // const { data: soutenanceResponse } = useSWR<GetAllSoutenanceResponse>("api/soutenance", fetcher);
  const { data: soutenanceResponse, isLoading, error } = useSoutenance();

  return { soutenances: soutenanceResponse?.data, isLoading, error };
};

export const createSoutenance = async ({setErrors, ...props}: CreateSoutenanceProps) => {

  await csrf();
  setErrors({});

  await axios
    .post('/api/soutenance', props)
    .then(() => toast.success('Soutenance Crée avec succès 👍🏾'))
    .catch((error) => {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
        console.log(error.response.data.errors)
        toast.error('Erreur de validation')

        if (error.response.data.errors == 'Cette soutenance existe déjà' ) {
          toast.error(error.response.data.errors)
        }
      } else {
        toast.error('Une erreur inattendue est survenue 🧐')
      }
    })
}

export const updateSoutenance = async ({setErrors, soutenance, ...props}: EditSoutenanceProps) => {
  await csrf();
  setErrors({})

  await axios
    .put(`/api/soutenance/${soutenance}`, props)
    .then(() => toast.success('Soutencance Modifié avec succès 👍🏾'))
    .catch((error) => {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
        toast.error('Erreur de validation')
      } else {
        toast.error('Une erreur inattendue est survenue 🧐')
      }
    })
}
 
export const deleteSoutenance = async ({soutenance}: {soutenance: number}) => {
  await csrf();
  
  await axios
    .delete(`/api/soutenance/${soutenance}`)
    .then(() => toast.success('Soutenance supprimé avec succès 👍🏾'))
    .catch((error) => {
      if (error.response.status === 404) {
        toast.error('La soutenance ne peut être supprimé 😕')
      } else {
        toast.error('Une erreur inattendue est survenue 🧐')
      }
    })
}