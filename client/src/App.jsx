import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import EmailVerify from './Pages/EmailVerify'
import ResetPassword from './Pages/ResetPassword'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './Pages/Dashboard'
import NewTicketForm from './Pages/NewTicketForm'
import AllTickets from './Pages/AllTickets'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/dashboard' element={ <Dashboard/> } />
        <Route path="/tickets/new" element={<NewTicketForm />} />
        <Route path="/tickets" element={<AllTickets/>} />

      </Routes>
    </div>
  )
}

export default App
