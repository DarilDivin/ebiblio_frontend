import { Dispatch, SetStateAction } from "react";

export interface InputErrorProps {
  messages?: string[];
  className?: string;
}

export interface RegisterErrorType {
  email?: string[]; // Un tableau de messages d'erreur pour l'email
  firstname?: string[];
  lastname?: string[];
  password?: string[];
}

export interface LoginErrorType {
  email?: string[];
  password?: string[];
}

export interface ForgotPasswordErrorType {
  email?: string[];
}

export interface ResetPasswordErrorType {
  email?: string[];
  password?: string[];
}

export interface ConfirmPasswordErrorType {
  password?: string[];
}

export interface UpdatePasswordErrorType {
  current_password?: string[];
  password?: string[];
  password_confirmation?: string[];
}

export interface RegisterProps {
  setErrors: Dispatch<SetStateAction<RegisterErrorType>>;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateProfileProps {
  setErrors: Dispatch<SetStateAction<RegisterErrorType>>;
  setStatus: Dispatch<SetStateAction<string | null>>;
  firstname: string;
  lastname: string;
  email: string;
}

export interface UpdatePasswordProps {
  setErrors: Dispatch<SetStateAction<RegisterErrorType>>;
  setStatus: Dispatch<SetStateAction<string | null>>;
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface LoginProps {
  email: string;
  password: string;
  remember: boolean;
  setErrors: Dispatch<SetStateAction<LoginErrorType>>;
  setStatus: Dispatch<SetStateAction<string | null>>;
}

export interface UseAuthProps {
  middleware?: string;
  redirectIfAuthenticated?: string;
}

export interface ForgotPasswordProps {
  email: string;
  setErrors: Dispatch<SetStateAction<ForgotPasswordErrorType>>;
  setStatus: Dispatch<SetStateAction<string | null>>;
}

export interface ResetPasswordProps {
  email: string;
  password: string;
  password_confirmation: string;
  setErrors: Dispatch<SetStateAction<ResetPasswordErrorType>>;
  setStatus: Dispatch<SetStateAction<string | null>>;
}

export interface ConfirmPasswordProps {
  password: string;
  setErrors: Dispatch<SetStateAction<ConfirmPasswordErrorType>>;
  setStatus: Dispatch<SetStateAction<string | null>>;
}

export interface DepotMemoireErrorType {
  first_author_matricule?: string[];
  first_author_firstname?: string[];
  first_author_lastname?: string[];
  first_author_email?: string[];
  first_author_phone?: string[];

  second_author_matricule?: string[];
  second_author_firstname?: string[];
  second_author_lastname?: string[];
  second_author_email?: string[];
  second_author_phone?: string[];

