"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ArrowUpDown, Copy, Printer, Trash2 } from "lucide-react";
import MemoireConsultDialog from "@/components/MemoireConsultDialog";
import { Memoire } from "@/types/memory";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { deleteMemory, printFillingReport } from "@/lib/data/memories";
import { useMemory } from "@/services/queries";

export const columns: ColumnDef<Memoire>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "theme",
    header: "Theme",
  },
  {
    id: "Auteurs",
    header: "Auteurs",
    cell: ({ row }) => {
      const memory = row.original;

      return (
        <Badge variant={"secondary"} className="line-clamp-2">
          {memory.first_author_firstname + " " + memory.first_author_lastname}{" "}
          {memory.second_author_firstname
            ? " & " +
              memory.second_author_firstname +
              " " +
              memory.second_author_lastname
            : ""}
        </Badge>
      );
    },
  },
  {
    accessorKey: "memory_master_name",
    header: "Maitre de mémoire ",
  },
  {
    accessorKey: "jury_president_name",
    header: "Président du jury ",
  },
  {
    id: "sector",
    accessorKey: "sector",

    // header: "Filière/Spécialité",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Filière/Spécialité
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const memory = row.original;

      return <Badge className="line-clamp-1" title={memory.sector.name}>{memory.sector.name}</Badge>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const memory = row.original;

      const { mutate } = useMemory();

      const handleDeleteMemory = async (memory: number) => {
        await deleteMemory({ memory });
        mutate();
      };

      const handlePrintFillingReport = async (memory: Memoire) => {
        await printFillingReport({ memory });
      }

      return (
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <MemoireConsultDialog memory_data={memory} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Voir plus d'informations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    navigator.clipboard.writeText(memory.cote),
                      toast("Cote du mémoire copié");
                  }}
                >
                  <span className="sr-only">Copier la cote du mémoire</span>
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copier la cote du mémoire</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Dialog>
                  <DialogTrigger className="text-destructive/70 hover:bg-destructive/20 hover:text-destructive h-8 w-8 flex justify-center items-center p-1 rounded-md">
                    <span className="sr-only">Consulter le mémoire</span>
                    <Trash2 className="text-destructive h-4 w-4" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Voulez vraiment supprimer ce mémoire
                      </DialogTitle>
                      <DialogDescription className="">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Beatae dolorum maiores cumque eius, quidem veniam?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-end">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Annuler
                        </Button>
                      </DialogClose>
                      <Button
                        variant={"destructive"}
                        onClick={() => handleDeleteMemory(memory.id)}
                      >
                        Supprimer
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TooltipTrigger>
              <TooltipContent>
                <p>Supprimer le mémoire</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button className="bg-transparent text-primary/70 hover:bg-primary/20 hover:text-primary h-8 w-8 flex justify-center items-center p-1 rounded-md" onClick={() => handlePrintFillingReport(memory)}>
                  <span className="sr-only">Consulter le mémoire</span>
                  <Printer className="text-primary h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Imprimer la fiche de retrait</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
