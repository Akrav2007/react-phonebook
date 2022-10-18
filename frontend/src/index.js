/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';
import ReactDOM from 'react-dom';

// import our css
import './index.css'; // must be ./ or relative path
import App from './App'


/*****************************************
 * * SHOW COMPONENT
 *****************************************/

// '/' at the end of the component is a must!
ReactDOM.render(
<React.StrictMode><App  /></React.StrictMode>
, document.getElementById('root'));
