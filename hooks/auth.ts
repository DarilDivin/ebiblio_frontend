import axios from "@/lib/axios";
import { userHasRole } from "@/lib/utils";
import {
  ConfirmPasswordProps,
  ForgotPasswordProps,
  LoginProps,
  RegisterProps,
  ResetPasswordProps,
  TwoFactorAuthenticationConfirmation,
  TwoFactorAuthenticationEnableProps,
  TwoFactorChallengeProps,
  UpdatePasswordProps,
  UpdateProfileProps,
  UseAuthProps,
} from "@/types";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "sonner";
import useSWR from "swr";

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: UseAuthProps = {}) => {
  const router = useRouter();
  const params = useParams();

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR("api/auth-user", () =>
    axios
      .get("api/auth-user")
      .then((res) => res.data)
      .catch((error) => {
        // console.log(error);
        if (error.response.status !== 409) throw error;
        router.push("/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }: RegisterProps) => {
    await csrf();
    setErrors({});
    console.log(props);

    axios
      .post("/api/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  const updateProfile = async ({
    setErrors,
    setStatus,
    ...props
  }: UpdateProfileProps) => {
    await csrf();
    setErrors({});
    setStatus(null);

    console.log(props);

    axios
      .put("/api/user/profile-information", props)
      .then((response) => {
        mutate();
        console.log(response);
        setStatus("Informations modifiées avec succès");
        toast.success("Informations modifiées avec succès");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
        toast.error("Erreur de validation");
      });
  };

  const updatePassword = async ({
    setErrors,
    setStatus,
    ...props
  }: UpdatePasswordProps) => {
    await csrf();
    setErrors({});
    setStatus(null);

    axios
      .put("/api/user/password", props)
      .then((response) => {
        console.log(response);
        mutate();
        setStatus("Mot de passe modifié avec succès");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  const login = async ({ setErrors, setStatus, ...props }: LoginProps) => {
    await csrf();

    setErrors({});
    setStatus(null);

    axios
      .post("/api/login", props)
      .then(({ data }) => {
        if (data?.two_factor === true) {
          router.push("/two-factor-challenge");
        } else {
          mutate(); // Mets à jour les données de l'utilisateur en cache
        }
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const confirmPassword = async ({
    onSuccess,
    onFail,
    password,
  }: ConfirmPasswordProps) => {
    await csrf();

    // setErrors({})
    // setStatus(null)

    axios
      .post("/api/user/confirm-password", { password })
      .then((response) => {
        onSuccess();
        // router.back();
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        // toast.error('Erreur de validation!!! Le mot de passe est incorrect')
        onFail();
      });
  };

  const forgotPassword = async ({
    setErrors,
    setStatus,
    email,
  }: ForgotPasswordProps) => {
    await csrf();

    setErrors({});
    setStatus(null);

    axios
      .post("/api/forgot-password", { email })
      .then((response) => setStatus(response.status.toString()))
      .catch((error) => {
        console.log(error);
        
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({
    setErrors,
    setStatus,
    ...props
  }: ResetPasswordProps) => {
    await csrf();

    setErrors({});
    setStatus(null);

    axios
      .post("/api/reset-password", { token: params.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + btoa(response.status.toString()))
      )
      .catch((error) => {
        console.log(error);
        
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({
    setStatus,
  }: {
    setStatus: Dispatch<SetStateAction<string | null>>;
  }) => {
    axios
      .post("/api/email/verification-notification")
      .then((response) => setStatus(response.status.toString()));
  };

  const twoFactorAuthenticationEnable = async ({
    setStatus,
    setSvgQrCode,
    setRecoveryCodes,
    setTwofactorIsEnabled,
    setConfirming,
  }: TwoFactorAuthenticationEnableProps) => {
    await csrf();

    axios
      .post("/api/user/two-factor-authentication")
      .then((response) => {
        console.log(response);
        router.refresh();

        twoFactorQrCode({ setSvgQrCode, setConfirming });
        twoFactorRecoveryCode({ setRecoveryCodes, setConfirming });

        setStatus(response.status.toString() + "enabled");
        setConfirming(false);
        setTwofactorIsEnabled(true);
      })
      .catch((error) => {
        // setStatus(error.response.data.errors)
        if (error.response.status === 423) {
          setConfirming(true);
        }
      });
  };

  const twoFactorAuthenticationDisable = async ({
    setStatus,
    setConfirming,
    setTwofactorIsEnabled,
  }: {
    setStatus: Dispatch<SetStateAction<string | null>>;
    setConfirming: Dispatch<SetStateAction<boolean>>;
    setTwofactorIsEnabled: Dispatch<SetStateAction<boolean>>;
  }) => {
    await csrf();

    axios
      .delete("/api/user/two-factor-authentication")
      .then((response) => {
        console.log(response);
        setStatus(response.status.toString() + "disabled");
        // router.push('/settings')
        setTwofactorIsEnabled(false);
      })
      .catch((error) => {
        // setStatus(error.response.data.errors)
        if (error.response.status === 423) {
          setConfirming(true);
        }
      });
  };

  const twoFactorQrCode = async ({
    setSvgQrCode,
    setConfirming,
  }: {
    setSvgQrCode: Dispatch<SetStateAction<string | TrustedHTML>>;
    setConfirming: Dispatch<SetStateAction<boolean>>;
  }) => {
    await axios
      .get("/api/user/two-factor-qr-code")
      .then((response) => {
        console.log(response);
        setSvgQrCode(response.data.svg);
      })
      .catch((error) => {
        if (error.response.status === 423) {
          setConfirming(true);
        }
        console.log(error);
      });
  };

  const twoFactorRecoveryCode = async ({
    setRecoveryCodes,
    setConfirming,
  }: {
    setRecoveryCodes: Dispatch<SetStateAction<string[]>>;
    setConfirming: Dispatch<SetStateAction<boolean>>;
  }) => {
    axios
      .get("/api/user/two-factor-recovery-codes")
      .then((response) => {
        console.log(response);
        setRecoveryCodes(response.data);
      })
      .catch((error) => {
        if (error.response.status === 423) {
          setConfirming(true);
        }
        console.log(error);
      });
  };

  // const regenerateTwoFactorRecoveryCode = async () => {

  //     axios
  //         .post('/api/user/two-factor-recovery-codes')
  //         .then(response => {
  //             console.log(response)
  //         })
  // }

  const twoFactorAuthenticationConfirmation = async ({
    setStatus,
    code,
    setTwoFactorAuthenticationConfirmed,
  }: TwoFactorAuthenticationConfirmation) => {
    await csrf();

    axios
      .post("/api/user/confirmed-two-factor-authentication", { code: code })
      .then((response) => {
        setTwoFactorAuthenticationConfirmed(true);
        // setStatus(response.status.toString() + "-2FAConfirmed");
        setStatus('Double authentification activé avec succès');
        toast.success('Double authentification activé avec succès')
      })
      .catch((error) => {
        toast.success('Une erreur est survenue')
      })
  };

  const twoFactorChallenge = async ({
    setErrors,
    ...props
  }: TwoFactorChallengeProps) => {
    await csrf();

    console.log(props);

    await axios
      .post("/api/two-factor-challenge", props)
      .then(() => mutate())
      .catch((error) => {
        setErrors(error.response.data.errors);
        toast.error("Erreur de validation");
      });
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/api/logout").then(() => mutate());
    }

    window.location.pathname = "/registration";
  };

  useEffect(() => {
    if (middleware === "auth" && error) logout();
    // if (user && !user?.email_verified_at) router.push('/verify-email');
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    if (
      window.location.pathname === "/verify-email" &&
      user?.email_verified_at &&
      redirectIfAuthenticated
    )
      router.push(redirectIfAuthenticated);
    // console.log('user: '+ user, 'error: '+  error);
  }, [user, error]);

  return {
    user,
    isLoading,
    error,
    register,
    login,
    forgotPassword,
    confirmPassword,
    resetPassword,
    resendEmailVerification,
    updateProfile,
    updatePassword,
    twoFactorAuthenticationEnable,
    twoFactorAuthenticationDisable,
    twoFactorQrCode,
    twoFactorRecoveryCode,
    // regenerateTwoFactorRecoveryCode,
    twoFactorAuthenticationConfirmation,
    twoFactorChallenge,
    logout,
  };
};
