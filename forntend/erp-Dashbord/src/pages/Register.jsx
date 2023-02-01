import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import LogoDark from '../components/media/svg/LogoDark'
import college_logo from '../components/media/img/college_logo.png'

export default function Register() {

  const cookie = new Cookies();
  const redirect = useNavigate();
  // const [dat, setdata] = useState('')
  
  const [formValue, setformValue] = useState([{
    fname:'',
    lname:'',
    email:'',
    password:'',
  }])
  
  let name,value;
  
  const upDateValues=(e)=>{
    name = e.target.name;
    value = e.target.value;
    setformValue({...formValue,[name]:value})
    console.log({[name]:value})
  }
  
  const submit=async(e)=>{
    try {
      e.preventDefault()
      axios.defaults.withCredentials = true;
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');
      let rslt = await axios.post('/register',formValue)
      cookie.set('token',rslt.data.token)
      alert("Registered successfully")
      redirect('/')
    } catch (error){
      e.preventDefault()
      if(error)
        alert("Invalid form values")
    }
  }

  useEffect(() => {
    let cookies = new Cookies();
    if(cookies.get('token'))
      redirect('/')
  }, [])

  
  return (
    <>
    {/*  */}
    <div className='w-screen min-h-screen md:flex justify-center align-middle items-center bg-slate-100 px-6 py-1'>
    <div className='top-0 pl-5 pt-2 pr-4 sm:px-10 md:px-[3rem] lg:px-24 left-0 bg-slate-100 md:absolute'>
      <Link to='/'>
        {/* <LogoBlack/> */}
        <LogoDark/>
      </Link>
    </div>
      <div className='w-full h-full grid grid-cols-8 gap-12'>
      <div className=' hidden md:block col-span-3 rounded-lg shadow-lg'>
          <div 
          className
          ='w-full h-full overflow-hidden flex-col 
            bg-slate-50/20 rounded-sm shadow-lg 
            px-6 lg:px-12 py-12 gap-10 
            flex justify-start align-middle items-center 
            '>
          {/* done */}
              <img src={college_logo} className='w-40' alt="This imaisible"/>
              <div className='text-2xl text-[#1F2833]/90 font-semibold'>
              "TO STRIVE, TO<span><br/></span>
              SEEL,<span><br/></span>
              TO LEARN AND NOT<span><br/></span>
              TO TIELD"
              </div>
          </div>
      </div>
          
          <div className='col-span-8 md:col-span-5 px-4 sm:px-16 lg:px-24 py-2'>
          <div className='grid gap-8 md:gap-14 '>

            <p className='grid'>
            <span className='text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] lg:text-[2.5rem] text-[#1F2833] font-["Source Sans Pro", "sans-serif"] font-bold'>
            {/* Done */}
              Register Here
            </span>
            <span className='text-[.8rem] sm:text-[.8rem] md:text-[.8rem] lg:text-[1rem] text-[#1F2833]/60 font-["Source Sans Pro", "sans-serif"] font-bold'>
            {/* Done */}
              Fill in your details below.
            </span>
            </p>
            <form className="grid gap-4 md:gap-7" onSubmit={(e)=>e.preventDefault}>
                
                <input type="text" placeholder='First Name' className='text-base md:text-xl font-light font-sans px-3 py-2 rounded-md outline-none border-slate-400 ' autoComplete='false' name='fname' value={formValue.fname} onChange={upDateValues} required/>
                <input type="text" placeholder='Last Name' className='text-base md:text-xl font-light font-sans px-3 py-2 rounded-md outline-none border-slate-400 ' autoComplete='false' name='lname' value={formValue.lname} onChange={upDateValues} required/>
                <input type="email" placeholder='Email' className='text-base md:text-xl font-light font-sans px-3 py-2 rounded-md outline-none border-slate-400 ' autoComplete='false' name='email' value={formValue.email} onChange={upDateValues} required/>
                <input type="password" placeholder='Password' className='text-base md:text-xl font-light font-sans px-3 py-2 rounded-md outline-none border-slate-400 ' autoComplete='false' name='password' value={formValue.password} onChange={upDateValues} required/>
                
                <button className='text-base bg-green-400 rounded-md md:text-xl font-["Source Sans Pro", "sans-serif"] font-bold px-2 py-3 shadow-lg text-slate-700 outline-none border-none active:bg-green-300 active:text-slate-600' onClick={submit}>
                    Submit
                </button>
            </form>


                <div className='text-xs md:text-sm text-center'>Already have an account?
                <Link to='/login' className='px-2 font-bold text-green-600 hover:underline hover:underline-offset-2 '>
                 Login Here
                </Link>
                 </div>
                 
          </div>

          </div>
      </div>
    </div>
    </>
  )
}

    // <form class="flex flex-col gap-2" onSubmit={(e)=>e.preventDefault}>
    //       <input name='fname' type='text' required placeholder="fname" value={formValue.fname} onChange={upDateValues}/>
    //       <input name='lname' type='text' required placeholder="lname" value={formValue.lname} onChange={upDateValues}/>
    //       <input name='email' type='email' required placeholder="example@email.com" value={formValue.email} onChange={upDateValues}/>
    //       <input name='password' type='password' required placeholder="password" value={formValue.password} onChange={upDateValues}/>
    //       <button onClick={submit}>Submit</button>
    //     </form>
    //     <Link to="/login">all ready have an account</Link>
    //     <div>
    //       {dat}
    //     </div>