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
import { Sector } from "@/types/sector";
import SectorSpecialityForm from "./Sector&SpecialityForm";
import { useSector } from "@/services/queries";
import { deleteSector } from "@/lib/data/sector";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const sectorColumns: ColumnDef<Sector>[] = [
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
    header: "Filère",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "acronym",
    header: "Acronym",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const sector = row.original;

      const { mutate } = useSector();

      return (
        <div className="flex gap-2">
          <SectorSpecialityForm sector={sector} type={sector.type} />
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-destructive/70 hover:bg-destructive/20 hover:text-destructive rounded-md"
            onClick={async () => {
              await deleteSector({ sector: sector.id });
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
