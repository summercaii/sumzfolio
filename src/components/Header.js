// src/components/Header.js
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/sumzfolio';

  useEffect(() => {
    document.body.classList.toggle('has-fixed-header', !isHomePage);
  }, [isHomePage]);

  if (isHomePage) {
    return null;
  }

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Back to Portfolio</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
