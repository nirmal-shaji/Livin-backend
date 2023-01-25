import { RequestHandler, Request, Response } from 'express';
import postModel from "../model/postModel";
import userModel from "../model/userModel"
import savedPostModel from "../model/savedPostModel"
import mongoose from "mongoose";
import notificationModel from '../model/notificationModel';

// creating a post

export = {
  createPost: async (req: Request, res: Response) => {



    try {

      const newPost = await postModel.create(req.body);


      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getPost: async (req: Request, res: Response) => {
    try {

      const userId = req.params.id;

      let userPost = await postModel.find({ userId: userId }).sort({ updatedAt: 'desc' }).lean()



      let followingPost = await userModel.aggregate([{ $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "followingPosts.userId",
          foreignField: "_id",
          as: "userDetails"

        }
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
      ])





      res.status(200).json(userPost
        .concat(...followingPost[0].followingPosts)
        ?.sort(
          (a, b) => {


            return new Date(+b.createdAt).getTime() - new Date(+a.createdAt).getTime();

          }));
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }


  },
  likePost: async (req: Request, res: Response) => {

    try {
      const id = req.params.id;
      const { userId } = req.body;


      const postData = await postModel.findById(id);

      if (postData?.likes.includes(userId)) {
        await postModel.updateOne({ _id: id }, { $pull: { likes: userId } });

        res.status(200).json({ message: "unliked photo" })
      }
      else {
        await postModel.updateOne({ _id: id }, { $push: { likes: userId } });
        const newPostDAta = await postModel.findById(id)

        res.status(200).json({ message: "liked photo" })
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }


  },
  addComment: async (req: Request, res: Response) => {

    try {
      const data = await postModel.findOne({ _id: req.params.id })

      await postModel.updateOne({ _id: req.params.id }, { $push: { comments: { userId: req.body.userId, comment: req.body.comments } } });

      res.status(200).json("success")
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }

  },
  allComment: async (req: Request, res: Response) => {
    try {
      const data = await postModel.findOne({ _id: req.params.id }, { comments: 1 }).populate('comments.userId').lean();
      res.status(200).json(data)
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }

  },
  savePost: async (req: Request, res: Response) => {
    try {
      const savePostExist = await savedPostModel.findOne({ userId: req.query.userId });
      if (savePostExist) {
        const postExist = await savedPostModel.findOne({ postId: req.query.postId });
        if (postExist) {
          return res.status(200).json("sucess");
        }
        await savedPostModel.findOneAndUpdate({ userId: req.query.userId }, { $push: { postId: req.query.postId } });
        return res.status(200).json("success");
      }
      await savedPostModel.create(req.query);
      res.status(200).json("success");
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }



  },
  allSavedPost: async (req: Request, res: Response) => {
    try {
      const data = await savedPostModel.findOne({ userId: req.params.id }).populate('postId');
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }

  },
  reportPost: async (req: Request, res: Response) => {
    try {
      const data = await postModel.findOneAndUpdate({ _id: req.params.id }, { $push: { reports: { userId: req.body.userId, comment: req.body.reportText } } })
      const obj = { userId: req.body.userId, comment: req.body.reportText }

      // await notificationModel.reports.push(obj)
      //await notificationModel.create.({reports:{ userId: req.body.userId, comment: req.body.reportText}});
      await notificationModel.findOneAndUpdate({ adminId: "admin" }, { $push: { reports: { postId: req.params.id, comment: req.body.reportText } } });
      res.status(200).json("success")
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }

  },
  editPost: async (req: Request, res: Response) => {
    try {
      const data = await postModel.findOneAndUpdate({ _id: req.body.postId }, { $set: { desc: req.body.desc } });
      res.status(200).json({ data })
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }


  }


};