import { sortDateUp, sortDateDown } from "./sortDate";
import { getWorkDay } from "./../utils/calcWorkDay";
import { isErrorLab } from "./../utils/isErrorLab";

export const calcPlan = (contracts, objResources, sector, prev) => {
  let startPlanDate = objResources.config.startPlanDate;
  let resources = objResources.resources.areas;
  let weekend = objResources.config.weekend;
  
  let plan = 
    {
      dateStart: Date.parse(startPlanDate.split(".").reverse().join(".")),
      itemsPlan: [],
    };
  
  //contracts = contracts.slice().sort(sortDateUp);

  //isErrorLab

  plan.itemsPlan = isErrorLab(contracts).map((contract, indexContract)=>{
    
    return contract.products
    .map((product, indexProduct)=>{    
      if((product.resourcesRequired[sector] > 0) && (product.quantityMade[sector] < product.quantity) && !contract.pause && !contract.shipped && !contract.errLab){
        return {
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
          completionDateDesired: contract.completionDateDesired,
          shift: product.shift[sector],
          resourcesRequired:Math.round(product.resourcesRequired[sector] * (product.quantity - product.quantityMade[sector])*1000) / 1000,
          timeCodeStart: 0,
          timeCodeEnd: 0,   
           planItem : [
            //{
          //   startDate: '',
          //   endDate: '',
          //   remPerc: 1,
          //   partDay: Math.round(((product.resourcesRequired[sector] * (product.quantity - product.quantityMade[sector])) / resources[sector].dayResources)*1000)/1000,
          // }
          ]
                  
          
       }} 

    })
  })
  
  .filter((el)=>el.length != 0)
  .flat()
  .filter((el)=>el != undefined)
  .sort(sortDateUp)


  //расчет временных меток
for(let i=0; i < plan.itemsPlan.length; i++){

  let timeCodeStart = 0;
  if(prev) {
    let result = prev.itemsPlan.find((item)=> item.id == plan.itemsPlan[i].id);
    if (result) {
      timeCodeStart = result.timeCodeEnd;
     }
  }
  
  if (i==0){
    plan.itemsPlan[i].timeCodeStart = timeCodeStart > 0 ? timeCodeStart : 0;
    plan.itemsPlan[i].timeCodeEnd = timeCodeStart + plan.itemsPlan[i].resourcesRequired;
  } else{

    timeCodeStart = timeCodeStart > plan.itemsPlan[i-1].timeCodeEnd 
    ? timeCodeStart
    : plan.itemsPlan[i-1].timeCodeEnd
    
    plan.itemsPlan[i].timeCodeStart = timeCodeStart ;   
    plan.itemsPlan[i].timeCodeEnd = timeCodeStart + plan.itemsPlan[i].resourcesRequired;
  }

}

//добавление окон



plan.itemsPlan = plan.itemsPlan.map((item)=>{    

    item.planItem[0]={
    startDate: new Date(Date.parse(startPlanDate.split(".").reverse().join(".")) + item.timeCodeStart*24).toLocaleDateString(),
    endDate: new Date(Date.parse(startPlanDate.split(".").reverse().join(".")) + item.timeCodeEnd*24).toLocaleDateString(),
    remPerc: item.timeCodeEnd,
    partDay: item.timeCodeStart,
   }
   return item;
})



  
  //console.log(plan)
  return plan;
};

const plusDay = (date)=>{
  return new Date(Date.parse(date) + 1*1000*60*60*24).toLocaleDateString().split(".").reverse().join(".")
}