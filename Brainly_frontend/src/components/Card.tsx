import axios from "axios"
import Document from "../Icons/Document"
import ShareIcon from "../Icons/ShareIcon"
import Trash from "../Icons/Trash"
import Youtube from "../Icons/Youtube"
import toast from "react-hot-toast"
import LinkIcon from "../Icons/LinkIcon"
import Twitter from "../Icons/Twitter"
import Twiter from "./Twiter"
import YouTube from "./YouTube"

interface Tag{
  _id:string,
  title:string
}

interface CardProps{
  type:"document"|"youtube"|"twitter"|"link",
  title:string,
  tags:Tag[],
  link:string
}
const typeclases={
  "document":<Document/>,
  "youtube":<Youtube/>,
  "twitter":<Twitter/>,
  "link":<LinkIcon/>
}


const Card = ({type,title,tags,link}:CardProps) => {
  async function deletecontent(){
    try {
      await axios.delete("http://localhost:5001/api/v1/content",{
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("token")
        }
      })
      toast.success("Content deleted Succefully")
    } catch (error) {
      console.error("Error in deleting content",error);
      toast.error("Failed to delete")
    }
  }
  

  return (
    <div className="flex flex-col w-80  border border-gray-200 rounded-xl shadow-sm bg-white">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 font-medium text-gray-800">{typeclases[type]} {title}</div>
            <div className="flex items-center gap-2 font-medium text-gray-800">
              <button><ShareIcon/></button>
              <button onClick={deletecontent} className="cursor-pointer" ><Trash/></button>
            </div>
        </div>
        <div className="flex flex-wrap gap-2 px-4 py-2 mt-auto mb-5 ">
          {type==="twitter"&&<Twiter link={link}/>}
          {type==="youtube"&&<YouTube url={link}/>}
        </div>
        <div className="flex flex-wrap gap-2 ml-2" >
          {tags.map((tag)=>(
            <span key={tag._id} className="px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full border border-indigo-200">
                {tag.title}
            </span>
          ))}
        </div>
    </div>
    
  )
}

export default Card