import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Navbar from './Navbar'
import AddUser from './AddUser'
import UpdateUser from './UpdateUser'

export default function App() {
  return (
    <>
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/addUser' element={<AddUser/>}></Route>
                <Route path='/updateUser/:_id' element={<UpdateUser/>}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}
