import React from 'react'
import { Link } from 'react-router-dom'
import unauth from '../../components/media/Forbidden.gif'

export default function Unauthenticated() {
  return (
    <>
        <div className='w-screen h-screen flex justify-center items-center bg-white flex-col'>

        <a href="https://storyset.com/worker" className='hidden'>Worker illustrations by Storyset</a>
        <img src={unauth} />

            <div className=' text-xl sm:text-2xl md:text-3xl font-semibold  text-indigo-900/70'>
                Unauthorized | 403
            </div>
            <div className='mt-8 md:mt-11'>
                <Link to='/'>
                    <button className='text-lg md:text-xl cursor-pointer bg-indigo-400 px-3 py-2 text-slate-50/70 rounded-md'>Back to home page</button>
                </Link>
            </div>
        </div>
    </>
  )
}
