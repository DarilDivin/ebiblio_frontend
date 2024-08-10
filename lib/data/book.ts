import { useBook, useLoan, useSpecificBook } from "@/services/queries";
import { CreateBookProps, UpdateBookProps } from "@/types/book";
import { csrf } from ".";
import axios from "../axios";
import { toast } from "sonner";
import { string } from "zod";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

export const getAllBooks = () => {
  const { data: bookResponse, isLoading, error } = useBook();
  const router = useRouter();
  if (error && error.response.status === 403) {
    router.push('/home')
  }
  return {
    books: bookResponse?.data,
    booksMostViewed: bookResponse?.data.slice(0, 12),
    ebooks: bookResponse?.data.filter((book) => book.has_ebooks === 1),
    physical: bookResponse?.data.filter((book) => book.is_physical === 1),
    podcast: bookResponse?.data.filter((book) => book.has_audios === 1),
    isLoading,
    error,
  };
};

export const getSpecificBook = (id: string) => {
  const {data: bookResponse, isLoading, error } = useSpecificBook(id);
  const router = useRouter();
  if (error && error.response.status === 403) {
    router.push('/home')
  }
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

export const getAllLoan = () => {
  const { data: loanResponse, isLoading, error } = useLoan();
  // console.log(error);
  const router = useRouter();
  if (error && error.response.status === 403) {
    router.push('/home')
  }
  return {
    loans: loanResponse?.data,
    isLoading,
    error
  }
}

export const getUserLoan = (id: number) => {
  const { data: userLoanResponse, error } = useLoan();
  const router = useRouter();
  if (error && error.response.status === 403) {
    router.push('/home')
  }
  return {
    userLoans: userLoanResponse?.data.filter((loan) => loan.user.id === id),
  }
}

export const askForLoan = async ({ article }: {article: number}) => {
  await csrf()

  await axios
    .post(`/api/do-loan-request/${article}`)
    .then((res) => {
      console.log(res);
      toast.success(res.data.message)
    })

}

export const canUserAskForLoan = async ({ article, setCanAskForLoan }: {article: number, setCanAskForLoan: Dispatch<SetStateAction<boolean>> }) => {
  await csrf()

  await axios
    .get(`/api/can-do-loan-request/${article}`)
    .then((res) => {
      console.log(res);
      
      setCanAskForLoan(res.data.response)
    })

}
export const canUserRenewalsLoan = async ({ loan, setCanRenewals }: {loan: number, setCanRenewals: Dispatch<SetStateAction<boolean>> }) => {
  await csrf()

  await axios
    .get(`/api/can-reniew-loan-request/${loan}`)
    .then((res) => {
      // console.log(res);
      
      setCanRenewals(res.data.response)
    })

}


export const acceptLoanRequest = async ({ loan }: { loan: number }) => {
  await csrf()

  await axios
    .post(`/api/accept-loan-request/${loan}?_method=PATCH`)
    .then((res) => {
      console.log(res)
      toast.success(res.data.message)
    })
    .catch((err) => {
      console.log(err);
    })
}

export const rejectLoanRequest = async ({ loan, reason }: {loan: number, reason: string}) => {
  await csrf()

  await axios
    .post(`/api/reject-loan-request/${loan}?_method=DELETE`, { reason: reason })
    .then((res) => {
      console.log(res)
      toast.success(res.data.message)
    })
    .catch((err) => {
      console.log(err);
    })
}

export const recoveredBook = async ({ loan }: { loan: number }) => {
  await csrf()

  await axios
    .post(`/api/mark-article-as-recovered/${loan}?_method=PATCH`)
    .then((res) => {
      console.log(res)
      toast.success(res.data.message)
    })
    .catch((err) => {
      console.log(err);
    })
}

export const returnedBook = async ({ loan }: { loan: number }) => {
  await csrf()

  await axios
    .post(`/api/mark-article-as-returned/${loan}?_method=PATCH`)
    .then((res) => {
      console.log(res)
      toast.success(res.data.message)
    })
    .catch((err) => {
      console.log(err);
    })
}

export const withdrawedLoan = async ({ loan }: { loan: number }) => {
  await csrf()

  await axios
    .post(`/api/mark-as-withdrawed/${loan}?_method=PATCH`)
    .then((res) => {
      console.log(res)
      toast.success(res.data.message)
    })
    .catch((err) => {
      console.log(err);
    })
}

export const renewalLoan = async ({ loan }: { loan: number }) => {
  await csrf()

  await axios
    .post(`/api/reniew-loan-request/${loan}?_method=PATCH`)
    .then((res) => {
      console.log(res)
      toast.success(res.data.message)
    })
    .catch((err) => {
      console.log(err);
    })
}

export const cancelLoan = async ({ loan }: { loan: number }) => {
  await csrf()

  await axios
    .delete(`/api/cancel-loan-request/${loan}`)
    .then((res) => {
      console.log(res)
      toast.success(res.data.message)
    })
    .catch((err) => {
      console.log(err);
    })
}