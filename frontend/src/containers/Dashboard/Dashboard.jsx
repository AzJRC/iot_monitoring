import React from 'react'
import Dashboard from "./../../components/Dashboard/Dashboard"
import LeftNavbar from "./../../components/LeftNavbar/LeftNavbar"
import TopNavbar from "./../../components/TopNavbar/TopNavbar"

function Layout() {
  return (
    <main className='dashboard__layout'>
      <TopNavbar />
      <LeftNavbar />
      <Dashboard />
    </main>
  )
}

export default Layout
