'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {  columns } from "./columns"
import { MemoireListDataTable } from "./data-table"
import { List } from "lucide-react"
import { getAllSupportedMemories } from "@/lib/data/memories"

const AdminListeMemoire = () => {
  const { supportedMemoriesValidated, isLoading, error } = getAllSupportedMemories()

  if (error) return <div>Erreur de chargement des données</div>;
  if (isLoading || !supportedMemoriesValidated) return <div>Chargement...</div>;

  const data = supportedMemoriesValidated;

  // console.log(data);
  
  return (
    <div className="">
      {/* <div className="flex w-full justify-between px-8 py-4 ">
        <div className={`ml-2 border-none flex gap-1 justify-between items-center p-2 rounded-md hover:bg-primary/30 cursor-default`}>
          <div className="flex gap-2 items-center">
            <List size={17}/>
            <p className={`text-xs font-medium w-[104px] text-nowrap text-ellipsis overflow-hidden`} title="Liste des mémoires">Liste des mémoires</p>
          </div>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div> */}
      <div className="max-lg:container px-10 w-full py-4">
        <MemoireListDataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

export default AdminListeMemoire