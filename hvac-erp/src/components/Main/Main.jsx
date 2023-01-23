import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route} from "react-router-dom";
import { fetchContracts } from '../../redux/slices/contractsSlice';
import { fetchResource } from '../../redux/slices/resourcesSlice';
import { fetchLaboriousness } from '../../redux/slices/laboriousnessSlice';
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

const [activeTab, setActiveTab] = useState(0);

const listTab = ['Производственное задание', 
  'Диаграмма Ганта', 
  'Подробно о договоре', 
  'Ресурсы предприятия',
  'Трудоёмкости',
  // 'Комплектующие',
]


const getResource = async () => {  
  dispatch(fetchResource());
};

React.useEffect(() => { 
  if (status != "success") getResource();
}, []);

const getLaboriousness = async () => {  
  dispatch(fetchLaboriousness());
};

React.useEffect(() => { 
  if (statusLab != "success") getLaboriousness();
}, []);


return (
    <div className={styles.root}>  

<Chart />      
<TabBar listTab={listTab} setActiveTab={setActiveTab} activeTab={activeTab}/>

{(activeTab==0 && status == "success") && <ProductionTasks />}  
{activeTab==1 && <GanttChart />}
{activeTab==2 && <PlanEditor />}
{(activeTab==3 && status == "success") && <Resource />}
{(activeTab==4 && status == "success") && <Laboriousness />}
{/* {activeTab==4 && <Components />} */}

    </div>
  )
}

export default Main