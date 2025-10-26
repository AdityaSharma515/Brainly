import { useRef } from "react"
import Button from "../components/Button"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"


const Signin = () => {
    const usernameref=useRef<HTMLInputElement>(null)
    const passwordref=useRef<HTMLInputElement>(null)
    const navigation=useNavigate();
    async function signin(){
        const username=usernameref.current?.value;
        const password=passwordref.current?.value;
        if (!username||!password) {
            toast.error("Enter both the fields")
            console.error("Fields are empty");
            return;
        }
        try {
            const response=await axios.post("http://localhost:5001/api/v1/signin",{
                username,
                password
            })
            console.log(response.data.token)
            localStorage.setItem("token",response.data.token);
            toast.success("Signed in Succefuly")
            navigation("/dashboard");
        } catch (error) {
            toast.error("Failed to Sign in")
            console.error("Failed to Sign in",error);
        }
    }
  return (
    <>
        <Toaster position="top-right"/>
        <div className="w-full h-screen flex justify-center items-center bg-indigo-50">
            <div className="w-96 p-6 border border-gray-200 rounded-xl shadow-md bg-white flex flex-col gap-4">
                <div className="text-center ">
                <div className="font-bold text-2xl text-gray-800">Welcome to Second Brain</div> 
                <div className="text-base text-gray-800" >Signin to excess Content</div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-gray-700 text-sm ml-1">
                        Username
                    </label>
                    <input ref={usernameref} id="username" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all " type="text" placeholder="Enter Username" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-gray-700 text-sm ml-1">
                        Password
                    </label>
                    <input ref={passwordref} id="password" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all" type="text" placeholder="Enter Password" />
                </div>
                <div className="mt-4">
                    <Button onClick={signin} text="Submit" variant="secondary" size="lg" />
                </div>
            </div>
        </div>
    </>
  )
}

export default Signin