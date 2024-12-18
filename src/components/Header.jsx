import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/layout-generator">Layout Generator</Link></li>
          <li><Link to="/routes">Routes</Link></li>
          <li><Link to="/buses">Buses</Link></li>
          <li><Link to="/schedules">Schedules</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;