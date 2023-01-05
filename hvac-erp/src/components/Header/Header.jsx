import React from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/img/logo.png'

const Header = () => {

  return ( 
    
    <div className={styles.root}>      
      <img src={logo}/>    
       
    </div>
    
  )
}

export default Header