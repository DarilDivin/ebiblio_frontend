'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {  columns } from "./columns"
import { List } from "lucide-react"
import { BookListDataTable } from "./data-table"
import { getAllBooks } from "@/lib/data/book"
import BookForm from "@/components/BookForm"

const LivresList = () => {
  const { books, isLoading, error } = getAllBooks()

  if (error) return <div>Erreur de chargement des données</div>;
  if (isLoading || !books) return <div>Chargement...</div>;

  const data = books;
  return (
    <div className="">
      {/* <div className="flex w-full justify-between px-8 py-4 ">
        <div className={`ml-2 border-none flex gap-1 justify-between items-center p-2 rounded-md hover:bg-primary/30 cursor-default`}>
          <div className="flex gap-2 items-center">
            <List size={17}/>
            <p className={`text-xs font-medium w-[104px] text-nowrap text-ellipsis overflow-hidden`} title="Liste des mémoires">Liste des Livres</p>
          </div>
        </div>
        <Avatar>
          <AvatarImage src={`https://api.dicebear.com/9.x/thumbs/svg?seed=Divin`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div> */}
      <div className="max-lg:container px-10 w-full py-4">
        <BookForm />
        <BookListDataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

export default LivresList