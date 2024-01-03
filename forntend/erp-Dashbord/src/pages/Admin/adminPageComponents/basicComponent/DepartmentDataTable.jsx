import React, { useEffect, useState } from 'react'
import DataTable from '../muiAdminComponent/DataTable'
import { adminInstance } from '../../../../Api/api'

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
            let DepartmentData = await adminInstance.get('/allDepartments')
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
