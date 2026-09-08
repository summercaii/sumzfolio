// src/components/Header.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom'; 

function Header() {

  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/sumzfolio';

  return (
    <header>
      <h1>Summer Cai</h1>
      {isHomePage ? (
        <nav>
          <ul>
            <li><a href="#about">About Me</a></li> 
            <li><a href="#resume">Resume</a></li> 
            <li><a href="#projects">Projects</a></li> 
            <li><a href="#contact">Contact</a></li> 
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li><Link to="/">Back to Portfolio</Link></li> 
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
