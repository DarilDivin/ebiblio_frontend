import { Button } from "@/components/ui/button";
import { Check, Redo2, Undo2, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "./ui/badge";
import { Loan } from "@/types/loan";
import { acceptLoanRequest, recoveredBook, returnedBook, withdrawedLoan } from "@/lib/data/book";
import { useLoan } from "@/services/queries";
import { toast } from "sonner";
import RejectAskForLoanRequestForm from "./RejectAskForLoanRequestForm";

const AskForLoanAdminCard = ({ loan }: { loan: Loan }) => {
  const { mutate } = useLoan();

  const handleAcceptLoanRequest = async (loan: number) => {
    await acceptLoanRequest({ loan: loan });

    mutate();
  };

  const handleRecoveredBook = async (loan: number) => {
    await recoveredBook({ loan: loan });

    mutate();
  };

  const handleReturnedBook = async (loan: number) => {
    await returnedBook({ loan: loan });

    mutate();
  };

  const handleWithdrawedLoan = async (loan: number) => {
    await withdrawedLoan({loan: loan});

    mutate()
  }
  return (
    <div className=" p-2 w-full rounded-md bg-primary/5 hover:bg-primary/10 h-60 flex flex-col justify-between">
      <div className="flex flex-col gap-2 ">
        <h3 className=" text-base font-poppins font-bold">
          Nouvelle demande de {loan.user.firstname} {loan.user.lastname}
        </h3>
        <Badge className=" w-fit">Externe</Badge>
      </div>

      <div className="flex flex-col gap-2">
        <p>
          <span className="font-bold text-sm">Livre: </span>
          <span className="font-medium text-sm text-foreground/80">
            {loan.article.title}
          </span>
        </p>
        <div>
          <span className="font-bold text-sm">Disponibilité: </span>
          <Badge className="w-fit" variant={"outline"}>
            {loan.article.available ? "Disponible" : "Indisponible"}
          </Badge>
        </div>
        <div>
          <span className="font-bold text-sm">Restant en Stock: </span>
          <Badge className="w-fit" variant={"outline"}>
            {loan.article.available_stock}
          </Badge>
        </div>
      </div>

      <div className="justify-self-end flex justify-between items-center h-9">
        <Badge variant={'secondary'} className="w-fit justify-start"> Statut: {loan.status}</Badge>
        <div>
          {loan.status === "En cours" && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 text-primary/70 hover:bg-primary/20 hover:text-primary rounded-md"
                      onClick={() => handleAcceptLoanRequest(loan.id)}
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
                    <RejectAskForLoanRequestForm loan={loan.id}/>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Rejeter la demande</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
          {loan.status === "Acceptée"  && loan.book_recovered_at == null && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 flex gap-2 p-0 text-blue-400/70 hover:bg-blue-400/20 hover:text-blue-400 rounded-md"
                      onClick={() => handleRecoveredBook(loan.id)}
                    >
                      <span className="sr-only">Marquer le livre comme récupéré par le demandeur</span>
                      {/* <span className="">Marquer le livre comme récupéré par le demandeur</span> */}
                      <Redo2 className="text-blue-400 h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Marquer le livre comme récupéré par le demandeur</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
          {loan.book_recovered_at && loan.book_returned_at == null && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 text-blue-500/70 hover:bg-blue-500/20 hover:text-blue-500 rounded-md"
                      onClick={() => handleReturnedBook(loan.id)}
                    >
                      <span className="sr-only">Marquer le livre comme ramené par l'utilisateur</span>
                      <Undo2 className="text-blue-500 h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Marquer le livre comme ramené par l'utilisateur</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
          {loan.book_returned_at && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 text-red-500/70 hover:bg-red-500/20 hover:text-red-500 rounded-md"
                      onClick={() => handleWithdrawedLoan(loan.id)}
                    >
                      <span className="sr-only">Retirer la demande de la liste</span>
                      <X className="text-red-500 h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Retirer la demande de la liste</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AskForLoanAdminCard;
