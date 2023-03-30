import fileDownload from 'js-file-download'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import instance from '../Api/api'

export default function useAssignment(init) {
    
    const [ActClass, setActClass] = useState(init)

    // elem management
    // const [elem, setElem] = useState({})

    // loader
    const [loder, setLoder] = useState(true)

    // editor for uploading
    const [uploadEditor, setuploadEditor] = useState(false)
    const close=()=>setuploadEditor(false)
    
    // to get assignments

    const [assignments, setassignments] = useState([])
    const [assignmentsStatus, setassignmentsStatus] = useState([])

    const getAssignments = async()=>{
        let result
        try{
            
            let cookie = new Cookies();
            result = instance.get(`student/viewAssignments/${ActClass}`,{
                headers : {
                    'Authorization' : 'Bearer ' + cookie.get('token')
                }
            })
            setassignments((await result).data.pending)
            setassignmentsStatus((await result).data.submited)

        } catch(err){
            console.log(err)
            Navigate('/unauthorized')
        }
        setLoder(false)
    }


    // download assignment(elem)
        const downloadAssignment=(e,elem)=>{
            e.preventDefault()
            let cookie = new Cookies();

            instance.get(`student/download/${elem.assignment_id}`,{
                responseType : "blob",
                headers : {
                    'Authorization' : 'Bearer ' + cookie.get('token')
                }
            }
            ).then((response)=>{
                fileDownload(response.data,`${elem.ass_name}.pdf`)
            }).catch((error)=>{
                console.log(error);
            })
        }

    // submit assignment

        const [assignmentSubmitionData, setAssignmentSubmitionData] = useState({
            assignment : null,
            name : "Hello",
            ass_id : "",
        })

        let name, value

        const updateHandeler=(e)=>{
            name = e.target.name
            value = e.target.value
            setAssignmentSubmitionData({...assignmentSubmitionData,[name] : value})
        }

        const fileHandeler= file =>{
            setAssignmentSubmitionData({...assignmentSubmitionData, assignment : file[0]})
        }

        const [submit, setSubmit] = useState(true)

        const submitAssignment=async(e)=>{
            setSubmit(false)
            e.preventDefault()
            let cookie = new Cookies()
            let formdata = new FormData()
            formdata.append('assignment',assignmentSubmitionData.assignment);
            formdata.append('name',assignmentSubmitionData.name);
            formdata.append('ass_id',assignmentSubmitionData.ass_id);
            formdata.append('desc',assignmentSubmitionData.desc);
            let boundary = `--${Date.now()}`;
            try{
                await instance.post(`student/submit_assignment`,
                formdata,
                {
                    headers : {
                        'Content-Type': `multipart/form-data; boundary=${boundary}`,
                        'Authorization' : 'Bearer ' + cookie.get('token')
                    }
                })
                setLoder(true)
                setSubmit(true)
                getAssignments()
                alert("assignment submited successfully")
                close()
            }catch(err){
                console.log(err);
            }
        }

    // open the upload editor
        const open=(e,elem)=>{
            setuploadEditor(true)
            setAssignmentSubmitionData({...assignmentSubmitionData,ass_id : elem.assignment_id})
        }

        useEffect(() => {
          getAssignments()
        }, [])
        

  return {
    loder, setLoder,
    assignments, assignmentsStatus, getAssignments,
    downloadAssignment,
    uploadEditor,close,open,
    assignmentSubmitionData, fileHandeler, updateHandeler,
    submitAssignment, submit,
    setuploadEditor
  }
}
