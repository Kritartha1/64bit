import Content from "./Content";
import Navbar from "./Navbar";
import NewHomeBackgrounnd from "./newHome";

const Home=()=>{
    return(
        <div className="flex flex-col">
            <div className="w-full min-h-screen overflow-x-hidden flex flex-col z-50 fixed top-0 left-0">
                <Navbar/>
                <Content/>
            </div>
            <NewHomeBackgrounnd className="fixed top-0 left-0"/>
        </div>
    )
}
export default Home;