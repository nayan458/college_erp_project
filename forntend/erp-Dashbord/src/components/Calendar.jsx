import React, { useEffect } from 'react'

export default function Calendar() {
    const d = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const daysSort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    let dates = []
    let getdateData=()=>{
        for(let i=1;i<= lastDay;++i){
            dates.push(i);
        }
    }
    getdateData();

    let emptyDate = []

    let putEmptyDates=()=>{
        let yr = d.getFullYear()
        let mnth = d.getMonth()+1
        let g = new Date(`${yr}-${mnth}-01`);
        for(let i=0; i< g.getDay(); i++){
            emptyDate.push(i);
        }
    }

    putEmptyDates();

  return (
    <>
        <div className='w-full h-full bg-slate-200 col-span-4 overflow-y-auto flex flex-col items-center'>
            <div className='grid grid-cols-1 gap-4 w-[85%] mt-2 bg-slate-50 p-5 rounded-md font-bold'>
                    
                        <div className='flex justify-center'>{months[d.getMonth()]}</div>
                    
                
            </div>
            <div className='grid grid-cols-7 gap-4 w-[85%] mt-2 bg-slate-50 p-5 rounded-md md:hidden'>
            {daysSort.map((elem)=>{
                return(
                    <>
                        <div className={elem===daysSort[d.getDay()]?'flex justify-center font-bold':'flex justify-center'}>{elem}</div>
                    </>
                )
            })}
                
            </div>
            <div className='w-[85%] hidden md:block'>
                <div className='md:grid grid-cols-7 gap-4 w-[100%] mt-2 bg-slate-50 p-5 rounded-md'>
                {days.map((elem)=>{
                    return(
                        <>
                            <div className={elem===days[d.getDay()]?'flex justify-center font-bold':'flex justify-center'}>{elem}</div>
                        </>
                    )
                })}
                    
                </div>

            </div>
            <div className='grid grid-cols-7 gap-4 w-[85%] mt-2 bg-slate-50 p-5 rounded-md'>
            {emptyDate.map(()=>{
                return(
                    <>
                        <div className='flex justify-center py-3 border-[2px] border-slate-100 rounded-md'></div>
                    </>
                )
            })}
            {dates.map((elem)=>{
                return(
                    <>
                        <div className={elem===d.getDate()?'flex justify-center py-3 border-[2px] border-slate-100 rounded-md hover:bg-blue-50 font-bold':'flex justify-center py-3 border-[2px] border-slate-100 rounded-md hover:bg-blue-50 '}>{elem}</div>
                    </>
                )
            })}
                
            </div>
        </div>
    </>
  )
}
