import React, { useContext } from 'react'
import Dashbord from '../components/Dashbord'
import MainPage from '../components/MainPage'
import TopNav from '../components/TopNav'
import BackP from '../db/BackP'
import P404 from '../components/media/img/P404.png'
import { Link } from 'react-router-dom'
import NodeContext from '../contexts/NodeContext'

export default function Backpack() {
  const a = useContext(NodeContext)
  return (
    <>
      <TopNav/>
      <MainPage comp={BackP.length?
        <BackpackMsg/>
      :
        <Empty msg="No Files Inside Backpack" btnValue="Back to home" to={`/myClass/${a.user.student_id}`} img={true}/>
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

function Empty(props){
  return(
    <>
      <div className='w-full h-full bg-slate-200 col-span-4 flex flex-col items-center overflow-y-auto'>
      <div>
                  { props.img ?
                    <img src={P404} alt="404" className='w-auto h-60 ' />
                    :
                    props.comp
                    }
                </div>
                <div>{props.msg}</div>
                <br/>
                <div className={props.hide === true ? "hidden" : "block"}>
                  <Link to={props.to} className='bg-blue-500 px-3 py-2 rounded-sm cursor-pointer text-slate-200 font-semibold'>{props.btnValue}</Link>
                </div>
      </div>
    </>
  )
}

export {Empty}