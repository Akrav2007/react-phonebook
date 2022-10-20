/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';
import ReactDOM from 'react-dom/client';

// import our css
import './index.css'; // must be ./ or relative path
import App from './App'


/*****************************************
 * * SHOW COMPONENT
 *****************************************/

// '/' at the end of the component is a must!
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <App />
    
  </React.StrictMode>
);