import React from 'react';
import { useRef, useState } from "react";
import { ReactMic } from "react-mic";
import Webcam from "react-webcam";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import Navbar from "./Navbar";
import {TextField,Button} from "@mui/material"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const MainNew=()=> {

  const webcamRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const recorderControls = useAudioRecorder()
  const [blob,setBlob]=useState([]);
  const [visible,setVisible]=useState(false);
  const [editable,setEditable]=useState(false);
  const [recordings,setRecordings]=useState([]);
  const audioChunk=useRef([]);
  const [file,setFile]=useState(null);
  const mediaRecorderRef=useRef(null);
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };
  const startRecording = async() => {
    setVisible(true);
    const stream= await navigator.mediaDevices.getUserMedia({
      audio:true})
     
    const mediaRecorder=new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable=(e)=>{
      if(e.data.size>0){
        audioChunk.current.push(e.data);
      }
    }
    mediaRecorder.onstop=()=>{
      const audioBlob=new Blob(audioChunk.current,{type:'audio/wav'});
      console.log(audioBlob);
      setBlob(audioBlob);
      const audioUrl=URL.createObjectURL(audioBlob);
      setRecordings((prevRecs)=>[...prevRecs,audioUrl]);
    }
    mediaRecorderRef.current=mediaRecorder;
    mediaRecorder.start();
  };

  const stopRecording = () => {
    setVisible(false);
   if(mediaRecorderRef.current && mediaRecorderRef.current.state==="recording"){
     mediaRecorderRef.current.stop();
   }
  };

  const onData = recordedData => {
    console.log('Recorded data: ', recordedData);
  };

  const onStop = recordedData => {
    setAudioBlob(recordedData.blob);
  };
  const handleFile=(e)=>{
    const files=e.target.files[0];
    setFile(files);
  }
  const handleSubmit = async () => {
    var myBlob = new Blob([blob], {type : "audio/wav"});
    console.log(myBlob);
    console.log("Blob size:", myBlob.size);
    console.log("Blob type:", myBlob.type);
    const formData = new FormData();
    formData.append('audio', myBlob);
    console.log([...formData.entries()]);
    try {
        const response = await fetch('http://127.0.0.1:8000/convert-audio-to-text/', {
            method: 'POST',
            // headers:{
            //   "content-type": "multipart/form-data",
            // },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to convert audio to text');
        }

        const data = await response.json();
        console.log('Converted text:', data.text);
    } catch (error) {
        console.error('Error converting audio to text:', error.message);
    }
};
  const handleEdit=()=>{
    setEditable(true);
  }


  return (
    <div className='flex flex-row flex-wrap h-screen  justify-around bg-gradient-to-br  from-[#282f54] to-[#422f66] overflow-scroll' >

      <div className="bg-white-500 justify-between basis-2/4 h-128 my-auto  flex flex-col my-2  ">
        <div className="min-h-60 h-60 w-96 min-w-96 mx-auto " style={{background:"black"}}>
        <Webcam audio={false}  ref={webcamRef} className="w-full object-contain h-full"/>
          
        </div>
        <div className="mt-0.5 min-h-60 h-60 w-96 min-w-96 mx-auto" style={{background:"brown"}}>
        <img src="https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-3d-illustration-avatar-profile-man-png-image_9945214.png" className="w-full object-contain h-full"/>
        </div>

      </div>
      <div className="bg-black-500   justify-around h-128 basis-2/4 flex flex-col  my-auto mx-auto " >
        <div className="h-full lg:w-120 lg:mx-auto max-lg:w-96 max-[782px]:mt-4" style={{background:"brown"}}></div>
      {/* <div className="min-h-60 h-60 w-96 min-w-96 " style={{background:"black"}}></div>
        <div className="min-h-60 h-60 w-96 min-w-96" style={{background:"brown"}}></div> */}
      </div>



    </div>
  )
}

export default MainNew