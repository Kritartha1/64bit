import Content from "./Content";
import Navbar from "./Navbar";

const Home=()=>{
    return(
        <div className="w-full h-screen bg-gradient-to-br from-[#282f54] to-[#422f66]">
            <Navbar/>
            <Content/>
        </div>
    )
}
export default Home;