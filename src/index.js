import React from 'react';
import ReactDOM from 'react-dom';

import { StateProvaider } from './StateProvide';
import reducer, {initialState} from './reducer'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import 'bootstrap/dist/js/bootstrap.js';

ReactDOM.render(
  <React.StrictMode>
    
    <StateProvaider initialState={initialState} reducer = {reducer}>
    <App/>
    </StateProvaider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
