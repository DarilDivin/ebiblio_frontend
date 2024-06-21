import { Button } from "@/components/ui/button";
import { Check, Redo2, Undo2, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "./ui/badge";

const AskForLoanAdminCard = () => {
  return (
    <div className=" p-2 w-full rounded-md bg-primary/5 hover:bg-primary/10 h-60 flex flex-col justify-between">
          <div className="flex flex-col gap-2 ">
            <h3 className=" text-lg font-poppins font-bold">
              Nouvelle demande de Divin DJK
            </h3>
            <Badge className=" w-fit">Externe</Badge>
          </div>

          <div className="flex flex-col gap-2">
            <p>
              <span className="font-bold text-base">Livre: </span>
              <span className="font-medium text-base text-foreground/80">Harry Potter et les reliques de la mort</span>
            </p>
            <p>
              <span className="font-bold text-base">Disponibilité: </span>
              <Badge className="w-fit" variant={'outline'}>Disponible</Badge>
            </p>
            <p>
              <span className="font-bold text-base">Restant en Stock: </span>
              <Badge className="w-fit" variant={'outline'}>1 / 3</Badge>
            </p>
          </div>

          <div className="justify-self-end flex justify-between items-center h-9">
            <Badge className="w-fit justify-start"> Statut: En attente</Badge>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 text-primary/70 hover:bg-primary/20 hover:text-primary rounded-md"
                    >
                      <span className="sr-only">Valider la demande</span>
                      <Check className="text-primary h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Valider la demande</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 text-destructive/70 hover:bg-destructive/20 hover:text-destructive rounded-md"
                    >
                      <span className="sr-only">Rejeter la demande</span>
                      <X className="text-destructive h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Rejeter la demande</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 text-blue-400/70 hover:bg-blue-400/20 hover:text-blue-400 rounded-md"
                    >
                      <span className="sr-only">Livre récupéré</span>
                      <Redo2 className="text-blue-400 h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Livre récupéré</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 text-blue-500/70 hover:bg-blue-500/20 hover:text-blue-500 rounded-md"
                    >
                      <span className="sr-only">Livre ramené</span>
                      <Undo2 className="text-blue-500 h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Livre ramené</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
  )
}

export default AskForLoanAdminCard