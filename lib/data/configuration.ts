import { useLastConfig } from "@/services/queries";
import { csrf } from ".";
import axios from "../axios";
import { toast } from "sonner";

export const getLastConfig = () => {
  const { data: lastConfigResponse, isLoading, error } = useLastConfig();

  return {
    lastConfig: lastConfigResponse?.data,
    isLoading,
    error,
  };
};

export const updateSchoolName = async () => {
  await csrf();
  await axios
    .patch("/api/config/update/school-name")
    .then(() => toast("Nom de l'université modifié aves succès👍🏾"))
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

export const updateSchoolAcronym = async () => {
  await csrf();
  await axios
    .patch("/api/config/update/school-acronym")
    .then(() => toast("Acronyme de l'université modifié aves succès👍🏾"))
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

export const updateSchoolCity = async () => {
  await csrf();
  await axios
    .patch("/api/config/update/school-city")
    .then(() => toast("Ville de l'université modifié aves succès👍🏾"))
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

export const updateEneaminanSubscribeAmount = async ({
  eneamien_subscribe_amount,
}: {
  eneamien_subscribe_amount: number;
}) => {
  await csrf();
  console.log(eneamien_subscribe_amount)
  await axios
    .patch("/api/config/update/eneamien-subscribe-amount", {eneamien_subscribe_amount: eneamien_subscribe_amount})
    .then(() =>
      toast("Frais de bibliothéque pour les étudiants modifié aves succès👍🏾")
    )
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        console.log(error.response.data.errors);
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

export const updateExterneSubscribeAmount = async ({
  extern_subscribe_amount,
}: {
  extern_subscribe_amount: number;
}) => {
  await csrf();
  await axios
    .patch("/api/config/update/extern-subscribe-amount", {extern_subscribe_amount: extern_subscribe_amount})
    .then(() =>
      toast("Frais de bibliothéque pour les externes modifié aves succès👍🏾")
    )
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

export const updateSubscriptonExpirationDelay = async () => {
  await csrf();
  await axios
    .patch("/api/config/update/subscription-expiration-delay")
    .then(() =>
      toast("Durée de l'abonnement à la bibliothèque modifié aves succès👍🏾")
    )
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

export const updateStudentDebtAmount = async () => {
  await csrf();
  await axios
    .patch("/api/config/update/student-debt-amount")
    .then(() =>
      toast("Montant minimale de la dette étudiante modifié aves succès👍🏾")
    )
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

export const updateTeacherDebtAmount = async () => {
  await csrf();
  await axios
    .patch("/api/config/update/teacher-debt-amount")
    .then(() =>
      toast("Montant minimale de la dette Enseignante modifié aves succès👍🏾")
    )
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

export const updateStudentLoanDelay = async () => {
  await csrf();
  await axios
    .patch("/api/config/update/student-loan-delay")
    .then(() =>
      toast("Durée maximale du prêt pour les Etudiants modifié aves succès👍🏾")
    )
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

export const updateTeacherLoanDelay = async () => {
  await csrf();
  await axios
    .patch("/api/config/update/teacher-loan-delay")
    .then(() =>
      toast("Durée maximale du prêt pour les Enseignats modifié aves succès👍🏾")
    )
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

export const updateStudentRenewalsNumber = async () => {
  await csrf();
  await axios
    .patch("/api/config/update/student-renewals-number")
    .then(() =>
      toast(
        "Nombre de renouvellement possible pour Etudiant modifié aves succès👍🏾"
      )
    )
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

export const updateTeacherRenewalsNumber = async () => {
  await csrf();
  await axios
    .patch("/api/config/update/teacher-renewals-number")
    .then(() =>
      toast(
        "Nombre de renouvellement possible pour enseignant modifié aves succès👍🏾"
      )
    )
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

export const updateMaxBookPerStudent = async () => {
  await csrf();
  await axios
    .patch("/api/config/update/max-books-per-student")
    .then(() =>
      toast(
        "Nombre maximale de livre prêté par un Etudiant modifié aves succès👍🏾"
      )
    )
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

export const updateMaxBookPerTeacher = async () => {
  await csrf();
  await axios
    .patch("/api/config/update/max-books-per-teacher")
    .then(() =>
      toast(
        "Nombre maximale de livre prêté par un Enseignant modifié aves succès👍🏾"
      )
    )
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

export const updateMaxCopiesBookPerStudent = async () => {
  await csrf();
  await axios
    .patch("/api/config/update/max-copies-books-per-student")
    .then(() =>
      toast(
        "Nombre maximale d'une même copie de livre prêté par un Etudiant modifié aves succès👍🏾"
      )
    )
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

export const updateMaxCopiesBookPerTeacher = async () => {
  await csrf();
  await axios
    .patch("/api/config/update/max-copies-books-per-teacher")
    .then(() =>
      toast(
        "Nombre maximale d'une même copie de livre prêté par un Enseignant modifié aves succès👍🏾"
      )
    )
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
