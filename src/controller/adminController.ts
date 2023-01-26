import { RequestHandler, Request, Response } from 'express';
import postModel from "../model/postModel";
import userModel from "../model/userModel"
import mongoose from "mongoose";
import notificationModel from '../model/notificationModel';
import savedPostModel from '../model/savedPostModel';

// creating a post

export = {
    getAllPost: async (req: Request, res: Response) => {
        try {

            const postData = await postModel.find({}).populate('userId').lean();
            res.status(200).json(postData);

        } catch (error) {
            console.log(error)
            res.status(500).send(error)

        }
    },
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const usersList = await userModel.find({}, { userName: 1, firstName: 1, lastName: 1, block: 1 }).lean();
            res.status(200).json({ usersList })
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    },
    blockUser: async (req: Request, res: Response) => {
        try {
            await userModel.findOneAndUpdate({ _id: req.params.id }, { $set: { "block": "true" } })
            res.status(200).json("success")
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    },
    unBlockUser: async (req: Request, res: Response) => {
        try {
            await userModel.findOneAndUpdate({ _id: req.params.id }, { $set: { "block": "false" } })
            res.status(200).json("success")
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    },
    removePost: async (req: Request, res: Response) => {

        res.status(200).json("success")
    },
    dashboard: async (req: Request, res: Response) => {
        type userss = [{
            _id: string;
            createdAt: string;

        }]
        try {
            const users = await userModel.aggregate([{ $group: { _id: { month: { $month: "$createdAt" } }, userCount: { $sum: 1 } } }]).sort({ _id: -1 })

            const userCount = [];
            for (let i = 0; i < 12; i++) {
                users.map((value) => {

                    if (value.userCount) {
                        userCount[value._id.month - 1] = value.userCount



                    }


                })
                if (!userCount[i])
                    userCount[i] = 0

            }


            //////post count is found out here 
            const posts = await postModel.aggregate([{ $group: { _id: { month: { $month: "$createdAt" } }, postCount: { $sum: 1 } } }]).sort({ _id: -1 })

            const postCount = [];
            for (let i = 0; i < 12; i++) {
                posts.map((value) => {

                    if (value.postCount) {
                        postCount[value._id.month - 1] = value.postCount



                    }


                })
                if (!postCount[i])
                    postCount[i] = 0

            }



            res.status(200).json({ postCount, userCount });
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    },
    notification: async (req: Request, res: Response) => {
        try {
            const notifications = await notificationModel.findOne({ adminId: "admin" }).populate('reports.postId');

            res.status(200).json(notifications);
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    },
    deleteNotification: async (req: Request, res: Response) => {
        try {
            const notification = await notificationModel.findOneAndUpdate({ adminId: "admin" }, { $set: { reports: [] } })
            res.status(200).json("success");
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    },
    deletePost: async (req: Request, res: Response) => {
        try {
    
          await postModel.findByIdAndDelete(req.params.id);
          await savedPostModel.findOneAndUpdate({ postId: req.params.id }, { $pull: { postId: req.params.id } });
          res.status(200).json("success");
        } catch (error) {
          console.log(error);
          res.status(500).send(error)
        }
    
      }

}