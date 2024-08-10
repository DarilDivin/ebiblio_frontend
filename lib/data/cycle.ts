import { useCycle } from "@/services/queries";
import { CreateCycleProps, EditCycleProps } from "@/types/cycle";
import { csrf } from ".";
import { toast } from "sonner";
import axios from "../axios";
import { useRouter } from "next/navigation";


export const getAllCycle = () => {
  const router = useRouter();
  const { data: cycleResponse, isLoading, error } = useCycle();
  // console.log(error);
  if (error && error.response.status === 403) {
    router.push('/home')
  }
  return { cycles: cycleResponse?.data, isLoading, error };
};

export const createCycle = async ({ ...props }: CreateCycleProps) => {
  await csrf();

  await axios
    .post("/api/cycle", props)
    .then(() => {
      toast.success("Cycle créer avec succès");
    })
    .catch((error) => {  
      if (error.response && error.response.status === 422) {
        toast.error("Erreur de validation");
      } else {
        toast.error("Une erreur est survenue");
      }
    });
};

export const editCycle = async ({ cycle, ...props }: EditCycleProps) => {
  await csrf();

  await axios 
    .put(`/api/cycle/${cycle}`, props)
    .then(() => {
      toast.success("Cycle modifié avec succès");
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        toast.error("Erreur de validation");
      } else {
        toast.error("Une erreur est survenue");
      }
    });
};

export const deleteCycle = async ({ cycle }: {cycle: number}) => {
  await csrf();
  await axios
    .delete(`/api/cycle/${cycle}`)
    .then(() => {
      toast.success('Cycle supprimé avec succès 😎')
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        toast.error('Erreur de validation')
      } else {
        toast('Erreur inattendu 🧐')
      }
    })
}