  theme?: string[];
  sector_id?: string[];
  soutenance_id?: string[];
  start_at?: string[];
  ends_at?: string[];
  jury_president_name?: string[];
  memory_master_name?: string[];
  memory_master_email?: string[];
  file_path?: string[];
  cover_page_path?: string[];
}

// export interface ValidateMemoireErrorType {
//   supportedMemory?: string;
// }

// export interface MemoireType {
//   first_author_matricule: number;
//   first_author_firstname: string;
//   first_author_lastname: string;
//   first_author_email: string;
//   first_author_phone: string;

//   second_author_matricule?: string;
//   second_author_firstname?: string;
//   second_author_lastname?: string;
//   second_author_email?: string;
//   second_author_phone?: string;

//   theme: string;
//   filiere: string;
//   soutenance_date: string;
//   soutenance_hour: string;
//   jury_president: string;
//   memory_master: string;
//   memory_year: string;
//   file_path: string;
//   cover_page_path: string;
// }

// export interface DepotMemoireProps {
//   first_author_matricule?: string;
//   first_author_name: string;
//   first_author_lastname?: string;
//   first_author_email: string;
//   first_author_phone: string;

//   second_author_matricule?: string;
//   second_author_name: string;
//   second_author_lastname?: string;
//   second_author_email: string;
//   second_author_phone: string;

//   theme: string;
//   start_at: string;
//   ends_at: string;
//   sector_id: number;
//   soutenance_id: number;
//   jury_president_name: string;
//   memory_master_name: string;
//   memory_master_email: string;
//   file_path: File;
//   cover_page_path: File;

//   setErrors: Dispatch<SetStateAction<DepotMemoireErrorType>>;
//   setStatus: Dispatch<SetStateAction<string | null>>;
// }

// export interface ValidateMemoryProps {
//   supportedMemory: number;

//   // setErrors: Dispatch<SetStateAction<ValidateMemoireErrorType>>;
//   // setStatus: Dispatch<SetStateAction<string | null>>;  
// }

// export interface RejectMemoryProps {
//   supportedMemory: number;
//   reason: string;

//   // setErrors: Dispatch<SetStateAction<ValidateMemoireErrorType>>;
//   // setStatus: Dispatch<SetStateAction<string | null>>;  
// }

// export interface Sector {
//   id: number;
//   type: string;
//   name: string;
//   slug: string;
//   acronym: string;
//   created_by: string;
//   updated_by: string | null;
//   deleted_by: string | null;
//   created_at: string;
//   updated_at: string;
//   deleted_at: string | null;
//   sector: Sector;
// }

// export interface Soutenance {
//   id: number;
//   name: string;
//   slug: string;
//   start_date: string;
//   end_date: string;
//   number_memories_expected: number;
//   created_by: string | null;
//   updated_by: string | null;
//   deleted_by: string | null;
//   created_at: string;
//   updated_at: string;
//   deleted_at: string | null;
//   cycle: Cycle;
//   memoire: Memoire;
// }

// export interface Memoire {
//   id: number;
//   theme: string;
//   start_at: string;
//   ends_at: string;
//   first_author_name: string;
//   second_author_name: string;
//   first_author_email: string;
//   second_author_email: string;
//   first_author_phone: string;
//   second_author_phone: string;
//   jury_president_name: string;
//   memory_master_name: string;
//   memory_master_email: string;
//   cote: string;
//   status: string;
//   file_path: string | null;
//   cover_page_path: string | null;
//   created_at: string;
//   updated_at: string;
//   created_by: string | null;
//   updated_by: string | null;
//   sector: Sector;
//   soutenance: Soutenance;
// }


// export interface Cycle {
//   id: number;
//   name: string;
//   slug: string;
//   code: string;
//   created_by: string | null;
//   updated_by: string | null;
//   deleted_by: string | null;
//   created_at: string;
//   updated_at: string;
//   deleted_at: string | null;
//   soutenances: Soutenance[] | null;
// }

// export interface GetAllMemoryResponse {
//   data: Memoire[];
//   links: {
//     first: string;
//     last: string;
//     prev: string | null;
//     next: string | null;
//   };
//   meta: {
//     current_page: number;
//     from: number;
//     last_page: number;
//     links: {
//       url: string | null;
//       label: string;
//       active: boolean;
//     }[];
//     path: string;
//     per_page: number;
//     to: number;
//     total: number;
//   };
// }

// export interface GetAllSoutenanceResponse {
//   data: Soutenance[];
//   links: {
//     first: string;
//     last: string;
//     prev: string | null;
//     next: string | null;
//   };
//   meta: {
//     current_page: number;
//     from: number;
//     last_page: number;
//     links: {
//       url: string | null;
//       label: string;
//       active: boolean;
//     }[];
//     path: string;
//     per_page: number;
//     to: number;
//     total: number;
//   };
// }

// export interface GetAllCycleResponse {
//   data: Cycle[];
//   links: {
//     first: string;
//     last: string;
//     prev: string | null;
//     next: string | null;
//   };
//   meta: {
//     current_page: number;
//     from: number;
//     last_page: number;
//     links: {
//       url: string | null;
//       label: string;
//       active: boolean;
//     }[];
//     path: string;
//     per_page: number;
//     to: number;
//     total: number;
//   };
// }

// export interface GetAllSectorResponse {
//   data: Sector[];
//   links: {
//     first: string;
//     last: string;
//     prev: string | null;
//     next: string | null;
//   };
//   meta: {
//     current_page: number;
//     from: number;
//     last_page: number;
//     links: {
//       url: string | null;
//       label: string;
//       active: boolean;
//     }[];
//     path: string;
//     per_page: number;
//     to: number;
//     total: number;
//   };
// }