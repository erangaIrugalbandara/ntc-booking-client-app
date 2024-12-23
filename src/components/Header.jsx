import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ userRole }) => {
  return (
    <header>
      <nav>
        <ul>
          {!userRole && (
            <>
              <li><Link to="/">Login</Link></li>
              <li><Link to="/register-commuter">Register</Link></li>
            </>
          )}
          {userRole === 'admin' && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/routes">Routes</Link></li>
              <li><Link to="/buses">Buses</Link></li>
              <li><Link to="/schedules">Schedules</Link></li>
              <li><Link to="/layout-generator">Layout Generator</Link></li>
            </>
          )}
          {userRole === 'commuter' && (
            <>
              <li><Link to="/profile">User Profile</Link></li>
              <li><Link to="/seat-booking">Seat Booking</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;