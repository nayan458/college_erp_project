import React from 'react'

export default function BubbleBig(props) {
  return (
    <>
        <div className={props.active ? "btn-side-nav-active" :"btn-side-nav"}>
                <span className="mr-3">{props.icon}</span>
                <span>{props.name}</span>
            </div>
    </>
  )
}
