import React from 'react'

export default function AddStudents() {
  return (
    <>
        <div className='w-full h-[80%] flex gap-3'>
            <div className='border-dotted border-slate-400 px-2 py-3 w-full border-[2px] rounded-md flex justify-center align-middle items-center cursor-pointer'>
                <div className='flex gap-3 justify-center align-middle items-center border-slat-400 border-[2px] rounded-lg py-1 px-3'>
                    <span className='text-slat-500 text-lg'>
                        <i class="fa-solid fa-plus"></i>
                    </span>
                    <span>
                        Add manually
                    </span>
                </div>

            </div>

            <div className='flex gap-3 justify-center align-middle items-center border-dotted border-slate-400 px-2 py-3 w-full border-[2px] rounded-md cursor-pointer'>
                <div className='flex flex-col gap-3 justify-center align-middle items-center'>
                    <div>
                        <span className='text-slat-500 text-lg py-1 px-3 border-slat-400 border-[2px] rounded-lg'>
                            <i class="fa-solid fa-plus"></i>
                        </span>
                    </div>

                    <div className='flex gap-3 justify-center align-middle items-center'>
                        <span className='text-slate-600'>
                            ADD
                        </span>
                        <span className='text-green-500 text-3xl'>
                            <i class="fa-solid fa-file-csv"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
