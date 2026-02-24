import {prisma} from "../config/db"
import {hashPassword, comparePassword} from "../utils/hash"
import { signToken } from "../utils/jwt"




export const signupService = async(
    username: string,
    email: string,
    password: string    
  )=>{
       
         const existingUser = await prisma.user.findUnique({
              where: { email},
         })

          if(existingUser){
               throw new Error("user already exists");
          }
           
          const hashedPassword = await hashPassword(password);

          const user = await prisma.user.create({
             
             data:{
                username,
                email,
                passwordHash: hashedPassword
             },
          });
        
         //  const token = signToken(JSON.stringify({userId: user.id }));
        //   const token = signToken({userId: user.id });
            
          const token = signToken(user.id);
        

        return { user,token};

  }

  

export const loginService = async(
     email:string,
     password:string
  )=>{
          
       const user = await prisma.user.findUnique({
           where:{email},
       })

       if(!user){
          throw new Error("Invalid credentials");
       }

       const isValid = await comparePassword(password,user.passwordHash);

       if(!isValid){
           throw new Error("Invalid Password");
       }

      //   const token = signToken(JSON.stringify({userId: user.id }));
          const token = signToken(user.id);

        return {user, token};


  }

