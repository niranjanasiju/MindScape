import React, { useState } from 'react';

export default function SpeechToTextBasic() {
  const [transcript, setTranscript] = useState('');  // This will store the ongoing transcript
  const [recordedText, setRecordedText] = useState(''); // This will store the final recorded text after stop
  const [isRecording, setIsRecording] = useState(false);

  // Create a new SpeechRecognition instance
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = true;

  const startRecording = () => {
    recognition.start();
    setIsRecording(true);
    setTranscript(''); // Clear previous transcript when starting new recording
    setRecordedText(''); // Clear any previously recorded text

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let ongoingTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const isFinal = result.isFinal; // Check if the result is finalized

        if (isFinal) {
          finalTranscript += result[0].transcript; // Only store the final result
        } else {
          ongoingTranscript += result[0].transcript; // Update ongoing transcript
        }
      }

      // Update the transcripts
      setTranscript(ongoingTranscript); // Show ongoing speech
      setRecordedText((prevText) => prevText + finalTranscript); // Append finalized speech to stored text
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
    };
  };

  const stopRecording = () => {
    recognition.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <h1>Recording: {isRecording ? 'Yes' : 'No'}</h1>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>

      <p><strong>Ongoing Transcript:</strong> {transcript}</p>

      {recordedText && (
        <div>
          <h2>Recorded Text:</h2>
          <p>{recordedText}</p>
        </div>
      )}
    </div>
  );
}
