import React, { useState, useEffect } from 'react';
import './Slider.css';
import data from './Data';

const Slider = () => {
  const [people] = useState(data);
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
              <button className='read'>🔊</button>
      </div>
    </section>
  );
};

export default Slider;
