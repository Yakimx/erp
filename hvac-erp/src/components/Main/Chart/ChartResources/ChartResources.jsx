import React from "react";
import styles from "./ChartResources.module.scss";
import { Chart } from "react-google-charts";

const ChartResources = ({ time, freeTime, label }) => {
  let percentageLoad = "20";
  let freePercent = "80";

  const data = [
    ["Resours", "Hours"],
    [`${percentageLoad}%`, time],
    [`${freePercent}%`, freeTime],
  ];

  const options = {
    title: label,
    backgroundColor: "",
    titleTextStyle: { color: "black", fontSize: 14, bold: true },
    pieSliceTextStyle: {
      color: "",
    },
    colors: ["rgb(250, 128, 114)", "rgb(64, 199, 129)"],
    pieSliceBorderColor: "rgb(84, 153, 199)",
    legend: {
      alignment: "center",
      position: "bottom",
      textStyle: { color: "black", fontSize: 12 },
    },
    tooltip: {
      text: "value",
      textStyle: {},
      trigger: "selection",
    },
    is3D: false,
    pieHole: 0.45,
  };

  return (
    <div className={styles.root}>
      
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width="100%"
        height="100%"
        
      />
      
    </div>
  );
};

export default ChartResources;
