import React, { useState } from 'react'

export default function Tooltip(props) {
    const [tooltip, settooltip] = useState(false)
    const open=()=>settooltip(true)
    const close=()=>settooltip(false)
  return (
    <>
        <div>
                <i className={props.class} onMouseOver={open} onMouseOut={close}></i>
                <span className={tooltip===true? 'top-nav-tooltip' : 'top-nav-tooltip hide-toltip'}>{props.name}</span>
            </div>
    </>
  )
}
