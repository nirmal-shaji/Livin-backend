"use strict";
// import userModel from "../model/userModel"
// import jwt from "jsonwebtoken"
// import dotenv from "dotenv"
// dotenv.config();
// const code= process.env.JWT_KEY
// const signToken = (id: unknown) => {
//   if (code) {
//       return jwt.sign({ id }, code, {
//     expiresIn: 90000,
//   });
//   }
// };
// const user = userModel;
// const createUserToken = async (user:any, code:any, req:Request, res:Response) => {
//   const token = signToken(user._id);
//   let d = new Date();
//   d.setDate(d.getDate() + 30);
//   res.cookie("jwt", token);
//   user.password = undefined;
//   res.status(200).json({
//     status: "success",
//     token,
//     data: {
//       user,
//     },
//   });
// };
// module.exports = createUserToken;
