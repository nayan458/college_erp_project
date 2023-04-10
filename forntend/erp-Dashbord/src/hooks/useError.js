import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NodeContext from '../contexts/NodeContext'

export default function useError() {
    
    const {setStatus, seterrorMessage} = useContext(NodeContext)

    const navigate = useNavigate()

    const checkError=(status,message)=>{
        setStatus(status == 403 ? status==403 : status = 401)
        seterrorMessage(message)
        if(status == 401 || status == 403)
            navigate('/unauthorized')
        if(status >= 500)
            navigate('login')
    }

  return {
    checkError
  }
}
