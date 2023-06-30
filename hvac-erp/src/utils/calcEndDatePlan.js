export const calcEndDatePlan = (filtrContract, plan) => {
 
  return filtrContract.map((contract)=>{
  
  
   let dates = [ ]
    for(let key in plan.areasPlan){
      dates = [...dates, ...plan.areasPlan[key].itemsPlan.filter(el => contract.contractNumber == el.contractNumber)]
    }  
    
   
    dates = dates.sort((a, b) => +b.timeCodeEnd - +a.timeCodeEnd )
    
    dates = dates.length == 0 ? [{timeCodeEnd: new Date(0)}] : dates
   
    
     
    return {...contract, completionDatePlan: new Date(dates[0].timeCodeEnd).toLocaleDateString()}
  })
  
 

}