import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HandHelping } from "lucide-react";
import AskForLoanAdminCard from "@/components/AskForLoanAdminCard";

const BookAskForLoan = () => {
  return (
    <div className="p-2">
      <div className="flex w-full justify-between px-8 py-4 bg-primary/5 rounded-md mb-4">
        <div
          className={`ml-2 border-none flex gap-1 justify-between items-center p-2 rounded-md hover:bg-primary/30 cursor-default`}
        >
          <div className="flex gap-2 items-center">
            <HandHelping size={17} />
            <p
              className={`text-xs font-medium max-sm:w-[104px] text-nowrap text-ellipsis overflow-hidden`}
              title="Liste des mémoires"
            >
              Liste des Demandes de prêts
            </p>
          </div>
        </div>
        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/9.x/thumbs/svg?seed=Divin`}
          />
          <AvatarFallback>DD</AvatarFallback>
        </Avatar>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  max-h-[88vh] overflow-scroll items-start justify-start">
        <AskForLoanAdminCard />
        <AskForLoanAdminCard />
        <AskForLoanAdminCard />
        <AskForLoanAdminCard />
        <AskForLoanAdminCard />
        <AskForLoanAdminCard />
        <AskForLoanAdminCard />
        <AskForLoanAdminCard />
      </div>
    </div>
  );
};

export default BookAskForLoan;
