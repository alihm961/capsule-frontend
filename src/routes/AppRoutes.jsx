import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import CreateCapsulePage from '../pages/CreateCapsulePage';
import PublicWallPage from '../pages/PublicWallPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/create-capsule" element={<CreateCapsulePage />} />
      <Route path="/public-wall" element={<PublicWallPage />} />
    </Routes>
  );
};

export default AppRoutes;