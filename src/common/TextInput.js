import React from 'react'
import classnames from 'classnames';
const TextInput = (props)  => {
  return (
    <div className="form-group">
        {/*<label for="recipient-name" className="col-form-label">Recipient:</label>*/}
        <input type={props.type} 
        className={classnames("form-input", {'is-invalid': props.error})} 
        value = {props.value}
        name= {props.name} 
        onChange = {(e)=>props.onChange(e)}
        placeholder = {props.placeholder}/>
        
    </div>
  )
}

export default TextInput;