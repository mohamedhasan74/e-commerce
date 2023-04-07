import axios from "axios";
import { useEffect, useState } from "react";
import { baseApi } from "../../../App.js";
function useGetAxios(endPoint) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const getData = () => {
    setIsLoading(true);
    axios
      .get(`${baseApi}${endPoint}`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return { isLoading, data, error };
}
export default useGetAxios;
