import React from 'react'
import styles from './Input.module.scss'

const Input = ({disabled, inputValue, setValue}) => {


  return (
            
    <input type="number" onChange={(e)=>setValue(e.target.value)} className = {styles.input} value={inputValue} disabled={disabled}></input>
 
  )
}

export default Input