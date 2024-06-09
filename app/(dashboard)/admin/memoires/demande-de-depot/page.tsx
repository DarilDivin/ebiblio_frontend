"use client"

import { getAllSupportedMemories } from "@/lib/data/memories"
import { columns } from "./columns"
import { DemandeDepotMemoireDataTable } from "./data-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { List } from "lucide-react"


const DemandeDeDepotMemoire = () => {
  const {supportedMemoriesUnvalidated, isLoading, error} = getAllSupportedMemories()
  // const {data: supportedMemoriesUnvalidated, error, isLoading} = useMemory();

  if (error) return <div>Erreur de chargement des données</div>;
  if (isLoading || !supportedMemoriesUnvalidated) return <div>Chargement...</div>;

  const data = supportedMemoriesUnvalidated
  // .data.filter(memory => memory.status === 'Invalidé')
  return (
    <div>
      <div className="flex w-full justify-between px-8 py-4 ">
        <div className={`ml-2 border-none flex gap-1 justify-between items-center p-2 rounded-md hover:bg-primary/30 cursor-default`}>
          <div className="flex gap-2 items-center">
            <List size={17}/>
            <p className={`text-xs font-medium w-[104px] text-nowrap text-ellipsis overflow-hidden`} title="Liste des mémoires">Liste des mémoires non validée</p>
          </div>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="max-lg:container w-full px-10 py-4">
        Liste des dépôts de mémoires
        <DemandeDepotMemoireDataTable columns={columns} data={data} />
      </div>
    </div>
  )
    
    
}

export default DemandeDeDepotMemoire