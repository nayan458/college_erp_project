import React from 'react'
import Dashbord from '../../components/Dashbord'
import TopNav from '../../components/TopNav'
import links from './Links'


export default function Quiz() {
  return (
    <>
      <TopNav/>
      <Dashbord links={links}/>
    </>
  )
}
