import axios from 'axios'
import React, { useState } from 'react'
import { adminInstance } from '../../Api/api'

export default function useForm(fields) {
    const [formdata, setFormdata] = useState(fields)

    let name
    let value

    const updateFormData =(e)=>{
      name = e.target.name
      value = e.target.value
      setFormdata({...formdata,[name]:value})
    }

    const login=async()=>{
      axios.defaults.withCredentials = true;
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');
      const rslt = adminInstance.post('/login',formdata)
      return await rslt;
    }
    
  return {
    formdata,
    updateFormData,
    login
  }
}
