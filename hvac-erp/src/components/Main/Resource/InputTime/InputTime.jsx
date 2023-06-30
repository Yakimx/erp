import React from 'react'
import styles from './InputTime.module.scss'

const InputTime = ({disabled, inputValue, setValue}) => {
  
  return (
            
    <input type="time" 
      onChange={(e)=>setValue(e.target.value)} 
      className = {styles.input} 
      value={inputValue} 
      disabled={disabled}></input>
 
  )
}

export default InputTime