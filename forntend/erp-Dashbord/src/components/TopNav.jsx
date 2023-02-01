import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminPhoto from './media/img/tonySir.png'
import Tooltip from './Tooltip'


export default function TopNav() {
    const [admin_menu, setadmin_menu] = useState(false)
    const open=()=>setadmin_menu(true)
    const close=()=>setadmin_menu(false)

  return (
    <>
        <div className='fixed top-0 w-full h-auto justify-end align-middle item-center pr-8 py-5 grid grid-flow-col gap-5 bg-slate-100 shadow-md'>
            <Link to='/myClass'>
                <Tooltip class="fa-solid fa-users text-xl text-slate-400 hover:text-slate-800 cursor-pointer" name="My class"/>
            </Link>
            <Link to='/notifications'>
            <Tooltip class="fa-solid fa-bell text-xl text-slate-400 hover:text-slate-800 cursor-pointer" name="Notifications"/>
            </Link>
            
            <div onClick={admin_menu === false ? open : close}>
                    <div className="rounded-full cursor-pointer">
                        <img className="rounded-full w-8 h-8 border-[2px] border-blue-600 mt-0" src={AdminPhoto} alt="" />
                    </div>
                <div className={admin_menu === true ? 'admin-menu' : 'admin-menu hide'}>
                
                    <Link to='/admin'>
                    <span className='admin-menu-btn'>Profile
                        <hr className='horizon'/>
                    </span>
                    </Link>
                    <Link to='/admin'>
                    <span className='admin-menu-btn'>Change Password
                        <hr className='horizon'/>
                    </span>
                    </Link>
                    <Link to='/admin'>
                        <span className='admin-menu-btn'>Log Out</span>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}
