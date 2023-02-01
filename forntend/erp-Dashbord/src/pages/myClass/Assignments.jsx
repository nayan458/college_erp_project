import React from 'react'
import Assignment from '../../components/Assignment'
import Dashbord from '../../components/Dashbord'
import MainPage from '../../components/MainPage'
import TopNav from '../../components/TopNav'
import links from './Links'

export default function Assignments() {
  return (
    <>
      <TopNav/>
      <MainPage comp={<Assignment/>}/>
      <Dashbord links={links}/>
    </>
  )
}
