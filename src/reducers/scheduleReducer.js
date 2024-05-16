import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const schedule=createAsyncThunk("schedule",async(data,{rejectWithValue})=>{
    const response=await fetch("http://127.0.0.1:8000/interview/schedule",{
        method:"POST",
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
    });
    try{
        const result=await response.json();
        localStorage.setItem("signup",result.success)
        console.log(result);
        return result;
    } catch(error){
            rejectWithValue(error);
    }
})
const scheduleSlice=createSlice({
    name:"scheduleSlice",
    initialState:{
       scheduleData:[]
    },
    extraReducers: builder=>{
        builder.addCase(schedule.pending,(state)=>{
                 state.isLoading=true;
             })
        .addCase(schedule.fulfilled,(state,action)=>{
                 state.isLoading=false;
                 state.scheduleData=(action.payload);
         })
         .addCase(schedule.rejected,(state,action)=>{
             state.isLoading=false;
             state.error=action.payload;
         })
    }
})
export default scheduleSlice.reducer;