import './App.css';
import { createContext,useState } from "react";
import Form from './components/Form';
import Instructions from './components/Instructions';
import UserContext from './components/UserContext';
import Home from './components/Home'
import { BrowserRouter, Link } from 'react-router-dom';
import MyRouter from './components/MyRouter';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <MyRouter/>
        </BrowserRouter>
                {/* <UserContext>
                    <Instructions />
                    <Form/>
                </UserContext> 
                <Home/> */}
      </header>
    </div>
  );
}

export default App;
