import React, { useContext, useEffect, useState } from 'react'
import Bubble from './sub_components/sidenav/Bubble'
import Logo from './media/svg/Logo'
import male from './media/img/maleIcon.png'
import female from './media/img/femaleIcon.png'
import BubbleBig from './sub_components/sidenav/BubbleBig'
import UserNav from './sub_components/sidenav/UserNav'
import { Link } from 'react-router-dom'
import NodeContext from '../contexts/NodeContext'


export default function Dashbord(props) {

    const [dashbord, setdashbord] = useState(false)
    const open = ()=> setdashbord(true)
    const close = ()=> setdashbord(false)

    const a = useContext(NodeContext)

    const links = [
        {
            // to:`/myClass/${a.user.student_id}`,
            to:`/myClass`,
            name : 'My class',
            icon : <i className="fa-solid fa-users"></i>
        },
        {
            to:'/logout',
            name : 'Logout',
            icon : <i className="fa-solid fa-power-off"></i>
        },
    ]
        useEffect(() => {
            a.userData();
        }, []);
        
  return (

        <>
        <div className={dashbord ? 'black-screen' : 'black-screen-active'} onClick={close}></div>
        <nav className={dashbord === true ? "nav" : "nav hide-nav"} id="full-nav">

            <div className="text-white font-[Righteous] flex"> 
                <div className="flex justify-between w-full item-center align-middle">
                <Logo/>
                    <button className=" w-6 h-full rounded-sm" id="close-nav" onClick={close}>
                        <span>
                            <i className="fa-solid fa-backward"></i>
                        </span>
                    </button>
                </div>
            </div>

            {/* <Link to='/profile'> */}
                <UserNav name={a.user.name} lable={a.user.lable} img={a.user.gender === "male" ? male : a.user.gender === "female" ? female : male}/>
            {/* </Link> */}
            <div className="inner-nav">
            {
                props.links ?
                props.links.map((elem,i)=>{
                    return(
                        <>
                        <Link to={elem.to} key={i}>
                            <BubbleBig name={elem.name} icon={elem.icon} />
                        </Link>                
                        </>
                    )
                })
                :
                links.map((elem,i)=>{
                    return(
                        <>
                        <Link to={elem.to} key={i}>
                            <BubbleBig name={elem.name} icon={elem.icon} />
                        </Link>                
                        </>
                    )
                })
            }


            </div>
        </nav>
        {/* THIS IS MINI NAVIGATION */}
        <nav className="nav-mini">

            <div className="text-white font-[Righteous] flex justify-center">
                
                
                <button className=" w-6 h-6 rounded-md hover:bg-gray-700 mt-3" id="open-nav" onClick={open}>
                <span>
                    <i className="fa-solid fa-forward"></i>
                </span>
                </button>

            </div>
            {/* <Link to='/profile'> */}
                <span className="rounded-full cursor-pointer">
                    <img className="rounded-full w-11 h-11 border-[2px] border-blue-600 md:mt-24 sm:mt-12 mt-6" src={a.user.gender === "male" ? male : a.user.gender === "female" ? female : male} alt="" />
                </span>
            {/* </Link> */}

            <div className="inner-nav pt-3">

            {
                props.links?
                    props.links.map((elem,i)=>{
                        return(
                            <>
                                <Link to={elem.to} key={i}>
                                    <Bubble name={elem.name} icon={elem.icon} />
                                </Link>
                            </>
                        )
                    })
                :
                    links.map((elem,i)=>{
                        return(
                            <>
                                <Link to={elem.to} key={i}>
                                    <Bubble name={elem.name} icon={elem.icon} />
                                </Link>
                            </>
                        )
                    })
                    

            }

            </div>
        </nav>
        <div className='fixed z-10 sm:hidden pt-5 pl-8 text-xl text-slate-800 cursor-pointer' onClick={dashbord?close:open}>
            <i className="fa-solid fa-bars-staggered"></i>
        </div>
        </>
  )
}
