import React from 'react'
import useAssignment from '../../../hooks/useAssignment'
import MenuItem from '@mui/material/MenuItem';

export default function ActionBtns() {
  return (
    <div>ActionBtns</div>
  )
}

const DownloadBtn = ({elem}) =>{
    const {downloadAssignment} = useAssignment()
    return(
        <MenuItem key='upload' onClick={(e)=>downloadAssignment(e,elem)}>
            download
          </MenuItem>
    )
}

const SubmitBtn = ({elem}) =>{
    const {setuploadEditor} = useAssignment()
    return(
        <MenuItem key='upload' onClick={setuploadEditor(true)}>
            Submit
          </MenuItem>
    )
}

export {DownloadBtn, SubmitBtn}