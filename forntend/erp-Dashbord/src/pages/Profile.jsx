import React from 'react'
import Dashbord from '../components/Dashbord'
import MainPage from '../components/MainPage'
import TopNav from '../components/TopNav'

export default function Profile() {
  return (
    <>
      <TopNav/>
      <MainPage comp={<Pfile/>}/>
      <Dashbord/>
    </>
  )
}

function Pfile(){
  return(
    <>
    <div className='font-bold text-lg '>
      profile
    </div>
    </>
  )
}
