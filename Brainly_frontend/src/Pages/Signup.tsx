import Button from "../components/Button"

const Signup = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-indigo-50">
        <div className="w-96 p-6 border border-gray-200 rounded-xl shadow-md bg-white flex flex-col gap-4">
            <div className="text-center ">
               <div className="font-bold text-2xl text-gray-800">Welcome to Second Brain</div> 
               <div className="text-base text-gray-800" >Signup to excess Content</div>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-gray-700 text-sm ml-1">
                    Username
                </label>
                <input id="username" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all " type="text" placeholder="Enter Username" />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-gray-700 text-sm ml-1">
                    Password
                </label>
                <input id="password" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all" type="text" placeholder="Enter Password" />
            </div>
            <div className="mt-4">
                <Button onClick={() => console.log("Submitted")} text="Submit" variant="secondary" size="lg" />
            </div>
        </div>
    </div>
  )
}

export default Signup