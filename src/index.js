// import React from 'react';
// import ReactDOM from 'react-dom';
// // import './index.css';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root')); // Use createRoot correctly
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
