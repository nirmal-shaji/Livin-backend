import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";


type adminModel = {
    userName: string;
    password: string;
  
    
     
}
const adminSchema = new mongoose.Schema<adminModel>(
    {
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    },
    {timestamps: true}
)

  // UserSchema.plugin(uniqueValidator)


adminSchema.pre("save", async function (this:any,next:any) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const admin = mongoose.model<adminModel>("Admin", adminSchema);


export = admin;
