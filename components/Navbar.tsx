"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { ModeToggle } from "./ui/mode-toggle";
import { User } from "@/types/user";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { userHasRole } from "@/lib/utils";

const Navbar = () => {
  const {
    user,
    logout,
    error,
    isLoading,
  }: { user: User; logout: any; error: any; isLoading: boolean } = useAuth({
    middleware: "auth",
  });
  
  const router = useRouter();

  const pathname = usePathname();
  const pathnameContainsLivres = pathname.includes("/livres");
  const pathnameContainsMemoires = pathname.includes("/memoires");

  const [showBiblioPages, setShowBiblioPages] = useState(
    pathnameContainsLivres
  );
  const [showMemoryPages, setShowMemoryPages] = useState(
    pathnameContainsMemoires
  );

  // const toggleTabs = (e: any) => {
  //   // console.log(e.target.firstChild.data);
  //   if (e.target.firstChild.data === "Livres") {
  //     setShowBiblioPages(true);
  //   } else {
  //     setShowBiblioPages(false);
  //   }
  // };

  const toggleTabs = (e: any) => {
    // console.log(e.target.firstChild.data);
    if (e.target.firstChild.data === "Mémoires") {
      setShowMemoryPages(true);
    } else {
      setShowMemoryPages(false);
    }
  };

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(true);

  if (error) {
    router.push("/registration");
  }
  if (isLoading || !user)
    return (
      <div className="w-full px-2 py-1 flex justify-center items-center">
        <Skeleton className="h-[50px] w-full"></Skeleton>
      </div>
    );

    const role = userHasRole(user, "Etudiant-Externe")
  return (
    <div className="w-full px-2 py-1 flex justify-center items-center ">
      <div className="w-full bg-primary/10 shadow-lg rounded-lg h-[50px] flex gap-4 items-center justify-between px-2 lg:px-20 py-2 relative">
        <div className="font-semibold text-primary-foreground bg-primary/10 cursor-pointer flex items-center h-full p-1 rounded-md max-sm:hidden">
          <Link href="/home">
            <span className="text-primary font-bold text-2xl font-alexana">
              E
            </span>
            <span>Biblio</span>
          </Link>
        </div>
        <div className="max-sm:hidden">
          <div className="w-[250px] sm:w-[300px] lg:w-fit bg-primary/70 h-[40px] rounded-[6px] p-[3px] flex justify-between">
            <button
              className={`${
                showMemoryPages
                  ? "text-foreground"
                  : "bg-background text-primary cursor-default"
              } text-[10px] sm:text-xs lg:text-base h-full  w-[200px] px-8 rounded font-semibold disabled:cursor-not-allowed`}
              onClick={async (e) => {
                await router.push("/livres");
                toggleTabs(e);
              }}
            >
              Livres
            </button>
            <button
              className={`${
                showMemoryPages
                  ? "bg-background text-primary cursor-default"
                  : "text-foreground "
              } text-[10px] sm:text-xs lg:text-base w-[150px] font-semibold h-full rounded disabled:cursor-not-allowed`}
              onClick={async (e) => {
                await router.push("/memoires");
                toggleTabs(e);
              }}
              disabled={userHasRole(user, "Etudiant-Externe")}
            >
              Mémoires
            </button>
          </div>
        </div>
        <div className="flex justify-start gap-8 list-none lg:w-[700px] max-sm:hidden ">
          {/* max-sm:absolute max-sm:bg-green-50/80 max-sm:p-4 max-sm:rounded max-sm:border max-sm:top-14 max-sm:w-[96%] max-sm:flex-wrap max-sm:grid max-sm:grid-cols-2 transition-all -translate-y-40 duration-500 */}
          {!showMemoryPages ? (
            <>
              <Link
                href="/livres/physiques"
                className={`hover:text-primary text-sm lg:text-sm ${
                  pathname === "/livres/physiques"
                    ? "text-primary font-bold"
                    : "text-foreground"
                }`}
              >
                Livres Physiques
              </Link>
              <Link
                href="/livres/ebooks"
                className={`hover:text-primary text-sm lg:text-sm ${
                  pathname === "/livres/ebooks"
                    ? "text-primary font-bold"
                    : "text-foreground"
                }`}
              >
                Ebooks
              </Link>
              {/* <Link href='/livres/podcasts' className="hover:text-primary text-sm lg:text-sm">Podcasts</Link> */}
              <Link
                href="/livres/mon-espace-bibliotheque"
                className={`hover:text-primary text-sm lg:text-sm ${
                  pathname === "/livres/mon-espace-bibliotheque"
                    ? "text-primary font-bold"
                    : "text-foreground"
                }`}
              >
                Mon Espace Bibliothèque
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/memoires/deposer"
                className={`hover:text-primary text-sm lg:text-sm ${
                  pathname === "/memoires/deposer"
                    ? "text-primary font-bold"
                    : "text-foreground"
                }`}
              >
                Dépôt de mémoires
              </Link>
              <Link
                href="/memoires/consulter"
                className={`hover:text-primary text-sm lg:text-sm ${
                  pathname === "/memoires/consulter"
                    ? "text-primary font-bold"
                    : "text-foreground"
                }`}
              >
                Consulter
              </Link>
            </>
          )}
        </div>

        {/* --------------------------- Mobile Navbar -------------------------- */}

        <div
          className={`h-full bg-primary/60 min-w-[35%] rounded-2xl flex items-center justify-between p-[2px] gap-4 sm:hidden`}
        >
          <div>
            <Link href="/home" className="bg-primary/50">
              <p className="translate-y-[3px] translate-x-[5px]">
                <span className="text-primary font-bold text-2xl font-alexana">
                  E
                </span>
                <span className="font-alexana tracking-[-0.1em]">Biblio</span>
              </p>
            </Link>
          </div>
          {/* <Button className="h-[29px] rounded-2xl text-primary-foreground font-poppins">Menu</Button> */}
          <Dialog>
            <DialogTrigger className="h-[29px] rounded-2xl text-primary-foreground bg-primary px-4 font-poppins">
              Menu
            </DialogTrigger>
            <DialogContent
              className={
                "top-[10px] left-[16px] border-[0.25px] bg-secondary rounded-3xl w-[300px] origin-top-left translate-x-[0%] translate-y-[0%] bg-green-950 text-white"
              }
            >
              <div className="absolute left-2 top-1">
                <Link href="/home" className="bg-primary/50">
                  <p className="translate-y-[3px] translate-x-[5px]">
                    <span className="text-primary font-bold text-2xl font-alexana">
                      E
                    </span>
                    <span className="font-alexana tracking-[-0.1em]">
                      Biblio
                    </span>
                  </p>
                </Link>
              </div>
              {/* <DialogHeader className="">
                  <DialogTitle>Title</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader> */}
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Bibliothèque</AccordionTrigger>
                    <AccordionContent className="flex flex-col space-y-2">
                      <Link
                        href="/home"
                        className="hover:text-primary-foreground text-sm lg:text-sm ml-2 hover:bg-primary/50 w-[90%] p-1 rounded"
                      >
                        Dépôt de Biblio
                      </Link>
                      <Link
                        href="/home"
                        className="hover:text-primary-foreground text-sm lg:text-sm ml-2 hover:bg-primary/50 w-[90%] p-1 rounded"
                      >
                        Dépôt de Biblio
                      </Link>
                      <Link
                        href="/home"
                        className="hover:text-primary-foreground text-sm lg:text-sm ml-2 hover:bg-primary/50 w-[90%] p-1 rounded"
                      >
                        Dépôt de Biblio
                      </Link>
                      <Link
                        href="/home"
                        className="hover:text-primary-foreground text-sm lg:text-sm ml-2 hover:bg-primary/50 w-[90%] p-1 rounded"
                      >
                        Consulter
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Mémoire</AccordionTrigger>
                    <AccordionContent className="flex flex-col space-y-2">
                      <Link
                        href="/home"
                        className="hover:text-primary-foreground text-sm lg:text-sm ml-2 hover:bg-primary/50 w-[90%] p-1 rounded"
                      >
                        Dépôt de Mémoire
                      </Link>
                      <Link
                        href="/home"
                        className="hover:text-primary-foreground text-sm lg:text-sm ml-2 hover:bg-primary/50 w-[90%] p-1 rounded"
                      >
                        Consulter Mémoire
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </DialogContent>
          </Dialog>
        </div>

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
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
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
    </div>
  );
};

export default Navbar;
