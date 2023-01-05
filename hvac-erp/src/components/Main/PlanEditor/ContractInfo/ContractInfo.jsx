import React from 'react'
import styles from './ContractInfo.module.scss'

const ContractInfo = ({label, inputValue}) => {
  return (
    <div className = {styles.root}>

        <div className={styles.label}>{label}</div>
        <div className={styles.input}>{inputValue}</div>
        

   
   </div>
  )
}

export default ContractInfo