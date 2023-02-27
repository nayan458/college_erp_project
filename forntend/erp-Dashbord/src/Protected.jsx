import React, { useEffect, useState } from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import Cookies from 'universal-cookie'

function Protected() {
    const [auth, setauth] = useState(true)
    useEffect(() => {
        let cookie = new Cookies();
        if(cookie.get('token'))
            setauth(true)
        else
            setauth(false)
    }, [])
    
    return(
        auth ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default Protected;