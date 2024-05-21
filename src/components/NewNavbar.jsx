import $ from 'jquery'
import { useState } from 'react';
import { useEffect } from 'react';

const NewNavbar = () => {

    let characters;
    let index =0;

    useEffect(()=>{
        characters = document.getElementById("logo").querySelectorAll('p')
        console.log(characters);
        setTimeout(()=>{startanimating()},1000)
    },[])

    function startanimating(){
        characters[(index-1+characters.length)%characters.length]?.classList.remove("font-bold","text-blue-600","text-4xl")
        characters[index]?.classList.add("font-bold","text-blue-600","text-4xl")
        index = (index+1)%characters.length;
        setTimeout(()=>{startanimating()},300)
    }

    return (
        <div id="navbar" className="w-screen flex fixed top-0 left-0 z-[1000]">
            <div className='mx-auto flex '>
                <div className='my-[29px] w-[150px] text-lg text-white hover:cursor-pointer flex flex-col group/baap'>
                    <button className='text-md group-hover/baap:text-xl transition-all duration-400'>Schedule Now</button>
                    <div className='w-0 ms-[15px] h-[2px] bg-gradient-to-r from-red-500 to-indigo-500 group-hover/baap:w-[120px] shadow-[0_35px_35px_rgba(255,255,255,1)] transition-all duration-400'></div>
                </div>
                <div className='my-[29px] w-[150px] text-lg text-white hover:cursor-pointer flex flex-col group/baap'>
                    <button className='text-md group-hover/baap:text-xl transition-all duration-400'>Start Mock</button>
                    <div className='w-0 ms-[25px] h-[2px] bg-gradient-to-r from-red-500 to-indigo-500 group-hover/baap:w-[100px] transition-all duration-400'></div>
                </div>

                <div id="logo" className='flex mx-auto hover:cursor-pointer text-white text-2xl py-6'>
                    <p className='my-auto transtion-all duration-200'>D</p>
                    <p className='my-auto transtion-all duration-200'>O</p>
                    <p className='my-auto transtion-all duration-200'>R</p>
                    <p className='my-auto transtion-all duration-200'>A</p>
                    <p className='my-auto transtion-all duration-200'>E</p>
                    <p className='my-auto transtion-all duration-200'>M</p>
                    <p className='my-auto transtion-all duration-200'>O</p>
                    <p className='my-auto transtion-all duration-200'>N</p>
                </div>
                
                
                <div className='my-[29px] w-[150px] text-lg text-white hover:cursor-pointer flex flex-col group/baap'>
                    <button className='text-md group-hover/baap:text-xl transition-all duration-400'>Insights</button>
                    <div className='w-0 ms-[35px] h-[2px] bg-gradient-to-r from-red-500 to-indigo-500 group-hover/baap:w-[80px] transition-all duration-400'></div>
                </div>
                <div className='my-[29px] w-[150px] text-lg text-white hover:cursor-pointer flex flex-col group/baap'>
                    <button className='text-md group-hover/baap:text-xl transition-all duration-400'>Profile</button>
                    <div className='w-0 ms-[40px] h-[2px] bg-gradient-to-r from-red-500 to-indigo-500 group-hover/baap:w-[70px] transition-all duration-400'></div>
                </div>
            </div>
        </div>
    )
}
export default NewNavbar;
