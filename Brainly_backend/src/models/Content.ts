import mongoose,{Schema,Document} from "mongoose";
import type { Usermodel } from "./user.model.js";
import type { Tagmodel as tag } from "./Tags.js";
import Tag from "./Tags.js";
import users from "./user.model.js";

const contentTypes = ['image', 'video', 'article', 'audio']; 


interface Contentmodel extends Document {
    link: string,
    type:string,
    title:string,
    tag:Array<tag>,
    userId: mongoose.Types.ObjectId | Usermodel,
}

const ContetnSchema=new Schema<Contentmodel>({
    link:{type:String ,required:true},
    type:{type:String,enum:contentTypes,required:true},
    title:{type:String ,required:true},
    tag:[{type:String ,ref:Tag}],
    userId:{type:mongoose.Types.ObjectId,ref:users ,required:true},

})

const Content=mongoose.model<Contentmodel>("Content",ContetnSchema);

export default Content;