import React from 'react'
import { Link } from 'react-router-dom'
import NotiMsg from '../db/NotiMsg'

export default function NotMsg() {
  return (
    <>
        <div className='w-full h-full col-span-4 bg-slate-100/75  flex flex-col align-middle items-center overflow-y-auto'>
        
            
            {NotiMsg.map((elem)=>{
                return(
                    <>
                        <NoteMsgBox msg={elem.msg} to={elem.link} LinkMsg={elem.linkName} date={elem.date}/>
                    </>
                )
            })
            }

        </div>
    </>
  )
}


function NoteMsgBox(props){
    return(
        <>
            <div className='w-[80%] h-fit  bg-slate-300 flex p-3 rounded-lg mt-2'>
                            <i class="fa-sharp fa-solid fa-circle-info text-blue-500 text-lg mr-3"></i>
                            <div>
                            {props.msg}
                                <span>
                                    <Link to={props.to} className='text-blue-700 underline underline-offset-2 '>{props.LinkMsg}</Link>
                                </span>
                            </div>
                            <div className='flex-1 flex justify-end'>
                                {props.date}
                            </div>
                        </div>
        </>
    )
}
