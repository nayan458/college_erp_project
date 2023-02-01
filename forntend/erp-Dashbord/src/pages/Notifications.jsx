 import React from 'react'
import Dashbord from '../components/Dashbord'
import MainPage from '../components/MainPage'
import NotMsg from '../components/NotMsg'
import TopNav from '../components/TopNav'

export default function Notifications() {
  return (
    <>
      <TopNav/>
      <MainPage comp={
        <NotMsg/>
      }/>
      <Dashbord/>
    </>
  )
}
