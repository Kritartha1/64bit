import Navbar from "./Navbar";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/authReducer";
const Login=()=>{
  const [data,setData]=useState({});
  const [emailValid,setEmailValid]=useState(false);
  const [message,setMessage]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const loginResponse=useSelector((state)=>state.auth.loginData);
  const rgExp=/^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/
  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value});
    if(rgExp.test(e.target.value))
        {
          setMessage("")
          setEmailValid(false);
        }
        
        else if(!rgExp.test(e.target.value))
        {
          setMessage("Email must be like test@example.com")
          setEmailValid(true);
        }
        else{
          setMessage("");
        }
  }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await dispatch(loginUser(data));
        if (localStorage.getItem("success")) {
          setTimeout(()=>{
            navigate("/");
          },2000)
        } 
    }
    return(
        <div className="w-full h-screen bg-gradient-to-br from-[#282f54] to-[#422f66]">
            <Navbar/>
        {/* <div className="relative">
            <div className="w-5/12 h-3/6 mx-auto my-auto rounded-md bg-white shadow-xl z-50 absolute top-32 left-96 bg-white">

            </div>
        </div> */}
        <div className="sm:w-6/12 lg:w-4/12 bg-white  rounded-xl shadow-xl mx-auto mt-12 p-4">
            <h2 className="text-2xl  font-bold mt-4">Sign in</h2>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={emailValid}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <p className="text-red-400 text-sm mx-auto mt-1">{message}</p>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className={` ${emailValid ? 'opacity-50 cursor-not-allowed hover:none' : ''} `}
              disabled={emailValid}
            >
              Sign In
            </Button>
            {loginResponse.success ? 
            <p className="text-green-600 mb-2">{loginResponse.message}</p> : <p className="text-red-600 mb-2">{loginResponse.message}</p>}
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signup" variant="body2" className="underline text-sky-600">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </div>
        </div>
    )
}
export default Login;