import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Tooltip from './Tooltip'
import male from './media/img/maleIcon.png'
import female from './media/img/femaleIcon.png'
import NodeContext from '../contexts/NodeContext'


export default function TopNav() {
    const [admin_menu, setadmin_menu] = useState(false)
    const open=()=>setadmin_menu(true)
    const close=()=>setadmin_menu(false)

    // const [user, setUser] = useState({
    //     name : "",
    //     lable : "",
    //     gender : "female"
    // })

    const a = useContext(NodeContext)

    // const userData = async() => {
    //     let cookie = new Cookies()
    //     let result
    //     try {
    //         result = await axios.get('/myData', {
    //             headers: {
    //                 'Authorization': 'Bearer ' + cookie.get('token')
    //             }
    //         })
    //         setUser({...user,name : result.data.fname + " " + result.data.lname, lable : result.data.lable, gender : a.user.gender});
    //     } catch (error) {
    //         console.log(error);
    //     }}

        useEffect(() => {
            console.log("a.userData is called")
            a.userData();
        }, []);

  return (
    <>
        <div className='fixed top-0 w-full h-auto justify-end align-middle item-center pr-8 py-5 grid grid-flow-col gap-5 bg-slate-100 shadow-md'>
            <Link to='/myClass'>
                <Tooltip className="fa-solid fa-users text-xl text-slate-400 hover:text-slate-800 cursor-pointer" name="My class"/>
            </Link>
            <Link to='/notifications'>
            <Tooltip class="fa-solid fa-bell text-xl text-slate-400 hover:text-slate-800 cursor-pointer" name="Notifications"/>
            </Link>
            
            <div onClick={admin_menu === false ? open : close}>
                    <div className="rounded-full cursor-pointer">
                        <img className="rounded-full w-8 h-8 border-[2px] border-blue-600 mt-0" src={a.user.gender === "male" ? male : a.user.gender === "female" ? female : male} alt="" />
                    </div>
                <div className={admin_menu === true ? 'admin-menu' : 'admin-menu hide'}>
                
                    <Link to='/profile'>
                    <span className='admin-menu-btn'>Profile
                        <hr className='horizon'/>
                    </span>
                    </Link>
                    <Link to='/admin'>
                    <span className='admin-menu-btn'>Change Password
                        <hr className='horizon'/>
                    </span>
                    </Link>
                    <Link to='/logout'>
                        <span className='admin-menu-btn'>Log Out</span>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}
