import { useRef, useState } from "react";
import { ReactMic } from "react-mic";
import Webcam from "react-webcam";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import Navbar from "./Navbar";
import React, {  useEffect } from 'react';
import { getTokenOrRefresh } from './token_util';
import MicIcon from '@mui/icons-material/Mic';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import {TextField,Button} from "@mui/material"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
const speechsdk = require('microsoft-cognitiveservices-speech-sdk');

const Main=()=>{
  const [displayText, setDisplayText] = useState('INITIALIZED: ready to test speech...');
    const [speechRecognizer, setSpeechRecognizer] = useState(null);
    const [recognizedText, setRecognizedText] = useState('');
    
    useEffect(() => {
        return () => {
            if (speechRecognizer) {
                speechRecognizer.close();
            }
        }
    }, [speechRecognizer]);

    async function sttFromMic() {
        const tokenObj = await getTokenOrRefresh();
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'en-US';      
        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        setSpeechRecognizer(recognizer);
        setDisplayText('Speak into your microphone...');

        recognizer.startContinuousRecognitionAsync();
        recognizer.recognizing = (s, e) => {
            console.log(`RECOGNIZING: Text=${e.result.text}`);
        };
        
        recognizer.recognized = (s, e) => {
            if (e.result.reason === ResultReason.RecognizedSpeech) {
                console.log(`RECOGNIZED: Text=${e.result.text}`);
                setRecognizedText(prevText => prevText + ' ' + e.result.text);
            } else if (e.result.reason === ResultReason.NoMatch) {
                console.log("NOMATCH: Speech could not be recognized.");
            }
        };

        recognizer.canceled = (s, e) => {
            console.log(`CANCELED: Reason=${e.reason}`);
            if (e.reason === speechsdk.CancellationReason.Error) {
                console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
                console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
                console.log("CANCELED: Did you set the speech resource key and region values?");
            }
            recognizer.stopContinuousRecognitionAsync();
        };

        recognizer.sessionStopped = (s, e) => {
            console.log("\n    Session stopped event.");
            recognizer.stopContinuousRecognitionAsync();
        };
    }

    const handleStop = () => {
        if (speechRecognizer) {
            speechRecognizer.stopContinuousRecognitionAsync(
                () => {
                    console.log("Recognition stopped.");
                    setDisplayText("Recognition stopped.");
                },
                (err) => {
                    console.error("Error stopping recognition: ", err);
                }
            );
        }
    };

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
            <button className="fas fa-microphone fa-lg mr-2" onClick={() => sttFromMic()}><MicIcon/></button>
                    <button onClick={handleStop}>Stop</button>
            <div className="w-6/12  rounded-xl shadow-2xl shadow-[#5e8d8d] bg-white ml-40 mt-12 flex justify-center">
            <img src="https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-3d-illustration-avatar-profile-man-png-image_9945214.png" className="w-10/12"/>
            </div>
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
          value={recognizedText}
          multiline
          rows={4}
          placeholder="Your Answer..."
          disabled={!editable}
          className="bg-white w-11/12 rounded-xl mt-12"
        /></div>
        <div className="mt-6">
         <Button variant="contained"className="" onClick={handleEdit}>Edit Answer</Button>
         </div>

         <div className="mt-8">
           <Button variant="contained" type="submit">Submit</Button>
         </div>
              </form>
            </div>
          
          </div>
        </div>
        </div>
    )
}
export default Main;