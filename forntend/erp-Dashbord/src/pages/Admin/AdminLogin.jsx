import React, { useContext, useEffect } from 'react'
import useForm from '../../hooks/adminHooks/useForm'
import NodeContext from '../../contexts/NodeContext'
import Cookies from 'universal-cookie'
import { Link, useNavigate } from 'react-router-dom'
import LogoDark from '../../components/media/svg/LogoDark'
import college_logo from '../../components/media/img/college_logo.png'

export default function AdminLogin() {

    const {formdata, updateFormData, login} = useForm({email: "", password: ""})
    const {setUser,user} = useContext(NodeContext)

    const cookie = new Cookies()
    const redirect = useNavigate()

    const submit=async(e)=>{
      try{
        e.preventDefault();
        const rslt = await login()

        if(rslt.user.data === false)
          throw new Error ("Invalid credintials")
        
        cookie.set('token', rslt.data.token,{expires : new Date.now() + 36000000})
        cookie.set('gender',rslt.data.user.gender)
        cookie.set('lable',rslt.data.lable)

        setUser({
          ...user,
          lable : rslt.data.lable, 
          gender : 'male'
        })

        alert(`${rslt.data.lable} loged in successfully`);

      } catch(error){
        if(error){
          alert(error);
        }
      }

      redirect('/admin')

    }

    useEffect(() => {
      cookie.remove('token');  
      cookie.remove('name');
      cookie.remove('gender');
      cookie.remove('lable');
      cookie.remove('student_id');
    
    }, [])
    

  return (
    <>
    {/*  */}
      <div className='w-screen min-h-screen md:flex justify-center align-middle items-center bg-slate-100 px-6 py-1'>
      
        <div className='top-0 pl-5 pt-2 pr-4 sm:px-10 md:px-[3rem] lg:px-24 left-0 bg-slate-100 md:absolute'>
          <Link to='/'>
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
            
            <div className='col-span-7 md:col-span-5 px-4 sm:px-16 lg:px-24 py-2 mt-11 md:mt-0'>
              <div className='grid gap-8 md:gap-14 '>

                <p className='grid'>
                <span className='text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] lg:text-[2.5rem] text-[#1F2833] font-["Source Sans Pro", "sans-serif"] font-bold'>
                {/* Done */}
                  Login Here
                </span>
                <span className='text-[.8rem] sm:text-[.8rem] md:text-[.8rem] lg:text-[1rem] text-[#1F2833]/60 font-["Source Sans Pro", "sans-serif"] font-bold'>
                {/* Done */}
                  Fill in your details below.
                </span>
                </p>
                {/* Main form */}
                <form className="grid gap-4 md:gap-7" onSubmit={(e)=>e.preventDefault}>
                    <input type="email" placeholder='Email' className='text-base md:text-xl font-light font-sans px-3 py-2 rounded-md outline-none border-slate-400 ' autoComplete='false' name='email' value={formdata.email} onChange={updateFormData} required/>
                    <input type="password" placeholder='Password' className='text-base md:text-xl font-light font-sans px-3 py-2 rounded-md outline-none border-slate-400 ' autoComplete='false' name='password' value={formdata.password} onChange={updateFormData} required/>
                    <button className='text-base bg-green-400 rounded-md md:text-xl font-["Source Sans Pro", "sans-serif"] font-bold px-2 py-3 shadow-lg text-slate-700 outline-none border-none active:bg-green-300 active:text-slate-600' onClick={submit}>
                        Login
                    </button>
                </form>
                    
              </div>

            </div>
        </div>
      </div>
    </> 
  )
}
