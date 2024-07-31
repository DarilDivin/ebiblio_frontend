"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import { getUserLoan } from "@/lib/data/book";
import UserLoanCard from "@/components/UserLoanCard";
import { User } from "@/types/user";

const page = () => {
  const { user, isLoading, error }: {user: User; isLoading: boolean; error: any} = useAuth();
  const { userLoans } = getUserLoan(user?.id);

  if (error) return <div>Erreur de chargement</div>;
  if (isLoading) return <div>Chargement...</div>;

  return (
    <div>
      <div className="h-[55vh] max-sm:h-[35vh] w-full bg-primary/5 grid grid-cols-2 max-md:grid-cols-[400px_1fr] max-sm:grid-cols-1 justify-center items-center px-52 max-lg:px-10 max-sm:px-12 pt-8 rounded-lg mb-4">
        <div>
          <p className="text-[2.5rem] max-md:text-[1.5rem] max-md:text-center font-bold font-poppins text-primary justify-self-end ">
            Bienvenue dans votre espace Bibliothèque
          </p>
          <p className="text-base max-sm:text-base max-sm:text-center font-semibold font-poppins text-foreground/70 justify-self-end">
            Ici retrouvez toutes vos demandes de prêt effectuées et restez
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
          <h2 className="font-bold text-2xl max-md:text-xl font-poppins">
            Mes demandes de prêts
          </h2>
          <Badge>Dette: {user.debt_amount} FCFA</Badge>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-h-screen overflow-y-scroll">
          {userLoans?.map((userLoan) => (
            <UserLoanCard userLoan={userLoan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
