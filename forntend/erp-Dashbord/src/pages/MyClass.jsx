import React from 'react'
import ClassRoom from '../components/ClassRoom'
import Dashbord from '../components/Dashbord'
import MainPage from '../components/MainPage'
import TopNav from '../components/TopNav'

export default function MyClass() {

  return (
    <>
      <TopNav/>
      <MainPage comp={
        <ClassRoom/>
      }/>
      <Dashbord/>
    </>
  )
}