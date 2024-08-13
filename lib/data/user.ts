import { useUser } from "@/services/queries"
import { csrf } from ".";
import axios from "../axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { EditUserProps } from "@/types/user";

export const getAllUsers = () => {
  const router = useRouter();
  const { data: userResponse, isLoading, error } = useUser();
  console.log(error);
  if (error && error.response.status === 403) {
    router.push('/admin')
  }
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

      toast.error("Une erreur s'est produite 🧐");
    });
};

export const giveAccessToUser = async ({ user }: { user: number}) => {
  await csrf();

  await axios
    .patch(`/api/give-access-to-user/${user}`)
    .then(() => {
      toast.success("Confirmation de payement pour l'utilisateur")
    })
    .catch((error) => {
      console.log(error);

      toast.error("Une erreur s'est produite 🧐")
    })
}

export const updateUser = async ({
  setErrors,
  user,
  ...props
}: EditUserProps) => {
  await csrf();
  setErrors({});

  await axios
    .put(`/api/user/${user}`, props)
    .then(() => toast.success("Informations de l'utilisateur modifiées avec succès 👍🏾"))
    .catch((error) => {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
        console.log(error.response.data.errors);

        toast.error("Erreur de validation");
      } else {
        console.log(error);
        toast.error("Une erreur inattendue est survenue 🧐");
      }
    });
}


export const importStudent = async ({ file }: { file: File }) => {
  await csrf();

  await axios
    .post('/api/import-eneamiens-students', { file: file }, {
      headers: {
        "Content-Type": "multipart/form-data;  boundary=---011000010111000001101001",
      },
    })
    .then(() => {
      toast.success("Utilisateurs importés avec succès");
    })
    .catch((error) => {
      // console.log(error);
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        console.log(errors);
        toast.error(error.response.data.message);
      } else {
        toast.error("Une erreur inconnue est survenue");
      }
    });
}

export const importTeacher = async ({ file }: { file: File }) => {
  await csrf();

  await axios
    .post('/api/import-teachers', { file: file }, {
      headers: {
        "Content-Type": "multipart/form-data;  boundary=---011000010111000001101001",
      },
    })
    .then(() => {
      toast.success("Enseignants importés avec succès");
    })
    .catch((error) => {
      // console.log(error);
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        console.log(errors);
        toast.error(error.response.data.message);
      } else {
        toast.error("Une erreur inconnue est survenue");
      }
    });
}