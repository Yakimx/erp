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
    {activeTab==0 && <Plan plan={documentationPlan} type={'documentation'}/>}
    {activeTab==1 && <Plan plan={automationPlan} type={'automation'}/>}
    {activeTab==2 && <Plan plan={cuttingPlan} type={'cutting'}/>}
    {activeTab==3 && <Plan plan={sheetBenderPlan} type={'sheetBender'}/>}
    {activeTab==4 && <Plan plan={assemblingAPlan} type={'assemblingA'}/>}
    {activeTab==5 && <Plan plan={assemblingBPlan} type={'assemblingB'}/>}
    {activeTab==6 && <Plan plan={assemblingCPlan} type={'assemblingC'}/>}
    {activeTab==7 && <Plan plan={assemblingSauPlan} type={'assemblingSau'}/>}
    





        </div>
  )
}

export default ProductionTasks

