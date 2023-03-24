import React from 'react'
import { useState } from 'react'

export default function AdminDashboard() {

  const [Form, setForm] = useState({
    students : false,
    classes : false,
    teacher : false,
    addStudentoclass : false
  })

  const [students, setStudents] = useState('{ fname: "Sobit", lname: "Prasad", email: "sobit@gmail.com", gender : "male", username: "sobit123", password: "sobit123", location: "Guwahati", std_semester: "1s", department: "BCA"}')
  const [teacher, setteachers] = useState('{"tech_fname": "Tony","tech_lname": "Sir","email": "tonysir@gmail.com","gender":"male","username" : "tonysirbca","password" : "pass","location" : "Guwahti","department" : "BCA"}')
  const [classes, setclasses] = useState('{"class_name" : "","class_desc" : "","class_semester" : "6th","tech_id" : 2}')
  const [addStudentoclass, setaddStudetnToClass] = useState('{"classe_id" : 5,"student_id" : 10 }')

  const [output, setOutput] = useState()
  const outputFunc=()=>{
    console.log(Object.keys(Form)[0])
    console.log(JSON.parse(students))
    setOutput()
  }
  

  let elem
  const func=(e)=>{
    elem = e.target.value
    setForm({[elem]:true})
  }
  return (
    <>
        
         <div className='w-screen h-screen flex flex-col gap-10  justify-center align-middle items-center py-8'>
            <div contentEditable="true" className='w-[80%] h-[400px] ring-offset-4 border-[2px] border-dashed border-blue-700  bg-slate-300 p-3 rounded-lg overflow-auto'>
                {
                  Form.students ? <>{students} <span><br/><pre>
                  URL : localhost:8000/api/registerStudent 
                  </pre>
                  </span></>
                      : Form.classes ? <>{classes}<span><br/><pre>
                        URL : localhost:8000/api/registerTeacher
                      </pre>  </span></>
                      : Form.teacher ? <>{teacher}<span><br/><pre>
                        URL : localhost:8000/api/registerClasses
                      </pre>  </span></>
                      : Form.addStudentoclass ? <>{addStudentoclass}<span><br/><pre>
                        URL : localhost:8000/api/addStudentsToClass
                      </pre>  </span></>
                      : <> Nothing selected </>
                }
            </div>
            <div className='flex gap-5'>
              <button className='px-3 py-2 bg-blue-500 text-slate-200 rounded-md cursor-pointer active:bg-orange-400' value="students" onClick={(e)=>func(e)}>Add students</button>
              <button className='px-3 py-2 bg-blue-500 text-slate-200 rounded-md cursor-pointer active:bg-orange-400' value="classes" onClick={(e)=>func(e)}>Add classes</button>
              <button className='px-3 py-2 bg-blue-500 text-slate-200 rounded-md cursor-pointer active:bg-orange-400' value="teacher" onClick={(e)=>func(e)}>Add teachers</button>
              <button className='px-3 py-2 bg-blue-500 text-slate-200 rounded-md cursor-pointer active:bg-orange-400' value="addStudentoclass" onClick={(e)=>func(e)}>Add students to class</button>
              <button className='px-3 py-2 bg-green-500 text-slate-200 rounded-md cursor-pointer active:bg-orange-400' onClick={ outputFunc}>Run</button>
            </div>
            <div className='w-[80%] min-h-[200px] bg-slate-300'>
                  {output}
            </div>
         </div>

    </>
  )
}
