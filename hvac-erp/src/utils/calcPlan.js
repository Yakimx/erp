import { sortDateUp, sortDateDown } from "./sortDate";
import { getWorkDay } from "./../utils/calcWorkDay";
import { isErrorLab } from "./../utils/isErrorLab";

export const calcPlan = (typeDelivery, contracts, objResources, sector, prev) => {
  let startPlanDate = +new Date(Date.parse(objResources.config.startPlanDate.split(".").reverse().join(".")) + new Date().getTimezoneOffset()*60*1000);  
  let startTime = +objResources.resources.areas[sector].startTime.split(':')[0]*60*60*1000 + +objResources.resources.areas[sector].startTime.split(':')[1]*60*1000;
  
  let resourcesDay = objResources.resources.areas[sector].dayResources;
  let weekend = objResources.config.weekend;
  
  let plan = 
    {
      dateStart: startPlanDate,
      itemsPlan: [],
    };
  

  class Item {
    typeDelivery = typeDelivery;
    contractNumber = 0;
    name = "Окно";
    window = false;
    id = 0;
    quantityMade = 0;
    quantityAll = 0;
    quantityMadeToday = 0;
    planQuantityRequired = 0; 
    quantityNotConfirmed = 0;
    indexContract = 0;
    indexItem = 0;
    completionDateDesired = "";
    shift = 0;
    resourcesRequired = 0;
    timeCodeStart = 0;
    timeCodeEnd = 0;
    deliveryOp = 0;
    deliverySau = 0;
    planItem  = [
      {
      newDay:  false,
      window:  0,
      startDate: 0,
      endDate: 0,
      remPerc: 0,
      partDay: 0,
    }
    ]    
 }

  plan.itemsPlan = isErrorLab(contracts).map((contract, indexContract)=>{
    
    return contract.products
    .map((product, indexProduct)=>{    
      if((product.resourcesRequired[sector] > 0) && (product.quantityMade[sector] < product.quantity) 
      && !contract.pause && !contract.shipped && !contract.errLab && contract.completionDateContract != '' ){
       
        let objPrev = getDateDesired (product, prev, contract.completionDateContract, product.shift[sector])

        return {...new Item, 
          contractNumber: contract.contractNumber,
          name: product.name,
          id: product._id,
          quantityMade: product.quantityMade[sector],
          quantityAll: product.quantity,
          quantityMadeToday: product.quantityNotConfirmed[sector],
          planQuantityRequired: Math.round((product.quantity - product.quantityMade[sector]) * 10) / 10, 
          quantityNotConfirmed: product.quantityNotConfirmed[sector],
          indexContract: indexContract,
          indexItem: indexProduct,
          completionDateDesired: objPrev.date,
          shift: objPrev.shift,
          resourcesRequired:Math.round(product.resourcesRequired[sector] * (product.quantity - product.quantityMade[sector])*1000) / 1000,
          timeCodeStart: 0,
          timeCodeEnd: 0,
          sector: sector,
          startTime: startTime,
          prevSector: sector,
          prevStartTime: startTime,
       }} 

    })
  })
  
  .filter((el)=>el.length != 0)
  .flat()
  .filter((el)=>el != undefined)
  .sort((a,b)=>sortDateUp(a,b));

  
 
  //расчет временных меток
for(let i=0; i < plan.itemsPlan.length; i++){
  
  let day = Math.floor((startPlanDate)/(24*60*60*1000)) + 1 ; 
  let time = startTime;
  let timeCodeStart = day*24*60*60*1000 + time;
  let endDayTime = startTime + resourcesDay*60*60*1000;

  
  //let timeCodeStart = day*24*60*60*1000 + startTime;
  //let timeCodeEnd = 0;

  let result;
  if(prev) {
    for(let j = 0; j < prev.length; j++){
      result = prev[j].itemsPlan.find((item)=> item.id == plan.itemsPlan[i].id);
    if (result){
      break;
    }    
    }
   
    if (result) {
      timeCodeStart = result.timeCodeEnd;
      day = Math.floor(result.timeCodeEnd / (24*60*60*1000));
      time = result.timeCodeEnd % (24*60*60*1000);      
      plan.itemsPlan[i].prevSector = result.sector;
      plan.itemsPlan[i].prevStartTime = result.startTime;
    }
     

  }
  
  
  
  if (i==0){

    if(time >= endDayTime) {
      day = day + 1;
      time = startTime;
    } 
    
  } else{
    if(timeCodeStart < plan.itemsPlan[i-1].timeCodeEnd){
      day =  Math.floor(plan.itemsPlan[i-1].timeCodeEnd/(24*60*60*1000))
      time = plan.itemsPlan[i-1].timeCodeEnd % (24*60*60*1000);
    }
    
    if(time >= endDayTime) {
      day = day + 1;
      time = startTime;
    }         
  }

  plan.itemsPlan[i].day = day; 
  plan.itemsPlan[i].time = time; 
  plan.itemsPlan[i].timeCodeStart = day*24*60*60*1000 + time; 

  let dayEnd = day + Math.floor(plan.itemsPlan[i].resourcesRequired/resourcesDay);
  let timeEnd = time + (plan.itemsPlan[i].resourcesRequired % resourcesDay)*60*60*1000;
 
  
  if(timeEnd > (endDayTime)) {
    dayEnd = dayEnd + 1;
    timeEnd = timeEnd - startTime;
  }else{
    if( (timeEnd - time) == 0 ){
      timeEnd =  endDayTime;
      dayEnd = dayEnd - 1;
    }else{
      timeEnd = timeEnd;
    }
    
  } 

  plan.itemsPlan[i].timeCodeEnd = dayEnd*24*60*60*1000 + timeEnd;


  }

//добавление окон
let windows = [];
for(let i=0; i < plan.itemsPlan.length; i++){

  let day = Math.floor((startPlanDate + startTime)/(24*60*60*1000)); 
  let time = startTime;
  let timeCodeStart = day*24*60*60*1000 + time;
  let endDayTime = startTime + resourcesDay*60*60*1000;

  if (i==0){
    
    let timeCodeEnd = plan.itemsPlan[i].timeCodeStart % (24*60*60*1000) == startTime 
    ? (Math.floor(plan.itemsPlan[i].timeCodeStart/(24*60*60*1000)) - 1) *24*60*60*1000 + endDayTime
    : plan.itemsPlan[i].timeCodeStart;

    if(plan.itemsPlan[i].timeCodeStart > timeCodeStart) windows.push({...new Item, 
      window: true,
      id: i + sector,
      completionDateDesired: plan.itemsPlan[i].completionDateDesired,
      timeCodeStart: timeCodeStart, 
      timeCodeEnd: timeCodeEnd});
  } else{

    let end = plan.itemsPlan[i-1].timeCodeEnd - startTime - (resourcesDay)*60*60*1000; 
    let start = plan.itemsPlan[i].timeCodeStart - startTime - 24*60*60*1000; 
    
    let isWind = end == start ? false : true

    if((plan.itemsPlan[i].timeCodeStart > plan.itemsPlan[i-1].timeCodeEnd) && isWind) windows.push({...new Item, 
      window: true,
      id: i + sector,
      completionDateDesired: plan.itemsPlan[i-1].completionDateDesired,
      timeCodeStart: plan.itemsPlan[i-1].timeCodeEnd, 
      timeCodeEnd: plan.itemsPlan[i].timeCodeStart });
}
}

plan.itemsPlan = [...plan.itemsPlan, ...windows].sort((a, b) => a.timeCodeStart - b.timeCodeStart);



plan.itemsPlan = plan.itemsPlan.map((item, index)=>{    

    let days = Math.trunc(item.timeCodeEnd/(24*60*60*1000)) - Math.trunc(item.timeCodeStart/(24*60*60*1000));  
    let startDay = Math.trunc(item.timeCodeStart/(24*60*60*1000));
    var timeZone = new Date().getTimezoneOffset()*60*1000;

    for (let j=0; j <= days; j++){      
      
        item.planItem[j]={      
        day: startDay + j,
        days: days,
        startDate: j==0 
        ? item.timeCodeStart + timeZone
        : startTime + (startDay + j)*24*60*60*1000 + timeZone,
        endDate: j==days 
        ? item.timeCodeEnd + timeZone
        : startTime + resourcesDay*60*60*1000 + (startDay + j)*24*60*60*1000  + timeZone,
        
       }

    }   

   return item;
})

//добавление строки день

for(let i = 0; i < plan.itemsPlan.length; i++){

    
  
  for(let j = 0; j < plan.itemsPlan[i].planItem.length; j++){
   
    let newDay = false;
    if (i==0) {
      newDay = true}else{      
      if(j==0){
        let startDay = plan.itemsPlan[i].planItem[j].day;
        let startDayPrev = plan.itemsPlan[i-1].planItem[plan.itemsPlan[i-1].planItem.length-1].day;
       
        newDay = startDay > startDayPrev ? true : false;
      }else{
        newDay = true;
      }
      
    }


    plan.itemsPlan[i].planItem[j].newDay = newDay;
  
  }
}

 
  return plan;
};

const plusDay = (date)=>{
  return new Date(Date.parse(date) + 1*1000*60*60*24).toLocaleDateString().split(".").reverse().join(".")
}

const getDateDesired = (product, prev, dateDesired, shift)=>{
  
  let obj;
  if(prev) 
  {
    
    for(let j = 0; j < prev.length; j++){
      obj = prev[j].itemsPlan.find((item)=> item.id == product._id);
    if (obj){
      
      break;
    }}     
  }
  

  return obj ? {date: obj.completionDateDesired, shift: obj.shift} : {date: dateDesired, shift: shift};
  
}

