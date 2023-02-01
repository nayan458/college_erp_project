import React from 'react'

export default function Checkbx(props) {
  return (
    <>
    <div className='w-4 h-4 flex justify-center align-middle items-center outline rounded-sm text-sm'>
        <i className={props.val === true ? 'fa-solid fa-check' : 'fa-solid fa-check hidden'}></i>
    </div>
    </>
  )
}
