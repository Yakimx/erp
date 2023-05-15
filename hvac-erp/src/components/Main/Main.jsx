import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route} from "react-router-dom";
import { fetchContracts } from '../../redux/slices/contractsSlice';

import { fetchLaboriousness } from '../../redux/slices/laboriousnessSlice';
import { setActiveTabListTab } from '../../redux/slices/menuSlice';

import Chart from './Chart/Chart';
import GanttChart from './GanttChart/GanttChart';
import styles from './Main.module.scss'
import PlanEditor from './PlanEditor/PlanEditor';
import ProductionTasks from './ProductionTasks/ProductionTasks';
import Resource from './Resource/Resource';
import TabBar from './TabBar/TabBar';
import Components from './Сomponents/Components';
import Laboriousness from './Laboriousness/Laboriousness';



const Main = () => {

  const dispatch = useDispatch();
  const {status} = useSelector((state)=>state.resources);
  const statusLab = useSelector((state)=>state.laboriousness.status);
  const {activeTabListTab} = useSelector((state)=>state.menu);


//const [activeTab, setActiveTab] = useState(0);

const listTab = ['Подробно о договоре',
  'Производственное задание', 
  'Диаграмма Ганта',    
  'Ресурсы предприятия',
  'Трудоёмкости',
  // 'Комплектующие',
]

const setActiveTab = (i)=>{
  dispatch(setActiveTabListTab(i))
}



const getLaboriousness = async () => {  
  dispatch(fetchLaboriousness());
};

React.useEffect(() => { 
  if (statusLab != "success") getLaboriousness();
}, []);




return (
    <div className={styles.root}>  

<Chart />      
<TabBar listTab={listTab} setActiveTab={(i)=>setActiveTab(i)} activeTabListTab={activeTabListTab}/>
{activeTabListTab==0 && <PlanEditor />}
{(activeTabListTab==1 && status == "success") && <ProductionTasks />}  
{activeTabListTab==2 && <GanttChart />}
{(activeTabListTab==3 && status == "success") && <Resource />}
{(activeTabListTab==4 && status == "success") && <Laboriousness />}
{/* {activeTab==4 && <Components />} */}

    </div>
  )
}

export default Main