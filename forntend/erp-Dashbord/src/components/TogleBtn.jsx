import React, { useState } from 'react'

export default function TogleBtn() {

  const [togle, settogle] = useState(false)
  const open_t = () => settogle(true)
  const close_t = () => settogle(false)


  return (
    <>
    <div className={togle===false ? 'w-16 h-7 bg-black rounded-full cursor-pointer flex ' : 'w-16 h-7 bg-black rounded-full cursor-pointer flex justify-end' } onClick={togle===false? open_t : close_t}>
                            <div className='w-7 h-7 bg-blue-800  rounded-full'>
                            </div>
                        </div>
    </>
  )
}
