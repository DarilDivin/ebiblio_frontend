"use client";

import DocumentListItem from "@/components/DocumentListItem";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useMemory } from "@/services/queries";
import { GetAllMemoryResponse } from "@/types/memory";
// import { GetAllMemoryResponse, Memoire } from "@/types";
import useSWR from "swr";

// const fetcher = (url: string) => axios.get<GetAllMemoryResponse>(url).then(res => res.data);

const MemoireList = () => {
  // const { data: memoryResponse, error, mutate } = useSWR<GetAllMemoryResponse>("api/supportedMemory", fetcher);
  // console.log(memoryResponse);

  const {data: memoryResponse, error} = useMemory();
  
  // Fonction pour aller à la page précédente
  // const goToPrevPage = async () => {
  //   if (memoryResponse?.links.prev) {
  //     await mutate(fetcher(memoryResponse.links.prev));
  //   }
  // };

  // Fonction pour aller à la page suivante
  // const goToNextPage = async () => {
  //   if (memoryResponse?.links.next) {
  //     await mutate(fetcher(memoryResponse.links.next));
  //   }
  // };

  if (error) return <div>Erreur de chargement des données</div>;
  if (!memoryResponse) return <div>Chargement...</div>;
  return (
    <div>
      <div> Liste des mémoires </div>
      <div className="px-8 py-4  flex flex-col gap-2">
        {memoryResponse.data.map(
          (memory) => (
            // <div>
            //   <li key={memory.id}>
            //     <h2 className="font-bold text-2xl">{memory.theme}</h2>
            //     <p>
            //       <strong>Auteur :</strong> {memory.first_author_name} et {memory.second_author_name}<br />
            //       <strong>Email :</strong> {memory.first_author_email}, {memory.second_author_email}<br />
            //       <strong>Téléphone :</strong> {memory.first_author_phone}, {memory.second_author_phone}<br />
            //       <strong>Président du jury :</strong> {memory.jury_president_name}<br />
            //       <strong>Maître de mémoire :</strong> {memory.memory_master_name} ({memory.memory_master_email})<br />
            //       <strong>Début :</strong> {memory.start_at}<br />
            //       <strong>Fin :</strong> {memory.ends_at}<br />
            //       <strong>Status :</strong> {memory.status}<br />
            //     </p>
            //   </li>
            //   <br />
            // </div>
            (
              <DocumentListItem
                key={memory.id}
                theme={memory.theme}
              />
            )
          )
        )}
      </div>
      <div className="px-8 flex gap-8 justify-end">
        {/* <Button disabled={!memoryResponse.links.prev} onClick={goToPrevPage}>Précédent</Button> */}
        {/* <Button disabled={!memoryResponse.links.next} onClick={goToNextPage}>Suivant</Button> */}
      </div>
    </div>
  );
};

export default MemoireList;
