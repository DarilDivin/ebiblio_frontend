import { useUser } from "@/services/queries"
import { csrf } from ".";
import axios from "../axios";
import { toast } from "sonner";

export const getAllUsers = () => {
  const { data: userResponse, isLoading, error } = useUser();

  return {
    users: userResponse?.data,
    isLoading,
    error,
  }
}

export const deleteUser = async ({ user }: { user: number }) => {
  await csrf();
  await axios
    .delete(`/api/user/${user}`)
    .then(() => {
      toast.success('Utilisateur supprimé avec succès 👍🏾. ')
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        toast.error("L'utilisateur ne peut être supprimé😔.");
      } else {
        toast.error("Erreur inattendu 🧐.  Vueillez réessayer plus tard.");
      }
    });
}

export const deleteUsers = async ({ users }: { users: number[] }) => {
  await csrf();

  await axios
    .post(`/api/destroy-users?_method=DELETE`, { ids: users })
    .then(() => {
      toast.success("Utilisateurs supprimés avec succès 👍🏾.");
    })
    .catch((error) => {
      console.log(error);

      toast("Une erreur s'est produite 🧐");
    });
};