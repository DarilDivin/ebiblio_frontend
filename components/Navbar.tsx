'use client'

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useAuth } from "@/hooks/auth"



const Navbar = () => {

  const { user, logout } = useAuth({
    middleware: "auth"
  })

  const [showBiblioPages, setShowBiblioPages] = useState(false)

  const toggleTabs = (e: any) => {
    // console.log(e.target.firstChild.data);
    if (e.target.firstChild.data === "Bibliothèque") {
      setShowBiblioPages(true)
    } else {
      setShowBiblioPages(false)
    }
  }
  return (
    <div className="w-full px-2 py-4 flex justify-center items-center">
      <div className="w-full bg-slate-50 shadow-lg rounded-lg h-[60px] sticky flex items-center justify-between px-28 py-2">
        <div className="font-semibold text-primary-foreground cursor-pointer">
          <Link href='/home'>
            <span className="text-primary font-bold text-3xl">E</span>
            <span>Biblio</span>
          </Link>
        </div>
        <div>
          <div className="w-[250px] sm:w-[300px] lg:w-[510px] bg-primary h-[45px] rounded-[6px] p-[3px] flex justify-between">
              <button className={`${showBiblioPages ? 'text-white cursor-default' : 'bg-slate-50 text-primary'} text-[10px] sm:text-xs lg:text-base h-full  w-[300px] px-8 rounded font-semibold`} onClick={toggleTabs}>Bibliothèque</button>
              <button className={`${showBiblioPages ? 'bg-slate-50 text-primary' : 'text-white cursor-default'} text-[10px] sm:text-xs lg:text-base w-[200px] font-semibold h-full rounded `} onClick={toggleTabs}>Mémoires</button>
          </div>
        </div>
        <div className="flex justify-start gap-8 list-none w-[700px]">
          {showBiblioPages ? 
            <>
              <Link href='/home' className="hover:text-primary">Dépôt de Biblio</Link>
              <Link href='/home' className="hover:text-primary">Dépôt de Biblio</Link>
              <Link href='/home' className="hover:text-primary">Dépôt de Biblio</Link>
              <Link href='/home' className="hover:text-primary">Consulter</Link>
            </>
          :   
            <>
              <Link href='/home' className="hover:text-primary">Dépôt de mémoires</Link>
              <Link href='/home' className="hover:text-primary">Consulter</Link>
            </>
          }
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="cursor-pointer">Logout</DropdownMenuItem> 
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Navbar