import React, { useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import NodeContext from '../contexts/NodeContext'
import TeacherAssignment from './sub_components/Assignment/TeacherAssignment'
import StudentAssignment from './sub_components/Assignment/StudentAssignment'

export default function Assignment() {

  const a = useContext(NodeContext)

  const {ActClass} = useParams()

  useEffect(()=>{
    a.setActiveClass(ActClass)
  },[])

  {/* <StudentAssignment/> */}
  {/* <StdAss/> */}

  return (
    <>
        {
            a.user.lable === 'student' ?
            <StudentAssignment/>
            : a.user.lable === 'teacher' ?
              <TeacherAssignment/>
            :
              <></>

        }
    </>
  )
}


            
              {/* <Empty msg="User not found" hide={true} img={true}/> */}