import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const extractData = (response) => response.data;

// Use axios from axios-api, after configuring the APIs
const fetchComments = () => axios.get("https://jsonplaceholder.typicode.com/comments").then(extractData);;

export const useComments = () => {
  // Use this queryClient after integrating with the API's
  // const queryClient = useQueryClient();

  return useQuery(
    'comments',
    fetchComments
  );
}