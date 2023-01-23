import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import TabBarTask from '../../../elementsUI/TabBarTask/TabBarTask';
import ActiveLaboriousness from './ActiveLaboriousness/ActiveLaboriousness';
import DefaultLaboriousness from './DefaultLaboriousness/DefaultLaboriousness';
import styles from './Laboriousness.module.scss'

const Laboriousness = () => {

  const [activeTab, setActiveTab] = useState(0);
  const listTab = ['Активный договор', 'Стандартные значения',];





  return (
    <div className={styles.root}>

    <TabBarTask listTab={listTab} setActiveTab={setActiveTab} activeTab={activeTab}/>

    {activeTab==0 && <ActiveLaboriousness/>}
    {activeTab==1 && <DefaultLaboriousness/>}

    </div>
  )
}

export default Laboriousness