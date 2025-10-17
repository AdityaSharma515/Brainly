import mongoose,{Schema,Document} from "mongoose";

export interface Usermodel extends Document {
    username: string,
    password:string,
}

const UserSchema=new Schema<Usermodel>({
    username:{type:String ,required:true,unique:true},
    password:{type:String,required:true}
})

const users=mongoose.model<Usermodel>("User",UserSchema);

export default users;