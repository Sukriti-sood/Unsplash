import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect
} from "react-router-dom";

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './NotFound';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />}/>
    <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);
