import { useQuery } from "react-query";
import axios from "../axios-api";
import { extractData } from "../utils";

const fetchLoadedPdfNames = () => axios.get('/loaded-pdfs').then(extractData);

export const useLoadedPdfs = () => {
    // Use this queryClient after integrating with the API's
    // const queryClient = useQueryClient();
  
    return useQuery(
      'loaded-pdfs',
      fetchLoadedPdfNames
    );
  }