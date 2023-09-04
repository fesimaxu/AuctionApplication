import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();





const generateSalt = () => {

    const saltRounds = 10;
   return bcrypt.genSalt(saltRounds);
}

export const hashPassword = async (plainPassword: string) => {
    const salt = await generateSalt()
    return bcrypt.hash(plainPassword,  salt)
}


export const generateSignature = async (payload: any) => {
    const value = jwt.sign( payload , `${process.env.TOKEN_SECRET}`, {
        expiresIn: `${process.env.TOKEN_EXPIRES_IN}m`,
      });

      return value;
}


export const verifySignature= async (signature:string) => {
    return jwt.verify(signature, `${process.env.TOKEN_SECRET}`)
    //return jwt.verify(signature, TOKEN_SECRET!)
}

export const cookieTimeout = () => {
    const expiresIn = new Date(Date.now() + Number(process.env.TOKEN_EXPIRES_IN) * 60 * 1000)
    return expiresIn;
      
}