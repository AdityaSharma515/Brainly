import { useEffect, useState } from "react"
import Button from "../components/Button"
import Card from "../components/Card"
import Navbar from "../components/Navbar"
import AddIcon from "../Icons/AddIcon"
import ShareIcon from "../Icons/ShareIcon"
import axios from "axios"


const DashBoard = ()=> {
    function share() {
        
    }
    const [content,setcontent]=useState([])
    useEffect(()=>{
        async function fetchapi(){
            const response= await axios.get("http://localhost:5001/api/v1/content",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token") 
                }
            })
            setcontent(response.data)
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
                    <Button text="Add Content" variant="primary" size="md" onClick={()=>{console.log("hi there")}} StartIcon={<AddIcon/>} />
                    <Button text="Share Brain" variant="secondary" size="md" onClick={share} StartIcon={<ShareIcon/>}  />
                </div>
            </header>
            <div className="flex flex-wrap gap-8 ">
                {content.map((contents)=>(<Card type={contents.type} title={title} link={link} tags={tags} />))}
            </div>
        </div>
    </main>
  )
}

export default DashBoard