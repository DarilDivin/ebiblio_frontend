import axios from '@/lib/axios'
import { ConfirmPasswordProps, ForgotPasswordProps, LoginProps, RegisterProps, ResetPasswordProps, UpdatePasswordProps, UpdateProfileProps, UseAuthProps } from '@/types'
import { useParams, useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect } from "react"
import useSWR from "swr"

export const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthProps = {}) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('api/user', () => 
        axios
            .get('api/user')
            .then(res => res.data)
            .catch(error => { 
                if (error.response.status !== 409) throw error
                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }: RegisterProps) => {
        await csrf()
        setErrors({})

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                console.log(error.response.data.errors);
                setErrors(error.response.data.errors);
                
            })
    }

    const updateProfile = async ({ setErrors, setStatus, ...props}: UpdateProfileProps) => {
        await csrf()
        setErrors({})
        setStatus(null)

        axios
            .put('/user/profile-information', props)
            .then(response => {
                mutate();
                console.log(response);
                setStatus('Informations modifiées avec succès')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                console.log(error.response.data.errors);
                setErrors(error.response.data.errors)
            })

    }

    const updatePassword = async ({ setErrors, setStatus, ...props}: UpdatePasswordProps) => {
        await csrf();
        setErrors({})
        setStatus(null)

        axios
            .put('user/password', props)
            .then(response => {
                console.log(response)
                mutate()
                setStatus('Mot de passe modifié avec succès')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                console.log(error.response.data.errors);
                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }: LoginProps) => {
        await csrf()

        setErrors({})
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate()) // Mets à jour les données de l'utilisateur en cache
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const confirmPassword = async ({ setErrors, setStatus, password }: ConfirmPasswordProps) => {
        await csrf()

        setErrors({})
        setStatus(null)

        axios
            .post('/user/confirm-password', { password })
            .then(response => { 
                setStatus(response.data.status);
                router.back(); 
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }: ForgotPasswordProps) => {
        await csrf()

        setErrors({})
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.status.toString()))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }: ResetPasswordProps) => {
        await csrf()

        setErrors({})
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.status.toString())),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }: {setStatus: Dispatch<SetStateAction<string | null>>}) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.status.toString()))
    }

    const twoFactorAuthenticationEnable = async ({ setStatus }: { setStatus: Dispatch<SetStateAction<string | null>>}) => {
        await csrf()

        axios
            .post('/user/two-factor-authentication')
            .then(response => {
                console.log(response) 
                router.refresh() 
                setStatus(response.status.toString() + 'enabled') 
            })
            .catch(error => {
                setStatus(error.response.data.errors)
            })
    }

    const twoFactorAuthenticationDisable = async ({ setStatus }: { setStatus: Dispatch<SetStateAction<string | null>>}) => {
        await csrf()

        axios
            .delete('/user/two-factor-authentication')
            .then(response => {
                console.log(response) 
                setStatus(response.status.toString() + 'disabled');
                router.push('/settings')
            })
    }

    const twoFactorQrCode = async ({ setSvgQrCode }: {setSvgQrCode: Dispatch<React.SetStateAction<string | TrustedHTML>>}) => {

        await(
            axios
                .get('/user/two-factor-qr-code')
                .then(response => {
                    console.log(response)
                    setSvgQrCode(response.data.svg)
                })
        )

    }

    const twoFactorRecoveryCode = async ({ setRecoveryCode }: {setRecoveryCode: Dispatch<React.SetStateAction<string[]>>}) => {

        axios
            .get('/user/two-factor-recovery-codes')
            .then(response => {
                console.log(response)
                // setRecoveryCode(response.data.svg)
            })

    }

    const regenerateTwoFactorRecoveryCode = async () => {

        axios
            .post('/user/two-factor-recovery-codes')
            .then(response => {
                console.log(response)
            })
    }

    const twoFactorAuthenticationConfirmation = async ({ setStatus, code }: { setStatus: Dispatch<SetStateAction<string | null>>, code: string }) => {

        await csrf()

        axios
            .post('/user/confirmed-two-factor-authentication', code)
            .then(response => {
                router.push('/settings')
                setStatus(response.status.toString() + '-2FAConfirmed')
            })
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/registration'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at && 
            redirectIfAuthenticated
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()

    }, [user, error])

    return {
        user,
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
        regenerateTwoFactorRecoveryCode,
        twoFactorAuthenticationConfirmation,
        logout,
    }

}
