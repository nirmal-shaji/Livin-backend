import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction } from "express";
dotenv.config();
const secret = process.env.JWT_KEY;
import { Jwt } from "jsonwebtoken";
import { Request ,Response} from 'express'
type decodedType = {
  userName: string;
  id: string;
  iat: JwtPayload;
  exp: JwtPayload;
}



const authMiddleWare = async (req:Request, res:Response, next:NextFunction) => {
    try {
        
          const token = req.headers.authorization?.split(" ")[1];
            if (token) {
                if (secret){
                    const decoded = jwt.verify(token, secret);
                  if (decoded) {
                    next();
                  }
                  else {
                    return res.status(400).json("unauthorized entry")
                  }
                    
    
    } 
      }
            else {
              return res.status(400).json("unauthorized entry")
      }
   
  
  } catch (error) {
      console.log(error);

  }
};

export default authMiddleWare;