
import { RequestHandler, Request, Response } from 'express';
import postModel from '../model/postModel';
import userModel from '../model/userModel';


export = {


  updateUser: async (req: Request, res: Response) => {
    try {
      const { userName, firstName, lastName, coverPicture, profilePicture, country, worksAt, livesIn, relationship } = req.body;
      await userModel.findOneAndUpdate({ _id: req.params.id }, { $set: { "userName": userName, "firstName": firstName, "lastName": lastName, "coverPicture": coverPicture, "profilePicture": profilePicture, "relationship": relationship, "livesIn": livesIn, "country": country, "worksAt": worksAt } }, { new: true });
      const userData = await userModel.findOne({ _id: req.params.id })

      return res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }



  },
  follow: async (req: Request, res: Response) => {
    try {
      //followers id
      const id = req.params.id

      //user id 
      const { _id } = req.body;

      if (_id === id) {

        return res.status(403).json("Action Forbidden");
      }
      else {
        const followUser = await userModel.findById(id);
        const followingUser = await userModel.findById(_id);

        if (!followUser?.followers.includes(_id)) {

          await followUser?.updateOne({ $push: { followers: _id } });
          await followingUser?.updateOne({ $push: { following: id } });

          const userData = await userModel.findById(_id)

          res.status(200).json(userData);
        } else {

          res.status(403).json("you are already following this id");
        }

      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }


  },
  unFollow: async (req: Request, res: Response) => {
    try {
      //followers id
      const id = req.params.id

      //user id 
      const { _id } = req.body;

      if (_id === id) {
        res.status(403).json("Action Forbidden");
      } else {
        try {
          const unfollowUser = await userModel.findById(id);
          const unfollowingUser = await userModel.findById(_id);

          if (unfollowUser?.followers.includes(_id)) {
            await unfollowUser?.updateOne({ $pull: { followers: _id } });
            await unfollowingUser?.updateOne({ $pull: { following: id } });

            const userData = await userModel.findById(_id)

            res.status(200).json(userData);
          } else {
            res.status(403).json("you are already unfollowed this id");
          }
        } catch (error) {
          console.log(error)
          res.status(500).json(error);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }


  },
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const usersList = await userModel.find({}).lean();

      res.status(200).json({ usersList })
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }

  },
  addComment: async (req: Request, res: Response) => {
    try {
      await postModel.updateOne({ _id: req.params.id }, { $push: { comments: { userId: req.body.userId, comment: req.body.comment } } })
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }

  },
  getUserData: async (req: Request, res: Response) => {
    try {
      const userData = await userModel.findOne({ _id: req.params.id });

      res.status(200).json({ userData });
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }

  },
  getFollowing: async (req: Request, res: Response) => {
    try {
      const followersData = await userModel.findOne({ _id: req.params.id }, { _id: 0, following: 1 }).populate("following").lean();

      res.status(200).json(followersData)
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }

  },
  deletePost: async (req: Request, res: Response) => {
    try {

      await postModel.findByIdAndDelete(req.params.id);
      res.status(200).json("success");
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }

  }
}