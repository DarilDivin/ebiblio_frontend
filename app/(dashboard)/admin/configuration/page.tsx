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
import { soutenanceColumns } from "./(soutenance)/columns";
import { cycleColumns } from "./(cycle)/columns";
import { getLastConfig } from "@/lib/data/configuration";
import { Skeleton } from "@/components/ui/skeleton";
import SchoolNameForm from "./SchoolNameForm";
import SchoolAcronymForm from "./SchoolAcronymForm";
import SchoolCityForm from "./SchoolCityForm";
import { SoutenanceDataTable } from "./(soutenance)/SoutenanceDatatable";
import { getAllSoutenance } from "@/lib/data/soutenance";
import { getAllCycle } from "@/lib/data/cycle";
import { CycleDataTable } from "./(cycle)/CycleDatatable";
import CycleForm from "./(cycle)/CycleForm";
import SoutenanceForm from "./(soutenance)/SoutenanceForm";
import { getAllFiliere } from "@/lib/data/sector";
import { sectorColumns } from "./(sector&specialities)/columns";
import SectorSpecialityForm from "./(sector&specialities)/Sector&SpecialityForm";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import { SectorDataTable } from "./(sector&specialities)/SectorDatatable";
import { roleColumns } from "./(role)/columns";
import { RoleDataTable } from "./(role)/RoleDatatable";
import { getAllRole } from "@/lib/data/role";

