import { sortDateUp, sortDateDown } from "./sortDate";
import { getWorkDay } from "./../utils/calcWorkDay";

export const calcPlan = (contracts, objResources, sector) => {
  let startPlanDate = objResources.config.startPlanDate;
  let resources = objResources.resources;
  let weekend = objResources.config.weekend;
  
  let plan = 
    {
      dateStart: Date.parse(startPlanDate.split(".").reverse().join(".")),
      itemsPlan: [],
    };
  
  //contracts = contracts.slice().sort(sortDateUp);

  plan.itemsPlan = contracts.map((contract, indexContract)=>{
    
    return contract.products
    .map((product, indexProduct)=>{    
      if((product.resourcesRequired[sector] > 0) && (product.quantityMade[sector] < product.quantity) && !contract.pause && !contract.shipped){
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
  .slice().sort(sortDateUp)

  //calc date
  let startDate = startPlanDate;
  let resourcesRem = resources[sector].dayResources; 
  let remPerc = 1; 
  plan.itemsPlan = plan.itemsPlan.map((item)=>{    
    if(resourcesRem >= item.resourcesRequired){
      item.planItem[0]={
       startDate: startDate,
       endDate: startDate,
       remPerc: resourcesRem/resources[sector].dayResources,
       partDay: item.resourcesRequired/resources[sector].dayResources,
      }
      
      resourcesRem = resourcesRem - item.resourcesRequired;      
      if(resourcesRem == 0) {
        
        let i = 1;
        while(getWorkDay(new Date(Date.parse(startDate.split(".").reverse().join(".")) + 1*1000*60*60*24).toLocaleDateString(), new Date(Date.parse(startDate.split(".").reverse().join(".")) + i*1000*60*60*24).toLocaleDateString(), weekend)==0){
          i++;
        }
        
        startDate = new Date(Date.parse(startDate.split(".").reverse().join(".")) + (i)*1000*60*60*24).toLocaleDateString();
        resourcesRem = resources[sector].dayResources; 
      };
    }else{      
      
      let day = Math.round((item.resourcesRequired - resourcesRem)/ (resources[sector].dayResources ));
      item.planItem = new Array(day + 2)
      let a = item.resourcesRequired;
      //resourcesRem = resourcesRem + item.resourcesRequired;

      for(let i = 0 ; i < item.planItem.length; i++){
        if(a > resourcesRem){
          item.planItem[i] = {
           startDate: startDate,
           endDate: startDate,
           remPerc: resourcesRem/resources[sector].dayResources,
           partDay: resourcesRem/resources[sector].dayResources,
          }          
          a = a - resourcesRem;
          resourcesRem = resources[sector].dayResources;
        
          let j = 1;
          while(getWorkDay(new Date(Date.parse(startDate.split(".").reverse().join(".")) + 1*1000*60*60*24).toLocaleDateString(), new Date(Date.parse(startDate.split(".").reverse().join(".")) + j*1000*60*60*24).toLocaleDateString(), weekend)==0){
          j++;
        }
          startDate = new Date(Date.parse(startDate.split(".").reverse().join(".")) + (j) *1000*60*60*24).toLocaleDateString();
        }else{          
          item.planItem[i] = {
          startDate: startDate,
          endDate: startDate,
          remPerc: 1,
          partDay: a/resources[sector].dayResources,      
        }          
          resourcesRem = resourcesRem - a;
          
        }       
   
      }

    
      // item.remPerc = resourcesRem/resources[sector].dayResources;
      // resourcesRem = ((day+1)*resources[sector].dayResources) - (item.resourcesRequired - resourcesRem);
      // item.endDate = new Date(Date.parse(startDate.split(".").reverse().join(".")) + (day + 1) *1000*60*60*24).toLocaleDateString();
      // startDate = item.endDate; //new Date(Date.parse(startDate.split(".").reverse().join(".")) + day*1000*60*60*24).toLocaleDateString();
    }    
    return item;
  })

  
  //console.log(plan)
  return plan;
};

const plusDay = (date)=>{
  return new Date(Date.parse(date) + 1*1000*60*60*24).toLocaleDateString().split(".").reverse().join(".")
}