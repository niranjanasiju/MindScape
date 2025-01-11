import React from 'react';
import './Header.css';


const Header = () => {
  return (
    <div>
      <section className='h-wrapper'>
        <div className="flexCenter paddings innerwidth h-container">
          <img className='logo'src="./logo.png" alt="logo" />
          <div className="  h-menu">
            <a href="">Login</a>
            <a href="">Tasks</a>
            <a href="">Focus</a>
            <a href="">Diary</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
