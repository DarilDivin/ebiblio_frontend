'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HandHelping } from "lucide-react";
import AskForLoanAdminCard from "@/components/AskForLoanAdminCard";
import { getAllLoan } from "@/lib/data/book";

const BookAskForLoan = () => {
  const { loans, isLoading, error } = getAllLoan();

  if (error) return <div>Erreur de chargement</div>;
  if (isLoading) return <div>Chargement...</div>;

  return (
    <div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  max-h-[88vh] overflow-scroll items-start justify-start">
        {loans?.map((loan) => (
          <AskForLoanAdminCard loan={loan} />
        ))}
      </div>
    </div>
  );
};

export default BookAskForLoan;
