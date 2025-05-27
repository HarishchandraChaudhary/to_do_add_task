import { useState } from 'react'
import { Routes,Route } from 'react-router';
import './App.css'
import Home from './components/Home'
import Create from './components/Create'
import Edit from './components/Edit'
import Delete from './components/Delete'
import Navbar from './components/navbar/Navbar';
function App() {
  return (
    <>
    <Navbar
    content={
         <Routes>
           <Route path='' element={<Home></Home>}></Route>
           <Route path='/create' element={<Create></Create>}></Route>
           <Route path='/edit/:id' element={<Edit></Edit>}></Route>
           <Route path='/delete/:id' element={<Delete></Delete>}></Route>
     </Routes>


  }
    />
    
    
  
    </>
  )
}

export default App
