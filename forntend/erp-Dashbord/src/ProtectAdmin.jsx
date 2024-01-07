import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie'

export default function ProtectAdmin() {
    const [admin, setAdmin] = useState(true)

    // useEffect(() => {
        // let cookie = new Cookies();
        // if(cookie.get('lable') === 'admin')
        //     setAdmin(true)
    // }, [])
    
  return (
    admin ?
    <Outlet/> :
    <Navigate to='/unauthorized'/>
  )
}
