import { Link } from "react-router-dom";
// import photo from '../assets/hand.png';

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
            <div className="relative  basis-2/4 justify-center w-full min-[874px]:w-6/12 lg:w-auto mt-8 min-[874px]:mt-0 min-[874px]:ml-12 flex max-[874px]:w-full ">

               
                {/* <img src={photo} className="z-10 absolute -scale-x-100  max-[874px]:relative  max-[874px]:top-[-1rem] top-[-6rem] rounded-xl" alt="Interview AI" /> */}
                <div className='z-0 absolute top-[30%] min-[874px]:left-[72px] max-[874px]:left-[20%] bg-[#D9D9D9] blur-3xl h-[10rem] w-[10rem]'></div>
           

                
            
            
                
                {/* <img src="https://th.bing.com/th/id/OIP.Kxo6IQfCQCd1I-1FwAYRvwAAAA?rs=1&pid=ImgDetMain" className="rounded-xl" alt="Interview AI" /> */}
            </div>


            <div className="mx-[29%] absolute w-[50%] h-[200px] bg-[#4756A5]/[79%] blur-3xl z-0"></div>

            <div className="mx-[29%] top-[59%]  absolute w-[50%] h-[300px] bg-[#DF33E2]/[31%] blur-3xl z-0"></div>

        </div>
    );
};

export default Content;
