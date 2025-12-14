import { useState } from 'react'
import {Routes} from 'react-router-dom'
import {Route} from 'react-router-dom'

import './App.css'
import Home from './components/home'
import Job from './components/job'
import Login from './components/login'
import JobsItemDetails from './components/jobsItemDetails'
import NotFound from './components/notFound'
import ProtectedRoute from './components/protectedRoute'

function App() {

  return (
    <>
      <Routes>

        <Route path='/' element={<ProtectedRoute Component = {Home}/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/job' element={<ProtectedRoute Component = {Job}/>} ></Route>
        <Route path='/job/:id' element={<ProtectedRoute Component = {JobsItemDetails}/> } ></Route>
        <Route path='/*' element={<ProtectedRoute Component = {NotFound}/> } ></Route>

      </Routes>
    </>
  )
}

export default App
