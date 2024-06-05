"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { ArrowUpDown, Copy, FileCheck2, MoreHorizontal } from "lucide-react";
import MemoireConsultDialog from "@/components/MemoireConsultDialog";
import {  
  validateMemory,
} from "@/lib/data/memories";
import RejectMemoryDialog from "@/components/RejectMemoryDialog";
import { toast } from "sonner";
import { Memoire } from "@/types/memory";
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
    accessorKey: "memory_master_name",
    header: "Maitre mémoire ",
  },
  {
    accessorKey: "memory_year",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Année
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const memory = row.original;

      const { mutate } = useMemory();

      const handleValidatedMemory = async (supportedMemory: number) => {
        console.log(supportedMemory);
        await validateMemory({ supportedMemory });
        mutate();
      };

      return (
        <div className="flex gap-2">
          <MemoireConsultDialog memory_data={memory} />
          <RejectMemoryDialog idmemory={memory.id} />
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-primary/70 hover:bg-primary/20 hover:text-primary rounded-md"
            memoryid={memory.id}
            onClick={() => handleValidatedMemory(memory.id)}
          >
            <span className="sr-only">Valider le mémoire</span>
            <FileCheck2 className="text-primary h-4 w-4" />
          </Button>
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
