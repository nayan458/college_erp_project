import React from 'react'

export default function Gradesheet() {
    return (
        <>
            
            <div className='w-full h-full bg-slate-200 col-span-4 flex flex-col items-center'>
                <div className='grid grid-cols-11 gap-4 w-[95%] md:w-[90%] lg:w-[85%] mt-2 bg-slate-50 text-slate-500 p-5 rounded-md font-medium text-xs sm:text-sm items-center'>
                        <div className='col-span-2'>DATE UPLOAD</div>
                        <div className='col-span-3'>FILE NAME</div>
                        <div className='col-span-3 truncate'>DESCRIPTION</div>
                        <div className='col-span-2'>SUBMITED BY</div>
                        <div className='col-span-1 flex justify-center'>GRADE</div>
                </div>           
                <div className='grid grid-cols-11 gap-4 w-[95%] md:w-[90%] lg:w-[85%] mt-2 mb-2 bg-slate-50 text-slate-500 px-2 sm:px-5 sm:p-5 rounded-md font-medium text-xs sm:text-sm items-center overflow-y-auto'>
                    {
                        SubmitionData.map((elem)=>{
                            return(
                                <>
                                        <div className='col-span-2'>{elem.date}</div>
                                        <div className='col-span-3'>{elem.fileName}</div>
                                        <div className='col-span-3'>{elem.name}</div>
                                        <div className='col-span-2'>{elem.desc}</div>
                                        <div className='col-span-1 flex justify-center'>{elem.grade}</div>
                                </>
                            )
                        })
                    }
                </div>
            </div>            
        </>
    )
}
