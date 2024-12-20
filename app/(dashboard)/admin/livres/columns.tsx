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

import { ArrowUpDown, Copy, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { deleteMemory } from "@/lib/data/memories";
import { useBook, useMemory } from "@/services/queries";
import { Book } from "@/types/book";
import { deleteBook } from "@/lib/data/book";
import BookForm from "@/components/BookForm";
import BookConsultDialog from "@/components/BookConsultDialog";

export const columns: ColumnDef<Book>[] = [
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
    accessorKey: "title",
    header: "Titre",
  },
  {
    id: "Auteur",
    header: "Auteur",
    cell: ({ row }) => {
      const book = row.original;

      return <Badge variant={"secondary"}>{book.author}</Badge>;
    },
  },
  {
    accessorKey: "editor",
    header: "Editeur",
  },
  {
    accessorKey: "editing_year",
    header: "Année d'édition",
  },
  {
    accessorKey: "cote",
    header: "Cote",
  },
  {
    id: "Mots clés",
    header: "Mots Clés",
    cell: ({ row }) => {
      const book = row.original;

      const keywordsString = book.keywords
        ?.map((keywordObj) => keywordObj.keyword)
        .join(", ");

      return keywordsString?.length > 0 ? (
        <Badge className=" line-clamp-1 w-fit max-w-48">
          {keywordsString}
        </Badge>
      ) : (
        <p>...</p>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const book = row.original;

      const { mutate } = useBook();

      const handleDeleteBook = async (book: number) => {
        await deleteBook({ article: book });
        mutate();
      };

      return (
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <BookConsultDialog book_data={book} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Voir plus d'informations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    navigator.clipboard.writeText(book.cote),
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
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild> */}
          <BookForm book={book} />
          {/* </TooltipTrigger>
              <TooltipContent>
                <p>Modifier le mémoire</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Dialog>
                  <DialogTrigger className=" text-destructive/70 hover:bg-destructive/20 hover:text-destructive h-8 w-8 flex justify-center items-center p-1 rounded-md">
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
                        onClick={() => handleDeleteBook(book.id)}
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
        </div>
      );
    },
  },
];
