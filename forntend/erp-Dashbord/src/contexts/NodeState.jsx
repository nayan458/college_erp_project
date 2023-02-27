import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import NodeContext from './NodeContext'

export default function NodeState(props) {

  let cookie = new Cookies();

  // Active class
  const [ActiveClass, setActiveClass] = useState(-1)

  // to get student classes
  const [myClasses, setMyClasses] = useState([])

  // to get user details
    const [user, setUser] = useState({
        "name" : "",
        "lable" : "",
        "student_id" : "",
        "gender" : ""
    })

    const userData = async() => {
        let result
        try {
            result = await axios.get(`${user.lable}/myData`, {
                headers: {
                    'Authorization': 'Bearer ' + cookie.get('token')
                }
            })
            cookie.set('name',result.data.fname + " " + result.data.lname,{path : '/login/student'})
            cookie.set('lable',result.data.lable)
            cookie.set('student_id',result.data.student_id)
            setUser({...user,name : result.data.fname + " " + result.data.lname, lable : result.data.lable, student_id : result.data.student_id});

        } catch (error) {
            console.log(error);
        }}


    const getClasses = async()=>{
        let result 
        try{
            result = axios.get(`${user.lable}/classes/${user.student_id}`,{
                headers : {
                    'Authorization': 'Bearer ' + cookie.get('token')
                }
            })
            setMyClasses((await result).data)
            
        }catch(error){
            
        }
    }

    const links = [
        {
          to: `/myClass`,
          name : 'Back',
          icon : <i class="fa-solid fa-arrow-right-from-bracket"></i>
        },
        {
          to:'/assignments',
          name:'Assignments',
          icon : <i class="fa-solid fa-book"></i>
        },
        {
          to:'/classCalendar',
          name:'Class Calendar',
          icon : <i class="fa-regular fa-calendar-days"></i>
        },
        {
          to:`/myClassmates`,
          name:'Students',
          icon : <i className="fa-solid fa-users"></i>
        },
        {
          to:'/logout',
          name : 'Logout',
          icon : <i class="fa-solid fa-power-off"></i>
      },
    ]
    
    return (
        <NodeContext.Provider value={{user,setUser,userData,myClasses,getClasses,links,ActiveClass,setActiveClass}}>
            {props.children}
        </NodeContext.Provider>
  )
}
