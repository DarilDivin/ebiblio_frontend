"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import MemoireConsultDialog from "@/components/MemoireConsultDialog"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}
export type Memory = {
  id: number
  theme: string
  soutenance_date : string
  soutenance_hour : string
  first_author_name : string
  second_author_name : string
  first_author_email : string
  second_author_email : string
  first_author_phone : string
  second_author_phone : string
  jury_president : string
  memory_master : string
  memory_year : string
  file_path : string
  cote : string
  status : string
  created_at : string
  updated_at : string
  deleted_at : string
  created_by : string
  updated_by : string
  deleted_by : string
}

export const columns: ColumnDef<Memory>[] = [
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
    accessorKey: "memory_master",
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
      )
    },
  },
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const memory = row.original
 
      return (
        <div className="flex gap-2">
          <MemoireConsultDialog memory_data={memory}/>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(memory.id.toString())}
              >
                Copier la cote du doc
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-primary hover:bg-primary/20 hover:text-primary">Valider</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive hover:bg-primary/20 hover:text-destructive">Rejeter</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
