import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Components/Home';
import { Provider } from 'react-redux';
import { Store } from './Components/Store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InsertForm from './Components/InsertForm';
import EditData from './Components/EditData';
import { Login } from './Components/Login';
import { ForgetPassword } from './Components/ForgetPassword';
import { ForgetEmail } from './Components/ForgetEmail';
import { MobileVarify } from './Components/MobileVarify';
import { EmailVarify } from './Components/EmailVarify';
import { OtpValidation } from './Components/OtpValidation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = { Store }>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/view' element={ <Home /> } />
        <Route path='/insert' element={ <InsertForm /> } />
        <Route path='/edit/:id' element={ <EditData /> } />
        <Route path='/mobilelog' element={ <ForgetEmail /> } />
        <Route path='/mobileverify' element={ <MobileVarify /> } />
        <Route path='/emailverify' element={ <EmailVarify /> } />
        <Route path='/verify/:verificationToken' element={ <OtpValidation /> } />
        <Route path='/resetPass/:verificationToken' element={ <ForgetPassword /> } />
      </Routes>
    </BrowserRouter>
  </Provider>
);