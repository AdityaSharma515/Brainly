import { useRef } from "react"
import Button from "../components/Button"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"


const AddContent = () => {
    const titleref=useRef<HTMLInputElement>(null)
    const linkref=useRef<HTMLInputElement>(null)
    const tagref=useRef<HTMLInputElement>(null)
    const typeref=useRef<HTMLSelectElement>(null)
    async function addcontent(){
        const title=titleref.current?.value;
        const link=linkref.current?.value;
        const type=typeref.current?.value;
        const tag=tagref.current?.value.split(",")
        if (!link||!title||!type||tag?.length===0) {
            console.error("Enter all the Fields")
            toast.error("Enter the Fields");
            return;
        }
        try {
            await axios.post("http://localhost:5001/api/v1/content",{
                link,
                type,
                title,
                tags:tag
            },{
                headers:{"Authorization":"Bearer "+localStorage.getItem("token")}
            })
            toast.success("Content added Succefully")
        } catch (error) {
            console.error("Error in adding Content",error);
            toast.error("Error adding Content")
        }
    }
  return (
    <>
        <Toaster/>
        <div className="w-full h-screen flex justify-center items-center bg-indigo-50">
            <div className="w-96 p-6 border border-gray-200 rounded-xl shadow-md bg-white flex flex-col gap-4">
                <div className="text-center font-bold text-2xl text-gray-800">Post Content</div> 
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="text-gray-700 text-sm ml-1">
                        Title
                    </label>
                    <input ref={titleref} id="title" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all " type="text" placeholder="Enter Title" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="link" className="text-gray-700 text-sm ml-1">
                        Link
                    </label>
                    <input ref={linkref} id="link" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all" type="text" placeholder="Enter Link" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="tag" className="text-gray-700 text-sm ml-1">
                        Tags
                    </label>
                    <input ref={tagref} id="tag" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all" type="text" placeholder="Enter tags" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="type" className="text-gray-700 text-sm ml-1">Type</label>
                    <select ref={typeref}  name="content_type" id="type" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all" >
                        <option >--Select--</option>
                        <option  value="document">document</option>
                        <option value="tweet">tweet</option>
                        <option value="youtube">youtube</option>
                        <option value="link">link</option>
                    </select>
                </div>
                    
                <div className="mt-4">
                    <Button onClick={addcontent} text="Submit" variant="secondary" size="lg" />
                </div>
            </div>
        </div>
    </>
  )
}

export default AddContent