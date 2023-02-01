import React, { useState } from 'react'
import Assign from '../db/Assign'
import { SubmitionData } from '../db/AnouncementDb'

export default function Assignment() {
    const [uploadEditor, setuploadEditor] = useState(false)
    const open=()=>setuploadEditor(true)
    const close=()=>setuploadEditor(false)

    const [SubmitionDashbord, setSubmitionDashbord] = useState(false)
    const open_sub=()=> setSubmitionDashbord(true)
    const close_sub=()=> setSubmitionDashbord(false)
  return (
    <>
         <div className='w-full h-full bg-slate-200 col-span-4 flex flex-col items-center'>
            <div className='grid grid-cols-9 lg:grid-cols-4 gap-4 w-[95%] md:w-[90%] lg:w-[85%] mt-2 bg-slate-50 text-slate-500 p-5 rounded-md font-medium text-xs items-center'>
                    <div className='col-span-2 lg:col-span-1'>DATE UPLOAD</div>
                    <div className='col-span-2 lg:col-span-1'>FILE NAME</div>
                    <div className='col-span-2 lg:col-span-1 truncate'>DESCRIPTION</div>
                    <div className='flex gap-2 items-center col-span-3 lg:col-span-1'>
                        <div className='cursor-pointer underline underline-offset-4 hover:text-slate-700 font-bold text-xs truncate' onClick={open_sub}>
                            SUBMITIONS
                        </div>
                        <button className='bg-green-600 text-slate-50 hover:bg-green-400 p-2 rounded-sm flex gap-2 items-center font-semibold' onClick={open}><i class="fa-solid fa-upload"></i>
                            <span className='hidden sm:block'>
                                Submit
                            </span>
                        </button>
                    </div>
            </div>
            <div className='grid grid-cols-4 gap-4 w-[95%] md:w-[90%] lg:w-[85%] mt-2 bg-slate-50 text-slate-800 p-5 rounded-md font-normal items-center'>
                {Assign.map((elem)=>{
                    return(
                        <>
                            <div className='truncate'>{elem.date}</div>
                            <div className='truncate'>{elem.fileName}</div>
                            <div className='truncate'>{elem.desc}</div>
                            <div className='flex text-slate-50 font-semibold'>
                                <a href={elem.file} download={elem.fileName} className='bg-blue-600 hover:bg-blue-400 p-2 rounded-sm flex gap-2 items-center '><i class="fa-solid fa-download"></i>
                                    <span className='hidden sm:block'>
                                        download
                                    </span>
                                    </a>
                                {/* <button className='bg-green-600 hover:bg-green-400 p-2 rounded-sm flex gap-2 items-center '><i class="fa-solid fa-upload"></i>Submit</button> */}
                            </div>
                        </>
                    )
                })}                
            </div>
        </div>


{/* File uplode form */}

        <div className={uploadEditor===true?'mail-box-outer' : 'mail-box-outer mail-box-hidden-animation-outer'}>
            <form className={uploadEditor===true?'fixed z-50 w-[90vw] sm:w-[60vw] h-[70vh] rounded-xl bg-slate-50 p-6 font-sans transform ease-in-out duration-300 flex flex-col gap-5':'mail-box mail-box-hidden-animation-inner'}>
                
            <div className='flex justify-between'>
                <div className='font-bold text-sm text-slate-500 '>Add Downloadable</div>
                <div className='close-btn' onClick={close}><i className="fa-solid fa-xmark"></i></div>
            </div>
                <div className='font-bold sm:text-sm md:text-lg'>
                    File
                </div>
                <div>
                        <input type="file" className='truncate'/>
                </div>
                <div>
                    <input placeholder='File Name' name='subject' className='mail-inputs' type="text"/>
                </div>
                <div>
                    <input placeholder='Descriptioin' name='subject' className='mail-inputs' type="text"/>
                </div>
                <div>
                    <button className='bg-green-600 text-slate-50 hover:bg-green-400 p-2 rounded-sm flex gap-2 items-center font-semibold' onClick={open}><i class="fa-solid fa-upload"></i>Submit</button>
                </div>
            </form>
        </div>

       <div className={SubmitionDashbord
       ?
       'fixed top-0 left-0 pt-[4.5rem] sm:pl-[4.3rem] w-full h-full sm:w-full sm:h-full bg-slate-50'
       :
       'hidden'}>
                <div className={SubmitionDashbord ? 'fixed bg-slate-50 text-slate-500 p-3 pt-[4.5rem] top-0 right-0 rounded-md hover:text-slate-700 cursor-pointer' : 'fixed bg-slate-50 text-slate-500 p-3 pt-[4.5rem] top-0 right-0 rounded-md hover:text-slate-700 cursor-pointer hidden'} onClick={close_sub}>
                    <i className="fa-solid fa-xmark"></i></div>
                <Submitions show={setSubmitionDashbord}/>
       </div>
    </>
  )
}

function Submitions(){
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
