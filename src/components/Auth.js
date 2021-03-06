import React from 'react'

const Auth=(props)=> {
  return (
    <div className = "auth">
        
        <div className="auth-header">
        <h4>{props.title}</h4>
        <p> {props.text}</p>
        </div>
        <div className="auth-body">
            
            {props.children}
        </div>
        <p className = "auth-message">{props.emessage}</p>
        <div className="auth-footer">
            {props.footer}
        </div>
        {props.facebook? <h3>OR</h3>: null}
        
        {props.facebook}
    </div>
  )
}
export default Auth;
