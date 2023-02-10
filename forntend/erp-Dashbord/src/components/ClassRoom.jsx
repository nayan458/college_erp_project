import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

export default function ClassRoom() {

  const [classes, setclasses] = useState([])

  const getClasses =async()=>{
    let cookie = new Cookies()
    let result = axios.get('student/classes/4',{
      headers : {
        'Authorizations' : 'Bearer' + cookie.get('token')
      }
    })
    setclasses((await result).data)
    console.log(classes)
  }

  useEffect(() => {
    getClasses()
  }, [])
  

  return (
    <>
      <div className='w-full h-full col-span-4 bg-slate-100/75  flex flex-col align-middle items-center overflow-y-auto'>

      <div className='w-full flex p-5 gap-5 flex-wrap justify-center'>
        {classes.map((elem,index)=>{
          return(
            <>
            <Link to={`/myClassmates/${elem.student_id}/${elem.classe_id}`} key={index}>
              <div className='w-auto h-auto bg-green-300 p-2 rounded-md'>
                <div className='flex'>
                  {/* <img src={elem.img} className='rounded-full w-20 h-20 border-[4px] border-green-200 ' alt='img'></img> */}
                  <div className='p-2'>
                    <p className='font-[Righteous] text-sm'>{elem.student_id}</p>
                    <p className='text-[.8rem]'>
                      {/* {elem.title} */}
                      Hello World {elem.classe_id}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            </>
          )
        })}
        {/* <div className='w-auto h-auto bg-blue-200 p-2 rounded-md'>
              <div className='flex'>
                <div className='p-2'>
                  <p className='font-[Righteous] text-sm'>Create a new class</p>
                  <p className='text-[.8rem] text-center '>
                    +
                  </p>
                </div>
              </div>
            </div> */}
      </div>

      </div>
    </>
  )
}
