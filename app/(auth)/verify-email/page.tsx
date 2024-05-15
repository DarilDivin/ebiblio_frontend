'use client'

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/auth'
import React, { useState } from 'react'

const VerifyEmail = () => {
  const { logout, resendEmailVerification } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: '/home'
  });

  const [status, setStatus] = useState<string | null>(null);

  return (
    <>
      <div className="mb-4 text-primary-foreground text-xl text-center w-[500px]">
        Thanks for signing up! Before getting started, could you verify your
        email address by clicking on the link we just emailed to you? If you
        didn't receive the email, we will gladly send you another.
      </div>

      {status === "verification-link-sent" && (
        <div className="mb-4 font-medium text-sm text-green-600">
          A new verification link has been sent to the email address you
          provided during registration.
        </div>
      )}

      <div className="mt-4 flex items-center justify-evenly w-[500px]">
        <Button onClick={() => resendEmailVerification({ setStatus })}>
          Resend Verification Email
        </Button>

        {/* <Button 
          className="bg-accent cursor-pointer"
          onClick={logout}>
          Logout
        </Button> */}
      </div>
    </>
  )
}

export default VerifyEmail