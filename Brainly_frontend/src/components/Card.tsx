import Document from "../Icons/Document"
import ShareIcon from "../Icons/ShareIcon"
import Trash from "../Icons/Trash"
import Twitter from "../Icons/Twitter"
import Youtube from "../Icons/Youtube"

interface CardProps{
  type:"document"|"youtube"|"twitter",
  title:string,
  tags:Array<string>
}
const typeclases={
  "document":<Document/>,
  "youtube":<Youtube/>,
  "twitter":<Twitter/>
}


const Card = ({type,title,tags}:CardProps) => {
  return (
    <div className="flex flex-col w-[16rem] h-[18rem] border border-gray-200 rounded-xl shadow-sm bg-white">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 font-medium text-gray-800">{typeclases[type]} {title}</div>
            <div className="flex items-center gap-2 font-medium text-gray-800"><ShareIcon/> <Trash/></div>
        </div>
        <div className="flex flex-wrap gap-2 px-4 py-3 mt-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos aut ut exercitationem earum quam ullam omnis officia eum repellendus cumque id explicabo, quibusdam possimus quos incidunt porro fuga voluptate reiciendis.
        </div>
        <div>
          {/* {tags.map((tag,index)=>(
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                #{tag}
            </span>
          ))} */}
        </div>
    </div>
    
  )
}

export default Card