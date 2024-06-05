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
import { Cycle, columns } from "./(cycle)/columns";
import CreateCycleForm from "./(cycle)/CreateCycleForm";

async function getCycleData(): Promise<Cycle[]> {
  // Fetch data from your API here.
  return [
    {
      id: '1001',
      name: 'Licence',
      code: "L",
      // created_at: "2017-09-25",
      // updated_at: "2017-09-25",
      // deleted_at: "2017-09-25",
      // created_by: "admin",
      // updated_by: "admin",
      // deleted_by: "admin"
    },
    {
      id: '1001',
      name: 'Master',
      code: "M",
      // created_at: "2017-09-25",
      // updated_at: "2017-09-25",
      // deleted_at: "2017-09-25",
      // created_by: "admin",
      // updated_by: "admin",
      // deleted_by: "admin"
    },
    {
      id: '1001',
      name: 'Doctorat',
      code: "D",
      // created_at: "2017-09-25",
      // updated_at: "2017-09-25",
      // deleted_at: "2017-09-25",
      // created_by: "admin",
      // updated_by: "admin",
      // deleted_by: "admin"
    },
    // ...
  ]
}

const ConfigurationPage = async () => {
  const data = await getCycleData()
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
              <CardTitle className="text-card-foreground">Configuration rapide</CardTitle>
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
                    <TableCell>1500</TableCell>
                    <TableCell>
                      <ExterneSubscribeForm />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-nowrap w-full">
                      Montant minimale de la dette étudiante
                    </TableCell>
                    <TableCell>500</TableCell>
                    <TableCell>
                      <StudentDebtPrice />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-nowrap w-full">
                      Montant minimale de la dette enseignante
                    </TableCell>
                    <TableCell>3000</TableCell>
                    <TableCell>
                      <TeacherDebtPrice />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-nowrap w-full">
                      Durée maximale du prêt pour les Etudiants
                    </TableCell>
                    <TableCell>14 jours</TableCell>
                    <TableCell>
                      <StudentLoanDelay />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-nowrap w-full">
                      Durée maximale du prêt pour les enseignants
                    </TableCell>
                    <TableCell>28 jours</TableCell>
                    <TableCell>
                      <TeacherLoanDelay />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-nowrap w-full">
                      Nombre de renouvellement possible pour Etudiant
                    </TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <StudentMaxRenewals />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-nowrap w-full">
                      Nombre de renouvellement possible pour Enseignant
                    </TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <TeacherMaxRenewals />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-nowrap w-full">
                      Nombre maximale de livre prêté par un Etudiant
                    </TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>
                      <StudentMaxBooksLoan />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-nowrap w-full">
                      Nombre maximale de livre prêté par un enseignant
                    </TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>
                      <TeacherMaxBooksLoan />
                    </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="col-span-1 h-[400px] overflow-y-scroll card bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Cycles</CardTitle>
              <CardDescription>Retrouvez ici les cycles de l'Eneam</CardDescription>
            </CardHeader>
            <CardContent className="">
              <CreateCycleForm />
              <CycleDataTable columns={columns} data={data}/>
            </CardContent>
          </Card>
          <Card className="col-span-1">
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
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigurationPage;
