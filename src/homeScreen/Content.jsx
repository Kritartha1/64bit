import { Link } from "react-router-dom";
import photo from '../assets/hand.png';

const Content = () => {
    return (
        <div className="relative w-full max-[874px]:flex-col max-[874px]:relative p-8 flex   mt-24 items-center md:items-start">
            <div className="z-10 basis-2/4  w-full min-[874px]:w-6/12 lg:w-4/12 ml-0  text-center min-[874px]:text-left">
                <div className=" text-[41px]/[45px] font-bold text-center text-white">Schedule your mock interview with InterviewAI today</div>
                <div className="flex mt-6 justify-evenly ">
                    <Link className="px-8 py-2 rounded-full text-white text-lg bg-gradient-to-r from-[#28528d] to-[#31cfe2] hover:from-[#023a89] to-[#31cfe2]" to="/schedule">
                        Start Mock
                    </Link>
                    <button className="ml-4 md:ml-12 px-6 py-2 rounded-full text-white text-lg border-white border-2">
                        Join Interview
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Content;
