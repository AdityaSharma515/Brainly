import Button from "../components/Button"
import Card from "../components/Card"
import Navbar from "../components/Navbar"
import AddIcon from "../Icons/AddIcon"
import ShareIcon from "../Icons/ShareIcon"

const DashBoard = () => {
  return (
    <main className="flex min-h-screen bg-gray-50">
        <Navbar/>
        <div className="flex flex-col flex-1 p-6">
            <header className="flex items-center justify-between mb-6">
                <div className="text-2xl font-semibold text-gray-800">All Notes</div>
                <div className="flex gap-3">
                    <Button text="Add Content" variant="primary" size="md" onClick={()=>{console.log("hi there")}} StartIcon={<AddIcon/>} />
                    <Button text="Share Brain" variant="secondary" size="md" onClick={()=>{console.log("hi there")}} StartIcon={<ShareIcon/>}  />
                </div>
            </header>
            <div className="flex flex-wrap gap-8 ">
                <Card type="twitter" title="React Tips" tags={["react", "hooks"]} />
                <Card type="youtube" title="Frontend Simplified" tags={["ui", "nextjs"]} />
                <Card type="document" title="Notes Summary" tags={["notes", "study"]} />
                <Card type="twitter" title="Dev Thread" tags={["javascript", "api"]} />
                <Card type="youtube" title="TypeScript Deep Dive" tags={["typescript"]} />
            </div>
        </div>
    </main>
  )
}

export default DashBoard