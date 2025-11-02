import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import DashBoard from "./Pages/DashBoard"
import AddContent from "./Pages/AddContent"
import HomePage from "./Pages/HomePage"
import SharedBrain from "./Pages/SharedBrain"




function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/" element={<HomePage/>} />
        <Route path="/addcontent" element={<AddContent/>} />
        <Route path="/api/v1/brain/:share" element={<SharedBrain/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
