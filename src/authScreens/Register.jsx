import Navbar from "../components/Navbar";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import {registerUser} from "../reducers/authReducer"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const Register=()=>{
  const dispatch=useDispatch();
  const [data,setData]=useState({});
  const [message,setMessage]=useState("");
  const [message1,setMessage1]=useState("");
  const [message2,setMessage2]=useState("");
  const [valid,setValid]=useState(true);
  const [valid1,setValid1]=useState(true);
  const navigate=useNavigate();
  const [firstNameValid,setFirstNameValid]=useState(false);
  const [lastNameValid,setLastNameValid]=useState(false);
  const [emailValid,setEmailValid]=useState(false);
  const signupResponse=useSelector((state)=>state.auth.user);
  const regEx1=/^[a-zA-Z.' ]{1,}$/;
  const handleChange1=(e)=>{
    setData({ ...data, [e.target.name]: e.target.value });
      if(regEx1.test(e.target.value))
      {
        setMessage1("")
        setFirstNameValid(false);
       
      }
      
      else if(!regEx1.test(e.target.value))
      {
        setMessage1("First Name contains alphabets")
        setFirstNameValid(true);
      }
      else{
        setMessage1("");
      }
  }
  const handleChange2=(e)=>{
    setData({ ...data, [e.target.name]: e.target.value });
      if(regEx1.test(e.target.value))
      {
        setMessage2("")
        setLastNameValid(false);
       
      }
      
      else if(!regEx1.test(e.target.value))
      {
        setMessage2("Last Name contains alphabets")
        setLastNameValid(true);
      }
      else{
        setMessage2("");
      }
  }
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
  const handleChange3=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
    setValid1(
        
        /[a-z]/.test(e.target.value) && 
        /[A-Z]/.test(e.target.value) && 
        /[0-9]/.test(e.target.value)  &&
        e.target.value.length >= 8  
      );
      if(/[a-z]/.test(e.target.value) && 
      /[A-Z]/.test(e.target.value) && 
      /[0-9]/.test(e.target.value)  &&
      e.target.value.length >= 8){
        setValid(true);
      }
      else setValid(false);
} 
const handleValidation=()=>{
  if(firstNameValid==false && lastNameValid==false && emailValid==false && valid1==false)
      return true;
    else return false;
}
    const handleSubmit=async(e)=>{
        e.preventDefault();
       await dispatch(registerUser(data));
       console.log(localStorage.getItem("signup"));
      if(localStorage.getItem("signup")==="true"){
        setTimeout(()=>{
            navigate("/login");
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
    <div className="sm:w-6/12 lg:w-4/12 bg-white rounded-xl shadow-2xl mx-auto mt-12 p-4">
        <h2 className="text-2xl  font-bold mt-4">Sign Up</h2>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
                <TextField
                  error={firstNameValid}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus 
                  onChange={handleChange1}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={lastNameValid}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange2}
                />
              </Grid>
              <div className="flex">
              <p className="text-red-400 text-sm ml-6 mr-2">{message1}</p>
              <p className="text-red-400 text-sm">{message2}</p>
              </div>
              
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
            <p className="text-red-400 text-sm">{message}</p>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!valid1}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={handleChange3}
            />
          </Grid>
          {valid1 ? <div className="mt-2">
                    <p className="text-xs text-green-500 italic"> 
         
        </p>
                </div>:<div className="mt-2">
                    <p className="text-xs text-red-500 italic"> 
          Password should be at least 8 characters long and contain lowercase
          letters, uppercase letters, and numbers.
        </p>
                </div>
                }
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          className={` ${firstNameValid || lastNameValid || emailValid || !valid1 ? 'opacity-50 cursor-not-allowed hover:none' : ''} `}
          disabled={firstNameValid || lastNameValid || emailValid || !valid1}
        >
          Sign Up
        </Button>
        {signupResponse.success ? 
            <p className="text-green-600 mb-2">{signupResponse.message}</p> : <p className="text-red-600 mb-2">{signupResponse.message}</p>}
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login" variant="body2" className="text-sky-600 underline">
              Already have an account? Sign In
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
    </div>
    )
}
export default Register;