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

export const updateSchoolName = async ({school_name}: {school_name: string}) => {
  await csrf();
  await axios
    .patch("/api/config/update/school-name", {school_name: school_name})
    .then(() => toast.success("Nom de l'université modifié aves succès👍🏾"))
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

export const updateSchoolAcronym = async ({school_acronym}: {school_acronym: string}) => {
  await csrf();
  await axios
    .patch("/api/config/update/school-acronym", {school_acronym: school_acronym})
    .then(() => toast.success("Acronyme de l'université modifié aves succès👍🏾"))
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

export const updateSchoolCity = async ({school_city}: {school_city: string}) => {
  await csrf();
  await axios
    .patch("/api/config/update/school-city", {school_city: school_city})
    .then(() => toast.success("Ville de l'université modifié aves succès👍🏾"))
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
      toast.success("Frais de bibliothéque pour les étudiants modifié aves succès👍🏾")
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
      toast.success("Frais de bibliothéque pour les externes modifié aves succès👍🏾")
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
      toast.success("Durée de l'abonnement à la bibliothèque modifié aves succès👍🏾")
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

export const updateStudentDebtAmount = async ({
  student_debt_amount,
}: {
  student_debt_amount: number;
}) => {
  await csrf();
  await axios
    .patch("/api/config/update/student-debt-amount", {student_debt_amount: student_debt_amount})
    .then(() =>
      toast.success("Montant minimale de la dette étudiante modifié aves succès👍🏾")
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

export const updateTeacherDebtAmount = async ({
  teacher_debt_amount,
}: {
  teacher_debt_amount: number;
}) => {
  await csrf();
  await axios
    .patch("/api/config/update/teacher-debt-amount", {teacher_debt_amount: teacher_debt_amount})
    .then(() =>
      toast.success("Montant minimale de la dette Enseignante modifié aves succès👍🏾")
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

export const updateStudentLoanDelay = async ({student_loan_delay}: {student_loan_delay: number}) => {
  await csrf();
  await axios
    .patch("/api/config/update/student-loan-delay", {student_loan_delay: student_loan_delay})
    .then(() =>
      toast.success("Durée maximale du prêt pour les Etudiants modifié aves succès👍🏾")
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

export const updateTeacherLoanDelay = async ({teacher_loan_delay}: {teacher_loan_delay: number}) => {
  await csrf();
  await axios
    .patch("/api/config/update/teacher-loan-delay", {teacher_loan_delay: teacher_loan_delay})
    .then(() =>
      toast.success("Durée maximale du prêt pour les Enseignats modifié aves succès👍🏾")
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

export const updateStudentRenewalsNumber = async ({student_renewals_number}: {student_renewals_number: number}) => {
  await csrf();
  await axios
    .patch("/api/config/update/student-renewals-number", {student_renewals_number: student_renewals_number})
    .then(() =>
      toast.success(
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

export const updateTeacherRenewalsNumber = async ({teacher_renewals_number}: {teacher_renewals_number: number}) => {
  await csrf();
  await axios
    .patch("/api/config/update/teacher-renewals-number", {teacher_renewals_number: teacher_renewals_number})
    .then(() =>
      toast.success(
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

export const updateMaxBookPerStudent = async ({max_books_per_student}: {max_books_per_student: number}) => {
  await csrf();
  await axios
    .patch("/api/config/update/max-books-per-student", {max_books_per_student: max_books_per_student})
    .then(() =>
      toast.success(
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

export const updateMaxBookPerTeacher = async ({max_books_per_teacher}: {max_books_per_teacher: number}) => {
  await csrf();
  await axios
    .patch("/api/config/update/max-books-per-teacher", {max_books_per_teacher: max_books_per_teacher})
    .then(() =>
      toast.success(
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
      toast.success(
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
      toast.success(
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
