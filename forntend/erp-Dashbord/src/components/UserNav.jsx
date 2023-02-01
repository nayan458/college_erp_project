import React from 'react'

export default function UserNav(props) {
  return (
    <div className="user-nav">

            <span className="mr-3 border-[3px] border-blue-500 rounded-full">
                <img className="rounded-full w-10 h-10" src={props.img} alt=""/>
            </span>

            <span>
                <span className="font-bold font-[Righteous] text-sm">
                    {props.name}
                </span>
                <br/>
                <span className="text-[.8rem]">
                    {props.lable}
                </span>
            </span>
            </div>
  )
}
