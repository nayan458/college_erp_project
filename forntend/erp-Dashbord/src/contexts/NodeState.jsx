import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie'
import NodeContext from './NodeContext'

export default function NodeState(props) {

  let cookie = new Cookies();

  // Active class
  const [ActiveClass, setActiveClass] = useState(-1)

  const {label} = useParams()

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
            setUser({...user,name : result.data.fname + " " + result.data.lname, lable : result.data.lable, student_id : result.data.student_id});
            // console.log(user);
        } catch (error) {
            console.log(error);
        }}


    const getClasses = async()=>{
        let result 
        try{
            result = axios.get(`${user.lable}/classes/${user.student_id}`,{
                headers : {
                  'Authorizations' : 'Bearer' + cookie.get('token')
                }
            })
            setMyClasses((await result).data)
            // console.log(`Hello : ${myClasses}`)
        }catch(error){
            // console.log(error);
        }
    }

    const links = [
        {
          to: `/myClass/${user.student_id}`,
          name : 'Back',
          icon : <i class="fa-solid fa-arrow-right-from-bracket"></i>
        },
        // {
        //   to:'/announcements',
        //   name:'Announcements',
        //   icon : <i class="fa-solid fa-circle-info"></i>
        // },
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
        // {
        //   to:'/downloadableMaterials',
        //   name:'Downloadable Materials',
        //   icon : <i class="fa-solid fa-circle-arrow-down"></i>
        // },
        {
          to:`/myClassmates/${user.student_id}/${ActiveClass}`,
          name:'Students',
          icon : <i className="fa-solid fa-users"></i>
        },
        // {
        //   to:'/myProgress',
        //   name:'My Progress',
        //   icon : <i class="fa-solid fa-chart-line"></i>
        // },
        // {
        //   to:'/quiz',
        //   name:'Quiz',
        //   icon : <i class="fa-solid fa-brain"></i>
        // },
        // {
        //   to:'/subjectOverview',
        //   name:'Subject Overview',
        //   icon : <i class="fa-solid fa-book-open-reader"></i>
        // },
        {
          to:'/logout',
          name : 'Logout',
          icon : <i class="fa-solid fa-power-off"></i>
      },
    ]

    // Active class
    // const [ActiveClass, setActiveClass] = useState(-1)

    const changeActiveClass=(class_id)=>{
      setActiveClass(class_id);
    }
    

    // useEffect(() => {
        // userData()
        // getClasses()
      // }, [])
    
    return (
        <NodeContext.Provider value={{user,setUser,userData,myClasses,getClasses,links,ActiveClass,setActiveClass}}>
            {props.children}
        </NodeContext.Provider>
  )
}
