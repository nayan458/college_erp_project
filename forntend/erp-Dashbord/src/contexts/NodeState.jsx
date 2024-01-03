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
        "gender" : ""
    })

  // to get user details
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
            setUser({...user,name : result.data.fname + " " + result.data.lname, lable : result.data.lable, gender : result.data.gender});

            return result
        } catch (error){
            console.log("$$$".error);
        }
    }

  // to get students in a class
    const [classmates, setClassmates] = useState([])

    const getClassMates=async(classe_id)=>{
      let cookie = new Cookies()
        let result = await instance.get(`${cookie.get('lable')}/classmate/${classe_id}`,{
                headers : {
                    'Authorization': 'Bearer ' + cookie.get('token')
                }
            })
          setClassmates(result.data)
          setActiveClass(classe_id)
    }

  // link inside a classroom
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
  
  // to get all the classes of the user
  const getClasses = async()=>{

    let result 
    let cookie = new Cookies()
    
      try{
          result = await instance.get(`${cookie.get('lable')}/classes`,{
              headers : {
                  'Authorization': 'Bearer ' + cookie.get('token')
              }
          })
          setMyClasses(result.data.classes)
      }catch(error){
          console.log("error ocured")
      }
    
}


  const getClassesFirst = async()=>{

    let result 
    let cookie = new Cookies()
    try{
        result = instance.get(`${cookie.get('lable')}/classes`,{
            headers : {
                'Authorization': 'Bearer ' + cookie.get('token')
            }
        })
        setMyClasses((await result).data.classes)
        
    }catch(error){
        
    }

  }
  
  const [status, setStatus] = useState(-1)
  const [errorMessage, seterrorMessage] = useState("")

    return (
        <NodeContext.Provider value={
            {
              user,setUser,
              userData,
              myClasses,getClasses
              ,links
              ,ActiveClass,setActiveClass,
              classmates,getClassMates,getClassesFirst, 
              status, setStatus,
              errorMessage, seterrorMessage
            }
          }>
            {props.children}
        </NodeContext.Provider>
  )
}

const student_Assignment_submission=()=>{
  const texta = "hello world"
  return{
    texta
  }
}

export {student_Assignment_submission};