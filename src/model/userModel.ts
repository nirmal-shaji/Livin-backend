import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";


type userModel = {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    block: boolean;
    email: string;
    profilePicture: string;
    coverPicture: string;
    about: string;
    livesIn: string;
    worksAt: string;
    relationship: string,
    followers: string[];
    following: string[];
    country:string[]
    
     
}
const UserSchema = new mongoose.Schema<userModel>(
    {
        userName: {
            type: String,
            required: true
        },
        password : {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName : {
            type: String,
            required: true
        },
        block : {
            type: Boolean,
            default: false,
        },
        email: {
            type: String
            
            
         
        },
        
        profilePicture: String,
        coverPicture: String,
        about: String,
        livesIn: String,
        worksAt: String,
        relationship: String,
        country:String,
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users"
            
        }] ,
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users"
            
        }]
    },
    {timestamps: true}
)

  // UserSchema.plugin(uniqueValidator)


UserSchema.pre("save", async function (this:any,next:any) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const user = mongoose.model<userModel>("Users", UserSchema);


export = user;
