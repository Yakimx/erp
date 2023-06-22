import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTabTask } from '../../../redux/slices/menuSlice';
import { resetActive } from '../../../redux/slices/planSlice';
import Plan from './Plan/Plan';
import styles from './ProductionTasks.module.scss'
import TabBarTask from '../../../elementsUI/TabBarTask/TabBarTask'

const ProductionTasks = () => {

  //const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const {activeTabTask} = useSelector((state)=>state.menu);
  const {areas} = useSelector((state)=>state.contracts);

  const setActiveTab = (i)=>{
    dispatch(setActiveTabTask(i))
    dispatch(resetActive())    
  }
  

  const {areasPlan} = useSelector((state)=>state.plan);
  
    

const listTab = [
  'Документация',
  'Снабжение',
  'Рубка', 
  'Гибка', 
  'Сварка',
  'Покраска',
  'Прокатка',
  'Балансировка',
  'Сборка ОП',
  'Сборка БВ',
  'Сборка МТФ',
  'Сборка УПКП',
  'Документация САУ',
  'Снабжение САУ',
  'Сборка САУ',
]




  return (
    <div className={styles.root}>  

    <TabBarTask listTab={listTab} setActiveTab={(i)=>setActiveTab(i)} activeTab={activeTabTask}/>
    

     
        <Plan plan={areasPlan[areas[activeTabTask]]} type={areas[activeTabTask]}/>
    
        </div>
  )
}

export default ProductionTasks

