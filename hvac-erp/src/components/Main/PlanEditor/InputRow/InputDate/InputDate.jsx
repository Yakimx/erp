import React from 'react'
import styles from './InputDate.module.scss'

const InputDate = ({disabled, inputValue, setValue}) => {
  //2023-06-07
let dateStr = new Date(+inputValue).toLocaleDateString().split('.').reverse().join('-');
  return (
            
    <input type="date" min={new Date()
      .toLocaleDateString()
      .split(".")
      .reverse()
      .join("-")} 
      onChange={(e)=>setValue(e.target.value)} 
      className = {styles.input} value={dateStr} 
      disabled={disabled}></input>
 
  )
}

export default InputDate