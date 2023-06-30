import { sortDateUp, sortDateDown } from "./sortDate";
import { getWorkDay } from "./calcWorkDay";
import { isErrorLab } from "./isErrorLab";

export const calcPlanDelivery = (typeDelivery, contracts, objResources, sector) => {
  let startPlanDate = objResources.config.startPlanDate;  
  
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
      if(product.delivery[sector] > 0){       

        return {...new Item, 
          contractNumber: contract.contractNumber,
          name: product.name,
          id: product._id,          
          indexContract: indexContract,
          indexItem: indexProduct,
          completionDateDesired: contract.completionDateDesired,          
          timeCodeStart: product.delivery[sector] + 20*60*60*1000,
          timeCodeEnd: product.delivery[sector] + 20*60*60*1000,
          delivery: product.delivery[sector],          
       }} 

    })
  })
  
  .filter((el)=>el.length != 0)
  .flat()
  .filter((el)=>el != undefined)
  .sort((a,b)=>sortDateUp(a,b));
 
  //расчет временных меток
for(let i=0; i < plan.itemsPlan.length; i++){

  let time = plan.itemsPlan[i].delivery[sector]

    
  plan.itemsPlan[i].planItem[0]={      
    day: 1,
    days: 1,
    startDate: plan.itemsPlan[i].timeCodeStart,
    endDate: plan.itemsPlan[i].timeCodeEnd,     
     }
   
}


plan.itemsPlan.sort((a, b) => a.timeCodeStart - b.timeCodeStart);




  return plan;
};


