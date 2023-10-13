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
  const {areas, delivery, areasDesc, deliveryDesc} = useSelector((state)=>state.contracts);
  let list = [...areas, ...delivery];
  let listTab = [...areasDesc, ...deliveryDesc];

  const setActiveTab = (i)=>{
    dispatch(setActiveTabTask(i))
    dispatch(resetActive())    
  }
  

  const {areasPlan} = useSelector((state)=>state.plan);
  
    

// const listTab = [
//   'Документация',  
//   'Рубка', 
//   'Гибка', 
//   'Сварка',
//   'Покраска',
//   'Прокатка',
//   'Балансировка',
//   'Сборка ОП',
//   'Сборка БВ',
//   'Сборка МТФ',
//   'Сборка УПКП',
//   'Документация САУ',  
//   'Сборка САУ',
//   'Снабжение',
//   'Снабжение САУ',
// ]




  return (
    <div className={styles.root}>  

    <TabBarTask listTab={listTab} setActiveTab={(i)=>setActiveTab(i)} activeTab={activeTabTask}/>
    

     
        <Plan plan={areasPlan[list[activeTabTask]]} type={list[activeTabTask]}/>
    
        </div>
  )
}

export default ProductionTasks

