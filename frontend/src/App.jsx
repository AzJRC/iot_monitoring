import './App.css'
import { useState } from 'react'
import DashboardLayout from './containers/DashboardLayout/DashboardLayout'
import { LoginForm } from './components/LoginForm/Login'
import { RegistrationForm } from './components/RegistrationForm/Registration'

function App() {

  return (
    <>
      {/* <LoginForm /> */}
      <DashboardLayout />
    </>
  )
}

export default App
