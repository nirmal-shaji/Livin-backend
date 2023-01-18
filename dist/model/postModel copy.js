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
    postId: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Posts"
        }],
}, {
    timestamps: true,
});
const savedPostModel = mongoose_1.default.model("Saved", postSchema);
module.exports = savedPostModel;
