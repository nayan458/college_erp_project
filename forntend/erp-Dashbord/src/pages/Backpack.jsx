import React, { useContext } from 'react'
import P404 from '../components/media/img/P404.png'
import { Link } from 'react-router-dom'
import NodeContext from '../contexts/NodeContext'

export default function Backpack() {
  const a = useContext(NodeContext)
  return (
    <>
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