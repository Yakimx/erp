import React from 'react'
import styles from './Gantt.module.scss'
import { Chart } from "react-google-charts";


const Gantt = ({rows}) => {

 
  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Продолжительность" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];
  
  

const data = [columns, ...rows];

const options = {
  backgroundColor: {
    fill: "#CFDBD5",
  },
  //width: 2000,
  height: 400,
  gantt: {
    trackHeight: 30,
    criticalPathEnabled: false,
  },
};


  return (

<div className={styles.root}>
<Chart chartType="Gantt"
 data={data} 
 options={options}/>
 

    </div>
  )
}

export default Gantt


