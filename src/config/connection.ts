import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const mongooseConnect:string|undefined = process.env.MONGO_CONNECTION_ID
mongoose.set('strictQuery', true);
if(mongooseConnect)
mongoose.connect(mongooseConnect, (err) => {
    if (err) return console.log('err connection', err);
    console.log('database connected');
})

export default mongoose