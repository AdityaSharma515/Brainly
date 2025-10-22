import mongoose,{Schema,Document} from "mongoose";
import type { Usermodel } from "./user.model.js";
import users from "./user.model.js";

export interface linkmodel extends Document {
    hash: string,
    userId:mongoose.Types.ObjectId| Usermodel,
}

const LinkSchema=new Schema<linkmodel>({
    hash:{type:String ,required:true},
    userId:{type:String,ref:"User",required:true}
})

const link=mongoose.model<linkmodel>("Link",LinkSchema);

export default link;