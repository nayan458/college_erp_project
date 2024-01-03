import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TeacherDataTable from '../adminPageComponents/basicComponent/TeacherDataTable';
import StudentDataTable from '../adminPageComponents/basicComponent/StudentDataTable';
import DepartmentDataTable from '../adminPageComponents/basicComponent/DepartmentDataTable';
import AddTeachers from '../adminPageComponents/basicComponent/AddTeachers';
import AddStudents from '../adminPageComponents/basicComponent/AddStudents';
import AddDepartment from '../adminPageComponents/basicComponent/AddDepartment';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function AdminHome() {

  return (
    <>
        <div className='w-full h-full bg-slate-200 fixed top-0 left-0 pt-[4.5rem] sm:pl-[4.3rem] overflow-y-scroll '>
          <Box sx={{ flexGrow: 1 , paddingX: 3, paddingY: 5}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8} md={7}>
                <Item>
                  <p className='font-bold text-sm text-slate-500 '>Teacher's Data</p>
                  <TeacherDataTable/>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4} md={5}>
                <Item sx={{height : '100%'}}>
                  <p className='font-bold text-sm text-slate-500 '>Add New Teacher</p>
                  <AddTeachers/>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4} md={5}>
                <Item>
                  <p className='font-bold text-sm text-slate-500 '>Add New Student</p>
                  <AddStudents/>
                </Item>
              </Grid>
              <Grid item xs={12} sm={8} md={7}>
                <Item>
                  <p className='font-bold text-sm text-slate-500 '>Student's Data</p>
                  <StudentDataTable/>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Item>
                  <p className='font-bold text-sm text-slate-500 '>Department's Data</p>
                  <DepartmentDataTable/>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Item>
                  <p className='font-bold text-sm text-slate-500 '>Add New Department</p>
                  <AddDepartment/>
                </Item>
              </Grid>
            </Grid>
        </Box>
        </div>
    </>
  )
}
