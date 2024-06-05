'use client'

import Sidebar from "@/components/Sidebar";
import { useState } from "react";


const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const [sidebarIsOpen, setSidebarIsOpen] = useState(true)
  
  // console.log(sidebarIsOpen);
  return (
    <>
      <div className={`w-full h-screen bg-primary/10 p-2 grid gap-2 ${sidebarIsOpen ? 'grid-cols-[200px_1fr]' : 'grid-cols-[50px_1fr]'} transition-all duration-300`}>
        <div className=' w-fit'>
          <Sidebar open={sidebarIsOpen} onOpen={setSidebarIsOpen} />
        </div>
        <div className="bg-muted rounded-md overflow-y-scroll">
          {children}
        </div>
      </div>
    </>
  )
}

export default DashboardLayout