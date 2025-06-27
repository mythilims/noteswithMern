
import {server_url,headers} from '../Utility/common';
export const getNotes  =async(url) =>{
   console.log(await headers());
   
    try{
       let data  =await fetch(server_url+url,{
        method:'GET',
        headers: await headers()
       });
       let result =await data.json();
       return result.data;
    }catch(e){
      return e;
    }
}
export const getByIdNotes  =async(url,id) =>{
   console.log(await headers());
   
    try{
       let data  =await fetch(server_url+url+`/${id}`,{
        method:'GET',
        headers: await headers()
       });
       let result =await data.json();
       return result.data;
    }catch(e){
      return e;
    }
}
export const createNote  =async(url,reqBody) =>{
   console.log(await headers());
   
    try{
       let data  =await fetch(server_url+url,{
        method:'POST',
        headers: await headers(),
        body:JSON.stringify(reqBody)
       });
       let result =await data.json();
       return result;
    }catch(e){
      return e;
    }
}

