import DepotMemoireForm from "@/components/DepotMemoireForm"
import Image from "next/image"

const DeposerMemoire = () => {
  return (
    <div className="p-2">
      <div className="h-[55vh] max-sm:h-[35vh] w-full bg-primary/5 grid grid-cols-2 max-md:grid-cols-[400px_1fr] max-sm:grid-cols-1 justify-center items-center px-52 max-md:px-10 max-sm:px-12 pt-8 rounded-lg">
        <div>
          <p className="text-[2.5rem] max-sm:text-[1.5rem] max-sm:text-center font-bold font-poppins text-primary justify-self-end ">Deposez vos mémoires corrigés.</p>
          <p className="text-base max-sm:text-base max-sm:text-center font-semibold font-poppins text-foreground/70 justify-self-end">Les fichiers numériques de vos mémoires doivent être en format PDF non copiable et signé par votre président du jury.</p>
        </div>
        <div className="h-full overflow-hidden max-sm:hidden" >
          <Image src={'/approve.svg'} alt="Searching File Image" className="object-contain w-full h-full" width={800} height={800} priority/>
        </div>
      </div>

      <div className="flex flex-col items-center p-8 h-screen" id="depotForm">
        <h1 className=" text-2xl font-semibold text-primary mb-8">Formulaire de Dépôt de mémoire</h1>
        <div className="w-full flex justify-center">
          <DepotMemoireForm />
        </div>
      </div>
    </div>
  )
}

export default DeposerMemoire