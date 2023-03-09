import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import instance from '../Api/api';
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
          
            result = await instance.get(`/${cookie.get('lable')}/myData`, {
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

    const [classmates, setClassmates] = useState([])

    const getClassMates=async(classe_id)=>{
      let cookie = new Cookies()
        let result = await instance.get(`${cookie.get('lable')}/classmate/${user.student_id}/${classe_id}`,{
                headers : {
                    'Authorization': 'Bearer ' + cookie.get('token')
                }
            })
          setClassmates(result.data)
          setActiveClass(classe_id)
    }

    const links = [
      {
        to: `/`,
        name : 'Back',
        icon : <i className="fa-solid fa-arrow-right-from-bracket"/>
      },
      {
        to:`/assignments/${ActiveClass}`,
        name:'Assignments',
        icon : <i className="fa-solid fa-book"/>
      },
      {
        to:'/classCalendar',
        name:'Class Calendar',
        icon : <i className="fa-regular fa-calendar-days"/>
      },
      {
        to:`/myClassmates/${ActiveClass}`,
        name:'Students',
        icon : <i className="fa-solid fa-users"/>
      },
      {
        to:'/logout',
        name : 'Logout',
        icon : <i className="fa-solid fa-power-off"/>
    },
  ]  
  
  const getClasses = async()=>{

    let result 
    let cookie = new Cookies()
    if(cookie.get('student_id')){
      try{
          result = await instance.get(`${cookie.get('lable')}/classes/${cookie.get('student_id')}`,{
              headers : {
                  'Authorization': 'Bearer ' + cookie.get('token')
              }
          })
          setMyClasses(result.data.classes)
      }catch(error){
          console.log("error ocured")
      }
    }
    else return
}


  const getClassesFirst = async(class_id)=>{

    let result 
    let cookie = new Cookies()
    try{
        result = instance.get(`${cookie.get('lable')}/classes/${class_id}`,{
            headers : {
                'Authorization': 'Bearer ' + cookie.get('token')
            }
        })
        setMyClasses((await result).data.classes)
        
    }catch(error){
        
    }

}

    return (
        <NodeContext.Provider value={
            {
              user,setUser,
              userData,
              myClasses,getClasses
              ,links
              ,ActiveClass,setActiveClass,
              classmates,getClassMates,getClassesFirst
            }
          }>
            {props.children}
        </NodeContext.Provider>
  )
}
