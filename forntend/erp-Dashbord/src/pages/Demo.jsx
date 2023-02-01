import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../API/SignUpController'

export default function Demo() {

const redirect = useNavigate();
const [formValue, setFormValue] = useState({email : "",password : ""})  
const [formValueRegister, setformValueRegister] = useState({fname:"",lname:"",email:"",password:""})
let name,value
const writeUpdate=(e)=>{name = e.target.name;value = e.target.value;setFormValue({...formValue,[name] : value});console.log(formValue)}
const writeUpdateRegister=(e)=>{
  name = e.target.name;
  value = e.target.value;
  setformValueRegister({...formValueRegister,[name] : value});
  console.log(formValueRegister)}

const submit=async(e)=>{
  e.preventDefault();
  console.log('next')
  let auth = await login(formValue);
  if(auth)
    alert("Loged in successfully")
  else
    alert("invalid credintials please try again")
}

const submitRegister=async(e)=>{
  e.preventDefault();
  console.log('register')
  let auth = await register(formValueRegister)
  if(auth){
    alert("registered successfully")
    redirect('/')
  }
  else
    alert("invalid form values please try again")
}



  return (
    <>
    <h3 className='text-lg text-red-500'>Login</h3>
      <form onSubmit={(e)=>{e.preventDefault()}} className="border-8 flex flex-col bg-green-100 px-6 py-2">
        <input name='email' value={formValue.email} type="email" onChange={writeUpdate} autoComplete="off" placeholder='email' className='max-w-3xl  text-base p-3 rounded-md border-4 border-blue-300' /><br/>
        <input name='password' value={formValue.password} type="password" onChange={writeUpdate} autoComplete="off" placeholder='password' className='max-w-3xl  text-base p-3 rounded-md border-4 border-blue-300' /><br/>
        <button onClick={submit} className='text-slate-800 bg-green-500 px-3 py-2'>submit</button>
      </form>
      <br/>
      <br/>
      <br/>
      <h3 className='text-lg text-red-500'>Register</h3>
      <form onSubmit={(e)=>{e.preventDefault()}} className="border-8 flex flex-col bg-green-100 px-6 py-2">
        <input name='fname' value={formValueRegister.fname} type="text" onChange={writeUpdateRegister} autoComplete="off" placeholder='fname' className='max-w-3xl  text-base p-3 rounded-md border-4 border-blue-300' /><br/>
        <input name='lname' value={formValueRegister.lname} type="text" onChange={writeUpdateRegister} autoComplete="off" placeholder='lname' className='max-w-3xl  text-base p-3 rounded-md border-4 border-blue-300' /><br/>
        <input name='email' value={formValueRegister.email} type="email" onChange={writeUpdateRegister} autoComplete="off" placeholder='email' className='max-w-3xl  text-base p-3 rounded-md border-4 border-blue-300' /><br/>
        <input name='password' value={formValueRegister.password} type="password" onChange={writeUpdateRegister} autoComplete="off" placeholder='password' className='max-w-3xl  text-base p-3 rounded-md border-4 border-blue-300' /><br/>
        <button onClick={submitRegister} className='text-slate-800 bg-green-500 px-3 py-2'>submit</button>
      </form>
    </>
  )
}
