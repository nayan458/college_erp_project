import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import NodeContext from '../contexts/NodeContext'

export default function ClassRoom() {

  const a = useContext(NodeContext)

  const navigateToClass=(id)=>{
    // let cookie = new Cookies()
    a.setActiveClass(id)
    
  }

  useEffect(() => {
    a.getClasses()
  }, [])

  return (
    <>
      <div className='w-full h-full col-span-4 bg-slate-100/75  flex flex-col align-middle items-center overflow-y-auto'>

      
        <div className='grid w-[95%] md:w-[90%] lg:w-[85%] mt-2 bg-slate-50 text-slate-800 rounded-md font-normal items-center'>
          <div className='p-5 font-bold text-slate-500'>
            Your Classes
          </div>
          {
            a.myClasses.map((elem,i)=>{
            return(
              <>
              <Link to={`/assignments/${elem.classe_id}`} className='truncate shadow-sm' key={i} >
                {/* // onMouseEnter={()=>navigateToClass(elem.classe_id)} 
                // onClick={()=>a.navigateToClass(elem.classe_id)}> */}

                <div className=' bg-slate-100 hover:bg-slate-200 p-2 rounded-md transform duration-75 ease-linear truncate'>
                  <div className='truncate'>
                    <div className='py-2 pl-2'>
                      <p className='font-[Righteous] text-sm truncate'>{elem.class_name}</p>
                      <p className='text-[.8rem] truncate'>
                        {elem.class_desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              </>
            )
          })
          }
          
        </div>

      </div>
    </>
  )
}
