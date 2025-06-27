import { useEffect,useState } from "react"
import {getNotes} from "../api/notesApi";

function useFetch (url) {
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);

   useEffect(() => {
  setLoading(true);

  async function getData() {
    try {
      const dataList = await getNotes(url); // ✅ No fetch here
      console.log(dataList, 'data');
      setData(dataList);
      setLoading(false);
      return dataList;
    } catch (e) {
      setLoading(false);
      setError(e.message || "Something went wrong");
    }
  }

  getData();
}, []);

   return {data,loading,error}
}

export default useFetch