import axios from 'axios';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

const ExampleComponent = () => {
    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);
      };
      const handleSubmit = async (blob) => {
        try {
          const formData = new FormData();
          formData.append('audio', blob, 'recording.wav');
    
          await axios.post('http://127.0.0.1:5000/api/recognize', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          console.log('Audio uploaded successfully');
        } catch (error) {
          console.error('Error uploading audio:', error);
        }
      };
      const handleRecordingComplete = (blob) => {
        handleSubmit(blob);
      };
  return (
    <div>
    
      <AudioRecorder 
      onRecordingComplete={handleRecordingComplete}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }} 
      downloadOnSavePress={true}
      downloadFileExtension="wav"
    />
    <button onClick={handleSubmit}>Submit</button>
    
    </div>
  )
}
export default ExampleComponent;