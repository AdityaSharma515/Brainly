import mongoose,{Schema,Document} from "mongoose";
import type { Usermodel } from "./user.model.js";
import type { Tagmodel as tag, Tagmodel } from "./Tags.js";
import Tag from "./Tags.js";
import users from "./user.model.js";

const contentTypes = ["document", "tweet" , "youtube" , "link"]; 


interface Contentmodel extends Document {
    link: string,
    type:"document" | "tweet" | "youtube" | "link",
    title:string,
    tags: Array<mongoose.Types.ObjectId> |Array<Tagmodel>,
    userId: mongoose.Types.ObjectId | Usermodel,
}

const ContetnSchema=new Schema<Contentmodel>({
    link:{type:String ,required:true},
    type:{type:String,enum:contentTypes,required:true},
    title:{type:String ,required:true},
    tags:[{type:mongoose.Types.ObjectId ,ref:"Tag"}],
    userId:{type:mongoose.Types.ObjectId,ref:"User" ,required:true},

})

const Content=mongoose.model<Contentmodel>("Content",ContetnSchema);

export default Content;