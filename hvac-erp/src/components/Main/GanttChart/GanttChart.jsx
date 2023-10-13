import React from 'react'
import Gantt from './Gantt/Gantt'
import { useSelector } from 'react-redux';

const GanttChart = () => {


  const {number} = useSelector((state)=>state.contracts.activeContract);
  const {allContracts} = useSelector((state)=>state.contracts);
  const {areas, areasDesc} = useSelector((state)=>state.contracts);
  const {areasPlan} = useSelector((state)=>state.plan);

  let activeContract = allContracts.find(item => item.contractNumber == number);
  let products = activeContract ? activeContract.products : [];
  var timeZone = new Date().getTimezoneOffset()*60*1000;
    
  let items = products.map(product=>{
    
    let els = areas.map((area,i) => {    
      return {
        area: area,
        desc: areasDesc[i],
        objArea: areasPlan[area].itemsPlan.find((itemPlan=> itemPlan.id == product._id))
        
      }
    })
    return {els: els, name: product.name}
  });
 
  
  let elChart = items.map((item)=>{
    
    let rows = item.els.map((row, i)=>{

      if(row.objArea){
        return [
          i+row.desc,
          row.desc,
          i,
          new Date(row.objArea.timeCodeStart + timeZone),
          new Date(row.objArea.timeCodeEnd + timeZone) ,
          null,
          100,
          null,
        ]
      }
      
    })
    
    rows = rows.filter(row => row)
    
    return {rows: rows, name: item.name}
  })


  
  
  return (
    
   <div>
    {
      elChart.map((el,index)=>{

        return el.rows.length != 0 ? 
        <div>
          {el.name}
          <Gantt key = {index} rows={el.rows}/>
        </div> 
        :<div></div>

      })

    }

      
    
    </div>

  )
}

export default GanttChart


//   const rows = [
//     [
//       "Research",
//       "Документация",
//       null,
//       new Date(2015, 0, 1),
//       new Date(2015, 0, 5),
//       null,
//       100,
//       null,
//     ],
    // [
    //   "Write",
    //   "Автоматика",
    //   "write",
    //   null,
    //   new Date(2015, 0, 9),
    //   3 * 24 * 60 * 60 * 1000,
    //   25,
    //   "Research",
    // ],
    // [
    //   "Cite",
    //   "Гибка",
    //   "write",
    //   null,
    //   new Date(2015, 0, 7),
    //   1 * 24 * 60 * 60 * 1000,
    //   20,
    //   "Research",
    // ],
    // [
    //   "Complete",
    //   "Сборка",
    //   "complete",
    //   null,
    //   new Date(2015, 0, 10),
    //   1 * 24 * 60 * 60 * 1000,
    //   0,
    //   "Cite,Write",
    // ],
    // [
    //   "Complete 2",
    //   "Сборка №2",
    //   "complete 2",
    //   null,
    //   new Date(2015, 0, 12),
    //   1 * 24 * 60 * 60 * 1000,
    //   0,
    //   "Cite,Write",
    // ],
    // [
    //   "Complete 3",
    //   "Сборка №3",
    //   "complete 3",
    //   null,
    //   new Date(2015, 0, 13),
    //   1 * 24 * 60 * 60 * 1000,
    //   0,
    //   "Cite,Write",
    // ],
    // [
    //   "Complete Sau",
    //   "Сборка САУ",
    //   "complete sau",
    //   null,
    //   new Date(2015, 0, 14),
    //   1 * 24 * 60 * 60 * 1000,
    //   0,
    //   "Cite,Write",
    // ],
    // [
    //   "Outline",
    //   "Заготовка",
    //   "write",
    //   null,
    //   new Date(2015, 0, 6),
    //   1 * 24 * 60 * 60 * 1000,
    //   100,
    //   "Research",
    // ],
  //];