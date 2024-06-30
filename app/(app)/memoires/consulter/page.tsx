import MemoireSearchbar from "@/components/MemoireSearchbar"
import Image from "next/image"
import MemoireList from "./MemoireList"

const MemoireListingPage = () => {
  return (
    <div className="p-2">
      <div className="h-[55vh] max-sm:h-[35vh] w-full bg-primary/5 grid grid-cols-2 max-sm:grid-cols-1 justify-center items-center px-12 lg:px-72 max-sm:px-8 pt-8 rounded-lg">
        <p className="text-[2.5rem] max-sm:text-[1.5rem] max-sm:text-center font-bold font-poppins text-primary justify-self-end">Trouver facilement les mémoires soutenus de l'Eneam.</p>
        <div className="h-full overflow-hidden max-sm:hidden" >
          <Image src={'/file_searching.svg'} alt="Searching File Image" className="object-contain w-full h-full" width={800} height={800} priority/>
        </div>
      </div>
      <div className="w-full flex justify-center items-center -translate-y-1/2 max-sm:-translate-y-8">
        <MemoireSearchbar />
      </div>
      <div className="w-full px-12">
        {/* <div>
          <div> Listing des mémoires </div>
          <div className="px-8 py-4  flex flex-col gap-2">
            <DocumentListItem />
            <DocumentListItem />
            <DocumentListItem />
          </div>
        </div> */}
        <MemoireList/>
      </div>
    </div>
  )
}

export default MemoireListingPage