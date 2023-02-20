import React, { useContext } from 'react'
import Assignment from '../../components/Assignment'
import Dashbord from '../../components/Dashbord'
import MainPage from '../../components/MainPage'
import TopNav from '../../components/TopNav'
import NodeContext from '../../contexts/NodeContext'
import links from './Links'

export default function Assignments() {
  const a = useContext(NodeContext)
  return (
    <>
      <TopNav/>
      <MainPage comp={<Assignment/>}/>
      <Dashbord links={a.links}/>
    </>
  )
}
