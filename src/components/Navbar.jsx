import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserData, logout } from "../reducers/authReducer";

const Navbar=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    useEffect(()=>{
        dispatch(getUserData({email:localStorage.getItem("email")}));
    },[])
    const handleLogout=()=>{
        dispatch(logout());
        navigate("/");
    }
    const userData=useSelector((state)=>state.auth.userData);
    return(
        <div>
        <div className="w-full h-24 flex p-2">
            <h2 className="text-3xl text-white ml-12 mt-2 font-bold mr-44">InterviewAI</h2>
        <div className="mt-4"><Link className="text-lg font-bold ml-96 text-white" to="/">Home</Link></div>
        <div className="mt-4"><Link className="text-lg font-bold ml-24 text-white">About Us</Link></div>
        {
                localStorage.getItem("jwt") ? 
<div className="">
<button class="peer px-5  text-white text-lg font-bold flex ml-12"><svg xmlns="
http://www.w3.org/2000/svg"
fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mt-3 mr-1">
<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg><p className="text-sm mt-4">{userData.firstName}</p></button>
<div class="hidden peer-hover:flex hover:flex
              w-[150px]
              flex-col bg-white drop-shadow-xl border-t-2 border-[#31cfe2]">
               
<button className="px-5 py-3 hover:bg-gray-100 text-black hover:font-bold" onClick={handleLogout}>Logout</button>
</div>
</div>
:  
<Link className="text-lg font-bold flex justify-end ml-24 text-white mt-4" to="/login"><svg xmlns="
http://www.w3.org/2000/svg"
fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mt-1 mr-1">
<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
              Sign In</Link>
              }
        {/* <div className="mt-4"><Link className="text-lg font-bold ml-24 text-white" to="/login">Log in/Sign up</Link></div> */}
        </div>
        </div>
    )
}
export default Navbar;
