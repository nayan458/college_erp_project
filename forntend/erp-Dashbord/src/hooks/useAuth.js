import axios from 'axios';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import instance from '../Api/api';

export default function useAuth() {

    const [formValue, setformValues] = useState({
        email : '',
        password : ''
    })

    let name, value

    let upDateValues=(e)=>{
        name = e.target.name;
        value = e.target.value;
        setformValues({...formValue,[name]:value})
      }

    const [label, setLabel] = useState("--Select User--")

    const handelLabel=(e)=>{
        setLabel(e.target.value)
      }
    

    const login = async() => {
        axios.defaults.withCredentials = true;
        await axios.get('http://localhost:8000/sanctum/csrf-cookie');
        const rslt = instance.post(`${label}/login`,formValue);
        return await rslt;
    }

    const logout=()=>{
        let cookie = new Cookies
        cookie.remove('token')
        cookie.remove('name')
        cookie.remove('gender')
        cookie.remove('lable')
        cookie.remove('student_id')
    }

    return {
        login,
        upDateValues,
        formValue,
        label,
        handelLabel,
        logout
    }
    
  
}
