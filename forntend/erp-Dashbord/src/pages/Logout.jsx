import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'

export default function Logout() {
    let redirect = useNavigate();

    useEffect(() => {
        let cookie = new Cookies()
        cookie.remove('token');
        redirect('/login')
    }, [])
    
  return (<>
  </>
  )
}
