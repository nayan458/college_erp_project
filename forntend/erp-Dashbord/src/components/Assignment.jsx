import React, { useContext, useEffect, useState } from 'react'
import { SubmitionData } from '../db/AnouncementDb'
import NodeContext from '../contexts/NodeContext'
import Cookies from 'universal-cookie'
import axios from 'axios'
import fileDownload from 'js-file-download'
import { Empty } from '../pages/Backpack'
import { ClipLoader } from 'react-spinners'
import Student from './Student'
import StudentAssignment from './sub_components/Assignment/StudentAssignment'
import TeacherAssignment from './sub_components/Assignment/TeacherAssignment'

export default function Assignment() {
    // const [uploadEditor, setuploadEditor] = useState(false)
    // const [loder, setLoder] = useState(true)
    // // const open=()=>{
    // //     setuploadEditor(true)
    // // }
    // const close=()=>setuploadEditor(false)

    // const [SubmitionDashbord, setSubmitionDashbord] = useState(false)
    // const open_sub=()=> setSubmitionDashbord(true)
    // const close_sub=()=> setSubmitionDashbord(false)

    // // to get assignments
    // const [assignments, setassignments] = useState([])

    const a = useContext(NodeContext)

    // const getAssignments = async()=>{
    //   let result
    //   try{
    //     let cookie = new Cookies();  
    //     result = axios.get(`${a.user.lable}/viewAssignments/${a.user.student_id}/${a.ActiveClass}`,{
    //         headers : {
    //             'Authorizations' : 'Bearer' + cookie.get('token')
    //           }
    //     })
    //     setassignments((await result).data)
    //   } catch(err){

    //   }
    //   setLoder(false)
    // }

    // // download assignment

    // const downloadAssignment=(e,elem)=>{
    //     e.preventDefault()
    //     let cookie = new Cookies();

    //     axios.get(`${a.user.lable}/download/${a.user.student_id}/${a.ActiveClass}/${elem.assignment_id}`,{
    //         responseType : "blob",
    //         headers : {
    //             'Authorizations' : 'Bearer' + cookie.get('token')
    //           }
    //     }
    //     ).then((response)=>{
    //         fileDownload(response.data,`${elem.ass_name}.pdf`)
    //     }).catch((error)=>{
    //         console.log(error);
    //     })
    // }

    // // submit assignment
    // const [assignmentSubmitionData, setAssignmentSubmitionData] = useState({
    //     assignment : null,
    //     name : "Hello",
    //     ass_id : "",
    //     desc : ""
    // })

    // let name, value

    // const updateHandeler=(e)=>{
    //     name = e.target.name
    //     value = e.target.value
    //     setAssignmentSubmitionData({...assignmentSubmitionData,[name] : value})
    //     // console.log(assignmentSubmitionData)
    // }

    // const fileHandeler= file =>{
    //     setAssignmentSubmitionData({...assignmentSubmitionData, assignment : file[0]})
    //     // console.log(assignmentSubmitionData);
    // }


    // const submitAssignment=async(e)=>{
    //     e.preventDefault()
    //     let cookie = new Cookies()
    //     let formdata = new FormData()
    //     formdata.append('assignment',assignmentSubmitionData.assignment);
    //     formdata.append('name',assignmentSubmitionData.name);
    //     formdata.append('ass_id',assignmentSubmitionData.ass_id);
    //     formdata.append('desc',assignmentSubmitionData.desc);
    //     let boundary = `--${Date.now()}`;
    //     try{
    //         let result = await axios.post(`${a.user.lable}/submit_assignment/${a.user.student_id}/${a.ActiveClass}`,
    //         formdata,
    //         {
    //             headers : {
    //                 'Content-Type': `multipart/form-data; boundary=${boundary}`,
    //                 'Authorizations' : 'Bearer' + cookie.get('token')
    //             }
    //         })
    //         setLoder(true)
    //         getAssignments()
    //         alert("assignment submited successfully")
    //         // console.log(result);
    //         close()
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
    // const open=(elem)=>{
    //     setuploadEditor(true)
    //     setAssignmentSubmitionData({...assignmentSubmitionData,ass_id : elem.assignment_id})
    //     // console.log(assignmentSubmitionData)
    // }
    // useEffect(() => {
    //     setLoder(true)
    //     getAssignments();
    // }, [])
    

  return (
    <>
        {
            a.user.lable === 'student' ?
            <StudentAssignment/>
            : a.user.lable === 'teacher' ?
            <TeacherAssignment/>
            :
            <Empty msg="User not found" hide={true} img={true}/>

        }

        {/* <TeacherAssignment/> */}
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
