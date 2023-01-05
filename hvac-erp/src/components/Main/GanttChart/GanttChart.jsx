import React from 'react'
import styles from './GanttChart.module.scss'
import { Chart } from "react-google-charts";

const GanttChart = () => {

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
  
  const rows = [
    [
      "Research",
      "Документация",
      null,
      new Date(2015, 0, 1),
      new Date(2015, 0, 5),
      null,
      100,
      null,
    ],
    [
      "Write",
      "Автоматика",
      "write",
      null,
      new Date(2015, 0, 9),
      3 * 24 * 60 * 60 * 1000,
      25,
      "Research,Outline",
    ],
    [
      "Cite",
      "Гибка",
      "write",
      null,
      new Date(2015, 0, 7),
      1 * 24 * 60 * 60 * 1000,
      20,
      "Research",
    ],
    [
      "Complete",
      "Сборка",
      "complete",
      null,
      new Date(2015, 0, 10),
      1 * 24 * 60 * 60 * 1000,
      0,
      "Cite,Write",
    ],
    [
      "Complete 2",
      "Сборка №2",
      "complete 2",
      null,
      new Date(2015, 0, 12),
      1 * 24 * 60 * 60 * 1000,
      0,
      "Cite,Write",
    ],
    [
      "Complete 3",
      "Сборка №3",
      "complete 3",
      null,
      new Date(2015, 0, 13),
      1 * 24 * 60 * 60 * 1000,
      0,
      "Cite,Write",
    ],
    [
      "Complete Sau",
      "Сборка САУ",
      "complete sau",
      null,
      new Date(2015, 0, 14),
      1 * 24 * 60 * 60 * 1000,
      0,
      "Cite,Write",
    ],
    [
      "Outline",
      "Заготовка",
      "write",
      null,
      new Date(2015, 0, 6),
      1 * 24 * 60 * 60 * 1000,
      100,
      "Research",
    ],
  ];
  
const data = [columns, ...rows];
const options = {
  backgroundColor: {
    fill: "#CFDBD5",
  },
  height: 400,
  gantt: {
    trackHeight: 30,
  },
};


  return (
    <div className={styles.root}>

<Chart chartType="Gantt"
 width="100%" 
 height="50%" 
 data={data} 
 options={options}/>

    </div>
  )
}

export default GanttChart


