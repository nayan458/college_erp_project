import React, { useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'
import instance from '../Api/api';
import NodeContext from '../contexts/NodeContext';

export default function Logout() {
    let redirect = useNavigate();
    const a = useContext(NodeContext)
    useEffect(() => {
        let cookie = new Cookies()
        try{
          cookie.remove('token');
          cookie.remove('name');
          cookie.remove('gender');
          cookie.remove('lable');
          cookie.remove('student_id');
        }catch(error){
          
        }
        redirect('/login')
    }, [])
    
  return (<>
  </>
  )
}
