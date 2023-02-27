import React, { useContext } from 'react'
import Calendar from '../../components/Calendar'
import Dashbord from '../../components/Dashbord'
import MainPage from '../../components/MainPage'
import TopNav from '../../components/TopNav'
import NodeContext from '../../contexts/NodeContext'

export default function ClassCalendar() {
  const a = useContext(NodeContext)
  return (
    <>
      <TopNav/>
      <MainPage comp={<Calendar/>} />
      <Dashbord links={a.links}/>
    </>
  )
}
