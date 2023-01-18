import mongoose from "mongoose";
import { Types } from 'mongoose';

type notificationModel = {
    adminId: string;
    reports:string[]


}

const notificationSchema = new mongoose.Schema<notificationModel>(
    {
        adminId: {
            type:String
        },
        reports: [{
            postId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Posts"
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

const notificationModel = mongoose.model("Notification", notificationSchema);

export = notificationModel;