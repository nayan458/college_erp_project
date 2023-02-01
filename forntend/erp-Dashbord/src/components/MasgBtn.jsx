import React, { useState } from 'react'

export default function MasgBtn(props) {

    const [selected, setselected] = useState(false)
    const check=()=> setselected(true)
    const nocheck=()=> setselected(false)

  return (
    <>
        <div className={selected || props.selected ? 'outerMsg outer_selected overflow-hidden' : 'outerMsg overflow-hidden'}>
            <div>
                <div className='innerMsg' onClick={selected===true ? nocheck : check}>
                    {selected===true || props.selected? <i className="fa-solid fa-check"></i> : props.nameLogo}
                </div>
            </div>
            
            <div className='overflow-auto'>
                
                <div className='font-semibold'>
                    {props.usrName}
                </div>

                <div className='truncate box-border '>
                    {props.msg}
                </div>

            </div>

            <div className='flex-1 justify-end items-center'>
                <div className='date_msg min-w-max'>
                    <span>{props.date}</span>
                </div>
            </div>

        </div>
    </>
  )
}
