import {server_url,headers} from '../Utility/common';
export const login  =async(url,reqBody) =>{   
    try{
       let data  =await fetch(server_url+url,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },  
        body:JSON.stringify(reqBody)
       });
       let result =await data.json();
       return result;
    }catch(e){
      return e;
    }
}