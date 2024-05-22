import { Dispatch, SetStateAction } from "react";

export interface InputErrorProps {
    messages?: string[];
    className?: string;
}

export interface RegisterErrorType {
    email?: string[]; // Un tableau de messages d'erreur pour l'email
    name?: string[];
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
    name: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface UpdateProfileProps {
    setErrors: Dispatch<SetStateAction<RegisterErrorType>>;
    setStatus: Dispatch<SetStateAction<string | null>>;
    name: string;
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
    password_confirmation: string,
    setErrors: Dispatch<SetStateAction<ResetPasswordErrorType>>;
    setStatus: Dispatch<SetStateAction<string | null>>;
}

export interface ConfirmPasswordProps {
    password: string;
    setErrors: Dispatch<SetStateAction<ConfirmPasswordErrorType>>;
    setStatus: Dispatch<SetStateAction<string | null>>;
}