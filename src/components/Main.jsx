import { useRef, useState } from "react";
import { ReactMic } from "react-mic";
import Webcam from "react-webcam";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import Navbar from "./Navbar";
import {TextField,Button} from "@mui/material"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const Main=()=>{
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
    return(
        <div className="w-full h-screen  bg-gradient-to-br from-[#282f54] to-[#422f66]">
          
          <div className="flex">
            <div className="w-6/12 ml-10 mt-12">
            <Webcam audio={false}  ref={webcamRef} className="ml-40  rounded-xl w-6/12 shadow-2xl shadow-[#72738b]"/>
            <div className="w-6/12  rounded-xl shadow-2xl shadow-[#5e8d8d] bg-white ml-40 mt-12 flex justify-center">
            <img src="https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-3d-illustration-avatar-profile-man-png-image_9945214.png" className="w-10/12"/>
            </div>
            {/* <div className="mt-4">
            <button onClick={startRecording} hidden={visible} className="text-white mr-4 px-4 py-2 bg-green-700 rounded-xl">Start Recording</button>
      <button onClick={stopRecording} hidden={!visible} className="text-white px-4 py-2 bg-red-700 rounded-xl">Stop Recording</button> */}
      {/* <input type="file" name="audio" onChange={handleFile}/> */}
      {/* <ReactMic
        record={isRecording}
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="white"
        className="w-44 flex mx-auto my-4"
      />  */}
      {/* <AudioRecorder 
        onRecordingComplete={(blob) => setAudioBlob(blob)}
        recorderControls={recorderControls}
        className=""
      />
      <button onClick={recorderControls.stopRecording}>Stop recording</button> */}
      {/* {recordings.map((rec,index)=>{
        return(
          <div key={index} className="my-4">
            <audio controls src={rec}/>
            </div>
        )
      })} */}
      
            
          </div>
          
          <div className="w-5/12 h-6/6 rounded-xl shadow-2xl shadow-[#5e8d8d] mx-2 mt-10 bg-stone-700 mr-10">
            <div className="w-full h-5/6 p-1">
              <form method="POST" onSubmit={handleSubmit} className="mt-6">
              <TextField
          id="multiline-static"
         
          multiline
          rows={4}
          defaultValue="Question"
          disabled
          className="bg-white mt-24 w-11/12 rounded-xl"
        />
        <div className="mt-10">
         <TextField
          id="multiline-static"
         
          multiline
          rows={4}
          defaultValue="Answer"
          disabled={!editable}
          className="bg-white w-11/12 rounded-xl mt-12"
        /></div>
        <div className="mt-6">
         <Button variant="contained"className="" onClick={handleEdit}>Edit Answer</Button>
         </div>
              </form>
            </div>
          <div className="w-full flex">
          <button onClick={startRecording} hidden={visible} className="ml-36 text-white mr-4 px-4 py-2 bg-green-700 rounded-xl flex justify-left">Start Recording</button>
          <button onClick={stopRecording} hidden={!visible} className="text-white px-4 py-2 bg-red-700 rounded-xl">Stop Recording</button>
          </div>
          </div>
        </div>
        </div>
    )
}
export default Main;