import { ChevronRight, Home } from "lucide-react"

const SidebarLink = ({children} : Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="border flex gap-4 justify-between items-center p-2 rounded-md bg-black/40 text-white">
      <div className="flex gap-2 items-center">
        {/* <Home size={17}/>
        <p className="text-sm font-medium">Overview</p> */}
        { children }
      </div>
      <ChevronRight size={15} />
    </div>
  )
}

export default SidebarLink