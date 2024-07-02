"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllUsers } from "@/lib/data/user";
import { User2 } from "lucide-react";
import React from "react";
import { columns } from "./columns";
import { UserDataTable } from "./data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { User } from "@/types/user";
import { useAuth } from "@/hooks/auth";

const AdminUserPage = () => {
  const { users, isLoading, error } = getAllUsers();
  // const {
  //   user,
  //   logout,
  // }: { user: User; logout: any } = useAuth({
  //   middleware: "auth",
  // });

  if (error) return <div>Erreur de chargement des données</div>;
  if (isLoading || !users) return <div>Chargement...</div>;

  const data = users;
  
  return (
    <div>
      {/* <div className="flex w-full justify-between px-8 py-4 ">
        <div
          className={`ml-2 border-none flex gap-1 justify-between items-center p-2 rounded-md hover:bg-primary/30 cursor-default`}
        >
          <div className="flex gap-2 items-center">
            <User2 size={17} />
            <p
              className={`text-xs font-medium w-[104px] lg:w-auto text-nowrap text-ellipsis overflow-hidden`}
              title="Liste des mémoires"
            >
              Liste des Utilisateurs
            </p>
          </div>
        </div>
        <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar> */}

        {/* <div className="flex gap-4 items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.email}`}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                Logout
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/admin">Dashboard</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div> */}
      {/* </div> */}
      <div className="max-lg:container w-full px-10 py-4">
        Liste des Utilisateurs
        <UserDataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdminUserPage;
