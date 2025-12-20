import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="selection:bg-red-100 selection:text-red-900">

    <App />
    </div>
  </StrictMode>
);
