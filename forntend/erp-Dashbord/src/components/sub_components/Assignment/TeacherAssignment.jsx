import axios from 'axios'
import fileDownload from 'js-file-download'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import Cookies from 'universal-cookie'
import instance from '../../../Api/api'
import NodeContext from '../../../contexts/NodeContext'
import { Empty } from '../../../pages/Backpack'
import StatusButtons from './StatusButtons'

export default function TeacherAssignment() {

    const {ActClass} = useParams()

    const [uploadEditor, setuploadEditor] = useState(false)
    const [loder, setLoder] = useState(true)
    const [submitionLoad, setsubmitionLoad] = useState(true)

    const close=()=>setuploadEditor(false)

    const [SubmitionDashbord, setSubmitionDashbord] = useState(false)
    const [submissionData, setsubmissionData] = useState([])

    const close_sub=()=> setSubmitionDashbord(false)

    // teacher view assignment submitssion by students (done)
        const view_subs=async(elem)=> {
            setsubmitionLoad(true)
            let cookie = new Cookies()
            try{
                let result = await instance.get(`teacher/assignmentSubmition/${elem.assignment_id}`,{
                    headers : {
                        'Authorization': 'Bearer ' + cookie.get('token')
                    }
                })
                setsubmissionData(result.data.submissions)
            }catch(error){
                
            }
            setsubmitionLoad(false)
            setSubmitionDashbord(true)
        }

    // to get assignments (done)
        const [assignments, setassignments] = useState([])

        const a = useContext(NodeContext)
        
        const getAssignments = async()=>{
        let result
        let url = (`teacher/viewAssignments/${a.user.student_id}/${ActClass}`)
        try{
            let cookie = new Cookies();  
            result = instance.get(url
            ,{
                headers : {
                    'Authorization': 'Bearer ' + cookie.get('token')
                }
            }
            )
            setassignments((await result).data)
            // console.log(await result)
        } catch(err){
            console.log("error arived : "+err)
        }
        setLoder(false)
        }

    // download assignment added by the user itself (done)

        const downloadAssignment=(e,elem)=>{
            e.preventDefault()
            let cookie = new Cookies();

            instance.get(`${a.user.lable}/download/${a.user.student_id}/${ActClass}/${elem.assignment_id}`,{
                responseType : "blob",
                headers : {
                    'Authorization' : 'Bearer ' + cookie.get('token')
                }
            }
            ).then((response)=>{
                fileDownload(response.data,`${elem.ass_name}.pdf`)
            }).catch((error)=>{
                console.log(error);
            })
        }

    // download student assignment submissions (done)

        const downloadAssignmentSubmisions=(e,elem)=>{
            e.preventDefault()
            let cookie = new Cookies();
            instance.get(`teacher/downloadStudentAsssignment/${elem.student_id}/${elem.assignment_id}`,{
                headers : {
                    'Authorization': 'Bearer ' + cookie.get('token')
                },
                responseType : "blob",
            }).then((response)=>{
                fileDownload(response.data,`${elem.assignments[0].fname}.pdf`)
            }).catch((error)=>{
                console.log(error)
            })
        }

    // teacher adds an assignment (done)
        const [assignmentSubmitionData, setAssignmentSubmitionData] = useState({
            assignment : null,
            name : "Hello",
            ass_id : "",
            desc : ""
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

        
        const submitAssignment=async(e)=>{
            e.preventDefault()
            let cookie = new Cookies()
            let formdata = new FormData()
            formdata.append('assignment',assignmentSubmitionData.assignment);
            formdata.append('name',assignmentSubmitionData.name);
            formdata.append('ass_id',assignmentSubmitionData.ass_id);
            formdata.append('desc',assignmentSubmitionData.desc);
            let boundary = `--${Date.now()}`;
            try{
                let result = await instance.post(`${a.user.lable}/submit_assignment/${a.user.student_id}/${ActClass}`,
                formdata,
                {
                    headers : {
                        'Content-Type': `multipart/form-data; boundary=${boundary}`,
                        'Authorization' : 'Bearer ' + cookie.get('token')
                    }
                })
                setLoder(true)
                console.log(result)
                getAssignments()
                alert("assignment submited successfully")
                close()
            }catch(err){
                console.log(err);
            }
        }
        const open=(elem)=>{
            setuploadEditor(true)
            setAssignmentSubmitionData({...assignmentSubmitionData,ass_id : elem.assignment_id})
        }

    // teacher approve assignment
        const approve=async(elem,index)=>{
            if(elem.status != 'approve'){
                try{    
                        setsubmitionLoad(true)
                        
                        let cookie = new Cookies()
                        const fd = new FormData();

                        fd.append('assignment_id',elem.assignment_id)
                        fd.append('student_id',elem.student_id)
                        fd.append('status','approve')

                        await instance.post(`teacher/assignmentStatus`,fd,
                            {
                                headers : {
                                    'Authorization' : 'Bearer ' + cookie.get('token')
                                }
                            }
                        )
                        elem.status = 'approve'
                    }
                    catch(error){

                }
            }
            setsubmitionLoad(false)
        }

    // teacher reject assignment
        const reject=async(elem)=>{
            if(elem.status != 'rejected'){
                setsubmitionLoad(true)

                let cookie = new Cookies()
                const fd = new FormData();
                
                fd.append('assignment_id',elem.assignment_id)
                fd.append('student_id',elem.student_id)
                fd.append('status','rejected')

                try{    
                    await instance.post(`teacher/assignmentStatus`,fd,
                        {
                            headers : {
                                'Authorization' : 'Bearer ' + cookie.get('token')
                            }
                        }
                    )
                    elem.status = 'rejected'
                }
                catch(error){

                }
            }
            setsubmitionLoad(false)
        }

    // teacher deletes an uploaded assignment (done)
        const del_ass=async(elem)=>{

            setLoder(true)

            let cookie = new Cookies()
            const fd = new FormData();
            fd.append('assignment_id',elem.assignment_id)
            try{
                await instance.delete(`teacher/deleteAssignment/${elem.assignment_id}`,
                {
                    headers : {
                        'Authorization' : 'Bearer ' + cookie.get('token')
                    }
                }
                )
                getAssignments()
            }catch(error){

            }
        }

    useEffect(() => {
        setLoder(true)
        getAssignments();
    }, [])
  return (
    <>
         <div className='w-full h-full bg-slate-200 col-span-4 flex flex-col items-center'>
            <div className='grid grid-cols-9 lg:grid-cols-4 gap-4 w-[95%] md:w-[90%] lg:w-[85%] mt-2 bg-slate-50 text-slate-500 p-5 rounded-md font-medium text-xs items-center'>
                    <div className='col-span-2 lg:col-span-1'>DATE UPLOAD</div>
                    <div className='col-span-2 lg:col-span-1'>FILE NAME</div>
                    <div className='col-span-2 lg:col-span-1 truncate'>DESCRIPTION</div>
                    <div className='flex gap-2 justify-center items-center col-span-3 lg:col-span-1'>
                        
                            <div className='underline underline-offset-4 font-bold text-xs truncate'>
                                SUBMISSIONS
                            </div>
                            <button className='bg-green-600 text-slate-50 hover:bg-green-400 p-2 rounded-sm flex gap-2 items-center font-semibold' onClick={open}><i className="fa-solid fa-upload"></i>
                                <span className='hidden sm:block'>
                                    upload
                                </span>
                            </button>
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
                <div className='grid grid-cols-4 gap-4 w-[95%] md:w-[90%] lg:w-[85%] mt-2 bg-slate-50 text-slate-800 p-5 rounded-md font-normal items-center'>
                {   assignments.length > 0 ?
                    assignments.map((elem,i)=>{
                    return(
                        <>
                            <div className='truncate' key={i}>{elem.uploaded_at}</div>
                            <div className='truncate'>{elem.ass_name}</div>
                            <div className='truncate'>{elem.ass_desc}</div>
                            <div className='flex text-slate-50 font-semibold gap-2'>

                                <button className='bg-blue-600 hover:bg-blue-400 p-2 rounded-sm flex gap-2 items-center cursor-pointer' onClick={
                                                                                                                                                        (e)=>downloadAssignment(e,elem)
                                                                                                                                                            }>
                                    <i className="fa-solid fa-download"></i>
                                    <span className='hidden lg:block'>
                                        download
                                    </span>
                                </button>
                                {   a.user.lable === "student" ?
                                    <button className='bg-green-600 hover:bg-green-400 p-2 rounded-sm flex gap-2 items-center '  onClick={()=>open(elem)}>
                                        <i className="fa-solid fa-upload"></i>
                                        <span className='hidden lg:block'>
                                            Submit
                                        </span>
                                    </button>
                                    :
                                    <>
                                        <button className='bg-green-600 hover:bg-green-400 p-2 rounded-sm flex gap-2 items-center '  
                                            onClick={()=>view_subs(elem)}>
                                        <i className="fa-solid fa-eye"></i>
                                            <span className='hidden lg:block'>
                                                view
                                            </span>
                                        </button>
                                        <button className='bg-red-600 hover:bg-red-400 p-2 rounded-sm flex gap-2 items-center'
                                            onClick={()=>del_ass(elem)}
                                        >
                                        <i className="fa-solid fa-trash"></i>
                                            <span className='hidden lg:block'>
                                                delete
                                            </span>
                                        </button>

                                    </>
                                }
                            </div>
                        </>
                    )
                })
                :
                <>
                    <Empty msg="No Assignments" hide={true} img={true}/>
                </>
                }                
            </div>
            }
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
                {a.user.lable === 'teacher' ? 
                <div>
                    <input placeholder='Descriptioin' name='desc' className='mail-inputs' type="text" value={assignmentSubmitionData.desc} onChange={updateHandeler}/>
                </div>
                :
                <></>
                }
                <div>
                    <button className='bg-green-600 text-slate-50 hover:bg-green-400 p-2 rounded-sm flex gap-2 items-center font-semibold' onClick={(e)=>submitAssignment(e)}><i className="fa-solid fa-upload"></i>Submit</button>
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
                {/* <Submitions data={submissionData}/> */}
                <div className='w-full h-full bg-slate-200 col-span-4 flex flex-col items-center'>
                <div className='grid grid-cols-11 gap-4 w-[95%] md:w-[90%] lg:w-[85%] mt-2 bg-slate-50 text-slate-500 p-5 rounded-md font-medium text-xs sm:text-sm items-center'>
                        <div className='col-span-2'>DATE UPLOAD</div>
                        <div className='col-span-2'>STATUS</div>
                        <div className='col-span-3 truncate'>SUBMITED BY</div>
                        <div className='col-span-2 truncate'>DOWNLOAD</div>
                        <div className='col-span-2 flex justify-center'>GRADE</div>
                </div>           
                    {
                        submitionLoad ?
                        <div className='grid grid-cols-1 gap-4 w-[95%] md:w-[90%] lg:w-[85%] mt-2 mb-2 bg-slate-50 text-slate-500 px-2 sm:px-5 sm:p-5 rounded-md font-medium text-xs sm:text-sm items-center overflow-y-auto'>
                            <Empty msg="Loading assignments" hide={true} comp={
                        <div className='py-5'>
                                <ClipLoader/>
                        </div>
                        }/>
                        </div>
                        :
                        <>
                            {
                                submissionData.length > 0 ?
                                <div className='grid grid-cols-11 gap-4 w-[95%] md:w-[90%] lg:w-[85%] mt-2 mb-2 bg-slate-50 text-slate-500 px-2 sm:px-5 sm:p-5 rounded-md font-medium text-xs sm:text-sm items-center overflow-y-auto'>
                                    {submissionData.map((elem,index)=>{
                                        return(
                                            <>
                                                    <div className='col-span-2' key={index}>{elem.uploaded_at}</div>
                                                    <div className='col-span-2'>
                                                        <StatusButtons status={elem.status}/>
                                                    </div>
                                                    <div className='col-span-3'>{elem.assignments[0].fname + " " + elem.assignments[0].lname}</div>
                                                    <div className='col-span-2'>
                                                        <button className='bg-blue-600 hover:bg-blue-400 p-2 rounded-sm flex gap-2 items-center cursor-pointer text-slate-50 font-semibold' 
                                                            onClick={
                                                                        (e)=>downloadAssignmentSubmisions(e,elem)
                                                                    }
                                                            >
                                                            <i className="fa-solid fa-download"></i>
                                                            <span className='hidden lg:block'>
                                                                download
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div className='col-span-2 gap-2 flex justify-center'>
                                                        <button className='bg-green-600 hover:bg-green-400 p-2 rounded-sm flex gap-2 items-center cursor-pointer text-slate-50 font-semibold' 
                                                            onClick={
                                                                        ()=>approve(elem,index)
                                                                    }
                                                            >
                                                            <i className="fa-regular fa-circle-check"></i>
                                                            <span className='hidden lg:block'>
                                                                approve
                                                            </span>
                                                        </button>
                                                        <button className='bg-red-600 hover:bg-red-400 p-2 rounded-sm flex gap-2 items-center cursor-pointer text-slate-50 font-semibold' 
                                                            onClick={
                                                                        ()=>reject(elem)
                                                                    }
                                                            >
                                                            <i className="fa-regular fa-file-excel"></i>
                                                            <span className='hidden lg:block'>
                                                                reject
                                                            </span>
                                                        </button>
                                                    </div>
                                            </>
                                        )
                                    })}
                                </div>
                            :
                            <>
                                <div className='grid grid-cols-1 gap-4 w-[95%] md:w-[90%] lg:w-[85%] mt-2 mb-2 bg-slate-50 text-slate-500 p-2 rounded-md font-medium text-xs sm:text-sm items-center overflow-y-auto'>
                                    <Empty msg="No Assignment Submissioins" hide={true} img={true}/>  
                                </div>
                            </>
                            }
                        </>
                    }
            </div> 
            {/* ******** END ********** */}
       </div>
    </>
  )
}
