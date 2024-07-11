"use client";

import DocumentListItem from "@/components/DocumentListItem";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useMemory, useMemoryByLink } from "@/services/queries";
import { GetAllMemoryResponse } from "@/types/memory";
import { useState } from "react";
// import { GetAllMemoryResponse, Memoire } from "@/types";
import useSWR from "swr";

// const fetcher = (url: string) => axios.get<GetAllMemoryResponse>(url).then(res => res.data);

const MemoireList = () => {
  // const { data: memoryResponse, error, mutate } = useSWR<GetAllMemoryResponse>("api/supportedMemory", fetcher);
  // console.log(memoryResponse);
  // let url = "api/supportedMemory?page=2";

  const [page, setPage] = useState<string | null>(null)
  const [url, setUrl] = useState("api/supportedMemory?page=" + page)

// console.log(url)
  const {data: memoryResponse, error} = useMemoryByLink(url);
  
  // Fonction pour aller à la page précédente
  const goToPrevPage = async () => {
    if (memoryResponse?.links?.prev) {
      const prevUrl = memoryResponse.links.prev;
      const parts = prevUrl.split("?");
      const paramsString = parts[1]; // "page=1"
      const params = new URLSearchParams(paramsString);
      const prevPage = params.get("page");
      // console.log(prevPage); // "1"

      setPage(prevPage)
      setUrl("api/supportedMemory?page=" + prevPage)
    }
  };

  // Fonction pour aller à la page suivante
  const goToNextPage = async () => {
    if (memoryResponse?.links?.next) {
      const nextUrl = memoryResponse.links.next;
      const parts = nextUrl.split("?");
      const paramsString = parts[1]; // "page=1"
      const params = new URLSearchParams(paramsString);
      const nextPage = params.get("page");
      // console.log(nextPage); // "1"

      setPage(nextPage)
      setUrl("api/supportedMemory?page=" + nextPage)
    }
  };

  if (error) return <div>Erreur de chargement des données</div>;
  if (!memoryResponse) return <div>Chargement...</div>;
  return (
    <div>
      <div> Liste des mémoires </div>
      <div className="py-4 flex flex-col gap-2">
        {memoryResponse.data.map(
          (memory) => (
            (
              <DocumentListItem
                key={memory.id}
                memoire={memory}
              />
            )
          )
        )}
      </div>
      <div className="px-8 flex gap-8 justify-end">
        <Button disabled={!memoryResponse.links?.prev} onClick={goToPrevPage}>Précédent</Button>
        <Button disabled={!memoryResponse.links?.next} onClick={goToNextPage}>Suivant</Button>
      </div>
    </div>
  );
};

export default MemoireList;
