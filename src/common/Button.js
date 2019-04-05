import React from 'react'

const Button=(props) =>{
  return (
    <button type = {props.type} className = {["button",props.color].join(' ')} onClick = {()=>props.onClick()}>{props.text}</button>
  )
}
export default Button;