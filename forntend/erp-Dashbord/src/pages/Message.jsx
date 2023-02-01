import React from 'react'
import AllMessage from './message/AllMessage';
import cookie from 'universal-cookie'
export default function Message() {
  let cookies = new cookie();
  console.log(cookies.get('token'))
  return (
    <>
      <AllMessage/>
    </>
  )
}
