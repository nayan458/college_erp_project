import React from 'react'

export default function MainPage(props) {
  return (
    <>
        <div className='bg-green-600 w-full h-full pt-[4.5rem] sm:pl-[4.3rem] fixed -z-20'>
                <div className='w-full h-full bg-slate-300 grid grid-cols-4 gap-[0.08rem] relative -z-10'>
                    {props.comp}
                </div>
        </div>
    </>
  )
}
