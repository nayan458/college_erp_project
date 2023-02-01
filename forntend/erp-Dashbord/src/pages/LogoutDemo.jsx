import axios from 'axios';
import React, { useState } from 'react'
import Cookies from 'universal-cookie'

export default function LogoutDemo() {
    let cookie = new Cookies();    
    const [msg, setmsg] = useState('hello')

    let lgout=async(token)=>{
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            let rslt = await axios.post('/logout',config);
            // setmsg(rslt.data.message)
            console.log(rslt)
        } catch (err) {
            console.log(`Hagura error ${err}`)
            setmsg(err)
        }

    }

    let logout =()=>{
        // let token = cookie.get('token')
        // if(token){
        //     console.log(token);
        //     setmsg(token);
        //     lgout(token);
        //     // cookie.remove('token');
        // }
        // else{
        //     setmsg('you are already oged out')
        //     console.log('You already loged out')}
    }
  return (<>
    <button onClick={logout} className="bg-green-300 px-3 py-1 rounded-sm">logout</button>
    <div>{msg}</div>
  </>

  )
}
