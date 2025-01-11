import React, { useState } from 'react';
import { auth, db } from '../../firebase'; // Import Firebase and Firestore
import { doc, setDoc, Timestamp } from 'firebase/firestore'; // Import Firestore methods
import './ToDoList.css';

export default function ToDoListWithSpeech() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [transcript, setTranscript] = useState('');  // Stores ongoing transcript
    const [recordedText, setRecordedText] = useState(''); // Final recorded text
    const [isRecording, setIsRecording] = useState(false);

    // Create a new SpeechRecognition instance
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

    // Handle the task input change
    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    // Add a new task to the list and Firestore
    const addTask = async () => {
        if (newTask.trim() !== "") {
            const currentDate = new Date();
            setTasks((prevTasks) => [...prevTasks, newTask]);

            if (auth.currentUser) {
                const userUid = auth.currentUser.uid;

                try {
                    // Save the task in Firestore under users/{uid}/tasks/{timestamp}
                    await setDoc(doc(db, 'users', userUid, 'tasks', currentDate.toISOString()), {
                        task: newTask,
                        date: Timestamp.fromDate(currentDate),
                    });
                    console.log('Task saved to Firestore.');
                } catch (error) {
                    console.error('Error saving task to Firestore:', error);
                }
            }

            setNewTask("");  // Clear the input field after adding task
        }
    };

    // Start the speech-to-text recording
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
                const isFinal = result.isFinal;

                if (isFinal) {
                    finalTranscript += result[0].transcript;
                } else {
                    ongoingTranscript += result[0].transcript;
                }
            }

            // Update the transcripts
            setTranscript(ongoingTranscript);
            setRecordedText((prevText) => prevText + finalTranscript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognition.onend = () => {
            console.log('Speech recognition ended');
        };
    };

    // Stop the speech-to-text recording and save to Firestore
    const stopRecording = async () => {
        recognition.stop();
        setIsRecording(false);

        // Store the final text (recordedText) to Firestore under the user's UID
        if (auth.currentUser) {
            const userUid = auth.currentUser.uid;
            const currentDate = new Date();

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

    // Delete a task from the list
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    // Move task up in the list
    const moveTaskUp = (index) => {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    };

    // Move task down in the list
    const moveTaskDown = (index) => {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    };

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>

            <div>
                <input
                    type="text"
                    placeholder='Enter a task...'
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className='add-button' onClick={addTask}>Add Task</button>
            </div>

            <div>
                <button onClick={isRecording ? stopRecording : startRecording}>
                    {isRecording ? 'Stop adding Tasks' : 'Add more tasks'}
                </button>

                <p><strong>Ongoing Transcript:</strong> {transcript}</p>

                {recordedText && (
                    <div>
                        <h2>Recorded Text:</h2>
                        <p>{recordedText}</p>
                    </div>
                )}
            </div>

            <div>
                <ol>
                    {tasks.map((task, index) => (
                        <li key={index}>
                            <span>{task}</span>
                            <button onClick={() => deleteTask(index)}>Delete</button>
                            <button onClick={() => moveTaskUp(index)}>▲</button>
                            <button onClick={() => moveTaskDown(index)}>▼</button>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
