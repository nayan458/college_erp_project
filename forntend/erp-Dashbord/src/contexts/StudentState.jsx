import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'universal-cookie'
import NodeContext from './NodeContext'

export default function StudentState(props) {
const [myclasses, setclasses] = useState([])

    let {student} = useParams();
    const getClasses =async()=>{
    let cookie = new Cookies()
    let result = axios.get(`student/classes/${student}`,{
      headers : {
        'Authorizations' : 'Bearer' + cookie.get('token')
      }
    })
    setclasses((await result).data)
  }

  useEffect(() => {
    getClasses()
  }, [])
  
  return (
    <>
        <NodeContext.Provider value={{myclasses,getClasses}}>
            {props.children}
        </NodeContext.Provider>
    </>
  )
}