const ConfigurationPage = () => {
  const cycles = getAllCycle();
  const roles = getAllRole();
  const soutenances = getAllSoutenance();
  const sectors = getAllFiliere();
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
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className="grid grid-cols-3 gap-4 pt-6">
            <Card className="col-span-3 h-[700px] overflow-y-scroll bg-card card">
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
                    <TableBody>Erreur de chargement des données</TableBody>
                  ) : lastConfig.isLoading || !lastConfig.lastConfig ? (
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-bold text-nowrap w-full">
                          <Skeleton className="h-6 w-[250px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-6 w-[50px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-8 w-8" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold text-nowrap w-full">
                          <Skeleton className="h-6 w-[250px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-6 w-[50px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-8 w-8" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold text-nowrap w-full">
                          <Skeleton className="h-6 w-[250px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-6 w-[50px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-8 w-8" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody className="text-xs">
                      <TableRow>
                        <TableCell className="font-bold text-nowrap w-full">
                          Nom de L'université
                        </TableCell>
                        <TableCell>
                          {lastConfig.lastConfig.school_name}
                        </TableCell>
                        <TableCell>
                          <SchoolNameForm
                            name={lastConfig.lastConfig.school_name}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold text-nowrap w-full">
                          Acronym de l'Université
                        </TableCell>
                        <TableCell>
                          {lastConfig.lastConfig.school_acronym}
                        </TableCell>
                        <TableCell>
                          <SchoolAcronymForm
                            name={lastConfig.lastConfig.school_acronym}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold text-nowrap w-full">
                          Ville de l'Université
                        </TableCell>
                        <TableCell>
                          {lastConfig.lastConfig.school_city}
                        </TableCell>
                        <TableCell>
                          <SchoolCityForm
                            name={lastConfig.lastConfig.school_city}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold text-nowrap w-full">
                          Frais bibliothèque Eneamien
                        </TableCell>
                        <TableCell>
                          {lastConfig.lastConfig.eneamien_subscribe_amount}
                        </TableCell>
                        <TableCell>
                          <EneamianSubscribeForm
                            amount={
                              lastConfig.lastConfig.eneamien_subscribe_amount
                            }
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
                          <ExterneSubscribeForm
                            amount={
                              lastConfig.lastConfig.extern_subscribe_amount
                            }
                          />
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
                          <StudentDebtPrice
                            amount={lastConfig.lastConfig.student_debt_amount}
                          />
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
                          <TeacherDebtPrice
                            amount={lastConfig.lastConfig.teacher_debt_amount}
                          />
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
                          <StudentLoanDelay
                            delay={lastConfig.lastConfig.student_loan_delay}
                          />
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
                          <TeacherLoanDelay
                            delay={lastConfig.lastConfig.teacher_loan_delay}
                          />
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
                          <StudentMaxRenewals
                            max={lastConfig.lastConfig.student_renewals_number}
                          />
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
                          <TeacherMaxRenewals
                            max={lastConfig.lastConfig.teacher_renewals_number}
                          />
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
                          <StudentMaxBooksLoan
                            max={lastConfig.lastConfig.max_books_per_student}
                          />
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
                          <TeacherMaxBooksLoan
                            max={lastConfig.lastConfig.max_books_per_teacher}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </CardContent>
            </Card>
            {/* {cycles.error ? (
              <div>Erreur de chargement des données</div>
            ) : cycles.isLoading || !cycles.cycles ? (
              <Card className="col-span-1 h-[400px] overflow-y-scroll card bg-card">
                <CardHeader>
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-40" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-4" />
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <Skeleton className="h-8 col-span-3" />
                    <Skeleton className="h-8 w-full" />
                  </div>

                  <Skeleton className="w-full h-[200px]" />
                </CardContent>
              </Card>
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
                  <CycleDataTable columns={cycleColumns} data={cycles.cycles} />
                </CardContent>
              </Card>
            )} */}
          </div>

          {/* <Card> */}
          <div className=" grid grid-cols-2 gap-4">
            {soutenances.error ? (
              <div>Erreur de chargement des données</div>
            ) : soutenances.isLoading || !soutenances.soutenances ? (
              <Card className="col-span-1 h-[400px] overflow-y-scroll card bg-card">
                <CardHeader>
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-40" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-4" />
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <Skeleton className="h-8 col-span-3" />
                    <Skeleton className="h-8 w-full" />
                  </div>

                  <Skeleton className="w-full h-[200px]" />
                </CardContent>
              </Card>
            ) : (
              <Card className="col-span-1 h-[400px] overflow-y-scroll card bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">
                    Soutenances
                  </CardTitle>
                  <CardDescription>
                    Retrouvez ici les soutenances par année de l'Eneam
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  <SoutenanceForm />
                  <SoutenanceDataTable
                    columns={soutenanceColumns}
                    data={soutenances?.soutenances}
                  />
                </CardContent>
              </Card>
            )}
            {sectors.error ? (
              <div>Erreur de chargement des données</div>
            ) : sectors.isLoading || !sectors.sectorsAndSpecialities ? (
              <Card className="col-span-1 h-[400px] overflow-y-scroll card bg-card">
                <CardHeader>
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-40" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-4" />
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <Skeleton className="h-8 col-span-3" />
                    <Skeleton className="h-8 w-full" />
                  </div>

                  <Skeleton className="w-full h-[200px]" />
                </CardContent>
              </Card>
            ) : (
              <Card className="col-span-1 h-[400px] overflow-y-scroll card bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">
                    Filières
                  </CardTitle>
                  <CardDescription>
                    Retrouvez ici les filières de l'Eneam
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  <SectorSpecialityForm />
                  <SectorDataTable
                    columns={sectorColumns}
                    data={sectors?.sectorsAndSpecialities}
                  />
                </CardContent>
              </Card>
            )}
          </div>
          {/* </Card> */}

          <div className=" grid grid-cols-2 gap-4">
            {roles.error ? (
              <div>Erreur de chargement des données</div>
            ) : roles.isLoading || !roles.roles ? (
              <Card className="col-span-1 h-[400px] overflow-y-scroll card bg-card">
                <CardHeader>
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-40" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-4" />
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <Skeleton className="h-8 col-span-3" />
                    <Skeleton className="h-8 w-full" />
                  </div>

                  <Skeleton className="w-full h-[200px]" />
                </CardContent>
              </Card>
            ) : (
              <Card className="col-span-1 h-[400px] overflow-y-scroll card bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Roles</CardTitle>
                  <CardDescription>
                    Retrouvez ici les Roles de la plateforme
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  {/* <RoleForm /> */}
                  <RoleDataTable columns={roleColumns} data={roles.roles} />
                </CardContent>
              </Card>
            )}
            {cycles.error ? (
              <div>Erreur de chargement des données</div>
            ) : cycles.isLoading || !cycles.cycles ? (
              <Card className="col-span-1 h-[400px] overflow-y-scroll card bg-card">
                <CardHeader>
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-40" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-4" />
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <Skeleton className="h-8 col-span-3" />
                    <Skeleton className="h-8 w-full" />
                  </div>

                  <Skeleton className="w-full h-[200px]" />
                </CardContent>
              </Card>
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
                  <CycleDataTable columns={cycleColumns} data={cycles.cycles} />
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigurationPage;
