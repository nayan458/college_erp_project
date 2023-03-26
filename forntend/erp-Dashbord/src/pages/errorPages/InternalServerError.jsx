import React from 'react'

export default function InternalServerError() {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-white flex-col'>

            <a href="https://storyset.com/web" className='hidden'>Web illustrations by Storyset</a>

            <img src={PNF} />

            <div className='mt-8 md:mt-11'>
                <Link to='/'>
                    <button className='text-lg md:text-xl cursor-pointer bg-indigo-400 px-3 py-2 text-slate-50/70 rounded-md'>Back to home page</button>
                </Link>
            </div>
        </div>
  )
}
