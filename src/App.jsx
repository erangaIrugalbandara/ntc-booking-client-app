import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RoutesPage from './pages/RoutesPage';
import BusesPage from './pages/BusesPage';
import SchedulesPage from './pages/SchedulesPage';
import LayoutGeneratorPage from './pages/LayoutGeneratorPage';
import CommuterRegistrationPage from './pages/CommuterRegistrationPage'; 
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [token, setToken] = useState('');
  const [layouts, setLayouts] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState(null);

  const handleLogin = (token) => {
    setToken(token);
  };

  useEffect(() => {
    const fetchLayouts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/layouts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLayouts(data);
      } catch (error) {
        console.error('Failed to fetch layouts:', error);
      }
    };

    if (token) {
      fetchLayouts();
    }
  }, [token]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} token={token} />} />
        <Route path="/routes" element={<ProtectedRoute element={<RoutesPage />} token={token} />} />
        <Route path="/buses" element={<ProtectedRoute element={<BusesPage />} token={token} />} />
        <Route path="/schedules" element={<ProtectedRoute element={<SchedulesPage />} token={token} />} />
        <Route path="/layout-generator" element={<ProtectedRoute element={<LayoutGeneratorPage layouts={layouts} setLayouts={setLayouts} selectedLayout={selectedLayout} setSelectedLayout={setSelectedLayout} />} token={token} />} />
        <Route path="/register-commuter" element={<CommuterRegistrationPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;