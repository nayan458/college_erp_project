import React from 'react'
import Dashbord from '../components/Dashbord'
import MainPage from '../components/MainPage'
import TopNav from '../components/TopNav'
import BackP from '../db/BackP'
import P404 from '../components/media/img/P404.png'
import { Link } from 'react-router-dom'

export default function Backpack() {
  return (
    <>
      <TopNav/>
      <MainPage comp={BackP.length?
        <BackpackMsg/>
      :
        <Empty/>
      }/>
      <Dashbord/>
    </>
  )
}


function BackpackMsg(){
  return(
    <>
      <div className='w-full h-full bg-slate-200 col-span-4 flex flex-col items-center overflow-y-auto'>
        {
          BackP.map((elem)=>{
            return(
              <>
                <div className='w-[80%] h-fit bg-blue-200 rounded-md p-3 mt-2 flex'>
                  <i class="fa-sharp fa-solid fa-circle-info text-blue-500 text-lg mr-3"></i>
                  <div>{elem.File}</div>
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

function Empty(){
  return(
    <>
      <div className='w-full h-full bg-slate-200 col-span-4 flex flex-col items-center overflow-y-auto'>
      <div>
                  <img src={P404} alt="404" className='w-auto h-60 ' />
                </div>
                <div>No Files Inside Backpack</div>
                <br/>
                <Link to='/' className='bg-blue-500 px-3 py-2 rounded-sm cursor-pointer text-slate-200 font-semibold'>Back to home</Link>
      </div>
    </>
  )
}

export {Empty}