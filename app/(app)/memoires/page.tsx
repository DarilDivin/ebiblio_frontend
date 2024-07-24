import { Forward } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MemoireHomePage = () => {
  return (
    <div className="w-full h-[84.2vh] flex justify-center items-center gap-8">
      <div className="w-[400px] h-[250px] bg-primary/5 hover:bg-primary/10 rounded p-2 relative">
        <div className="w-full h-full relative">
          <h1 className="text-primary/90 font-bold text-2xl mb-4">
            Déposer un mémoire
          </h1>
          <p className="text-sm font-semibold text-foreground/70 mb-1">
            Accéder à la page du dépôt de mémoire
          </p>
          <p className="text-xs font-semibold text-foreground/70">
            Cette page n'est accessible que par les étudiants de l'Eneam. Si
            vous êtes un étudiant de l'Eneam et que vous n'y avez pas accès
            rendez vous auprès de l'administration de l'Eneam muni de vos fiches
            de pré-inscription validées pour exposer le problème.
          </p>
          <Link
            href={"/memoires/deposer"}
            className="flex justify-center items-center p-1 size-8 rounded bg-primary hover:scale-110 transition absolute bottom-1 right-1 z-10"
          >
            <Forward />
          </Link>
        </div>
        <div className="size-[250px] absolute bottom-1 right-1 -z-10">
          <Image
            src={"/cloud_files.svg"}
            alt="CloudFilesImage"
            width={150}
            height={150}
            className="w-full h-full opacity-10"
          />
        </div>
      </div>

      <div className="w-[400px] h-[250px] bg-primary/5 hover:bg-primary/10 rounded p-2 relative">
        <div className="w-full h-full relative">
          <h1 className="text-primary/90 font-bold text-2xl mb-4">
            Consulter un mémoire
          </h1>
          <p className="text-sm font-semibold text-foreground/70 mb-1">
            Accéder à la liste des mémoires des étudiants de l'Eneam
          </p>
          <p className="text-xs font-semibold text-foreground/70">
            Vous pouvez sur cette page consulter tous les mémoires déposés par les étudiants de l'Eneam après leurs soutenance de fin de formation.
          </p>
          <Link
            href={"/memoires/consulter"}
            className="flex justify-center items-center p-1 size-8 rounded bg-primary hover:scale-110 transition absolute bottom-1 right-1 z-10"
          >
            <Forward />
          </Link>
        </div>
        <div className="size-[200px] absolute bottom-1 right-1 -z-10">
          <Image
            src={"/online_information.svg"}
            alt="OnlineInformationImage"
            width={150}
            height={150}
            className="w-full h-full opacity-10"
          />
        </div>
      </div>
    </div>
  );
};

export default MemoireHomePage;
