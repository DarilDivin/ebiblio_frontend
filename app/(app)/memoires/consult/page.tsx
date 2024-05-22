import MemoireSearchbar from "@/components/MemoireSearchbar"
import Image from "next/image"

const MemoireListingPage = () => {
  return (
    <div className="p-2">
      <div className="h-[55vh] max-sm:h-[35vh] w-full bg-green-50 grid grid-cols-2 max-sm:grid-cols-1 justify-center items-center px-72 max-sm:px-12 pt-8 rounded-lg">
        <p className="text-[3rem] max-sm:text-[1.5rem] max-sm:text-center font-bold font-poppins text-primary justify-self-end">Trouver facilement les anciens mémoires de l'Eneam</p>
        <div className="h-full overflow-hidden max-sm:hidden" >
          <Image src={'/file_searching.svg'} alt="Searching File Image" className="object-contain w-full h-full" width={800} height={800} priority/>
        </div>
      </div>
      <div className="w-full flex justify-center items-center -translate-y-1/2 max-sm:-translate-y-8">
        <MemoireSearchbar />
      </div>
      <div>
        Listing ohhh
      </div>
    </div>
  )
}

export default MemoireListingPage