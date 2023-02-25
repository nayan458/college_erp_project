import React from 'react'

export default function StatusButtons({status}) {
  return (
    <>  
        {
            status === 'submitted' ?
            <div className='text-slate-500'>submitted</div>
            : status === 'aproved'?
            <div className='text-green-500'>approved</div>
            : status === 'rejected'?
            <div className='text-red-500'>rejected</div>
            :
            <></>
        }
    </>
  )
}
