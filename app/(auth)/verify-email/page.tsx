"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import React, { useState } from "react";

const VerifyEmail = () => {
  const { logout, resendEmailVerification } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/home",
  });

  const [status, setStatus] = useState<string | null>(null);

  return (
    <>
      <div className="mb-4 text-primary-foreground text-lg text-center w-[500px]">
        Merci de vous être inscrit ! Avant de commencer, pourriez-vous vérifier
        votre adresse e-mail en cliquant sur le lien que nous venons de vous
        envoyer par e-mail ? Si vous n'avez pas reçu l'e-mail, nous vous en
        enverrons un autre avec plaisir.
      </div>

      {status === "200" && (
        <div className="mb-4 font-medium text-sm text-green-600">
          Un nouveau lien de vérification a été envoyé à l'adresse e-mail que
          vous avez fournie lors de votre inscription.
        </div>
      )}

      <div className="mt-4 flex items-center justify-evenly w-[500px]">
        <Button onClick={() => resendEmailVerification({ setStatus })}>
          Renvoyer l'e-mail de vérification
        </Button>

        {/* <Button 
          className="bg-accent cursor-pointer"
          onClick={logout}>
          Logout
        </Button> */}
      </div>
    </>
  );
};

export default VerifyEmail;
