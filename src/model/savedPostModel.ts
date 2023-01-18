import mongoose from "mongoose";
import { Types } from 'mongoose';

type postModel = {
    userId:Types.ObjectId ;
   


    postId: string[];
  


}

const postSchema = new mongoose.Schema<postModel>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Users'
            
        },
    
        
        postId: [{
            
                type: mongoose.Schema.Types.ObjectId,
                ref:"Posts"
            }],
    },
    {
        timestamps: true,
    }
)

const savedPostModel = mongoose.model("Saved", postSchema);

export = savedPostModel;