"use client";

import { BookBarChart } from "@/components/BookBarChart";
import {
  MemoireLineChartGradient,
} from "@/components/MemoireLineChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserPieChart } from "@/components/UserPieChart";
import { getAllStatistics } from "@/lib/data/statistics";
import { BookMarked, File, FileText, User } from "lucide-react";

const Dashboard = () => {
  const { statistics, isLoading, error } = getAllStatistics();

  if (error) return <div>Erreur</div>;

  if (isLoading || !statistics) return
  <div className="w-full flex gap-4 items-center">
    <Skeleton className="w-[450px] h-[275px]" />
    <Skeleton className="w-[380px] h-[275px]" />
    <Skeleton className="w-[380px] h-[275px]" />
  </div>;

  return (
    <div className="flex flex-col gap-4 w-full p-2">
      <div className="w-full flex gap-4 items-center">
        <Card className="w-[450px] h-[275px]">
          <CardHeader className=" flex flex-row justify-between p-3">
            <div className="">
              <CardTitle className="text-primary">{statistics.usersCount}</CardTitle>
              <CardDescription>Utilisateurs</CardDescription>
            </div>
            <div className="">
              <User className="size-8" />
            </div>
          </CardHeader>
          <CardContent className="flex justify-center items-center gap-4">
            <div className="flex flex-col gap-4">
              <p className="text-base text-foreground/50">
                <span className="text-xl text-foreground">{statistics.eneamiensNumber}&nbsp;</span>
                étudiants
              </p>
              <p className="text-base text-foreground/50">
                <span className="text-xl text-foreground">{statistics.teachersNumber}&nbsp;</span>
                enseignants
              </p>
              <p className="text-base text-foreground/50">
                <span className="text-xl text-foreground">{statistics.externesNumber}&nbsp;</span>
                externes
              </p>
            </div>
            <div className="size-[180px]">
              <UserPieChart eneamiensNumber={statistics.eneamiensNumber} externesNumber={statistics.externesNumber} teachersNumber={statistics.teachersNumber}/>
            </div>
          </CardContent>
        </Card>

        <Card className="w-[380px] h-[275px]">
          <CardHeader className=" flex flex-row justify-between p-3 ">
            <div className="">
              <CardTitle className="text-primary">3456</CardTitle>
              <CardDescription>Mémoires</CardDescription>
            </div>
            <div className="">
              <FileText className="size-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <p className="text-xs text-foreground/50">
                <span className="text-sm text-foreground">1500&nbsp;</span>
                validé
              </p>
              <p className="text-xs text-foreground/50">
                <span className="text-sm text-foreground">1500&nbsp;</span>
                en attente de validation
              </p>
            </div>
          </CardContent>
          <CardFooter className="p-0 flex justify-center">
            <MemoireLineChartGradient />
          </CardFooter>
        </Card>

        <Card className="w-[380px] h-[275px]">
          <CardHeader className=" flex flex-row justify-between p-3">
            <div className="">
              <CardTitle className="text-primary">3456</CardTitle>
              <CardDescription>Livres</CardDescription>
            </div>
            <div className="">
              <BookMarked className="size-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <p className="text-xs text-foreground/50">
                <span className="text-sm text-foreground">1500&nbsp;</span>
                Physiques
              </p>
              <p className="text-xs text-foreground/50">
                <span className="text-sm text-foreground">1500&nbsp;</span>
                Ebooks
              </p>
            </div>
          </CardContent>
          <CardFooter className="p-0 flex justify-center">
            <BookBarChart />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
