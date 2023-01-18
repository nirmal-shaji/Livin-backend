import { RequestHandler, Request, Response } from 'express';
import userModel from '../model/userModel';
import adminModel from '../model/adminModel'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import dotenv from "dotenv";
dotenv.config()

export = {
    register: async (req: Request, res: Response) => {
        try {
            const { userName, password, firstName, lastName,email } = req.body;
        if (!userName || !password || !firstName || !lastName ) {
            return res.status(404).json({ message: "missing fields" });
        }
        const userExist = await userModel.findOne({ userName: userName });
        if (userExist)
           return res.status(400).json({message:"user already exist"})
        
        const userData = await userModel.create(req.body);
        let token
        if (process.env.JWT_KEY) {
              token = jwt.sign(
            { username: userData.userName, id: userData._id },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
        }
       
        res.status(200).json({message:"successfull",userData,token})  
        } catch (error) {
            console.log(error)
             res.status(500).send(error)
        }
      
    },
    login: async (req: Request, res: Response) => {
    
        type requestBody={
            userName: string;
            password: string;
        }
        try {
              const { userName, password}:requestBody = req.body;
       
        const userData = await userModel.findOne({ userName: userName});
        
        if (userData) {
            if (userData.block)
                return res.status(403).json("user blocked")
            const userVerified =await bcrypt.compare(password, userData.password);
         
            
            if (!userVerified)
                return res.status(404).json({ message: "user verification failed",status:"false" });
           
            let token
            if (process.env.JWT_KEY) {
                 token = jwt.sign(
               { username: userData.userName, id: userData._id },
               process.env.JWT_KEY,
               { expiresIn: "1h" }
             );
            }
            res.status(200).json({ message: "user verified", userData,token })
            } 
        else {
            res.status(403).json({ message: "user doesnt exist" });
            }
        } catch (error) {
            console.log(error)
             res.status(500).send(error)
        }
     
       
    },
    adminLogin: async (req: Request, res: Response) => {
        try {
             const { userName, password } = req.body;
        const adminData=await adminModel.findOne({userName:userName},{userName:1,password:1});
      
        if (adminData) {
            const adminVerified = await bcrypt.compare(password, adminData.password);
            
            if (adminVerified) {
                let token
                if (process.env.JWT_KEY) {
                       token = jwt.sign(
                    { username: adminData.userName, id: adminData._id },
                    process.env.JWT_KEY,
                    { expiresIn: "1h" }
                  );
                }
                
             
                return res.status(200).json({adminData,token})
            }
        }  
        } catch (error) {
            console.log(error)
             res.status(500).send(error)
        }
     
        
    }
}