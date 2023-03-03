import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import male from './media/img/maleIcon.png'
import female from './media/img/femaleIcon.png'
import NodeContext from '../contexts/NodeContext'

export default function TopNav() {
    const [admin_menu, setadmin_menu] = useState(false)
    const open=()=>setadmin_menu(true)
    const close=()=>setadmin_menu(false)

    const a = useContext(NodeContext)

    
    useMemo(async() => {
        console.log("called userData")
        await a.userData();
    }, []);

  return (
    <>
        <div className='fixed top-0 w-full h-auto justify-end align-middle item-center pr-8 py-5 grid grid-flow-col gap-5 bg-slate-100 shadow-md'>
            
            <div onClick={admin_menu === false ? open : close}>
                    <div className="rounded-full cursor-pointer">
                        <img className="rounded-full w-8 h-8 border-[2px] border-blue-600 mt-0" src={a.user.gender === "male" ? male : a.user.gender === "female" ? female : male} alt="" />
                    </div>
                <div className={admin_menu === true ? 'admin-menu' : 'admin-menu hide'}>

                    <Link to='/logout'>
                        <span className='admin-menu-btn'>Log Out</span>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}