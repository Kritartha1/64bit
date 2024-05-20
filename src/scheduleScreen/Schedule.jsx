import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const Schedule=()=>{
    const navigate=useNavigate();
    const handleChange=()=>{

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        navigate("/interview")
    }
    return(
        <div className="w-full h-screen bg-gradient-to-br from-[#282f54] to-[#422f66]">
            <Navbar/>
            <div className="w-full">
                <h2 className="text-3xl text-white font-bold mt-24  flex justify-center">Create Interview</h2>
                <form onSubmit={handleSubmit} className="w-full" method="POST">
                <div className="w-4/12 h-32 rounded-xl bg-white  mx-auto mt-10 p-4 px-6 ">
                    <div className="text-lg   ml-4 mr-12 font-sans font-bold">Select Technology:</div>
                  
                    <FormControl  className="mt-6" fullWidth>
                        <InputLabel id="demo-simple-select-label">Technology</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                        
                            label="Technology"
                            onChange={handleChange}
                        >
                            <MenuItem value="Java">Java</MenuItem>
                            <MenuItem value="Reactjs">ReactJs</MenuItem>
                            <MenuItem value="Angular">Angular</MenuItem>
                            <MenuItem value=".NET">.NET</MenuItem>
                        </Select>
                        </FormControl>
                        
                        
                </div>
                <button className="mt-6  px-8 py-2 rounded-full text-white text-lg bg-gradient-to-r from-[#28528d] to-[#31cfe2] hover:from-[#023a89] to-[#31cfe2]" type="submit">Start Interview</button>
                </form>
            </div>
        </div>
    )
}
export default Schedule;