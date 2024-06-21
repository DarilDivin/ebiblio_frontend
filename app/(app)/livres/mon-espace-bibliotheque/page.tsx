import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="h-[55vh] max-sm:h-[35vh] w-full bg-primary/5 grid grid-cols-2 max-md:grid-cols-[400px_1fr] max-sm:grid-cols-1 justify-center items-center px-52 max-lg:px-10 max-sm:px-12 pt-8 rounded-lg mb-4">
        <div>
          <p className="text-[2.5rem] max-md:text-[1.5rem] max-md:text-center font-bold font-poppins text-primary justify-self-end ">
            Bienvenue dans vootre espace Bibliothèque
          </p>
          <p className="text-base max-sm:text-base max-sm:text-center font-semibold font-poppins text-foreground/70 justify-self-end">
            Ici retrouvez toutes vos demandes de prêt effectué et restez
            informer de leur état d'avancement.
          </p>
        </div>
        <div className="h-full overflow-hidden max-md:hidden">
          <Image
            src={"/book_reading.svg"}
            alt="Searching File Image"
            className="object-contain w-full h-full"
            width={800}
            height={800}
            priority
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-12 max-sm:px-6 pb-8">
        <div className="flex w-full justify-between">
          <h2 className="font-bold text-2xl max-md:text-xl font-poppins">Mes demandes de prêts</h2>
          <Badge>Dette: 500 FCFA</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-h-screen overflow-y-scroll">
          <div className="w-full bg-primary/5 hover:bg-primary/10 h-56 rounded-md flex flex-col gap-4 p-2 justify-between">
            <h3 className="font-semibold font-poppins text-base text-foreground/80">
              Mercredi 19 Juin 2024
            </h3>
            <div>
              <div className="flex flex-col gap-2">
                <p className="flex gap-2">
                  <span className="font-bold text-sm">Livre: </span>
                  <span className="font-medium text-sm text-foreground/80">
                    Harry Potter et les reliques de la mort
                  </span>
                </p>
                <div className="flex gap-2">
                  <span className="font-bold text-sm">Disponibilité: </span>
                  <Badge className="w-fit" variant={"outline"}>
                    Disponible
                  </Badge>
                </div>
                <div className="flex gap-2  ">
                  <span className="font-bold text-sm">
                    Date de retour:
                  </span>
                  <Badge className="w-fit" variant={"outline"}>
                    31/06/2024 
                  </Badge>
                </div>
              </div>
            </div>
            <div className="justify-self-end flex justify-between items-center h-9">
              <Badge className="w-fit justify-start"> Statut: En attente</Badge>
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-fit p-2 flex gap-2 text-destructive/70 hover:bg-destructive/20 hover:text-destructive rounded-md"
                      >
                        <span className="sr-only">Annuler la demande</span>
                        <X className="text-destructive h-4 w-4" />
                        <span>Annuler</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Annuler la demande</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
