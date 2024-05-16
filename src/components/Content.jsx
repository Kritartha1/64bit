import { Link } from "react-router-dom";

const Content = () => {
    return (
        <div className="w-full p-4 sm:p-8 flex flex-col sm:flex-row mt-12 sm:mt-24">
            <div className="w-full sm:w-4/12 sm:ml-32 mb-8 sm:mb-0">
                <div className="text-2xl sm:text-4xl text-white">Schedule your mock interview with InterviewAI today</div>
                <div className="flex flex-col sm:flex-row mt-4 sm:mt-6">
                    <Link className="px-6 sm:px-8 py-2 rounded-full text-white text-lg bg-gradient-to-r from-[#28528d] to-[#31cfe2] hover:from-[#023a89] hover:to-[#31cfe2] mb-4 sm:mb-0 sm:mr-6" to="/schedule">Start Mock</Link>
                    <button className="px-6 py-2 rounded-full text-white text-lg border-white border-2">Join Interview</button>
                </div>
            </div>
            <div className="flex justify-center sm:justify-start w-full sm:w-auto">
                <img src="https://th.bing.com/th/id/OIP.Kxo6IQfCQCd1I-1FwAYRvwAAAA?rs=1&pid=ImgDetMain" className="rounded-xl sm:ml-12" alt="Interview" />
            </div>
        </div>
    );
}

export default Content;
