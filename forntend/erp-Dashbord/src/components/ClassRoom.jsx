import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import NodeContext from '../contexts/NodeContext'

export default function ClassRoom() {

  const a = useContext(NodeContext)
  useEffect(() => {
    a.getClasses()
  }, [])

  return (
    <>
      <div className='w-full h-full col-span-4 bg-slate-100/75  flex flex-col align-middle items-center overflow-y-auto'>

      <div className='w-full flex p-5 gap-5 flex-wrap justify-center'>
        {
          
          a.myClasses.map(elem=>{
          return(
            <>
            <Link to={`/myClassmates/${a.user.student_id}/${elem.classe_id}`}>
              <div className='w-auto h-auto bg-green-300 p-2 rounded-md'>
                <div className='flex'>
                  {/* <img src={elem.img} className='rounded-full w-20 h-20 border-[4px] border-green-200 ' alt='img'></img> */}
                  <div className='p-2'>
                    <p className='font-[Righteous] text-sm'>{elem.class_name}</p>
                    <p className='text-[.8rem]'>
                      {/* {elem.title} */}
                      class desc {elem.class_desc}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            </>
          )
        })
        }
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
