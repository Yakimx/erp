import React from 'react'
import styles from './Progress.module.scss'

const Progress = ({max, value, required}) => {
  return (
    <div className={styles.root}>      
    { required==0 
    ? 
    <div>
    <progress max={1} value={1}>    
    </progress>
    <div className={styles.value}>нет</div>
    </div>
    :
    <div>
    <progress max={max} value={value}>    
    </progress>
    <div className={styles.value}>{value}/{max}</div>
    </div>
    }


  </div>
  )
}

export default Progress