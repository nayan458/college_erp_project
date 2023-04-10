import fileDownload from 'js-file-download'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import Cookies from 'universal-cookie'
import instance from '../../../Api/api'
import NodeContext from '../../../contexts/NodeContext'
import { Empty } from '../../../pages/Backpack'
import StatusButtons from './StatusButtons'
import { Button } from '@mui/material'
import { ConstructionOutlined } from '@mui/icons-material'
import useError from '../../../hooks/useError'

export default function StudentAssignment() {

    const { ActClass } = useParams()

    const [loder, setLoder] = useState(true)

    const [uploadEditor, setuploadEditor] = useState(false)
    const close=()=>setuploadEditor(false)

    const a = useContext(NodeContext)

    // const Navigate = useNavigate();

    const { checkError } = useError()

    // to get assignments

        const [assignments, setassignments] = useState([])
        const [assignmentsStatus, setassignmentsStatus] = useState([])

        const getAssignments = async()=>{
            let result
            try{
                
                let cookie = new Cookies();
                result = instance.get(`student/viewAssignments/${ActClass}`,{
                    headers : {
                        'Authorization' : 'Bearer ' + cookie.get('token')
                    }
                })
                setassignments((await result).data.pending)
                setassignmentsStatus((await result).data.submited)
            } catch(err){
                
                checkError(err.response.status, err.response.data.message)
            }
            setLoder(false)
        }

    // download assignment
        const downloadAssignment=(e,elem)=>{
            e.preventDefault()
            let cookie = new Cookies();

            instance.get(`student/download/${elem.assignment_id}`,{
                responseType : "blob",
                headers : {
                    'Authorization' : 'Bearer ' + cookie.get('token')
                }
            }
            ).then((response)=>{
                fileDownload(response.data,`${elem.ass_name}.pdf`)
            }).catch((err)=>{
                checkError(err.response.status, err.response.data.message)
            })
        }

    // submit assignment

        const [assignmentSubmitionData, setAssignmentSubmitionData] = useState({
            assignment : null,
            name : "Hello",
            ass_id : "",
        })

        let name, value

        const updateHandeler=(e)=>{
            name = e.target.name
            value = e.target.value
            setAssignmentSubmitionData({...assignmentSubmitionData,[name] : value})
        }

        const fileHandeler= file =>{
            setAssignmentSubmitionData({...assignmentSubmitionData, assignment : file[0]})
        }

        const [submit, setSubmit] = useState(true)

        const submitAssignment=async(e)=>{
            setSubmit(false)
            e.preventDefault()
            let cookie = new Cookies()
            let formdata = new FormData()
            formdata.append('assignment',assignmentSubmitionData.assignment);
            formdata.append('name',assignmentSubmitionData.name);
            formdata.append('ass_id',assignmentSubmitionData.ass_id);
            formdata.append('desc',assignmentSubmitionData.desc);
            let boundary = `--${Date.now()}`;
            try{
                await instance.post(`student/submit_assignment`,
                formdata,
                {
                    headers : {
                        'Content-Type': `multipart/form-data; boundary=${boundary}`,
                        'Authorization' : 'Bearer ' + cookie.get('token')
                    }
                })
                setLoder(true)
                setSubmit(true)
                getAssignments()
                alert("assignment submited successfully")
                close()
            }catch(err){
                checkError(err.response.status, err.response.data.message)
            }
        }

    // open the upload editor
        const open=(elem)=>{
            setuploadEditor(true)
            setAssignmentSubmitionData({...assignmentSubmitionData,ass_id : elem.assignment_id})
        }

    // useEffect Hook
        useEffect(() => {
            setLoder(true)
            getAssignments();
        }, [])

    // ************************************** Main **************************************** //
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
                                        <div className='flex text-slate-50 font-semibold gap-2 justify-center items-center'>
                                            <button className='bg-blue-600 hover:bg-blue-400 p-2 rounded-sm flex gap-2 items-center cursor-pointer' onClick={
                                                                                                                                                                    (e)=>downloadAssignment(e,elem)
                                                                                                                                                                        }>
                                                <i className="fa-solid fa-download"></i>
                                                <span className='hidden lg:block'>
                                                    download
                                                </span>
                                            </button>
                                            <button className='bg-green-600 hover:bg-green-400 p-2 rounded-sm flex gap-2 items-center '  onClick={()=>open(elem)}>
                                                <i className="fa-solid fa-upload"></i>
                                                <span className='hidden lg:block'>
                                                    Submit
                                                </span>
                                            </button>
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