import React, { useEffect, useState } from 'react'
import Bubble from './Bubble'
import Logo from './media/svg/Logo'
import male from './media/img/maleIcon.png'
import female from './media/img/femaleIcon.png'
import BubbleBig from './BubbleBig'
import UserNav from './UserNav'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'


export default function Dashbord(props) {

    const [dashbord, setdashbord] = useState(false)
    const open = ()=> setdashbord(true)
    const close = ()=> setdashbord(false)

    // const [ActiveLink, setActiveLink] = useState(false)

    const links = [
        {
            to:'/myClass',
            name : 'My class',
            icon : <i className="fa-solid fa-users"></i>
        },
        {
            to:'/message',
            name : 'Message',
            icon : <i className="fa-solid fa-envelope"></i>
        },
        {
            to:'/notifications',
            name : 'Notification',
            icon : <i className="fa-solid fa-circle-info"></i>
        },
        {
            to:'/backpack',
            name : 'Backpack',
            icon : <i className="fa-solid fa-suitcase"></i>
        },
        {
            to:'/logout',
            name : 'Logout',
            icon : <i class="fa-solid fa-power-off"></i>
        },
    ]

    const [user, setUser] = useState({
        name : "",
        lable : "",
        gender : "male"
    })

    // useEffect(
        const userData = async() => {
        let cookie = new Cookies()
        let result
        try {
            result = await axios.get('/myData', {
                headers: {
                    'Authorization': 'Bearer ' + cookie.get('token')
                }
            })
            setUser({...user,name : result.data.fname + " " + result.data.lname, lable : result.data.lable});
        } catch (error) {
            console.log(error);
        }}

        useEffect(() => {
        userData();
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

            <Link to='/profile'>
                <UserNav name={user.name} lable={user.lable} img={user.gender === "male" ? male : user.gender === "female" ? female : male}/>
            </Link>
            <div className="inner-nav">
            {
                props.links ?
                props.links.map((elem)=>{
                    return(
                        <>
                        <Link to={elem.to}>
                            <BubbleBig name={elem.name} icon={elem.icon} />
                        </Link>                
                        </>
                    )
                })
                :
                links.map((elem)=>{
                    return(
                        <>
                        <Link to={elem.to}>
                            <BubbleBig name={elem.name} icon={elem.icon} />
                        </Link>                
                        </>
                    )
                })
            }
            {/* <Link to='/myClass'>
                <BubbleBig name="My class" icon={<i className="fa-solid fa-users"></i>} />
            </Link>
            <Link to='/message'>
                <BubbleBig name="Messages" icon={<i className="fa-solid fa-envelope"></i>} />
            </Link>
            <Link to='/notificatioins'>
                <BubbleBig name="Notifications" icon={<i className="fa-solid fa-circle-info"></i>} />
            </Link>
            <Link to='/backpack'>
                <BubbleBig name="Backpack" icon={<i className="fa-solid fa-suitcase"></i>} />
            </Link> */}


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
            <Link to='/profile'>
                <span className="rounded-full cursor-pointer">
                    <img className="rounded-full w-11 h-11 border-[2px] border-blue-600 md:mt-24 sm:mt-12 mt-6" src={user.gender === "male" ? male : female} alt="" />
                </span>
            </Link>

            <div className="inner-nav pt-3">

            {
                props.links?
                    props.links.map((elem)=>{
                        return(
                            <>
                                <Link to={elem.to}>
                                    <Bubble name={elem.name} icon={elem.icon} />
                                </Link>
                            </>
                        )
                    })
                :
                    links.map((elem)=>{
                        return(
                            <>
                                <Link to={elem.to}>
                                    <Bubble name={elem.name} icon={elem.icon} />
                                </Link>
                            </>
                        )
                    })
                    

            }
                {/* <Link to='/myClass'>
                    <Bubble name="My Class" icon={<i className="fa-solid fa-users xl:text-2xl md:text-lg" to='/myClass'></i>}/>
                </Link>
                <Link to='/message'>
                    <Bubble name="Messages" icon={<i className="fa-solid fa-envelope xl:text-2xl md:text-lg"></i>}/>
                </Link>
                <Link to='/notifications'>
                    <Bubble name="Notifications" icon={<i className="fa-solid fa-circle-info xl:text-2xl md:text-lg"></i>}/>
                </Link>
                <Link to='/backpack'>
                    <Bubble name="Backpack" icon={<i className="fa-solid fa-suitcase xl:text-2xl md:text-lg"></i>}/>
                </Link> */}

                
                
                
                

            </div>
        </nav>
        <div className='fixed z-10 sm:hidden pt-5 pl-8 text-xl text-slate-800 cursor-pointer' onClick={dashbord?close:open}>
            <i className="fa-solid fa-bars-staggered"></i>
        </div>
        </>
  )
}
