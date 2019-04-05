import React from 'react'


export default function Modal(props) {
    console.log("Modal props ", props);
  return (
    <div className = "myModal" >
                <div className="myModal-container">
                <div className="myModal-close" onClick = {props.closeModal}>X</div>
                {props.children}
                </div>
            </div>
  )
}
