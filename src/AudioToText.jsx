import React, { useState } from 'react';
import { auth, db } from '../firebase';  // Import Firebase and Firestore (adjust the path based on your project structure)
import { doc, setDoc, Timestamp } from 'firebase/firestore'; // Import Firestore methods

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
      if (isRecording) {
        setIsRecording(false); // Ensure recording is marked as stopped
        console.log('Speech recognition ended');
      }
    };
  };

  const stopRecording = async () => {
    if (isRecording) {
      recognition.stop(); // Stop the recognition immediately
      setIsRecording(false); // Update state to indicate recording is stopped
    }

    // Store the final text (recordedText) to Firestore under the user's UID
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid;
      const currentDate = new Date();

      // Save the recorded text in Firestore under users/{uid}/summaries/{date}
      try {
        await setDoc(doc(db, 'users', userUid, 'summaries', currentDate.toISOString()), {
          summary: recordedText,
          date: Timestamp.fromDate(currentDate),
        });

        console.log('Summary saved to Firestore.');
      } catch (error) {
        console.error('Error saving summary to Firestore:', error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Recording: {isRecording ? 'Yes' : 'No'}</h1>
      <button onClick={isRecording ? stopRecording : startRecording} style={styles.button}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>

      <p style={styles.transcript}>
        <strong>Ongoing Transcript:</strong> {transcript}
      </p>

      {recordedText && (
        <div>
          <h2 style={styles.recordedTextHeader}>Recorded Text:</h2>
          <p style={styles.recordedText}>{recordedText}</p>
        </div>
      )}
    </div>
  );
}

// Styles object with white text color
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f7f7',
    padding: '20px',
    color: 'white', // Apply white text color globally
  },
  heading: {
    fontSize: '2rem',
    color: 'white', // Override for heading if needed
    marginBottom: '20px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white', // Button text will remain white
    border: 'none',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  transcript: {
    fontSize: '1.2rem',
    color: 'white', // Make transcript text white
    margin: '20px 0',
    wordWrap: 'break-word',
    textAlign: 'center',
  },
  recordedTextHeader: {
    fontSize: '1.5rem',
    color: 'white', // Make recorded text header white
    marginTop: '20px',
  },
  recordedText: {
    fontSize: '1rem',
    color: 'white', // Make recorded text white
    backgroundColor: '#333', // Dark background for readability
    padding: '10px',
    borderRadius: '8px',
    maxWidth: '90%',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    margin: '10px auto',
  },
};
