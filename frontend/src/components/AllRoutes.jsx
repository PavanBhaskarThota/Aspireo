import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { AdminPage } from '../pages/AdminPage'
import { Tasks } from '../pages/Tasks'
import { AboutPage } from '../pages/AboutPage'


export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/tasks' element={<Tasks/>}></Route>
            <Route path='/about' element={<AboutPage/>}></Route>
            <Route path='/admin' element={<AdminPage/>}></Route>
        </Routes>
    </div>
  )
}
