import React, { useState } from 'react'
import { useSelector } from 'react-redux';
// import { setValueDocumentationInput, 
//   setValueCuttingInput,
//   setValueSheetBenderInput, 
//   setValueAssemblingAInput,
//   setValueAssemblingBInput,
//   setValueAssemblingCInput,
//   setValueAssemblingSauInput, 
//   setValueAutomationInput,} from '../../../redux/slices/planSlice';
import Plan from './Plan/Plan';
import styles from './ProductionTasks.module.scss'
import TabBarTask from '../../../elementsUI/TabBarTask/TabBarTask'

const ProductionTasks = () => {

  const [activeTab, setActiveTab] = useState(0);
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

    <TabBarTask listTab={listTab} setActiveTab={setActiveTab} activeTab={activeTab}/>

    {/* setInputValueDocumentation,
  setInputValueCutting,
  setInputValueSheetBender,
  setInputValueAssembling,
  setInputValueAutomation, */}
    {activeTab==0 && <Plan plan={documentation} type={'documentation'}/>}
    {activeTab==1 && <Plan plan={automation} type={'automation'}/>}
    {activeTab==2 && <Plan plan={cutting} type={'cutting'}/>}
    {activeTab==3 && <Plan plan={sheetBender} type={'sheetBender'}/>}
    {activeTab==4 && <Plan plan={assemblingA} type={'assemblingA'}/>}
    {activeTab==5 && <Plan plan={assemblingB} type={'assemblingB'}/>}
    {activeTab==6 && <Plan plan={assemblingC} type={'assemblingC'}/>}
    {activeTab==7 && <Plan plan={assemblingSau} type={'assemblingSau'}/>}
    





        </div>
  )
}

export default ProductionTasks

