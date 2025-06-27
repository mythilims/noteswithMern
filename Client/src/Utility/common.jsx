let process =import.meta.env;
console.log(import.meta);

export let server_url =process.VITE_SERVER_URL;
export const setToken  = (token)=>{
     localStorage.setItem('token',token);
return
}
export const setUser  = (user)=>{
     localStorage.setItem('user',JSON.stringify(user))
return
}
export const getToken = ()=>{
    return localStorage.getItem('token')
    
}
export const logOut =(link) =>{
     localStorage.clear();
    link('/');
    return
    
}
export const headers =() =>{
   return {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${getToken()}`
    }
}

