import React, { useContext } from 'react'
import Dashbord from '../../components/Dashbord'
import MainPage from '../../components/MainPage'
import TopNav from '../../components/TopNav'
import links from './Links'
import Announcement from '../../db/AnouncementDb'
import { Empty } from '../Backpack'
import NodeContext from '../../contexts/NodeContext'

export default function Announcements() {
  const a = useContext(NodeContext)
  return (
    <>
    <TopNav/>
    <MainPage comp={
      Announcement.length?
      <AnnounceBar/>
      :
      <Empty/>
    }/>
    <Dashbord links={a.links}/>
    </>
  )
}

function AnnounceBar(){
  return(
    <>
      <div className='w-full h-full bg-slate-200 col-span-4 flex flex-col items-center overflow-y-auto'>
        {
          Announcement.map((elem)=>{
            return(
              <>
                <div className='w-[80%] h-fit bg-blue-200 rounded-md p-3 mt-2 flex'>
                  <i class="fa-sharp fa-solid fa-circle-info text-blue-500 text-lg mr-3"></i>
                  <div>{elem.msg}</div>
                  <div className='flex-1 flex justify-end align-middle items-center'><i class="fa-sharp fa-solid fa-file-arrow-down mr-1"></i>{elem.fileName}</div>
                </div>
              </>
            )
          })
        }
      </div>
    </>
  )
}

