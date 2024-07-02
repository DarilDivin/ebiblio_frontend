"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HandHelping } from "lucide-react";
import { DashboardProvider, useDashboard } from "@/hooks/DashBoardContext";
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
import { useAuth } from "@/hooks/auth";
import { User } from "@/types/user";
import DashboardLayoutSkeleton from "@/components/Skeletons/DashboardLayoutSkeleton";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const { title } = useDashboard(); // utilisez le contexte
  const {
    user,
    isLoading,
    error,
    logout,
  }: { user: User; logout: any; error: any; isLoading: boolean } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: '/admin'
  });

  if (error) return <div>Erreur de chargement des données</div>;
  if (isLoading || !user) return <DashboardLayoutSkeleton/>;

  // console.log(sidebarIsOpen);
  return (
    <>
      <div
        className={`w-full h-screen bg-primary/10 p-2 grid gap-2 ${
          sidebarIsOpen ? "grid-cols-[200px_1fr]" : "grid-cols-[50px_1fr]"
        } transition-all duration-300`}
      >
        <div className=" w-fit">
          <Sidebar open={sidebarIsOpen} onOpen={setSidebarIsOpen} />
        </div>
        <div className="bg-background rounded-md overflow-y-scroll">
          <div className="p-2">
            <div className="flex w-full justify-between px-8 py-4 bg-primary/5 rounded-md mb-4">
              <div
                className={`ml-2 border-none flex gap-1 justify-between items-center p-2 rounded-md hover:bg-primary/30 cursor-default`}
              >
                <div className="flex gap-2 items-center">
                  {/* <HandHelping size={17} /> */}
                  <p
                    className={`text-xs font-medium max-sm:w-[104px] text-nowrap text-ellipsis overflow-hidden`}
                    title={title}
                  >
                    {title}
                  </p>
                </div>
              </div>
              {/* <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=Divin`}
                  />
                  <AvatarFallback>DD</AvatarFallback>
                </Avatar> */}
              <div className="flex gap-4 items-center justify-center">
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
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href="/admin">Dashboard</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <ModeToggle />
              </div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </>
  );
};

const DashboardLayoutWithProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <DashboardProvider>
    <DashboardLayout>{children}</DashboardLayout>
  </DashboardProvider>
);

export default DashboardLayoutWithProvider;
