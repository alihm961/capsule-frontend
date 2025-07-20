import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ChatbotButton from './components/ChatbotButton';

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ChatbotButton />
    </BrowserRouter>
  );
};

export default App;
