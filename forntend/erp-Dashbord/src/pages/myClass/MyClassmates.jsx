import React from 'react'
import Dashbord from '../../components/Dashbord'
import MainPage from '../../components/MainPage'
import Student from '../../components/Student'
import TopNav from '../../components/TopNav'
import links from './Links'

export default function MyClassmates() {
  return (
    <>
      <TopNav/>
      <MainPage comp={<Student/>}/>
      <Dashbord links={links}/>
    </>
  )
}
