import React from 'react'
import styles from './TabBar.module.scss'

const TabBar = ({listTab, activeTabListTab, setActiveTab}) => {

  return (
    <div className={styles.root}>

<nav>  
  <ul>
    {listTab.map((item, i)=>{
     return <li 
     key={i} 
     onClick={()=>setActiveTab(i)}
     className={i==activeTabListTab ? styles.active: styles.inactive}
     >{item}</li>
    })}
  </ul>
</nav>

    </div>
  )
}

export default TabBar


