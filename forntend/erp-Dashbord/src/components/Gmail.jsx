import React, { useState } from 'react'
import Checkbx from './Checkbx'
import GmlBtn from './GmlBtn'
import MasgBtn from './MasgBtn'
import MailsMsg from './MailsMsg'
import MailData from '../db/MailData'


export default function Gmail() {
  const [selected, setselected] = useState(false)

  const [tick, settick] = useState(false)
  const tick_on=()=> {settick(true); setselected(true)}
  const tick_off=()=> {settick(false); setselected(false)}

  const [mailEditor, setmailEditor] = useState(false)
  const open = ()=> setmailEditor(true)
  const close = () => setmailEditor(false)

  const [gmailDashbord, setGmailDashbord] = useState(false)
  const openGmailDashbord = ()=> setGmailDashbord(true)
  const closeGmailDashbord = ()=> setGmailDashbord(false)


  return (
        <>
            <div className='bg-green-600 w-full h-full pt-[4.5rem] pl-[4.3rem] fixed -z-20'>
                <div className='w-full h-full bg-slate-300 grid grid-cols-4 gap-[0.08rem] relative -z-10'>

                    <div className={gmailDashbord ? 'black-screen' : 'black-screen-active'} onClick={closeGmailDashbord}></div>
                    <div className={gmailDashbord ? 'Gmail-child-1' : 'Gmail-child-1-active'}>
                        <div>
                          <button className='w-full h-full bg-green-600 rounded-md px-3 py-1 my-4 text-slate-200 font-medium md:text-lg hover:bg-green-400 hover:text-slate-100 transform duration-100 ease-in-out focus:text-slate-600 focus:bg-green-400'
                          onClick={mailEditor === false ? open : close}
                          >
                            Compose Message
                          </button>
                          <hr className='shadow-sm shadow-slate-300'/>
                        </div>
                        <div>
                          <GmlBtn icon = {<i className="fa-solid fa-envelope"></i>} name = "All mails" />
                          <GmlBtn icon = {<i className="fa-solid fa-envelope-open"></i>} name="Inbox"/>
                          <GmlBtn icon = {<i className="fa-solid fa-paper-plane"></i>} name="Sent"/>
                        </div>
                    </div>

                    <div className='Gmail-child-2'>
                      <div className='pl-3 bg-slate-200 flex gap-4'>
                      <button 
                            className='Gmail-dashBord-Toggle-btn'
                            onClick={gmailDashbord ? closeGmailDashbord : openGmailDashbord}
                            >
                              <i class="fa-solid fa-bars-staggered"></i>
                          </button>

                          <button 
                            className='bg-blue-600 rounded-md px-3 py-1 my-4 text-slate-200 font-medium md:text-lg hover:bg-blue-400 hover:text-slate-100 transform duration-100 ease-in-out focus:text-slate-200 focus:bg-blue-800 flex justify-between align-middle items-center gap-3' 
                            onClick={tick === false ? tick_on : tick_off}
                              >
                              Read
                            <Checkbx val={tick}/>
                          </button>

                          
                          <hr className='shadow-lg shadow-green-300 '/>
                        </div>
                          <MailsMsg
                            comp = {MailData.map((value)=>{
                              return(<MasgBtn
                                nameLogo= {value.nameLogo} 
                                usrName={value.usrName}
                                msg = {value.msg}
                                date = {value.date}
                                selected = {selected}
                              />)
                            })}
                          />
                        </div>
                        </div>
                    </div>
          






















          {/* <Mail
            mailEditor = {mailEditor}
          /> */}
          {/*  */}

            <div className={mailEditor===true?'mail-box-outer' : 'mail-box-outer mail-box-hidden-animation-outer'}>
                <div className={mailEditor===true?'mail-box':'mail-box mail-box-hidden-animation-inner'}>

                    <div className='flex justify-between'>
                        <p className='font-bold sm:text-sm md:text-lg'>New Message</p>
                        <div className='close-btn' onClick={close}><i className="fa-solid fa-xmark"></i></div>
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
        </>
  )
}

//   return (
//         <>
//             <div className='bg-green-600 w-screen h-screen pt-[4.5rem] sm:pl-[4.3rem] fixed -z-20'>
//                 <div className='w-full h-full bg-slate-300 grid grid-cols-4 gap-[0.08rem] relative -z-10'>

