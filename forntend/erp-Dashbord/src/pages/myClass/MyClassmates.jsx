import React, { useContext } from 'react'
import Dashbord from '../../components/Dashbord'
import MainPage from '../../components/MainPage'
import Student from '../../components/Student'
import TopNav from '../../components/TopNav'
import NodeContext from '../../contexts/NodeContext'

export default function MyClassmates() {
  const a = useContext(NodeContext)
  return (
    <>
      <TopNav/>
      <MainPage comp={<Student/>}/>
      <Dashbord links={a.links}/>
    </>
  )
}
