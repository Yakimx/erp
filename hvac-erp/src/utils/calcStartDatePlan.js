export const calcStartDatePlan = (filtrContract, plan) => {
 
  return filtrContract.map((contract)=>{

    let dates = [ ];

      for(let key in plan.areasPlan){
        dates = [...dates, ...plan.areasPlan[key].itemsPlan.filter(el => contract.contractNumber == el.contractNumber),]
      }  


    dates = dates.map((el) => new Date(el.planItem[el.planItem.length-1].startDate.split(".").reverse().join(".")))
    .sort((a, b) => +a - +b )
    dates = dates.length == 0 ? [new Date(0)] : dates
   
    //.map(el => el === undefined ? 0 : el)
    
    // return {contract, completionDatePlan: lastDate[0].toLocaleDateString()}
     
    return {...contract, startDatePlan: new Date(dates[0]).toLocaleDateString()}
  })
  
 

}