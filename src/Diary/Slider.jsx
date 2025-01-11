import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Slider.css';
import data from './Data'; // Import the data from the Data.js file

const Slider = () => {
  const [people] = useState(data); // Use the data from the imported file
  const [index, setIndex] = useState(0);

  // Handle index wrapping for manual navigation
  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  // Handle Text-to-Speech request
  const handleTextToSpeech = async (text) => {
    if (!text) return;

    try {
      const response = await axios.post(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyA1efdiozEgBCYL8zllLuDTzX_S6fB-ocM`,
        {
          input: { text },
          voice: {
            languageCode: 'en-US',
            ssmlGender: 'NEUTRAL',
          },
          audioConfig: {
            audioEncoding: 'MP3',
          },
        }
      );

      // Convert audio content to blob
      const audioContent = response.data.audioContent;
      const audioBlob = new Blob([new Uint8Array(atob(audioContent).split('').map(char => char.charCodeAt(0)))], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);

      // Play the audio
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('TTS Error:', error);
    }
  };

  return (
    <section className="section">
      <div className="title">
        <h2>Journals</h2>
      </div>
      <div className="slider">
        {people.map((person, personIndex) => {
          const { id, date, title, quote } = person;

          let position = 'nextSlide';
          if (personIndex === index) {
            position = 'activeSlide';
          } else if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <article className={position} key={id}>
              <h3>{title || 'No entry'}</h3>
              <p>{quote || 'Nothing written'}</p>
              <small>{date}</small>
            </article>
          );
        })}

        <button className="prev" onClick={() => setIndex(index - 1)}>
          👈
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          👉
        </button>
        <button
          className="read"
          onClick={() => handleTextToSpeech(people[index].quote)} // Pass the quote of the current index to the text-to-speech function
        >
          🔊
        </button>
      </div>
    </section>
  );
};

export default Slider;
