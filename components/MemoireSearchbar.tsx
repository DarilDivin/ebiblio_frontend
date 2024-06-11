import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar, Key, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const MemoireSearchbar = () => {
  return (
    <div className='bg-white rounded-lg shadow-lg w-3/4 py-1 px-1'>
      <form action="" className="flex max-sm:flex-col w-full gap-4 items-center">
        <div className="flex max-sm:flex-col flex-1 gap-2 items-center max-sm:w-full">
          <div className="flex flex-1 h-14 justify-evenly items-center gap-2 relative max-sm:w-full">
            <Search className="absolute left-1 font-bold text-foreground/80"/>
            <Input className="border-none pl-10 outline-none focus-visible:ring-ring" placeholder="Titre du document "/>
          </div>

          <Separator orientation='vertical' className='w-[2px] h-[35px] max-sm:hidden'/>
          <Separator orientation='horizontal' className='w-[80%] h-[2px] sm:hidden'/>

          <div className="flex flex-1 h-14 justify-evenly items-center gap-2 relative max-sm:w-full">
            <Calendar className="absolute left-1 font-bold text-foreground/80" />
            <Input className="border-none pl-10 outline-none focus-visible:ring-ring" placeholder="Année"/>
          </div>

          <Separator orientation='vertical' className='w-[2px] h-[35px] max-sm:hidden'/>
          <Separator orientation='horizontal' className='w-[80%] h-[2px] sm:hidden'/>

          <div className="flex flex-1 h-14 justify-evenly items-center gap-2 relative max-sm:w-full">
            <Key className="absolute left-1 font-bold text-foreground/80" />
            <Select>
              <SelectTrigger className="border-none pl-10 outline-none focus:ring-ring focus-visible:ring-ring">
                <SelectValue placeholder="Cycle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="licence">Licence</SelectItem>
                <SelectItem value="master">Master</SelectItem>
                <SelectItem value="doctorat">Doctorat</SelectItem>
              </SelectContent>
            </Select>

          </div>
        </div>
        <Button className="h-14 max-sm:h-10 max-sm:w-full">Rechercher</Button>
      </form>
    </div>
  )
}

export default MemoireSearchbar