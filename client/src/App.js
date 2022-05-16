import logo from './logo.svg';
import './App.css';
import Auth from "./components/auth/Auth";
import {BrowserRouter, Navigate, Route, Routes, } from "react-router-dom";
import Tickets from "./components/tickets/Tickets";
import Home from "./components/Home/Home";

function App() {
    const user = JSON.parse(localStorage.getItem('profile'));
  return (
      <BrowserRouter>
        <Routes>
            <Route path='/auth' element={
                <Auth/>
            }/>
            <Route path='/tickets' element={<Home/>}/>
            <Route path='/' element={<Navigate to='/auth' replace/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
