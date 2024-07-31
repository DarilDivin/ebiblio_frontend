"use client";

import { useAuth } from "@/hooks/auth";
import { userHasRole } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  const { user, isLoading, logout } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/livres",
  });

  // if (isLoading || !user) return <div>Chargement...</div>

  return (
    <div className="h-screen">
      {isLoading || !user ? (
        <div>Chargement...</div>
      ) : (
        <div className="w-full h-[75%] flex flex-col gap-8 justify-center items-center">
          <h1 className="text-4xl font-poppins font-bold">
            Bienvenue sur{" "}
            <span>
              <span className="text-primary font-bold text-5xl font-alexana">
                E
              </span>
              <span>Biblio</span>
            </span>
          </h1>
          <p className="text-lg text-foreground/70 w-[700px] text-center">
            Bienvenue sur le site de la bibliothèque de l'Eneam. Vous pouvez
            après avoir payé les frais d'inscription consulter les mémoires de
            l'Eneam des diplomés de l'école et accéder aux différents livres de
            la bibliothèque
          </p>
          {/* <div className="flex justify-start items-center"> */}
          <div className="flex gap-4 w-full justify-center items-center mb-8">
            <Link
              className="p-1 rounded-md bg-primary/70 hover:bg-primary transition-all flex gap-2 hover:gap-4 text-primary-foreground"
              href={"/memoires"}
            >
              {" "}
              Voir les mémoires <ChevronRight />
            </Link>
            <Link
              className="p-1 rounded-md bg-primary/70 hover:bg-primary transition-all flex gap-2 hover:gap-4 text-primary-foreground"
              href={"/livres"}
            >
              {" "}
              Voir les livres <ChevronRight />
            </Link>
            {userHasRole(user, "Administrateur") && (
              <Link
                className="p-1 rounded-md bg-primary/70 hover:bg-primary transition-all flex gap-2 hover:gap-4 text-primary-foreground"
                href={"/admin"}
              >
                {" "}
                Dashboard <ChevronRight />
              </Link>
            )}
          </div>
        </div>
        // </div>
      )}
    </div>
  );
};

export default Home;
