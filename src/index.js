import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Components/Home';
import { Provider } from 'react-redux';
import { Store } from './Components/Store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InsertForm from './Components/InsertForm';
import EditData from './Components/EditData';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = { Store }>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/insert' element={ <InsertForm /> } />
        <Route path='/edit/:id' element={ <EditData /> } />
      </Routes>
    </BrowserRouter>
  </Provider>
);