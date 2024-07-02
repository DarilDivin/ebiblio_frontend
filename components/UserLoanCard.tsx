import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Repeat, Trash2, X } from "lucide-react";
// import { useAuth } from "@/hooks/auth";
import { canUserRenewalsLoan, cancelLoan, getUserLoan, renewalLoan } from "@/lib/data/book";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Loan } from "@/types/loan";
import { useLoan } from "@/services/queries";

const UserLoanCard = ({ userLoan }: { userLoan: Loan }) => {
  const [canRenewals, setCanRenewals] = useState(false);
  const { mutate } = useLoan()
  useEffect(() => {
    canUserRenewalsLoan({ loan: userLoan.id, setCanRenewals });
  }, []);

  const handleRenewalLoan = async (loan: number) => {
    await renewalLoan({ loan: loan })
    mutate()
  }

  const handleCancelLoan = async (loan: number) => {
    await cancelLoan({ loan: loan })
    mutate()
  }

  return (
    <div className="w-full bg-primary/5 hover:bg-primary/10 h-56 rounded-md flex flex-col gap-4 p-2 justify-between">
      <h3 className="font-semibold font-poppins text-base text-foreground/80">
        {/* Mercredi 19 Juin 2024 */}
        {format(userLoan.created_at, "PPPP", { locale: fr })}
      </h3>
      <div>
        <div className="flex flex-col gap-2">
          <p className="flex gap-2">
            <span className="font-bold text-sm">Livre: </span>
            <span className="font-medium text-sm text-foreground/80">
              {userLoan.article.title}
            </span>
          </p>
          <div className="flex gap-2">
            <span className="font-bold text-sm">Disponibilité: </span>
            <Badge className="w-fit" variant={"outline"}>
              {userLoan.article.available ? "Disponible" : "Indisponible"}
            </Badge>
          </div>
          {userLoan.status === "Acceptée" && userLoan.book_must_returned_on && (
            <div className="flex gap-2  ">
              <span className="font-bold text-sm">Date de retour:</span>
              <Badge className="w-fit" variant={"outline"}>
                {format(userLoan.book_must_returned_on, "PPPP", {
                  locale: fr,
                })}
              </Badge>
            </div>
          )}
        </div>
      </div>
      <div className="justify-self-end flex justify-between items-center h-9">
        <Badge className="w-fit justify-start">
          {" "}
          Statut: {userLoan.status}
        </Badge>
        {userLoan.status === "En cours de traitement" && (
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-fit p-2 flex gap-2 text-destructive/70 hover:bg-destructive/20 hover:text-destructive rounded-md"
                    onClick={() => handleCancelLoan(userLoan.id)}
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
        )}
        {(userLoan.status === "Terminée" || userLoan.status === 'Rejetée') && (
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-fit p-2 flex gap-2 text-orange-400/70 hover:bg-orange-400/20 hover:text-orange-400 rounded-md"
                  >
                    <span className="sr-only">Retirer la demande de la liste</span>
                    <Trash2 className="text-orange-400 h-4 w-4" />
                    <span>Retirer</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Retirer la demande de la liste</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {canRenewals && ( 
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-fit p-2 flex gap-2 text-primary/70 hover:bg-primary/20 hover:text-primary rounded-md"
                    onClick={() => handleRenewalLoan(userLoan.id)}
                  >
                    <span className="sr-only">Renouveler la demande</span>
                    <Repeat className="text-primary h-4 w-4" />
                    <span>Renouveler</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Renouveler la demande</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLoanCard;
