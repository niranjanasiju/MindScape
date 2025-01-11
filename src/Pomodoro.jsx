import React from 'react';

const PomodoroPage = () => {
  return (
    <div style={{ 
        position: 'fixed', 
        top: 0,            
        left: 0,           
        width: '100vw',    
        height: '100vh',   
        overflow: 'hidden' 
      }}>
      <iframe
        src="https://studywithme.io/aesthetic-pomodoro-timer/"
        title="Pomodoro Timer"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default PomodoroPage;