import React from 'react'
import Dashbord from '../../components/Dashbord'
import Ggmail from '../../components/Ggmail'
import TopNav from '../../components/TopNav'
import SentMsg from '../../db/SentMsg'

export default function Sent() {
  return (
    <>
      <TopNav/>
      <Ggmail active='Sent' data={SentMsg}/>
      <Dashbord/>
    </>
  )
}
