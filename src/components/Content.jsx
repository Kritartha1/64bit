import { Link } from "react-router-dom";

const Content=()=>{
    return(
        <div className="w-full p-8 flex mt-24">
            <div className="w-4/12 ml-32">
                <div className="text-4xl text-white">Schedule your mock interview with InterviewAI today</div>
                <div className="flex mt-6">
                    <Link className="ml-12 px-8 py-2 rounded-full text-white text-lg bg-gradient-to-r from-[#28528d] to-[#31cfe2] hover:from-[#023a89] to-[#31cfe2]" to="/schedule">Start Mock</Link>
                    <button className="ml-12 px-6 py-2 rounded-full text-white text-lg border-white border-2">Join Interview</button>
                </div>              
            </div>
            
                <img src="https://th.bing.com/th/id/OIP.Kxo6IQfCQCd1I-1FwAYRvwAAAA?rs=1&pid=ImgDetMain" className="rounded-xl ml-12"/>   
           
        </div>
    )
}
export default Content;