import { Star } from "lucide-react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import Link from "next/link"

const DocumentListItem = () => {
  return (
    <div className="flex gap-4 justify-start bg-green-50 hover:bg-green-100 p-2 rounded-md">
              <div className="flex justify-center items-center size-32 bg-slate-50 rounded-md shadow-sm">
                Illustration Doc
              </div>
              <div className=" flex flex-col w-full">
                <div className="w-full flex justify-start gap-2 items-center">
                  <Link href='/memoires/consult' className="font-bold text-lg text-primary hover:text-primary/80 hover:underline">Thème du mémoire</Link>
                  <Separator orientation="vertical" className='w-[3px] h-[15px] bg-green-500 rounded-md'/>
                  <span className=" font-bold text-black/80 text-base flex gap-2"> 
                    4.5 / 5
                    <span className="flex gap-1 items-center">
                      <Star size={15}/>
                      <Star size={15}/>
                      <Star size={15}/>
                      <Star size={15}/>
                      <Star size={15}/>
                    </span>
                  </span>
                </div>

                <div className="flex gap-4 items-start justify-between h-full pt-4">
                  <div className="flex flex-col text-sm">
                    <div className="flex gap-2">
                      <p className="font-semibold text-black/70">Produit par :</p>
                      <span className="font-semibold text-black/90">
                        <span>John Doe</span>
                        <span> & Jane Doe</span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <p className='font-semibold text-black/70'>Sous la supervision de :</p>
                      <span className="font-semibold text-black/90"> Mr Baba Doe </span>
                    </div>
                    <div className="flex gap-2">
                      <p className='font-semibold text-black/70'>Président du Jury :</p>
                      <span className="font-semibold text-black/90"> Mr Grand Baba Doe</span>
                    </div>
                  </div>
                  {/* <Separator orientation='vertical' className="w-[2px] bg-green-700 h-[50px]"/> */}
                  <div className="flex flex-col text-sm">
                    <div className="flex gap-2">
                      <p className='font-semibold text-black/70'>Année :</p>
                      <span className="font-semibold text-black/90">2024</span>
                    </div>
                    <div className="flex gap-2">
                      <p className='font-semibold text-black/70'>Filière :</p>
                      <span className="font-semibold text-black/90">2024</span>
                    </div>
                  </div>

                  <div className="h-full flex">
                    <Button className="self-end">Consulter</Button>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default DocumentListItem