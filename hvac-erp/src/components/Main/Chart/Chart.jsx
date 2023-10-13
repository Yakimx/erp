import React from 'react'
import ChartResources from './ChartResources/ChartResources'
import styles from './Chart.module.scss'
import { useSelector } from 'react-redux';

const Chart = () => {

  const {areas, areasDesc, deliveryDesc} = useSelector((state)=>state.contracts);
  const {areasPlan, lastTime} = useSelector((state) => state.plan);
  
  
  let flag = Object.keys(areasPlan) != 0  
  

const getData = (areas)=>{  
  
let result = areas.map(area => {
  let dataInv = 0;
  let dataWind = 0;
  let dataFree = 0;

  if(areasPlan[area]){
    let startTime = areasPlan[area].dateStart;
    console.log(areasPlan[area].resourcesDay)
    let allResource = Math.round((Math.trunc(lastTime/(24*60*60*1000)) - Math.trunc(startTime/(24*60*60*1000)) ) * areasPlan[area].resourcesDay);
    
   
    dataInv = areasPlan[area].involvedResource / allResource * 100;
    dataWind = areasPlan[area].windowResource / allResource * 100;
    dataFree = 100 - dataInv - dataWind;
    // dataInv = areasPlan[area].involvedResource;
    // dataWind = areasPlan[area].windowResource;
    // dataFree = allResource - dataInv - dataWind;
  }
 
  return {dataInv, dataWind, dataFree};
})

return result;
}

  let dataResource = getData(areas);
  let dataInv = dataResource.map(data => data.dataInv);  
  let dataWind = dataResource.map(data => data.dataWind);  
  let dataFree = dataResource.map(data => data.dataFree);  
  

  
    
  const labels = areasDesc;

  const data = {
    labels,   
    datasets: [
      {
        label: 'Задействовано, %',
        data: dataInv,
        backgroundColor: 'rgba(64, 199, 129, 0.5)',
      },
      {
        label: 'Окна, %',
        data: dataWind,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Свободно, %',
        data: dataFree,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  
  return (
    <div>
      {Object.keys(areasPlan).length != 0 &&
      
      <div className={styles.chart}>
      <ChartResources data = {data}/>      
      </div>

      }
    
</div>
  )
}

export default Chart