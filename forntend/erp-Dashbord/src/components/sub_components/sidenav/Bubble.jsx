import React, { useState } from 'react'

export default function Bubble(props) {
        
    const [tooltip, settooltip] = useState(false)
    const open_tp = ()=> settooltip(true)
    const close_tp = () => settooltip(false)

  return (
    <>
        <div className={props.active ? "btn-side-nav-mini-active" : "btn-side-nav-mini"} onMouseOver={open_tp} onMouseOut={close_tp}>
                    <div className='w-full h-full flex items-center justify-center'>
                        <span className="">{props.icon}</span>
                    </div>
                    <div className={tooltip === true ? "tol-tip" : "tol-tip hide-toltip"}>
                        <span>{props.name}</span>
                    </div>
            </div>
    </>
  )
}
