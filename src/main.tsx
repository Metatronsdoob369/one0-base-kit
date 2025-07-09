// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // ✅ imports CSS only
import App from './App'; // ✅ loads your App component

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

