import React, { useState } from 'react'

export default function Mail(props) {
    
    const [mailEditor, setmailEditor] = useState(false)
    const open = ()=> setmailEditor(true)
    const close = () => setmailEditor(false)
    

  return (
        <>
            <div className={props.mailEditor===true?'mail-box-outer' : 'mail-box-outer mail-box-hidden-animation-outer'}>
                <div className={props.mailEditor===true?'mail-box':'mail-box mail-box-hidden-animation-inner'}>

                    <div className='flex justify-between'>
                        <p className='font-bold sm:text-sm md:text-lg'>New Message</p>
                        <div className='close-btn' onClick={close}><i class="fa-solid fa-xmark"></i></div>
                    </div>
                    
                    <div>
                        <input placeholder='To' name='address' className='mail-inputs'>
                        </input>
                    </div>

                    <div>
                        <input placeholder='Subject' name='subject' className='mail-inputs' type="text">
                        </input>
                    </div>
                    <div className='w-full h-full bg-transparent'>
                        <div className='mail-editor' data-placeholder='Type Your Message' placeholder='Type Your Message' contentEditable="true"></div>
                    </div>

                    <div>
                        <button className='w-auto h-auto bg-green-600 rounded-md px-3 py-1 mt-2 text-slate-200 font-medium md:text-lg hover:bg-green-400 hover:text-slate-100 transform duration-100 ease-in-out focus:text-slate-600 focus:bg-green-400'>send </button>
                    </div>
                </div>
            </div>
            
            <button className='fixed bottom-0 right-0 rounded-full w-20 h-20 bg-green-500 text-white p-3 m-10 text-5xl flex justify-center items-center align-middle' onClick={mailEditor === false ? open : close}>
                <span>+</span>
            </button>
        </>
  )
}

