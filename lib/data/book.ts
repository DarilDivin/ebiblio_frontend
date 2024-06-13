import { useBook, useSpecificBook } from "@/services/queries";
import { CreateBookProps, UpdateBookProps } from "@/types/book";
import { csrf } from ".";
import axios from "../axios";
import { toast } from "sonner";
import { string } from "zod";

export const getAllBooks = () => {
  const { data: bookResponse, isLoading, error } = useBook();

  return {
    books: bookResponse?.data,
    ebooks: bookResponse?.data.filter((book) => book.has_ebooks === 1),
    physical: bookResponse?.data.filter((book) => book.is_physical === 1),
    podcast: bookResponse?.data.filter((book) => book.has_audios === 1),
    isLoading,
    error,
  };
};

export const getSpecificBook = (id: string) => {
  const {data: bookResponse, isLoading, error } = useSpecificBook(id);

  return { book: bookResponse?.data, isLoading, error }
}

export const createBook = async ({
  setStatus,
  setErrors,
  ...props
}: CreateBookProps) => {
  await csrf();
  setErrors({});

  console.log(props);
  

  await axios
    .post("/api/article", props, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      setStatus("Livre créé avec succès");
      toast.success("Livre créé avec succès 👍🏾.");
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        console.log(error.response.data.errors)
        setErrors(error.response.data.errors)
        toast.error(
          "Un ou plusieurs champs du formulaire sont invalide. Veillez corriger les éventuelles erreurs"
        );
      } else {
        console.log(error.response.data.errors)
        toast.error("Une erreur inconnue est survenue 🧐. Vueillez réessayer plus tard.");
      }
    });
};

export const updateBook = async ({
  setStatus,
  setErrors,
  article,
  ...props
}: UpdateBookProps) => {
  await csrf();
  setErrors({});
  console.log(props);
  

  await axios
    .post(`/api/article/${article}?_method=PUT`, props, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      setStatus("Livre modifié avec succès");
      toast.success("Livre modifié avec succès 👍🏾.");
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        console.log(error.response.data.errors)
        toast.error(
          "Un ou plusieurs champs du formulaire sont invalide. Veillez corriger les éventuelles erreurs"
        );
      } else {
        toast.error("Une erreur inconnue est survenue 🧐. Vueillez réessayer plus tard.");
      }
    });
};

export const deleteBook = async ({ article }: { article: number }) => {
  await csrf();

  await axios
    .delete(`/api/article/${article}`)
    .then(() => toast.success("Livre supprimé avec succès 👍🏾."))
    .catch((error) => {
      if (error.response.status === 404) {
        toast.error("Le livre ne peut être supprimé 😔.");
      } else {
        toast.error('Une erreur inconnue est survenue 🧐. Vueillez réessayer plus tard.')
      }
    });
};

export const createComment = async ({ id, content }: {id: number, content: string}) => {
  await csrf();
  
  await axios
    .post(`/api/article/${id}/comment`, {content: content})
    .then(() => toast.success('Commentaire ajouté 👍🏾'))
    .catch((error) => {
      console.log(error.response.data.errors)
      toast.error('Erreur de validation')
    })
}

export const deleteComment = async ({article, comment}: {article: number, comment: number}) => {
  await csrf();

  await axios
    .delete(`/api/article/${article}/comment/${comment}`)
    .then((res) => toast.success('Comment supprimé avec succès 👍🏾'))
    .catch((error) => {
      console.log(error.response.data.errors);
      toast.error('Le commentaire n\'a pas pu être supprimé')
    })
}