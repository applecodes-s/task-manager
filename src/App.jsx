import { useState } from 'react'
import React from 'react'
import './App.css'
import Home from './pages/Home'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


function App() {
 
 return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/CreateTask' element={<CreateTask />}></Route>
         <Route path='/edit/:id' element={<EditTask />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App