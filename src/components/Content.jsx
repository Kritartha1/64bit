import { Link } from "react-router-dom";

const Content = () => {
    return (
        <div className="w-full p-8 flex flex-col md:flex-row mt-24 items-center md:items-start">
            <div className="w-full md:w-6/12 lg:w-4/12 ml-0 md:ml-44 text-center md:text-left">
                <div className="text-4xl text-white">Schedule your mock interview with InterviewAI Today</div>
                <div className="flex mt-6 justify-center md:justify-start">
                    <Link className="px-8 py-2 rounded-full text-white text-lg bg-gradient-to-r from-[#28528d] to-[#31cfe2] hover:from-[#023a89] to-[#31cfe2]" to="/schedule">
                        Start Mock
                    </Link>
                    <button className="ml-4 md:ml-12 px-6 py-2 rounded-full text-white text-lg border-white border-2">
                        Join Interview
                    </button>
                </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-auto mt-8 md:mt-0 md:ml-12 flex justify-center md:justify-end">
                <img src="https://th.bing.com/th/id/OIP.Kxo6IQfCQCd1I-1FwAYRvwAAAA?rs=1&pid=ImgDetMain" className="rounded-xl" alt="Interview AI" />
            </div>
        </div>
    );
};

export default Content;
