import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'universal-cookie'
import NodeContext from '../contexts/NodeContext'
import male from './media/img/maleIcon.png'
import female from './media/img/femaleIcon.png'
import { Empty } from '../pages/Backpack'
import ClipLoader from 'react-spinners/ClipLoader'

export default function Student() {
    const [students, setstudents] = useState([])
    const [loder, setLoder] = useState(true)

    let {student,classe} = useParams();

    const a = useContext(NodeContext)
    
    let getstudents=async()=>{
        let cookie = new Cookies()
        let result
        if(a.user.lable === "student")
            result = axios.get(`student/classmate/${student}/${classe}`,{
                headers : {
                    'Authorization': 'Bearer ' + cookie.get('token')
                }
            })
        else{
            result = axios.get(`teacher/classStudents/${classe}`,{
                headers : {
                    'Authorization': 'Bearer ' + cookie.get('token')
                }
            })

        }
        setstudents((await result).data)
        setLoder(false)
    }

    
    useEffect(() => {
      getstudents()
      a.setActiveClass(classe)
    }, [])
    
  return (
    <>
        <div className='w-full h-full bg-slate-200 col-span-4 overflow-y-auto flex flex-col items-center'>
            <div className='grid grid-cols-1 gap-4 w-[95%] md:w-[90%] lg:w-[85%] mt-2 bg-slate-50  p-5 rounded-md font-bold text-sm text-slate-500 '>
                Students
            </div>
            {loder ?
                <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 w-[100%] sm:w-[95%] md:w-[90%] lg:w-[85%] mt-2 bg-slate-50 p-2 sm:p-5 rounded-md font-medium mb-3'>
                    <Empty msg="Loading Students" hide={true} comp={
                            <div className='py-5'>
                                <ClipLoader/>
                            </div>
                        }/>
                </div>
                :
                <div className='grid grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2 w-[100%] sm:w-[95%] md:w-[90%] lg:w-[85%] mt-2 bg-slate-50 p-2 sm:p-5 rounded-md font-medium mb-3'>
                    {
                        student.length > 0 ?
                            students.map((elem)=>{
                                return(
                                    <>
                                        <div className='border-[2px] border-slate-100 rounded-md flex flex-col justify-center items-center p-2'>
                                            <img src={elem.gender === "male" ? male : elem.gender === "female" ? female : male} alt='Student Img' className='h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full'/>
                                            <div className='flex justify-center align-middle items-center text-center text-sm text-slate-800 pt-3'>{elem.fname + " " + elem.lname}</div>
                                        </div>
                                    </>
                                )
                            })
                        :
                        <Empty msg="No Students present in the class" hide={true} img={true}/>
                    }
                </div>
            }
        </div>
    </>
  )
}

