import React, { useEffect, useState } from 'react'
import DataTable from '../muiAdminComponent/DataTable'
import { adminInstance } from '../../../../Api/api'
import Cookies from 'universal-cookie'

export default function DepartmentDataTable() {

    const [rows, setRows] = useState([
        {
            id : 1,
            dep_id : null,
            dep_name : null
        }
    ])

    const columns = [
        {
            field : 'id',
            headName : 'SI',
            sortable : true,
            width : 100,
        },
        {
            field : 'dep_id',
            headName : 'Department ID',
            sortable : false,
            width : 100,
        },
        {
            field : 'dep_name',
            headName : 'Department Name',
            sortable : false,
            width : 100
        }
    ]


    useEffect(() => {
        const getDepartment=async()=>{
            let cookie = new Cookies
            let DepartmentData = await adminInstance.get('/allDepartments',{
                headers : {
                    'Authorization' : 'Bearer ' + cookie.get('token')
                }
            })
            let DepartmentDataId = await DepartmentData.data.map((elem, index)=>({
                ...elem,
                id : index
            }))
            setRows(DepartmentDataId)
        }

        getDepartment()

    }, [])
    

  return (
    <>
        <DataTable
            columns={columns}
            rows={rows}
        />
    </>
  )
}
