import { RequestHandler, Request, Response } from 'express';
import postModel from "../model/postModel";
import userModel from "../model/userModel";
import chatModel from '../model/chatModel'
import mongoose from "mongoose";

// creating a post

export = {
  createChat: async (req: Request, res: Response) => {
    
    
    try {
      
      const chatExist = await chatModel.findOne({ messages: { $all: [req.body.senderId, req.body.receiverId] } }).lean()
      if (chatExist) {
        return res.status(200).json("userAlreadyExist")
      }

                const newChat = new chatModel({
            messages: [req.body.senderId, req.body.receiverId],
        });
          const result = await newChat.save();
          
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
        
    },
     userChats : async (req: Request, res: Response) => {
       try {
        
          const chat = await chatModel.find({
            messages: { $in: [req.params.userId] },
          });
          res.status(200).json(chat);
        } catch (error) {
          res.status(500).json(error);
        }
      },
      
       findChat : async (req: Request, res: Response) => {
        try {
          const chat = await chatModel.findOne({
            messages: { $all: [req.params.firstId, req.params.secondId] },
          });
          res.status(200).json(chat)
        } catch (error) {
          res.status(500).json(error)
        }
      }
}
