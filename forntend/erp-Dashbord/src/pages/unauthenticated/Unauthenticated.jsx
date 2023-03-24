import React from 'react'
import { Link } from 'react-router-dom'

export default function Unauthenticated() {
  return (
    <>
        <div className='w-screen h-screen flex justify-center items-center bg-indigo-100 flex-col gap-6'>
            <div className=' text-3xl font-semibold  text-indigo-900/70'>
                Unauthorized | 401
            </div>
            {/* <div>
                <Link to='/'>
                    <button className=' text-xl cursor-pointer bg-indigo-400 px-3 py-2 text-slate-50/70 rounded-md'>Back to home page</button>
                </Link>
            </div> */}
        </div>
    </>
  )
}
