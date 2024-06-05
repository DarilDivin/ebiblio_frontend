"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Bolt } from "lucide-react";
import EneamianSubscribeForm from "./EneamianSubscribeForm";
import ExterneSubscribeForm from "./ExterneSubscribeForm";
import StudentDebtPrice from "./StudentDebtPrice";
import TeacherDebtPrice from "./TeacherDebtPrice";
import StudentLoanDelay from "./StudentLoanDelay";
import TeacherLoanDelay from "./TeacherLoanDelay";
import StudentMaxRenewals from "./StudentMaxRenewals";
import TeacherMaxRenewals from "./TeacherMaxRenewals";
import TeacherMaxBooksLoan from "./TeacherMaxBooksLoan";
import StudentMaxBooksLoan from "./StudentMaxBooksLoan";
import { CycleDataTable } from "./(cycle)/CycleDatatable";
import { columns } from "./(cycle)/columns";
import CycleForm from "./(cycle)/CycleForm";
import { getAllCycle } from "@/lib/data/cycle";
import { getLastConfig } from "@/lib/data/configuration";

const ConfigurationPage = () => {
  const cycles = getAllCycle();
  const lastConfig = getLastConfig();
  return (
    <div className="container">
      <div className="flex w-full justify-between py-4 ">
        <div
          className={`ml-2 border-none flex gap-1 justify-between items-center p-2 rounded-md hover:bg-primary/30 cursor-default`}
        >
          <div className="flex gap-2 items-center">
            <Bolt size={17} />
            <p
              className={`text-xs font-medium w-[104px] text-nowrap text-ellipsis overflow-hidden`}
              title="Liste des mémoires"
            >
              Configuration
            </p>
          </div>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <Card className="overflow-scroll max-h-[89vh]">
        <CardContent className="grid grid-cols-3 gap-4 pt-6">
          <Card className="col-span-2 h-[400px] overflow-y-scroll bg-card card">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Configuration rapide
              </CardTitle>
              <CardDescription>Quelques configuration rapide</CardDescription>
            </CardHeader>
            <CardContent className="">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Element</TableHead>
                    <TableHead>Valeur</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                {lastConfig.error ? (
                  <div>Erreur de chargement des données</div>
                ) : lastConfig.isLoading || !lastConfig.lastConfig ? (
                  <div>Chargement...</div>
                ) : (
                  <TableBody className="text-xs"> 
                    <TableRow>
                      <TableCell className="font-bold text-nowrap w-full">
                        Frais bibliothèque Eneamien
                      </TableCell>
                      <TableCell>
                        {lastConfig.lastConfig.eneamien_subscribe_amount}
                      </TableCell>
                      <TableCell>
                        <EneamianSubscribeForm
                          amount={lastConfig.lastConfig.eneamien_subscribe_amount}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-nowrap w-full">
                        Frais bibliothèque Externes
                      </TableCell>
                      <TableCell>
                        {lastConfig.lastConfig?.extern_subscribe_amount}
                      </TableCell>
                      <TableCell>
                        <ExterneSubscribeForm amount={lastConfig.lastConfig.extern_subscribe_amount}/>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-nowrap w-full">
                        Montant minimale de la dette étudiante
                      </TableCell>
                      <TableCell>
                        {lastConfig.lastConfig?.student_debt_amount}
                      </TableCell>
                      <TableCell>
                        <StudentDebtPrice />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-nowrap w-full">
                        Montant minimale de la dette enseignante
                      </TableCell>
                      <TableCell>
                        {lastConfig.lastConfig?.teacher_debt_amount}
                      </TableCell>
                      <TableCell>
                        <TeacherDebtPrice />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-nowrap w-full">
                        Durée maximale du prêt pour les Etudiants
                      </TableCell>
                      <TableCell>
                        {lastConfig.lastConfig?.student_loan_delay}
                      </TableCell>
                      <TableCell>
                        <StudentLoanDelay />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-nowrap w-full">
                        Durée maximale du prêt pour les enseignants
                      </TableCell>
                      <TableCell>
                        {lastConfig.lastConfig?.teacher_loan_delay}
                      </TableCell>
                      <TableCell>
                        <TeacherLoanDelay />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-nowrap w-full">
                        Nombre de renouvellement possible pour Etudiant
                      </TableCell>
                      <TableCell>
                        {lastConfig.lastConfig?.student_renewals_number}
                      </TableCell>
                      <TableCell>
                        <StudentMaxRenewals />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-nowrap w-full">
                        Nombre de renouvellement possible pour Enseignant
                      </TableCell>
                      <TableCell>
                        {lastConfig.lastConfig?.teacher_renewals_number}
                      </TableCell>
                      <TableCell>
                        <TeacherMaxRenewals />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-nowrap w-full">
                        Nombre maximale de livre prêté par un Etudiant
                      </TableCell>
                      <TableCell>
                        {lastConfig.lastConfig?.max_books_per_student}
                      </TableCell>
                      <TableCell>
                        <StudentMaxBooksLoan />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-nowrap w-full">
                        Nombre maximale de livre prêté par un enseignant
                      </TableCell>
                      <TableCell>
                        {lastConfig.lastConfig?.max_books_per_teacher}
                      </TableCell>
                      <TableCell>
                        <TeacherMaxBooksLoan />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </CardContent>
          </Card>
          {cycles.error ? (
            <div>Erreur de chargement des données</div>
          ) : cycles.isLoading || !cycles.cycles ? (
            <div>Chargement...</div>
          ) : (
            <Card className="col-span-1 h-[400px] overflow-y-scroll card bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Cycles</CardTitle>
                <CardDescription>
                  Retrouvez ici les cycles de l'Eneam
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <CycleForm />
                <CycleDataTable columns={columns} data={cycles.cycles} />
              </CardContent>
            </Card>
          )}
          {/* <Card className="col-span-3 ">
            <CardHeader>
              <CardTitle>Configuration rapide</CardTitle>
              <CardDescription>Quelques configuration rapide</CardDescription>
            </CardHeader>
            <CardContent className="">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Element</TableHead>
                    <TableHead>Valeur</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs">

                  <TableRow>
                    <TableCell className="font-bold text-nowrap w-full">
                      Frais bibliothèque Eneamien
                    </TableCell>
                    <TableCell>500</TableCell>
                    <TableCell>
                      <EneamianSubscribeForm />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-nowrap w-full">
                      Frais bibliothèque Externes
                    </TableCell>
                    <TableCell>500</TableCell>
                    <TableCell>
                      <ExterneSubscribeForm />
                    </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </CardContent>
          </Card> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigurationPage;
