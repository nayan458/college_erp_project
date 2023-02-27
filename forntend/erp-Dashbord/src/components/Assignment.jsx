import React, { useContext} from 'react'
import NodeContext from '../contexts/NodeContext'
import { Empty } from '../pages/Backpack'
import StudentAssignment from './sub_components/Assignment/StudentAssignment'
import TeacherAssignment from './sub_components/Assignment/TeacherAssignment'

export default function Assignment() {

  const a = useContext(NodeContext)

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
    </>
  )
}

