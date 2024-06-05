// import { useMemory } from "./queries";
// import useSWRMutation from "swr/mutation";
// import { supportedMemoireDeposit } from "./requests/memory";

// export function useDepositMemory() {
//   const { mutate } = useMemory();

//   return useSWRMutation("/api/deposit-memory", supportedMemoireDeposit, {
//     onError() {
//       console.error("error");
//     },

//     onSuccess: () => {
//       mutate();
//     },
//   });
// }
