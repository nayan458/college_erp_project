import React from 'react'
import Dashbord from '../../components/Dashbord'
import Ggmail from '../../components/Ggmail'
import TopNav from '../../components/TopNav'
import MailData from '../../db/MailData'

export default function AllMessage() {
  return (
    <>
      <TopNav/>
      <Ggmail active='All mails' data={MailData}/>
      <Dashbord/>
    </>
  )
}
