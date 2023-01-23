import React from 'react'
import styles from './TabBarTask.module.scss'

const TabBarTask = ({listTab, activeTab, setActiveTab}) => {



  return (
    <div className={styles.root}>

<nav>  
  <ul>
    {listTab.map((item, i)=>{
     return <li 
     key={i} 
     onClick={()=>setActiveTab(i)}
     className={i==activeTab ? styles.active: styles.inactive}
     >{item}</li>
    })}
  </ul>
</nav>

    </div>
  )
}

export default TabBarTask


