import mongoose from "mongoose";
import { Types } from 'mongoose';

type chatModel = {
  

    messages: string[];
 


}




const ChatSchema = new mongoose.Schema<chatModel>(
  {
    messages: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
export = ChatModel;


