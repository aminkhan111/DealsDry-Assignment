import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
 

 
import './index.css';  
import 'react-toastify/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Rendering the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     
      <App />
     
  </React.StrictMode>
);

// Performance measuring (optional)
reportWebVitals();
