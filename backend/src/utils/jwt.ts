import jwt,{JwtPayload} from 'jsonwebtoken';


interface AuthPayload extends JwtPayload {
  userId: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;


export const signToken= (userId:string)=>{
          
      return jwt.sign({userId},JWT_SECRET);
}


export const verifyToken = (token: string): AuthPayload => {
  return jwt.verify(token, JWT_SECRET) as AuthPayload;
};

// export const verifyToken = (token:string)=>{

//       return jwt.verify(token,JWT_SECRET);
// }