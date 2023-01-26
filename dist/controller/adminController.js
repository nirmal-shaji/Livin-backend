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
const notificationModel_1 = __importDefault(require("../model/notificationModel"));
const savedPostModel_1 = __importDefault(require("../model/savedPostModel"));
module.exports = {
    getAllPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postData = yield postModel_1.default.find({}).populate('userId').lean();
            res.status(200).json(postData);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const usersList = yield userModel_1.default.find({}, { userName: 1, firstName: 1, lastName: 1, block: 1 }).lean();
            res.status(200).json({ usersList });
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    blockUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield userModel_1.default.findOneAndUpdate({ _id: req.params.id }, { $set: { "block": "true" } });
            res.status(200).json("success");
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    unBlockUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield userModel_1.default.findOneAndUpdate({ _id: req.params.id }, { $set: { "block": "false" } });
            res.status(200).json("success");
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    removePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.status(200).json("success");
    }),
    dashboard: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userModel_1.default.aggregate([{ $group: { _id: { month: { $month: "$createdAt" } }, userCount: { $sum: 1 } } }]).sort({ _id: -1 });
            const userCount = [];
            for (let i = 0; i < 12; i++) {
                users.map((value) => {
                    if (value.userCount) {
                        userCount[value._id.month - 1] = value.userCount;
                    }
                });
                if (!userCount[i])
                    userCount[i] = 0;
            }
            //////post count is found out here 
            const posts = yield postModel_1.default.aggregate([{ $group: { _id: { month: { $month: "$createdAt" } }, postCount: { $sum: 1 } } }]).sort({ _id: -1 });
            const postCount = [];
            for (let i = 0; i < 12; i++) {
                posts.map((value) => {
                    if (value.postCount) {
                        postCount[value._id.month - 1] = value.postCount;
                    }
                });
                if (!postCount[i])
                    postCount[i] = 0;
            }
            res.status(200).json({ postCount, userCount });
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    notification: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const notifications = yield notificationModel_1.default.findOne({ adminId: "admin" }).populate('reports.postId');
            res.status(200).json(notifications);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    deleteNotification: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const notification = yield notificationModel_1.default.findOneAndUpdate({ adminId: "admin" }, { $set: { reports: [] } });
            res.status(200).json("success");
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    deletePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield postModel_1.default.findByIdAndDelete(req.params.id);
            yield savedPostModel_1.default.findOneAndUpdate({ postId: req.params.id }, { $pull: { postId: req.params.id } });
            res.status(200).json("success");
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    })
};
