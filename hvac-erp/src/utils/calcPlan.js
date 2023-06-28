import { sortDateUp, sortDateDown } from "./sortDate";
import { getWorkDay } from "./../utils/calcWorkDay";
import { isErrorLab } from "./../utils/isErrorLab";

export const calcPlan = (typeDelivery, contracts, objResources, sector, prev) => {
  let startPlanDate = objResources.config.startPlanDate;
  let resourcesDay = objResources.resources.areas[sector].dayResources;
  let weekend = objResources.config.weekend;
  
  let plan = 
    {
      dateStart: Date.parse(startPlanDate.split(".").reverse().join(".")),
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
    completionDateDesired = "30.10.1991";
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
      if((product.resourcesRequired[sector] > 0) && (product.quantityMade[sector] < product.quantity) && !contract.pause && !contract.shipped && !contract.errLab){
       
        let objPrev = getDateDesired (product, prev, contract.completionDateDesired, product.shift[sector])

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
          deliveryOp: product.delivery.op,
          deliverySau: product.delivery.sau, 

       }} 

    })
  })
  
  .filter((el)=>el.length != 0)
  .flat()
  .filter((el)=>el != undefined)
  .sort((a,b)=>sortDateUp(a,b));

  
 
  //расчет временных меток
for(let i=0; i < plan.itemsPlan.length; i++){

  let timeCodeStart = 0;
  let timeCodeEnd = 0;
 


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
     }
  }
  
  if (i==0){

    if(typeDelivery){
    timeCodeStart = 0;
    timeCodeEnd = 2;
    }else{    
    timeCodeStart = timeCodeStart > 0 ? timeCodeStart : 0;
    timeCodeEnd = timeCodeStart + plan.itemsPlan[i].resourcesRequired;
    }
    
  } else{

    if(typeDelivery){
      timeCodeStart = 0;
      timeCodeEnd = 2;
    }else{    
    timeCodeStart = timeCodeStart > plan.itemsPlan[i-1].timeCodeEnd 
    ? timeCodeStart
    : plan.itemsPlan[i-1].timeCodeEnd     
    timeCodeEnd = timeCodeStart + plan.itemsPlan[i].resourcesRequired;
    }

  }

  plan.itemsPlan[i].timeCodeStart = timeCodeStart;   
  plan.itemsPlan[i].timeCodeEnd = timeCodeEnd;


}



// //сортировка по дате
//plan.itemsPlan.sort((a,b)=>sortDateUp(a,b));


//добавление окон
let windows = [];
for(let i=0; i < plan.itemsPlan.length; i++){
  if (i==0){
    if(plan.itemsPlan[i].timeCodeStart > 0) windows.push({...new Item, 
      window: true,
      id: i + sector,
      completionDateDesired: plan.itemsPlan[i].completionDateDesired,
      timeCodeStart:0, 
      timeCodeEnd: plan.itemsPlan[i].timeCodeStart});
  } else{
    if(plan.itemsPlan[i].timeCodeStart > plan.itemsPlan[i-1].timeCodeEnd) windows.push({...new Item, 
      window: true,
      id: i + sector,
      completionDateDesired: plan.itemsPlan[i-1].completionDateDesired,
      timeCodeStart: plan.itemsPlan[i-1].timeCodeEnd, 
      timeCodeEnd: plan.itemsPlan[i].timeCodeStart });
}
}

plan.itemsPlan = [...plan.itemsPlan, ...windows].sort((a, b) => a.timeCodeStart - b.timeCodeStart);



plan.itemsPlan = plan.itemsPlan.map((item, index)=>{
    
    let timeStarDay = Math.round((item.timeCodeStart / resourcesDay - Math.trunc(item.timeCodeStart / resourcesDay))*1000)/1000;
    let timeEndDay = Math.round((item.timeCodeEnd / resourcesDay - Math.trunc(item.timeCodeEnd / resourcesDay))*1000)/1000;
    
    timeEndDay = timeEndDay == 0 ? 1 : timeEndDay;
    let days = Math.trunc(item.timeCodeEnd/resourcesDay) - Math.trunc(item.timeCodeStart/resourcesDay);
    days = item.timeCodeEnd % resourcesDay == 0 ? days-1 : days;
    let startDay = Math.trunc(item.timeCodeStart/resourcesDay)

    for (let j=0; j <= days; j++){      
      
        item.planItem[j]={      
        day: startDay + j,
        days: days,
        startDate: new Date(Date.parse(startPlanDate.split(".").reverse().join(".")) + (startDay  + j )*60*60*1000*24).toLocaleDateString(),
        endDate: new Date(Date.parse(startPlanDate.split(".").reverse().join(".")) + (startDay + j)*60*60*1000*24).toLocaleDateString(),        
        partDay: j==0 ? timeStarDay : 0,
        remPerc: j==days ? timeEndDay : 1,
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

