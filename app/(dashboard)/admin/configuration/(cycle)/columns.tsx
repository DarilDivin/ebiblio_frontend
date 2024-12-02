"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Edit, Trash2 } from "lucide-react";
import { Cycle } from "@/types/cycle";
import CycleForm from "./CycleForm";
import { deleteCycle } from "@/lib/data/cycle";
import { useCycle } from "@/services/queries";

export const cycleColumns: ColumnDef<Cycle>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: "Cycle",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const cycle = row.original;
      
      const { mutate } = useCycle();

      return (
        <div className="flex gap-2">
          <CycleForm cycle={cycle} />
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-destructive/70 hover:bg-destructive/20 hover:text-destructive rounded-md"
            onClick={async () => {
              await deleteCycle({ cycle: cycle.id });
              mutate();
            }}
          >
            <span className="sr-only">Valider le mémoire</span>
            <Trash2 className="text-destructive h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
