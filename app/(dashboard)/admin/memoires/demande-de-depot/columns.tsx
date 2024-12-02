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

import { ArrowUpDown, Copy, FileCheck2, MoreHorizontal } from "lucide-react";
import MemoireConsultDialog from "@/components/MemoireConsultDialog";
import { validateMemory } from "@/lib/data/memories";
import RejectMemoryDialog from "@/components/RejectMemoryDialog";
import { toast } from "sonner";
import { Memoire } from "@/types/memory";
import { useMemory } from "@/services/queries";
import { Badge } from "@/components/ui/badge";
import ValidMemoryDialog from "@/components/ValidMemoryDialog";
import ViewPdf from "@/components/ViewPdf";
import AdminViewPdf from "@/components/AdminViewPdf";

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
        <Badge variant={"secondary"} className="line-clamp-2 max-w-fit">
          {memory.first_author_firstname + " " + memory.first_author_lastname}{" "}
          {memory.first_author_firstname
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
    header: "Filière/Spécialité",
    cell: ({ row }) => {
      const memory = row.original;

      return <Badge className=" line-clamp-1 w-fit max-w-48" title={memory.sector.name}>{memory.sector.name}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const memory = row.original;

      return (
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                { memory.file_path ? 
                  <AdminViewPdf fileUrl={memory.file_path} />
                : <MemoireConsultDialog memory_data={memory} />
                }
              </TooltipTrigger>
              <TooltipContent>
                <p>Consulter</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <RejectMemoryDialog idmemory={memory.id} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Rejeter le mémoire</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ValidMemoryDialog memory={memory}/>
              </TooltipTrigger>
              <TooltipContent>
                <p>Valider le mémoire</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* <TooltipProvider>
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
          </TooltipProvider> */}

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(memory.id.toString())
                }
              >
                Copier la cote du doc
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-primary hover:bg-primary/20 hover:text-primary"
                memoryid={memory.id}
                
              >
                Valider
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive hover:bg-primary/20 hover:text-destructive"
                memoryid={memory.id}
                // onClick={handleRejectMemory}
              >
                <RejectMemoryDialog idmemory={memory.id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      );
    },
  },
];

// {
//   accessorKey: "amount",
//   header: () => <div className="text-right">Amount</div>,
//   cell: ({ row }) => {
//     const amount = parseFloat(row.getValue("amount"))
//     const formatted = new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount)

//     return <div className="text-right font-medium">{formatted}</div>
//   },
// },
