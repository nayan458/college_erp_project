import React, { useContext, useEffect, useState } from 'react'
import { SubmitionData } from '../db/AnouncementDb'
import NodeContext from '../contexts/NodeContext'
import Cookies from 'universal-cookie'
import axios from 'axios'
import fileDownload from 'js-file-download'
import { Empty } from '../pages/Backpack'
import { ClipLoader } from 'react-spinners'

export default function Assignment() {
    const [uploadEditor, setuploadEditor] = useState(false)
    const [loder, setLoder] = useState(true)
    // const open=()=>{
    //     setuploadEditor(true)
    // }
    const close=()=>setuploadEditor(false)

    const [SubmitionDashbord, setSubmitionDashbord] = useState(false)
    const open_sub=()=> setSubmitionDashbord(true)
    const close_sub=()=> setSubmitionDashbord(false)

    // to get assignments
    const [assignments, setassignments] = useState([])

    const a = useContext(NodeContext)

    const getAssignments = async()=>{
      let result
      try{
        let cookie = new Cookies();  
        result = axios.get(`${a.user.lable}/viewAssignments/${a.user.student_id}/${a.ActiveClass}`,{
            headers : {
                'Authorizations' : 'Bearer' + cookie.get('token')
              }
        })
        setassignments((await result).data)
      } catch(err){

      }
      setLoder(false)
    }

    // download assignment

    const downloadAssignment=(e,elem)=>{
        e.preventDefault()
        let cookie = new Cookies();

        axios.get(`${a.user.lable}/download/${a.user.student_id}/${a.ActiveClass}/${elem.assignment_id}`,{
            responseType : "blob",
            headers : {
                'Authorizations' : 'Bearer' + cookie.get('token')
              }
        }
        ).then((response)=>{
            fileDownload(response.data,`${elem.ass_name}.pdf`)
        }).catch((error)=>{
            console.log(error);
        })
    }

    // submit assignment
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
        // console.log(assignmentSubmitionData)
    }

    const fileHandeler= file =>{
        setAssignmentSubmitionData({...assignmentSubmitionData, assignment : file[0]})
        // console.log(assignmentSubmitionData);
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
            let result = await axios.post(`${a.user.lable}/submit_assignment/${a.user.student_id}/${a.ActiveClass}`,
            formdata,
            {
                headers : {
                    'Content-Type': `multipart/form-data; boundary=${boundary}`,
                    'Authorizations' : 'Bearer' + cookie.get('token')
                }
            })
            setLoder(true)
            getAssignments()
            alert("assignment submited successfully")
            // console.log(result);
            close()
        }catch(err){
            console.log(err);
        }
    }
    const open=(elem)=>{
        setuploadEditor(true)
        setAssignmentSubmitionData({...assignmentSubmitionData,ass_id : elem.assignment_id})
        // console.log(assignmentSubmitionData)
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
                    <div className='flex gap-2 items-center col-span-3 lg:col-span-1'>
                        {/* <div className='cursor-pointer underline underline-offset-4 hover:text-slate-700 font-bold text-xs truncate'> */}
                        {   a.user.lable === "teacher" ?
                            <div className='underline underline-offset-4 font-bold text-xs truncate'>
                                SUBMITIONS
                            </div>
                            :
                            <div className='underline underline-offset-4 font-bold text-xs truncate'>
                                SUBMIT
                            </div>
                        }
                        {   a.user.lable === "teacher" ?
                            <button className='bg-green-600 text-slate-50 hover:bg-green-400 p-2 rounded-sm flex gap-2 items-center font-semibold' onClick={open}><i class="fa-solid fa-upload"></i>
                            <span className='hidden sm:block'>
                                upload
                            </span>
                        </button>
                        :
                        <></>
                        }
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
                    assignments.map((elem)=>{
                    return(
                        <>
                            <div className='truncate'>{elem.uploaded_at}</div>
                            <div className='truncate'>{elem.ass_name}</div>
                            <div className='truncate'>{elem.ass_desc}</div>
                            <div className='flex text-slate-50 font-semibold gap-2'>

                                <button className='bg-blue-600 hover:bg-blue-400 p-2 rounded-sm flex gap-2 items-center cursor-pointer' onClick={
                                                                                                                                                        (e)=>downloadAssignment(e,elem)
                                                                                                                                                            }>
                                    <i class="fa-solid fa-download"></i>
                                    <span className='hidden lg:block'>
                                        download
                                    </span>
                                </button>
                                {   a.user.lable === "student" ?
                                    <button className='bg-green-600 hover:bg-green-400 p-2 rounded-sm flex gap-2 items-center '  onClick={()=>open(elem)}>
                                        <i class="fa-solid fa-upload"></i>
                                        <span className='hidden lg:block'>
                                            Submit
                                        </span>
                                    </button>
                                    :
                                    <button className='bg-green-600 hover:bg-green-400 p-2 rounded-sm flex gap-2 items-center '  onClick={open_sub}>
                                    <i class="fa-solid fa-eye"></i>
                                        <span className='hidden lg:block'>
                                            view
                                        </span>
                                    </button>
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
                {a.user.lable === 'teacher' ? 
                <div>
                    <input placeholder='Descriptioin' name='desc' className='mail-inputs' type="text" value={assignmentSubmitionData.desc} onChange={updateHandeler}/>
                </div>
                :
                <></>
                }
                <div>
                    <button className='bg-green-600 text-slate-50 hover:bg-green-400 p-2 rounded-sm flex gap-2 items-center font-semibold' onClick={(e)=>submitAssignment(e)}><i class="fa-solid fa-upload"></i>Submit</button>
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



// "SQLSTATE[23000]: Integrity constraint violation: 1452 Cannot add or update a child row: a foreign key constraint fails (`college_elearn`.`assignments_subs`, CONSTRAINT `assignments_subs_assignment_id_foreign` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`assignment_id`) ON DELETE CASCADE ON UPDATE CA) (SQL: insert into `assignments_subs` (`assignment_id`, `ass_sub_filelocation`, `student_id`, `status`) values (3, assignment_Submitions/1/1/usajkjank.pdf, 1, submitted))"
