"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

import { Edit, Trash2 } from "lucide-react";
import { Soutenance } from "@/types/soutenance";
import SoutenanceForm from "./SoutenanceForm";
import { deleteSoutenance } from "@/lib/data/soutenance";
import { useSoutenance } from "@/services/queries";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const soutenanceColumns: ColumnDef<Soutenance>[] = [
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
    accessorKey: "name",
    header: "Soutenance",
  },
  {
    accessorKey: "start_date",
    header: "Date de début",
  },
  {
    accessorKey: "end_date",
    header: "Date de fin",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const soutenance = row.original;

      const { mutate } = useSoutenance();

      return (
        <div className="flex gap-2">
          <SoutenanceForm soutenance={soutenance} />
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-destructive/70 hover:bg-destructive/20 hover:text-destructive rounded-md"
            onClick={async () => {
              await deleteSoutenance({ soutenance: soutenance.id });
              mutate();
            }}
          >
            <span className="sr-only">Supprimer la soutenance</span>
            <Trash2 className="text-destructive h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
