import axios from "../axios";
import { toast } from "sonner";
import { csrf } from ".";
import {
  DepotMemoireProps,
  RejectMemoryProps,
  ValidateMemoryProps,
} from "@/types/memory";
import { useMemory } from "@/services/queries";

export const getAllSupportedMemories = () => {
  // const {
  //   data: supportedMemoriesResponse,
  //   isLoading,
  //   error,
  //   mutate,
  // } = useSWR<GetAllMemoryResponse>("api/supportedMemory", fetcher);
  const { data: supportedMemoriesResponse, isLoading, error } = useMemory();

  return {
    supportedMemories: supportedMemoriesResponse?.data,
    supportedMemoriesValidated: supportedMemoriesResponse?.data.filter(
      (supportedMemory) => supportedMemory.status === "Validé"
    ),
    supportedMemoriesUnvalidated: supportedMemoriesResponse?.data.filter(
      (supportedMemory) => supportedMemory.status === "Invalidé"
    ),
    isLoading,
    error,
  };
};

export const supportedMemoireDeposit = async ({
  setStatus,
  setErrors,
  ...props
}: DepotMemoireProps) => {
  await csrf();
  setErrors({});

  axios
    .post("/api/deposit-memory", props, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      setStatus("Mémoire déposé avec succès");
      toast.success("Mémoire envoyé avec succès");
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        toast.error(
          "Un ou plusieurs champs du formulaire sont invalide. Veillez corriger les éventuelles erreurs"
        );
        // for (const [field, messages] of Object.entries(errors)) {
        //   messages.forEach((message: string) => {
        //     toast.error(`${message}`);
        //   });
        // }
      } else {
        toast.error("Une erreur est survenue");
      }
    });
};

export const validateMemory = async ({
  supportedMemory,
}: ValidateMemoryProps) => {
  await csrf();
  // console.log(supportedMemory);

  axios
    .patch(`/api/validate-memory/${supportedMemory}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      toast.success("Mémoire validé avec succès");
      console.log(response.data);
    })
    .catch((error) => {
      toast.error(
        error.response.data.errors
          ? "Quelque chose s'est mal passé"
          : "Une erreur est survenue"
      );
    });
};

export const rejectMemory = async ({
  supportedMemory,
  reason,
}: RejectMemoryProps) => {
  await csrf();
  // console.log(supportedMemory, reason);
  axios
    .patch(`/api/reject-memory/${supportedMemory}`, { reason: reason })
    .then(() => toast.success("Mémoire rejeté avec succès"))
    .catch((error) => {
      toast.error(
        error.response.data.errors
          ? "Quelque chose s'est mal passé"
          : "Une erreur est survenue"
      );
      console.log(error.response.data.errors);
    });
};

export const deleteMemory = async ({ memory }: { memory: number }) => {
  await csrf();
  await axios
    .delete(`/api/supportedMemory/${memory}`)
    .then(() => {
      toast.success('Mémoire supprimé avec succès 👍🏾.')
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        toast.error('Le mémoire ne peut être supprimé😔.')
      } else {
        toast.error('Erruer inattendu 🧐.  Vueillez réessayer plus tard.')
      }
    })
}