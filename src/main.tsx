import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EventsProvider } from '@contexts/EventsContext';
import { AuthProvider } from '@contexts/auth/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <AuthProvider>
    <EventsProvider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </EventsProvider>
  </AuthProvider>
  // </React.StrictMode>
);
