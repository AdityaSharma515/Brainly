import mongoose,{Schema,Document} from "mongoose";

export interface Tagmodel extends Document {
    title:string,
}

const TagSchema=new Schema<Tagmodel>({
    title:{type:String ,required:true,unique:true},
})

const Tag=mongoose.model<Tagmodel>("Tag",TagSchema);

export default Tag;