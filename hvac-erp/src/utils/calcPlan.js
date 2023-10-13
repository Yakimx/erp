import { sortDateUp, sortDateDown } from "./sortDate";
import { getWorkDay } from "./../utils/calcWorkDay";
import { isErrorLab } from "./../utils/isErrorLab";

export const calcPlan = (typeDelivery, contracts, objResources, sector, prev) => {
  let startPlanDate = +new Date(Date.parse(objResources.config.startPlanDate.split(".").reverse().join(".")) + new Date().getTimezoneOffset()*60*1000);  
  let startTime = +objResources.resources.areas[sector].startTime.split(':')[0]*60*60*1000 + +objResources.resources.areas[sector].startTime.split(':')[1]*60*1000;
  
  let resourcesDay = objResources.resources.areas[sector].dayResources * 60 * 1000;
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
    prevSector = 0;
    prevStartTime = 0;    
    involvedResource = 0;
    freeResource = 0;
    windowResource = 0;
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
          resourcesRequired: Math.round(product.resourcesRequired[sector]* 60 * 1000 * (product.quantity - product.quantityMade[sector])*1000) / 1000,
          timeCodeStart: 0,
          timeCodeEnd: 0,
          sector: sector,
          startTime: startTime,
          
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
  let endDayTime = startTime + resourcesDay;

  
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
  let timeEnd = time + plan.itemsPlan[i].resourcesRequired % resourcesDay;
 
  
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
  let endDayTime = startTime + resourcesDay;


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

    let end = plan.itemsPlan[i-1].timeCodeEnd - startTime - resourcesDay; 
    let start = plan.itemsPlan[i].timeCodeStart - startTime - 24*60*60*1000;     
    let isWind = end == start ? false : true
    
    timeCodeStart = (plan.itemsPlan[i-1].timeCodeEnd % (24*60*60*1000)) == endDayTime
    ? (Math.floor(plan.itemsPlan[i-1].timeCodeEnd/(24*60*60*1000)) + 1)*24*60*60*1000 + startTime
    : plan.itemsPlan[i-1].timeCodeEnd
    
   let timeCodeEnd = (plan.itemsPlan[i].timeCodeStart % (24*60*60*1000)) == startTime
    ? (Math.floor(plan.itemsPlan[i].timeCodeStart/(24*60*60*1000)) - 1)*24*60*60*1000 + endDayTime
    : plan.itemsPlan[i].timeCodeStart

    if((plan.itemsPlan[i].timeCodeStart > plan.itemsPlan[i-1].timeCodeEnd) && isWind) windows.push({...new Item, 
      window: true,
      id: i + sector,
      completionDateDesired: plan.itemsPlan[i-1].completionDateDesired,
      timeCodeStart: timeCodeStart, 
      timeCodeEnd: timeCodeEnd });
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
        : startTime + resourcesDay + (startDay + j)*24*60*60*1000  + timeZone,
        
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

if(plan.itemsPlan.length>0){



 plan.windowResource = plan.itemsPlan.reduce((pre, item)=>{
  return pre + item.planItem.reduce((prev, curr)=>{
        return item.window ? (prev + (curr.endDate - curr.startDate)) : prev;  
  },0)   
  },0)

 plan.involvedResource = plan.itemsPlan.reduce((pre, item)=>{
  return pre + item.planItem.reduce((prev, curr)=>{
        return !item.window ? (prev + (curr.endDate - curr.startDate)) : prev;  
  },0)   
  },0)

  
 plan.windowResource = plan.windowResource;
 plan.involvedResource = plan.involvedResource ;
 plan.resourcesDay = resourcesDay;
// startDate(pin):1688619600000
// endDate(pin):1688623200000
}

  return plan;
};



const calcWeekend = (itemsPlan)=>{

for(let i = 0; i < itemsPlan.length; i++){  
  for(let j = 0; j < itemsPlan[i].planItem.length; j++){
    
    let day = new Date(itemsPlan[i].planItem[j].startDate).getDay(); 
    let flag = false;
    j = flag ? (j-1) : j
        
    if((day == 0 || day == 6) && itemsPlan[i].planItem[j].newDay) {    
      
        for(let i2 = i; i2 < itemsPlan.length; i2++){  
        for(let j2 = j; j2 < itemsPlan[i2].planItem.length; j2++){        
          itemsPlan[i2].planItem[j2].startDate += 24*60*60*1000;
          itemsPlan[i2].planItem[j2].endDate += 24*60*60*1000;          
        }}
        flag = true;
    }else  flag = false;   
    
  }}
return itemsPlan;

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

