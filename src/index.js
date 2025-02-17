import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { AppRoute } from './Routing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <RouterProvider
  router={AppRoute}  
/>
  
);
 
