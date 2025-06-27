import { Navigate } from 'react-router-dom';
import {getToken} from '../Utility/common'
function ProtectedRoute ({children}) {
    let token =getToken();
   if(!token){
    return <Navigate to="/" />
   }
   return children
}

export default ProtectedRoute;