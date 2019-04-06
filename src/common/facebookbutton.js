import React from 'react'

export default function facebookbutton({onClick}) {
  return (
    <button  className  = "auth__fbbutton" onClick={onClick}>
    Login with facebook
  </button>
  )
}
