import React from 'react'
import Calendar from '../../components/Calendar'
import Dashbord from '../../components/Dashbord'
import MainPage from '../../components/MainPage'
import TopNav from '../../components/TopNav'
import links from './Links'

export default function ClassCalendar() {
  return (
    <>
      <TopNav/>
      <MainPage comp={<Calendar/>} />
      <Dashbord links={links}/>
    </>
  )
}
