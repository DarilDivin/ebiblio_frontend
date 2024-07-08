"use client";

import { MemoireLineChart, MemoireLineChartGradient } from "@/components/MemoireLineChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserPieChart } from "@/components/UserPieChart";
import { BookMarked, File, FileText, User } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 w-full p-2">
      <div className="w-full flex gap-4 items-center">
        <Card className="w-[450px] h-[275px]">
          <CardHeader className=" flex flex-row justify-between p-3">
            <div className="">
              <CardTitle className="text-primary">3456</CardTitle>
              <CardDescription>Utilisateurs</CardDescription>
            </div>
            <div className="">
              <User className="size-8" />
            </div>
          </CardHeader>
          <CardContent className="flex justify-center items-center gap-4">
            <div className="flex flex-col gap-4">
              <p className="text-base text-foreground/50">
                <span className="text-xl text-foreground">
                  1500&nbsp;
                </span>
                étudiants
              </p>
              <p className="text-base text-foreground/50">
                <span className="text-xl text-foreground">
                  1500&nbsp;
                </span>
                enseignants
              </p>
              <p className="text-base text-foreground/50">
                <span className="text-xl text-foreground">
                  1500&nbsp;
                </span>
                externes
              </p>
            </div>
            <div className="size-[180px]">
              <UserPieChart/>
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
                <span className="text-sm text-foreground">
                  1500&nbsp;
                </span>
                validé
              </p>
              <p className="text-xs text-foreground/50">
                <span className="text-sm text-foreground">
                  1500&nbsp;
                </span>
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
                <span className="text-sm text-foreground">
                  1500&nbsp;
                </span>
                Physiques
              </p>
              <p className="text-xs text-foreground/50">
                <span className="text-sm text-foreground">
                  1500&nbsp;
                </span>
                Ebooks
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
