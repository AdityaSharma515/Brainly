import { useEffect, useState } from "react"
import Card from "../components/Card"
import Navbar from "../components/Sidebar"
import axios from "axios"
import { useParams } from "react-router-dom"


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

const SharedBrain = ()=> {
    const [content,setcontent]=useState<CardProps[]>([])
    const param= useParams<string>();
    const share=param.share;
    console.log(share);
    useEffect(()=>{
        async function fetchapi(){
            const response= await axios.get(`http://localhost:5001/api/v1/brain/${share}`,{
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
            </header>
            <div className="flex flex-wrap gap-8 ">
                {content.map((contents,index)=>(<Card key={index} type={contents.type} title={contents.title} tags={contents.tags} link={contents.link} />))}
            </div>
        </div>
    </main>
  )
}

export default  SharedBrain
