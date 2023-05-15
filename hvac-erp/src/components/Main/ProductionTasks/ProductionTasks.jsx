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

  const setActiveTab = (i)=>{
    dispatch(setActiveTabTask(i))
    dispatch(resetActive())    
  }
  

  const {documentation, 
    automation,
    cutting,
    sheetBender,
    assemblingA,
    assemblingB,
    assemblingC,
    assemblingSau,
    } = useSelector((state)=>state.plan);
    

const listTab = ['Документация', 'Документация САУ',
  'Заготовка', 
  'Гибка', 
  'Сборка №1',
  'Сборка №2',
  'Сборка №3',
  'Сборка САУ'
]


  return (
    <div className={styles.root}>  

    <TabBarTask listTab={listTab} setActiveTab={(i)=>setActiveTab(i)} activeTab={activeTabTask}/>

    {/* setInputValueDocumentation,
  setInputValueCutting,
  setInputValueSheetBender,
  setInputValueAssembling,
  setInputValueAutomation, */}
    {activeTabTask==0 && <Plan plan={documentation} type={'documentation'}/>}
    {activeTabTask==1 && <Plan plan={automation} type={'automation'}/>}
    {activeTabTask==2 && <Plan plan={cutting} type={'cutting'}/>}
    {activeTabTask==3 && <Plan plan={sheetBender} type={'sheetBender'}/>}
    {activeTabTask==4 && <Plan plan={assemblingA} type={'assemblingA'}/>}
    {activeTabTask==5 && <Plan plan={assemblingB} type={'assemblingB'}/>}
    {activeTabTask==6 && <Plan plan={assemblingC} type={'assemblingC'}/>}
    {activeTabTask==7 && <Plan plan={assemblingSau} type={'assemblingSau'}/>}
    





        </div>
  )
}

export default ProductionTasks

