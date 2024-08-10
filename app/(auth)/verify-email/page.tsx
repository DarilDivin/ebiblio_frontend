"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle";

const VerifyEmail = () => {
  const { logout, resendEmailVerification } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/home",
  });

  const [status, setStatus] = useState<string | null>(null);

  return (
    <>
      <div className=" absolute top-3 right-3 flex gap-4 items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/9.x/thumbs/svg?seed=Default`}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </div>
      <div className="mb-4 text-foreground text-lg text-center w-[500px]">
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
