import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import useAssignment from '../../../hooks/useAssignment'
import { Empty } from '../../../pages/Backpack'
import LongMenu from '../../mui_components/LongMenu'
import { DownloadBtn, SubmitBtn } from './ActionBtns'
import StatusButtons from './StatusButtons'

export default function StdAss() {
    const { ActClass } = useParams()
    const { loder, setLoder, getAssignments, assignments, assignmentsStatus, downloadAssignment, uploadEditor, open, close, assignmentSubmitionData, fileHandeler, updateHandeler, submitAssignment, submit} = useAssignment(ActClass)
    
    // useEffect(() => {
    //   getAssignments()
    // }, [])
    
  return (
    <>
         <div className='w-full h-full bg-slate-200 col-span-4 flex flex-col items-center fixed top-0 left-0 pt-[4.5rem] sm:pl-[4.3rem] text-[0.5rem] md:text-xs'>
           
            <div className='grid grid-cols-4 gap-4 w-[95%] md:w-[90%] lg:w-[85%] mt-2 bg-slate-50 text-slate-500 p-5 rounded-md font-medium items-center text-center'>
                    <div className=''>DATE UPLOAD</div>
                    <div className=''>FILE NAME</div>
                    <div className=' truncate'>DESCRIPTION</div>
                    <div className='flex gap-2 justify-center items-center text-center'>
                        <div className='underline underline-offset-4 font-bold truncate text-center'>
                            SUBMIT/STATUS
                        </div>
                    </div>
            </div>
            { loder ?
                <div className='grid grid-cols-4 gap-4 w-[95%] md:w-[90%] lg:w-[85%] mt-2 bg-slate-50 text-slate-800 p-5 rounded-md font-normal items-center'>
                <Empty msg="Loading assignments" hide={true} comp={
                        <div className='py-5'>
                            <ClipLoader/>
                        </div>
                    }/>
                </div>
            :
                <div className='grid grid-cols-4 gap-4 w-[95%] md:w-[90%] lg:w-[85%] mt-2 mb-2 bg-slate-50 text-slate-800 p-5 rounded-md font-normal items-center text-center overflow-y-auto'>
                {   assignments.length > 0 || assignmentsStatus.length > 0 ?
                    <>
                        {
                            assignments.map((elem,i)=>{
                                return(
                                    <>
                                        <div className='truncate' key={i}>{elem.uploaded_at}</div>
                                        <div className='truncate'>{elem.ass_name}</div>
                                        <div className='truncate'>{elem.ass_desc}</div>
                                        <div className='sm:flex text-slate-50 font-semibold gap-2 justify-center items-center hidden'>

                                            <button className='bg-blue-600 hover:bg-blue-400 p-2 rounded-sm flex gap-2 items-center cursor-pointer' 
                                                onClick={
                                                        (e)=>downloadAssignment(e,elem)
                                                            }
                                                >
                                                    <i className="fa-solid fa-download"></i>
                                                    <span className='hidden lg:block'>
                                                        download
                                                    </span>
                                            </button>
                                            <button className='bg-green-600 hover:bg-green-400 p-2 rounded-sm flex gap-2 items-center '  
                                                onClick={
                                                    ()=>open(elem)
                                                    }
                                                >
                                                    <i className="fa-solid fa-upload"></i>
                                                    <span className='hidden lg:block'>
                                                        Submit
                                                    </span>
                                            </button>
                                        </div>
                                        <div className='block sm:hidden'>
                                            <LongMenu comp={<>
                                                <DownloadBtn elem={elem}/>
                                                <SubmitBtn elem={elem}/>
                                            </>}/> 
                                        </div>
                                    </>
                                )
                            })
                        }
                        {
                            assignmentsStatus.map((elem,i)=>{
                                return(
                                    <>
                                        <div className='truncate' key={i}>{elem.uploaded_at}</div>
                                        <div className='truncate'>{elem.ass_name}</div>
                                        <div className='truncate'>{elem.ass_desc}</div>
                                        <div className='truncate'>
                                            <StatusButtons status={elem.status}/>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </>
                :
                <>
                    <Empty msg="No Assignments" hide={true} img={true}/>
                </>
                }                
            </div>}
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
                        <input type="file" className='truncate' name='assignment' onChange={e => fileHandeler(e.target.files)}/>
                </div>
                <div>
                    <input placeholder='File Name' name='name' className='mail-inputs' type="text" value={assignmentSubmitionData.name} onChange={updateHandeler}/>
                </div>
                <div>
                    {
                        submit ?
                            <button className='bg-green-600 text-slate-50 hover:bg-green-400 p-2 rounded-sm flex gap-2 items-center font-semibold' onClick={(e)=>submitAssignment(e)}><i className="fa-solid fa-upload"></i>Submit</button>
                        :
                            <button className='bg-green-300 text-slate-50 hover:cursor-not-allowed p-2 rounded-sm flex gap-2 items-center font-semibold'>Submitting...</button>
                    }
                </div>
            </form>
        </div>
    </>
  )
}
