import React from 'react'
import Dashbord from '../../components/Dashbord'
import TopNav from '../../components/TopNav'
import links from './Links'

export default function SubjectOverview() {
  return (
    <>
      <TopNav/>
      <Dashbord links={links}/>
    </>
  )
}
