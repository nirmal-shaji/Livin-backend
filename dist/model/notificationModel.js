"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
    adminId: {
        type: String
    },
    reports: [{
            postId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Posts"
            },
            comment: {
                type: String
            }
        }],
}, {
    timestamps: true,
});
const notificationModel = mongoose_1.default.model("Notification", notificationSchema);
module.exports = notificationModel;
