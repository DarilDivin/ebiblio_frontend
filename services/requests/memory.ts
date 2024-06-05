// import axios from "@/lib/axios";
// import { csrf } from "@/lib/data";
// import { DepotMemoireProps } from "@/types/memory";

// export const supportedMemoireDeposit = async (
//   url: string,
//   { setStatus, setErrors, ...props }: DepotMemoireProps
// ) => {
//   // console.log(props);
//   await csrf();
//   setErrors({});

//   await axios
//     .post(url, props, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then(() => setStatus("Mémoire déposé avec succès"))
//     .catch((error) => {
//       if (error.response.status !== 422) throw error;
//       console.log(error.response.data.errors);
//       setErrors(error.response.data.errors);
//     });
// };