//                     <div className='bg-blue-50 px-3 py-2'>
//                         <div>
//                           <button className='w-full h-full bg-green-600 rounded-md px-3 py-1 my-4 text-slate-200 font-medium md:text-lg hover:bg-green-400 hover:text-slate-100 transform duration-100 ease-in-out focus:text-slate-600 focus:bg-green-400'
//                           onClick={mailEditor === false ? open : close}
//                           >
//                             Compose Message
//                           </button>
//                           <hr className='shadow-sm shadow-slate-300'/>
//                         </div>
//                         <div>
//                           <GmlBtn icon = {<i className="fa-solid fa-envelope"></i>} name = "All mails" />
//                           <GmlBtn icon = {<i className="fa-solid fa-envelope-open"></i>} name="Inbox"/>
//                           <GmlBtn icon = {<i className="fa-solid fa-paper-plane"></i>} name="Sent"/>
//                         </div>
//                     </div>

//                     <div className='bg-slate-200 col-span-3 py-2'>
//                       <div className='ml-3'>
//                           <button 
//                             className='bg-blue-600 rounded-md px-3 py-1 my-4 text-slate-200 font-medium md:text-lg hover:bg-blue-400 hover:text-slate-100 transform duration-100 ease-in-out focus:text-slate-200 focus:bg-blue-800 flex justify-between align-middle items-center gap-3' 
//                             onClick={tick === false ? tick_on : tick_off}
//                               >
//                               Read
//                             <Checkbx val={tick}/>
//                           </button>
//                           <hr className='shadow-sm shadow-slate-300 '/>
//                         </div>
//                         <div className='pt-1 overflow-y-scroll'>
//                           <MasgBtn
//                             nameLogo="N" 
//                             usrName="Nayanmoni Baruah"
//                             msg = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, sed!"

//                           />
//                           <MasgBtn
//                             nameLogo="N" 
//                             usrName="Nayanmoni Baruah"
//                             msg = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, sed!"

//                           />
//                           <MasgBtn
//                             nameLogo="N" 
//                             usrName="Nayanmoni Baruah"
//                             msg = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, sed!"

//                           />
//                           <MasgBtn
//                             nameLogo="N" 
//                             usrName="Nayanmoni Baruah"
//                             msg = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, sed!"

//                           />
//                           <MasgBtn
//                             nameLogo="N" 
//                             usrName="Nayanmoni Baruah"
//                             msg = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, sed!"

//                           />
//                           <MasgBtn
//                             nameLogo="N" 
//                             usrName="Nayanmoni Baruah"
//                             msg = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, sed!"

//                           />
//                           <MasgBtn
//                             nameLogo="N" 
//                             usrName="Nayanmoni Baruah"
//                             msg = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, sed!"

//                           />
//                           <MasgBtn
//                             nameLogo="N" 
//                             usrName="Nayanmoni Baruah"
//                             msg = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, sed!"

//                           />
//                           <MasgBtn
//                             nameLogo="N" 
//                             usrName="Nayanmoni Baruah"
//                             msg = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, sed!"

//                           />
//                         </div>
//                     </div>
//                 </div>
//             </div>
          






















//           {/* <Mail
//             mailEditor = {mailEditor}
//           /> */}
//           {/*  */}

//             <div className={mailEditor===true?'mail-box-outer' : 'mail-box-outer mail-box-hidden-animation-outer'}>
//                 <div className={mailEditor===true?'mail-box':'mail-box mail-box-hidden-animation-inner'}>

//                     <div className='flex justify-between'>
//                         <p className='font-bold sm:text-sm md:text-lg'>New Message</p>
//                         <div className='close-btn' onClick={close}><i className="fa-solid fa-xmark"></i></div>
//                     </div>
                    
//                     <div>
//                         <input placeholder='To' name='address' className='mail-inputs'>
//                         </input>
//                     </div>

//                     <div>
//                         <input placeholder='Subject' name='subject' className='mail-inputs' type="text">
//                         </input>
//                     </div>
//                     <div className='w-full h-full bg-transparent'>
//                         <div className='mail-editor' data-placeholder='Type Your Message' placeholder='Type Your Message' contentEditable="true"></div>
//                     </div>

//                     <div>
//                         <button className='w-auto h-auto bg-green-600 rounded-md px-3 py-1 mt-2 text-slate-200 font-medium md:text-lg hover:bg-green-400 hover:text-slate-100 transform duration-100 ease-in-out focus:text-slate-600 focus:bg-green-400'>send </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//   )
// }
