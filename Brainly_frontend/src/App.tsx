import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import DashBoard from "./Pages/DashBoard"
import AddContent from "./Pages/AddContent"




function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/addcontent" element={<AddContent/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
