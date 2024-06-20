"use client";

import {
  Bolt,
  Book,
  ChevronRight,
  Files,
  Gauge,
  HandHelping,
  Home,
  LayoutDashboard,
  List,
  ShieldQuestion,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModeToggle } from "./ui/mode-toggle";

const Sidebar = ({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [openSidebar, setOpenSidebar] = useState(open);

  const handleOpen = () => {
    setOpenSidebar(open);
  };

  useEffect(() => {
    handleOpen();
  }, [open]);

  return (
    <div
      className={
        openSidebar
          ? "w-[200px] h-full flex flex-col gap-4 px-4 transition-all duration-300"
          : "w-[50px] h-full flex flex-col gap-4 px-2 transition-all duration-300"
      }
    >
      <div
        className={`flex  items-center h-[40px] ${
          openSidebar ? "justify-between" : "w-full justify-center"
        }`}
      >
        <div
          className={`font-semibold text-primary-foreground cursor-pointer items-center h-full p-1 max-sm:hidden ${
            openSidebar ? "flex" : "hidden"
          }`}
        >
          <Link href="/admin">
            <span className="text-primary font-bold text-2xl font-alexana">
              E
            </span>
            <span className="text-foreground">Biblio</span>
          </Link>
        </div>
        <div className="p-1 rounded hover:bg-slate-50/20 cursor-pointer">
          <LayoutDashboard className="" onClick={() => onOpen(!open)} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3
          className={`${
            openSidebar
              ? "ml-4 text-sm font-semibold text-foreground mb-2"
              : " opacity-0 invisible"
          } transition-all`}
        >
          Menu
        </h3>
        <div className="flex flex-col gap-2 w-full ">
          {/* ----------------Links--------------- */}

          <Link
            href="/admin"
            className="border flex gap-4 justify-between items-center p-2 rounded-md bg-primary/70 hover:bg-primary/90 cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <Gauge size={17} />
              <p
                className={`${openSidebar ? "text-sm font-medium" : "hidden"}`}
              >
                Overview
              </p>
            </div>
            <ChevronRight size={15} />
          </Link>
          <Accordion type="multiple" className="flex flex-col gap-2">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger
                className={`border-none flex gap-4 justify-between items-center p-2 rounded-md hover:no-underline hover:bg-primary/30 cursor-pointer ${
                  openSidebar
                    ? ""
                    : "[&[data-state=open]>svg]:hidden [&[data-state=closed]>svg]:hidden"
                } `}
              >
                <div className="flex gap-2 items-center">
                  <Book size={17} />
                  <p
                    className={`${
                      openSidebar ? "text-sm font-medium" : "hidden"
                    }`}
                  >
                    Livres
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                {/* Link  */}

                <Link
                  href="/admin/livres"
                  className={`ml-2 border-none flex gap-1 justify-between items-center p-2 rounded-md hover:bg-primary/30 cursor-pointer ${
                    openSidebar ? "" : "px-1"
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    <List size={17} />
                    <p
                      className={`${
                        openSidebar
                          ? "text-xs font-medium w-[104px] text-nowrap text-ellipsis overflow-hidden"
                          : "hidden"
                      }`}
                      title="Liste des mémoires"
                    >
                      Liste des Livres
                    </p>
                  </div>
                  <ChevronRight size={15} />
                </Link>
                <Link
                  href="/admin/livres/demandes-de-pret"
                  className={`ml-2 border-none flex gap-1 justify-between items-center p-2 rounded-md hover:bg-primary/30 cursor-pointer ${
                    openSidebar ? "" : "px-1"
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    <HandHelping size={17} />
                    <p
                      className={`${
                        openSidebar
                          ? "text-xs font-medium w-[104px] text-nowrap text-ellipsis overflow-hidden"
                          : "hidden"
                      }`}
                      title="Demandes de prêt"
                    >
                      Demandes de prêt
                    </p>
                  </div>
                  <ChevronRight size={15} />
                </Link>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b-0">
              <AccordionTrigger
                className={`border-none flex gap-4 justify-between items-center p-2 rounded-md hover:no-underline hover:bg-primary/30 cursor-pointer ${
                  openSidebar
                    ? ""
                    : "[&[data-state=open]>svg]:hidden [&[data-state=closed]>svg]:hidden"
                } `}
              >
                <div className="flex gap-2 items-center">
                  <Files size={17} />
                  <p
                    className={`${
                      openSidebar ? "text-sm font-medium" : "hidden"
                    }`}
                  >
                    Mémoires
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                {/* Link  */}

                <Link
                  href="/admin/memoires/liste-des-memoires"
                  className={`ml-2 border-none flex gap-1 justify-between items-center p-2 rounded-md hover:bg-primary/30 cursor-pointer ${
                    openSidebar ? "" : "px-1"
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    <List size={17} />
                    <p
                      className={`${
                        openSidebar
                          ? "text-xs font-medium w-[104px] text-nowrap text-ellipsis overflow-hidden"
                          : "hidden"
                      }`}
                      title="Liste des mémoires"
                    >
                      Liste des mémoires
                    </p>
                  </div>
                  <ChevronRight size={15} />
                </Link>

                <Link
                  href="/admin/memoires/demande-de-depot"
                  className={`ml-2 border-none flex gap-1 justify-between items-center p-2 rounded-md hover:bg-primary/30 cursor-pointer ${
                    openSidebar ? "" : "px-1"
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    <ShieldQuestion size={17} />
                    <p
                      className={`${
                        openSidebar
                          ? "text-xs font-medium w-[104px] text-nowrap text-ellipsis overflow-hidden"
                          : "hidden"
                      }`}
                      title="Demande de dépôts"
                    >
                      Demande de dépôts
                    </p>
                  </div>
                  <ChevronRight size={15} />
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link
            href="/admin/configuration"
            className="border-none flex gap-4 justify-between items-center p-2 rounded-md hover:bg-primary/30 cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <Bolt size={17} />
              <p
                className={`${
                  openSidebar
                    ? "text-sm font-medium w-[95px] text-nowrap text-ellipsis overflow-hidden"
                    : "hidden"
                }`}
                title="Configuration"
              >
                Configuration
              </p>
            </div>
            <ChevronRight size={15} />
          </Link>
          <Link
            href="/admin/utilisateurs"
            className="border-none flex gap-4 justify-between items-center p-2 rounded-md hover:bg-primary/30 cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <UserRound size={17} />
              <p
                className={`${
                  openSidebar
                    ? "text-sm font-medium w-[95px] text-nowrap text-ellipsis overflow-hidden"
                    : "hidden"
                }`}
                title="Utilisateurs"
              >
                Utilisateurs
              </p>
            </div>
            <ChevronRight size={15} />
          </Link>
          <Link
            href="/home"
            className="border-none flex gap-4 justify-between items-center p-2 rounded-md hover:bg-primary/30 cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <Home size={17} />
              <p
                className={`${
                  openSidebar
                    ? "text-sm font-medium w-[95px] text-nowrap text-ellipsis overflow-hidden"
                    : "hidden"
                }`}
                title="Acceuil Utilisateur"
              >
                Acceuil Utilisateur
              </p>
            </div>
            <ChevronRight size={15} />
          </Link>
        </div>
      </div>

      <ModeToggle />
    </div>
  );
};

export default Sidebar;
