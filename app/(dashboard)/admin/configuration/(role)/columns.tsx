"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Trash2 } from "lucide-react";
import { useCycle } from "@/services/queries";
import { Role } from "@/types/role";

export const roleColumns: ColumnDef<Role>[] = [
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
    header: "Role",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const role = row.original;

      const { mutate } = useCycle();

      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-destructive/70 hover:bg-destructive/20 hover:text-destructive rounded-md"
            onClick={async () => {
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
