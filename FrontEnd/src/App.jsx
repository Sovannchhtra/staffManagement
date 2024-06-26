
import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Home'
import Create from './Create'
import './Nav'
import Nav from './Nav';
import Update from './Update';
import Search from './Search';

function App() {
  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/update/:id' element={<Update/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
