import { Request, Response, NextFunction } from "express";
import { v4 } from "uuid";
import { UserInstance } from "../model/userModel";
import { registerSchema } from "../utils/validation";
import { cookieTimeout, generateSignature, hashPassword } from "../utils/services/helper";
import { excludeProperty } from "../utils/services/service";
import { UserAttributes } from "../utils/constant/interface";


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    

   try {

    let { userName, firstName, lastName, dateOfBirth, email, password, repeat_password, phoneNumber } = req.body;

    console.log("phone number ", phoneNumber)
    console.log('dateOfBirth', dateOfBirth)
    const birth_year = dateOfBirth.split('-')[2]

    console.log("birth_year", birth_year)

    const { error } = registerSchema.validate({ userName, firstName, lastName, birth_year, email, password, repeat_password });

    if(error){
        return res.status(400).json({
            status: `error`,
            method: req.method,
            message: error.message
        })
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserInstance.create(
        {
            id: v4(),
            userName,
            firstName,
            lastName,
            dateOfBirth,
            email,
            password: hashedPassword,
            phoneNumber
        }
    )as unknown as UserAttributes;

  

    if(!user){
        return res.status(400).json({
            status: `error`,
            method: req.method,
            message: `user not successfully created`
        })
    }

    const token = generateSignature(user)

    console.log('user   ', user)

    const keysToExclude = ['password', 'id'];
    const updatedUser = excludeProperty(user, keysToExclude);

    console.log('updatedUser   ', updatedUser)

    res.cookie('token', token, {
        expires: cookieTimeout()
    });
    
    return res.status(200).json({
        status: `success`,
        method: req.method,
        message: `user successfully created`,
        data: updatedUser
    })

   } catch (error) {
    next(error)
   }

}