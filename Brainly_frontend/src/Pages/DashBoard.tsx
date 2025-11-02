import { useEffect, useState } from "react"
import Button from "../components/Button"
import Card from "../components/Card"
import Navbar from "../components/Sidebar"
import AddIcon from "../Icons/AddIcon"
import ShareIcon from "../Icons/ShareIcon"
import axios from "axios"
import { useNavigate } from "react-router-dom"

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

const DashBoard = ()=> {
    const navigation=useNavigate();
    const [content,setcontent]=useState<CardProps[]>([])
    const [open,setopen]=useState<boolean>(false)
    const [share,setshare]=useState<boolean>(false)
    const [link,Setlink]=useState<string>("")
    useEffect(()=>{
        async function fetchapi(){
            const response= await axios.get("http://localhost:5001/api/v1/content",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token") 
                }
            })
            setcontent(response.data.content)
        }
        fetchapi()
    },[share])
    useEffect(()=>{
        async function fetchapi(){
            const response= await axios.post("http://localhost:5001/api/v1/brain/share",{
                share:share,
            },
            {
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token") 
                },
            })
            Setlink(response.data.shareablelink)
        }
        fetchapi()
        return
    },[share])
  return (
    <main className="flex min-h-screen bg-gray-50">
        <Navbar/>
        <div className="flex flex-col flex-1 p-6">
            <header className="flex items-center justify-between mb-6">
                <div className="text-2xl font-semibold text-gray-800">All Notes</div>
                <div className="flex gap-3">
                    <Button text="Add Content" variant="primary" size="md" onClick={()=>navigation("/addcontent")} StartIcon={<AddIcon/>} />
                    <Button text="Share Brain" variant="secondary" size="md" onClick={()=>{return setopen(true),setshare(true)}} StartIcon={<ShareIcon/>}  />
                </div>
            </header>
            <div className="flex flex-wrap gap-8 ">
                {content.map((contents,index)=>(<Card key={index} type={contents.type} title={contents.title} tags={contents.tags} link={contents.link} />))}
            </div>
        </div>
        {open&& (
        <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50 ">
          {/* Dialog Box */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Share the Link </h2>
            <p className="text-gray-600 mb-4 p-2 border border-indigo-200 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-2 focus:outline-indigo-500 ">
              {link}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setopen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-2 focus:outline-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default DashBoard