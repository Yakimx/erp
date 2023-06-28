import React from 'react'
import styles from './DeliveryDate.module.scss'

const DeliveryDate = ({date}) => {
  return (
    <div className={styles.root}>
  {
    date == 0  
    ? <div>
    <progress max={1} value={1}>    
    </progress>
    <div className={styles.value}>нет</div>
    </div>
    : <div>{new Date(+date).toLocaleDateString()}</div>

  }
   
  
  </div>
  )
}

export default DeliveryDate