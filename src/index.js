// Library imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// Internal imports
import App from './App';

// Style imports
import './css/index.css';
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

