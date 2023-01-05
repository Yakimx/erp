import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { setValueDocumentationInput, 
  setValueCuttingInput,
  setValueSheetBenderInput, 
  setValueAssemblingAInput,
  setValueAssemblingBInput,
  setValueAssemblingCInput,
  setValueAssemblingSauInput, 
  setValueAutomationInput,} from '../../../redux/slices/planSlice';
import Plan from './Plan/Plan';
import styles from './ProductionTasks.module.scss'
import TabBarTask from './TabBarTask/TabBarTask'

const ProductionTasks = () => {

  const [activeTab, setActiveTab] = useState(0);
  const {documentationPlan, 
    automationPlan,
    cuttingPlan,
    sheetBenderPlan,
    assemblingAPlan,
    assemblingBPlan,
    assemblingCPlan,
    assemblingSauPlan,
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
    {activeTab==0 && <Plan plan={documentationPlan} setValueInput={setValueDocumentationInput}/>}
    {activeTab==1 && <Plan plan={automationPlan} setValueInput={setValueAutomationInput}/>}
    {activeTab==2 && <Plan plan={cuttingPlan} setValueInput={setValueCuttingInput}/>}
    {activeTab==3 && <Plan plan={sheetBenderPlan} setValueInput={setValueSheetBenderInput}/>}
    {activeTab==4 && <Plan plan={assemblingAPlan} setValueInput={setValueAssemblingAInput}/>}
    {activeTab==5 && <Plan plan={assemblingBPlan} setValueInput={setValueAssemblingBInput}/>}
    {activeTab==6 && <Plan plan={assemblingCPlan} setValueInput={setValueAssemblingCInput}/>}
    {activeTab==7 && <Plan plan={assemblingSauPlan} setValueInput={setValueAssemblingSauInput}/>}
    





        </div>
  )
}

export default ProductionTasks

