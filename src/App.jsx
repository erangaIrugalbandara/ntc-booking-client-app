import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RoutesPage from './pages/RoutesPage';
import BusesPage from './pages/BusesPage';
import SchedulesPage from './pages/SchedulesPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} token={token} />} />
        <Route path="/routes" element={<ProtectedRoute element={<RoutesPage />} token={token} />} />
        <Route path="/buses" element={<ProtectedRoute element={<BusesPage />} token={token} />} />
        <Route path="/schedules" element={<ProtectedRoute element={<SchedulesPage />} token={token} />} />
      </Routes>
    </Router>
  );
};

export default App;