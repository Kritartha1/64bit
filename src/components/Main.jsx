import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { getTokenOrRefresh } from './token_util';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import { TextField, Button } from "@mui/material";
const speechsdk = require('microsoft-cognitiveservices-speech-sdk');

const Main = () => {
    const [displayText, setDisplayText] = useState('INITIALIZED: ready to test speech...');
    const [speechRecognizer, setSpeechRecognizer] = useState(null);
    const [recognizedText, setRecognizedText] = useState('');
    const [showSpeakButton, setShowSpeakButton] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const [editable, setEditable] = useState(false);

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
        setIsRecording(true);
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
        setIsRecording(false);
        setShowSpeakButton(false);
    };

    const webcamRef = useRef(null);

    const handleSubmit = () => {
       
    };

    const handleEdit = () => {
        setEditable(true);
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-[#282f54] to-[#422f66] flex items-center">
            <div className="flex flex-col md:flex-row w-full h-full">
                <div className="w-full md:w-6/12 p-4 md:p-10 flex flex-col items-center justify-center">
                    <Webcam 
                        audio={false} 
                        ref={webcamRef} 
                        className="rounded-xl w-11/12 md:w-6/12 shadow-2xl shadow-[#72738b]" 
                    />
                    <div className="w-11/12 md:w-6/12 rounded-xl shadow-2xl shadow-[#5e8d8d] bg-white mt-12 flex justify-center">
                        <img 
                            src="https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-3d-illustration-avatar-profile-man-png-image_9945214.png" 
                            className="w-10/12" 
                        />
                    </div>
                </div>
                <div className="w-full md:w-5/12 h-full mt-8 rounded-xl shadow-2xl shadow-[#5e8d8d] bg-stone-700 p-4 md:mr-10 flex flex-col justify-center">
                    <form method="POST" onSubmit={handleSubmit} className="flex flex-col justify-center w-full">
                        <TextField
                            id="multiline-static"
                            multiline
                            rows={4}
                            defaultValue="Question"
                            disabled
                            className="bg-white mt-6 md:mt-24 w-full rounded-xl"
                        />
                        <div className="mt-10">
                            <TextField
                                id="multiline-static"
                                value={recognizedText}
                                multiline
                                rows={4}
                                placeholder="Your Answer..."
                                onChange={(e) => setRecognizedText(e.target.value)}
                                disabled={!editable}
                                className="bg-white w-full rounded-xl mt-12 text-black font-bold"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row items-center mt-20 md:ml-12 space-y-4 md:space-y-0 md:space-x-4">
                            {isRecording ? (
                                <>
                                    <div className="flex-1 bg-gray-100 p-2 rounded" defaultValue={displayText}>{recognizedText}</div>
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
                                            <Button type="submit" variant="contained" color="primary">
                                                Submit
                                            </Button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Main;
