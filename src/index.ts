import dotenv from "dotenv";
import path from 'path'
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from './config/connection';
import userRouter from './routes/userRouter'
import authRouter from './routes/authRouter'
import postRouter from './routes/postRouter'
import chatRouter from './routes/chatRouter'
import messageRouter from './routes/messageRouter'
import adminRouter from './routes/adminRouter'
import http from "http"
import { Server } from "socket.io";
import cors from 'cors';



const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
       origin: 'https://livins.audiograms.xyz/',
        //origin:"http://localhost:3000",
        methods:["GET","POST"],
        secure: false,
        changeOrigin: true
      
    }
});
app.use(cors());
app.use(bodyParser.json({limit:"30mb"}));
app.use(bodyParser.urlencoded({ limit:"30mb",extended: true }));

dotenv.config()
mongoose
app.use('/api/v1/', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/admin',adminRouter);


type userType = {
    userId: string;
    socketId: string;
}

console.log("socket started")
let user:userType[]= []

io.on("connection", (socket) => {
    socket.on("addNewUser", (userId) => {

        if (!user.some((user) => user.userId === userId)) {
            user.push({
                userId: userId,
                socketId: socket.id
            })


        }

        io.emit("allUsers", user);
    })

    socket.on("disconnectUser", () => {
        user = user.filter((user) => user.socketId !== socket.id);
        io.emit("allUsers", user);
    })


    socket.on("sendMessage", (data) => {
       
        const { receiverId } = data;
        
        const receiver = user.find((value) => value.userId === receiverId);
       
        if (receiver) {
            io.to(receiver.socketId).emit("recieveMessage", data);
        }
    });
})

server.listen(5000, () => {
    console.log(`server is connected`);
  });