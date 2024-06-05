"use client"

import { getAllSupportedMemories } from "@/lib/data/memories"
import { columns } from "./columns"
import { DemandeDepotMemoireDataTable } from "./data-table"


const DemandeDeDepotMemoire = () => {
  const {supportedMemoriesUnvalidated, isLoading, error} = getAllSupportedMemories()
  // const {data: supportedMemoriesUnvalidated, error, isLoading} = useMemory();

  if (error) return <div>Erreur de chargement des données</div>;
  if (isLoading || !supportedMemoriesUnvalidated) return <div>Chargement...</div>;

  const data = supportedMemoriesUnvalidated
  // .data.filter(memory => memory.status === 'Invalidé')
  return (
    <div className="container mx-auto py-10">
      Liste des dépôts de mémoires
      <DemandeDepotMemoireDataTable columns={columns} data={data} />
    </div>
  )
}

export default DemandeDeDepotMemoire