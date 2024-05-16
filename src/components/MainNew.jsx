import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@mui/material';
import { getTokenOrRefresh } from './token_util';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
const speechsdk = require('microsoft-cognitiveservices-speech-sdk');

const MainNew = () => {
  const webcamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mic, setMic] = useState(0);
  const [cam, setCam] = useState(0);
  const [messages, setMessages] = useState([{ id: 1, text: 'Hello! What is your name?', from: 'bot' }]);
  const [recognizedText, setRecognizedText] = useState('');
  const [speechRecognizer, setSpeechRecognizer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [interviewTime, setInterviewTime] = useState(300); // Example interview duration in seconds
  const [timeLeft, setTimeLeft] = useState(interviewTime);
  const [showSpeakButton, setShowSpeakButton] = useState(true);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (speechRecognizer) {
        speechRecognizer.close();
      }
    };
  }, [speechRecognizer]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleMic = () => setMic(1 - mic);
  const handleCam = () => setCam(1 - cam);

  const handleSendMessage = () => {
    if (recognizedText.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: recognizedText, from: 'user' },
      ]);
      setRecognizedText('');
      setShowSpeakButton(true);
      // Simulate bot response after user sends a message
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, text: 'Nice to meet you! How can I help you today?', from: 'bot' },
        ]);
      }, 1000);
    }
  };

  async function sttFromMic() {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
    speechConfig.speechRecognitionLanguage = 'en-US';
    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    setSpeechRecognizer(recognizer);
    setRecognizedText('');
    setIsRecording(true);

    recognizer.startContinuousRecognitionAsync();
    recognizer.recognizing = (s, e) => {
     // setRecognizedText((prevText) => prevText + ' ' + e.result.text);
    };

    recognizer.recognized = (s, e) => {
      if (e.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
         setRecognizedText((prevText) => prevText + ' ' + e.result.text);
      } else if (e.result.reason === speechsdk.ResultReason.NoMatch) {
        setRecognizedText('No speech could be recognized.');
      }
    };

    recognizer.canceled = (s, e) => {
      if (e.reason === speechsdk.CancellationReason.Error) {
        console.error(`Error: ${e.errorDetails}`);
      }
      recognizer.stopContinuousRecognitionAsync();
    };

    recognizer.sessionStopped = () => {
      recognizer.stopContinuousRecognitionAsync();
    };
  }

  const handleStop = () => {
    if (speechRecognizer) {
      speechRecognizer.stopContinuousRecognitionAsync(() => {
        setIsRecording(false);
        setShowSpeakButton(false);
        if (recognizedText.trim() !== '') {
          setMessages((prevMessages) => [
            ...prevMessages,
            { id: prevMessages.length + 1, text: recognizedText, from: 'user' },
          ]);
        }
      });
    }
  };

  const handleEdit = () => {
    const lastUserMessageIndex = messages.findIndex((message) => message.from === 'user');
    if (lastUserMessageIndex !== -1) {
      setIsEditing(true);
      setRecognizedText(messages[lastUserMessageIndex].text); // Set recognized text to the last user message
      setMessages((prevMessages) => {
        const editedMessages = [...prevMessages];
        editedMessages[lastUserMessageIndex] = {
          ...editedMessages[lastUserMessageIndex],
          editable: true // Mark the message as editable
        };
        return editedMessages;
      });
    }
  };
  
  const handleSaveEdit = () => {
    const lastUserMessageIndex = messages.findIndex((message) => message.editable === true);
    if (lastUserMessageIndex !== -1) {
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, lastUserMessageIndex), // Keep messages before the edited one
        { ...prevMessages[lastUserMessageIndex], text: recognizedText, editable: undefined }, // Update the edited message
        ...prevMessages.slice(lastUserMessageIndex + 1) // Keep messages after the edited one
      ]);
      setIsEditing(false);
    }
  };

  return (
    <div className="relative z-10 flex flex-row flex-wrap h-screen justify-around bg-gradient-to-br bg-[#282F54] overflow-hidden">
      <div className="max-md:mt-[3.5rem] bg-white-500 justify-between basis-2/4 h-128 my-auto flex flex-col my-2">
        <div className="relative rounded min-h-60 h-60 w-96 min-w-96 mx-auto" style={{ background: 'black' }}>
          <Webcam audio={false} ref={webcamRef} className="w-full object-cover h-full" />
          <div className="absolute flex flex-inline bottom-3 left-[43%]">
            {mic === 1 ? (
              <div className="mx-3" onClick={handleMic}>
                <img
                  width="16"
                  height="16"
                  src="https://img.icons8.com/tiny-color/16/microphone.png"
                  alt="microphone"
                />
              </div>
            ) : (
              <div className="mx-3" onClick={handleMic}>
                <img
                  width="16"
                  height="16"
                  src="https://img.icons8.com/tiny-color/16/block-microphone.png"
                  alt="block-microphone"
                />
              </div>
            )}
            {cam === 1 ? (
              <div onClick={handleCam}>
                <img
                  width="18"
                  height="18"
                  src="https://img.icons8.com/ios-filled/50/228BE6/video-call.png"
                  alt="video-call"
                />
              </div>
            ) : (
              <div onClick={handleCam}>
                <img width="18" height="18" src="https://img.icons8.com/color-glass/48/no-video.png" alt="no-video" />
              </div>
            )}
          </div>
          <div className="absolute -top-14 left-[34%] w-[6rem] p-[6px] m-[6px] rounded-xl border-[0.5px] border-white bg-[#050505]/[0.35]">
            <div className="text-white">{new Date(timeLeft * 1000).toISOString().substr(11, 8)}</div>
          </div>
        </div>
        <div className="relative rounded mt-0.5 min-h-60 h-60 w-96 min-w-96 mx-auto bg-[#2A2D3F]">
          <div className="absolute top-[30%] left-[40%] bg-[#45E856] blur-3xl h-20 w-20"></div>
          <img
            src="https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-3d-illustration-avatar-profile-man-png-image_9945214.png"
            className="relative w-full object-contain h-full"
          />
        </div>
      </div>
      <div className="bg-black-500 relative justify-around h-128 basis-2/4 flex flex-col my-auto mx-auto">
        <div className="overflow-y-auto flex flex-col rounded h-full lg:w-120 lg:mx-auto max-lg:w-96 max-[782px]:mt-4 z-10 bg-[#2A2D3F] p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-2 m-2 rounded ${message.from === 'bot' ? 'bg-gray-200' : 'bg-blue-200'}`}
              contentEditable={message.editable}
            >
              {message.text}
            </div>
          ))}
          <div ref={chatEndRef}></div>
          <div className="flex mt-auto">
            {isRecording ? (
              <>
                <div className="flex-1 bg-gray-100 p-2 rounded" aria-placeholder='speak into your microphone'>{recognizedText}</div>
                <Button onClick={handleStop} variant="contained" color="secondary">
                  Stop
                </Button>
              </>
            ) : (
              <>
                {showSpeakButton && (
                  <Button onClick={sttFromMic} variant="contained" color="primary">
                    Speak Answer
                  </Button>
                )}
                {!showSpeakButton && recognizedText && (
                  <>
                    <Button onClick={handleEdit} variant="contained" color="primary">
                      Edit
                    </Button>
                    <Button onClick={handleSendMessage} variant="contained" color="primary">
                      Submit
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNew;
