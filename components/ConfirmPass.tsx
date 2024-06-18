import React, {Dispatch, SetStateAction, useState} from 'react'
import ConfirmPasswordModal from './ConfirmPasswordModal'
import { useAuth } from '@/hooks/auth'

interface ConfirmPassProps {
  confirming: boolean
  setConfirming: Dispatch<SetStateAction<boolean>>
  onFail: () => void
  onSuccess: () => void
}

const ConfirmPass = ({confirming, setConfirming, onFail, onSuccess}: ConfirmPassProps) => {
    const [password, setPassword] = useState('')

    const { confirmPassword } = useAuth()


    const confirm = () => {
      confirmPassword({password, onSuccess, onFail})
    }

    return (
        <ConfirmPasswordModal
            setConfirming={setConfirming}
            confirming={confirming}
            password={password}
            setPassword={setPassword}
            onConfirm={confirm}
        />
    )
}

export default ConfirmPass
