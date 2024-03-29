import React from 'react'
import TopNav from '../../components/TopNav'
import MainPage from '../../components/MainPage'
import Dashbord from '../../components/Dashbord'
import AdminHome from './adminPages/AdminHome'

export default function AdminDashbord(){

  const adminLinks = [
      {
        to:'/logout',
        name : 'Logout',
        icon : <i className="fa-solid fa-power-off"></i>
      },
  ]
  return<>
    <TopNav/>

    <MainPage comp = {<AdminHome/>} />

    <Dashbord links={adminLinks} />
    
  </>
}