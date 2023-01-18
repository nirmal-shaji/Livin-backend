import mongoose from "mongoose";
import { Types } from 'mongoose';

type postModel = {
    userId:Types.ObjectId ;
    desc: string;


    likes: string[];
    following: string[];
    createdAt: {};
    imageUrl: string;
    comments: string[];
    saved: string[];
    reports:string[]


}

const postSchema = new mongoose.Schema<postModel>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Users'
            
        },
        desc: {
            type: String,
            required: true
        },
        likes: [],
        createdAt: {
            type: Date,
            default: new Date(),
        },
        imageUrl: String,
        saved: [{
           
                type: mongoose.Schema.Types.ObjectId,
                ref:"Users"
            
        }],
        
        comments: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Users"
            },
            comment: {
                type:String
            }
        }],
        reports: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Users"
            },
            comment: {
                type:String
            }
    }],
    },
    {
        timestamps: true,
    }
)

const postModel = mongoose.model("Posts", postSchema);

export = postModel;