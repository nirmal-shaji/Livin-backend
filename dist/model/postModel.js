"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Users'
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Users"
        }],
    comments: [{
            userId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Users"
            },
            comment: {
                type: String
            }
        }],
    reports: [{
            userId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Users"
            },
            comment: {
                type: String
            }
        }],
}, {
    timestamps: true,
});
const postModel = mongoose_1.default.model("Posts", postSchema);
module.exports = postModel;
