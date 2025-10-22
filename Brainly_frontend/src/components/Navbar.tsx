import Document from "../Icons/Document"
import Logo from "../Icons/Logo"
import Twitter from "../Icons/Twitter"
import Youtube from "../Icons/Youtube"


const Navbar = () => {
  return (
    <aside className="w-64 h-screen border-r border-gray-200 flex flex-col  ">
        <div className="flex items-center gap-2 p-4 border-b border-gray-100">
            <div><Logo/></div>
            <div className="font-semibold text-xl">Second Brain</div>
        </div>
        <nav className="flex flex-col p-4 gap-2 text-gray-700">
            <div className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors">
                <Twitter/>
                <button >Tweets</button>
            </div>
            <div className="flex items-center gap-5 p-3 rounded-md hover:bg-gray-100 transition-colors">
                <Youtube/>
                <button>Videos</button>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors">
                <Document/>
                <button>Documents</button>
            </div>           
        </nav>
    </aside>
  )
}

export default Navbar