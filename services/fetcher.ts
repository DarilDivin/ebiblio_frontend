import axios from "@/lib/axios";

const fetcher = (url: string) => axios.get(url).then((response) => response.data);

export default fetcher;