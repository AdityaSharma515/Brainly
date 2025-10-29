import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigation=useNavigate();
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
      <div className="text-2xl font-bold text-indigo-600">SecondBrain</div>

      <div className="flex gap-4">
        <button onClick={()=>navigation("/signin")} className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition">
          Sign In
        </button>
        <button onClick={()=>navigation("/signup")} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Navbar;
