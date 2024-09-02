import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/SideBar/SideBar'

const AdminPage = () => {
  return (
    <>
    <SideBar/>
    <Outlet/>
    </>
  )
}

export default AdminPage