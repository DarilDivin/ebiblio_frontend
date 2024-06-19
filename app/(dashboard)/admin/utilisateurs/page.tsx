'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getAllUsers } from '@/lib/data/user'
import { User2 } from 'lucide-react'
import React from 'react'
import { columns } from './columns'
import { UserDataTable } from './data-table'

const AdminUserPage = () => {
  const { users, isLoading, error } = getAllUsers()

  if (error) return <div>Erreur de chargement des données</div>
  if(isLoading || !users) return <div>Chargement...</div>

  const data = users
  return (
    <div>
    <div className="flex w-full justify-between px-8 py-4 ">
      <div className={`ml-2 border-none flex gap-1 justify-between items-center p-2 rounded-md hover:bg-primary/30 cursor-default`}>
        <div className="flex gap-2 items-center">
          <User2 size={17}/>
          <p className={`text-xs font-medium w-[104px] lg:w-auto text-nowrap text-ellipsis overflow-hidden`} title="Liste des mémoires">Liste des Utilisateurs</p>
        </div>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
    <div className="max-lg:container w-full px-10 py-4">
      Liste des Utilisateurs
      <UserDataTable columns={columns} data={data} />
    </div>
  </div>
  )
}

export default AdminUserPage