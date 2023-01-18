import messageModel from "../model/messageModal";
import { RequestHandler, Request, Response } from 'express';

export = {
  addMessage: async (req: Request, res: Response) => {
   
  const { text, chatId,senderId } = req.body;
  // const { userId } = req.body.user;
  if (!(text && chatId)) {
    return res.status(401).json({ message: "all felids are required" });
  }
  try {
    const message = new messageModel({
       senderId: senderId,
      chatId,
      text,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
},
getMessages : async (req:Request, res:Response) => {
  const { chatId } = req.params;
  try {
    const result = await messageModel.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
    }
};

