import React from 'react'
import { Link } from 'react-router-dom'

export default function GmlBtn(props) {
  return (
    <>
        <div>
        <Link to={props.herf}>
            <button className={props.active ? 'w-full h-full  rounded-md py-3 sm:text-lg text-sm outline-none my-3 flex px-6 transform duration-200 ease-in-out shadow-md shadow-slate-300 bg-blue-100 text-slate-800'
                                             :'w-full h-full  rounded-md py-3 sm:text-lg text-sm outline-none my-3 text-slate-600 flex px-6 transform duration-200 ease-in-out hover:shadow-md hover:shadow-slate-300 hover:bg-blue-100 hover:text-slate-800'}>
                <span className='mr-5'>
                    {props.icon}
                </span>
                <span>
                    {props.name}
                </span>
            </button>
        </Link>
        
        </div>
    </>
  )
}
