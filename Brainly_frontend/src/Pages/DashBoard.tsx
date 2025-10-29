import { useEffect, useState } from "react"
import Button from "../components/Button"
import Card from "../components/Card"
import Navbar from "../components/Sidebar"
import AddIcon from "../Icons/AddIcon"
import ShareIcon from "../Icons/ShareIcon"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { DialogShare } from "@/components/Dialog"



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
    function share() {
        <DialogShare/>
    }
    const [content,setcontent]=useState<CardProps[]>([])
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
    },[])

  return (
    <main className="flex min-h-screen bg-gray-50">
        <Navbar/>
        <div className="flex flex-col flex-1 p-6">
            <header className="flex items-center justify-between mb-6">
                <div className="text-2xl font-semibold text-gray-800">All Notes</div>
                <div className="flex gap-3">
                    <Button text="Add Content" variant="primary" size="md" onClick={()=>navigation("/addcontent")} StartIcon={<AddIcon/>} />
                    <Button text="Share Brain" variant="secondary" size="md" onClick={share} StartIcon={<ShareIcon/>}  />
                </div>
            </header>
            <div className="flex flex-wrap gap-8 ">
                {content.map((contents,index)=>(<Card key={index} type={contents.type} title={contents.title} tags={contents.tags} link={contents.link} />))}
            </div>
        </div>
    </main>
  )
}

export default DashBoard