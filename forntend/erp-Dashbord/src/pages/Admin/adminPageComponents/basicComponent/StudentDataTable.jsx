import React, { useEffect } from 'react';
import DataTable from '../muiAdminComponent/DataTable';
import { adminInstance } from '../../../../Api/api';
import { useState } from 'react';
import Cookies from 'universal-cookie';

export default function StudentDataTable() {

    const [rows, setrows] = useState([
        { 
            id : 1,
            student_id: '',
            fname : '',
            lname : '',
            email : '',
            gender : '',
            username : '',
            location : '',
            dep_id : '',
        },
    ])

    const columns = [
        { 
            field: 'id', 
            headerName: 'SI', 
            width : 100,
            sortable: true,
        },
        {
            field: 'fname',
            headerName: 'First Name',
            width : 100,
            sortable : false
        },
        {
            field: 'lname',
            headerName: 'Last Name',
            width : 100,
            sortable : false
        },
        {
            field: 'email',
            headerName: 'Email',
            width : 150,
            type : 'email',
            sortable : false
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width : 100,
            sortable : false
        },
        {
            field: 'username',
            headerName: 'Username',
            width : 100,
            sortable : false
        },
        {
            field: 'location',
            headerName: 'Location',
            width : 100,
            sortable : false
        },
    ];
    
    useEffect(() => {
        let getRows=async()=>{
            let cookie = new Cookies
            try{
                let teacherData = await adminInstance.get('/allStudents',{
                    headers : {
                        'Authorization' : 'Bearer ' + cookie.get('token')
                    }
                })
                let techDataId = teacherData.data.map((elem, index)=>({
                    ...elem,
                    id: index + 1
                }));

                setrows(techDataId)

            } catch(err){
                console.log(`ERROR : ${err}`)
            }
        }
        getRows()
    }, [])

  return (
    <>
        <DataTable columns={columns} rows={rows}/>
    </>
  )
}
