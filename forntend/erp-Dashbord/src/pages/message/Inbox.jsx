import React from 'react'
import Dashbord from '../../components/Dashbord'
import Ggmail from '../../components/Ggmail'
import TopNav from '../../components/TopNav'
import InputMsg from '../../db/InputMsg'

export default function Inbox() {
  return (
    <>
      <TopNav/>
      <Ggmail active='Inbox' data={InputMsg}/>
      <Dashbord/>
    </>
  )
}
