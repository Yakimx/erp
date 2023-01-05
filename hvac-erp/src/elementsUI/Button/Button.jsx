import React from 'react'
import styles from './Button.module.scss'

const Button = ({label, click, disabled}) => {
  return (
    <div>
        <button disabled={disabled} onClick={click} className={styles.button}>{label}</button>
    </div>
  )
}

export default Button