"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const postModel_1 = __importDefault(require("../model/postModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
module.exports = {
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userName, firstName, lastName, coverPicture, profilePicture, country, worksAt, livesIn, relationship } = req.body;
            yield userModel_1.default.findOneAndUpdate({ _id: req.params.id }, { $set: { "userName": userName, "firstName": firstName, "lastName": lastName, "coverPicture": coverPicture, "profilePicture": profilePicture, "relationship": relationship, "livesIn": livesIn, "country": country, "worksAt": worksAt } }, { new: true });
            const userData = yield userModel_1.default.findOne({ _id: req.params.id });
            return res.status(200).json(userData);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    follow: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //followers id
            const id = req.params.id;
            //user id 
            const { _id } = req.body;
            if (_id === id) {
                return res.status(403).json("Action Forbidden");
            }
            else {
                const followUser = yield userModel_1.default.findById(id);
                const followingUser = yield userModel_1.default.findById(_id);
                if (!(followUser === null || followUser === void 0 ? void 0 : followUser.followers.includes(_id))) {
                    yield (followUser === null || followUser === void 0 ? void 0 : followUser.updateOne({ $push: { followers: _id } }));
                    yield (followingUser === null || followingUser === void 0 ? void 0 : followingUser.updateOne({ $push: { following: id } }));
                    const userData = yield userModel_1.default.findById(_id);
                    res.status(200).json(userData);
                }
                else {
                    res.status(403).json("you are already following this id");
                }
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    unFollow: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //followers id
            const id = req.params.id;
            //user id 
            const { _id } = req.body;
            if (_id === id) {
                res.status(403).json("Action Forbidden");
            }
            else {
                try {
                    const unfollowUser = yield userModel_1.default.findById(id);
                    const unfollowingUser = yield userModel_1.default.findById(_id);
                    if (unfollowUser === null || unfollowUser === void 0 ? void 0 : unfollowUser.followers.includes(_id)) {
                        yield (unfollowUser === null || unfollowUser === void 0 ? void 0 : unfollowUser.updateOne({ $pull: { followers: _id } }));
                        yield (unfollowingUser === null || unfollowingUser === void 0 ? void 0 : unfollowingUser.updateOne({ $pull: { following: id } }));
                        const userData = yield userModel_1.default.findById(_id);
                        res.status(200).json(userData);
                    }
                    else {
                        res.status(403).json("you are already unfollowed this id");
                    }
                }
                catch (error) {
                    console.log(error);
                    res.status(500).json(error);
                }
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const usersList = yield userModel_1.default.find({}).lean();
            res.status(200).json({ usersList });
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    addComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield postModel_1.default.updateOne({ _id: req.params.id }, { $push: { comments: { userId: req.body.userId, comment: req.body.comment } } });
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    getUserData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userData = yield userModel_1.default.findOne({ _id: req.params.id });
            res.status(200).json({ userData });
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    getFollowing: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const followersData = yield userModel_1.default.findOne({ _id: req.params.id }, { _id: 0, following: 1 }).populate("following").lean();
            res.status(200).json(followersData);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    deletePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield postModel_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json("success");
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    })
};
