import { verifyToken } from "../utils/jwt"


export const authenticateSocket = (token:string)=>{
       
      if(!token){
          throw new Error("No token provided")
      }

     const decoded = verifyToken(token);

     return decoded.userId;
}