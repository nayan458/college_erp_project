import React from 'react'
import StudentDb from '../db/StudentDb'

export default function Student() {
  return (
    <>
        <div className='w-full h-full bg-slate-200 col-span-4 overflow-y-auto flex flex-col items-center'>
            <div className='grid grid-cols-1 gap-4 w-[95%] md:w-[90%] lg:w-[85%] mt-2 bg-slate-50  p-5 rounded-md font-bold text-sm text-slate-500 '>
                Student
            </div>
            <div className='grid grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2 w-[100%] sm:w-[95%] md:w-[90%] lg:w-[85%] mt-2 bg-slate-50 p-2 sm:p-5 rounded-md font-medium mb-3'>
                {
                    StudentDb.map((elem)=>{
                        return(
                            <>
                                <div className='border-[2px] border-slate-100 rounded-md flex flex-col justify-center items-center p-2'>
                                    <img src={elem.img} alt='Student Img' className='h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full'/>
                                    <div className='flex justify-center align-middle items-center text-center text-sm text-slate-800 pt-3'>{elem.name}</div>
                                </div>
                            </>
                        )
                    })
                }
                
                {/* <div className='border-[2px] border-slate-400 rounded-md flex flex-col justify-center'>
                    <img src={TonySir} className='h-24'/>
                    <div className='flex justify-center'>Bayan Tony</div>
                </div> */}
            </div>
        </div>
    </>
  )
}

