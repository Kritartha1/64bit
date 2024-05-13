import { Link } from "react-router-dom";

const Navbar=()=>{
    return(
        <div>
        <div className="w-full h-24 flex p-2">
            <h2 className="text-3xl text-white ml-12 mt-2 font-bold mr-44">InterviewAI</h2>
        <div className="mt-4"><Link className="text-lg font-bold ml-96 text-white" to="/">Home</Link></div>
        <div className="mt-4"><Link className="text-lg font-bold ml-24 text-white">About Us</Link></div>
        <div className="mt-4"><Link className="text-lg font-bold ml-24 text-white" to="/login">Log in/Sign up</Link></div>
        </div>
        </div>
    )
}
export default Navbar;
