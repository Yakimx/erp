export const calcStartDatePlan = (filtrContract, plan) => {
 
  return filtrContract.map((contract)=>{

    let dates = [ ];

      for(let key in plan.areasPlan){
        dates = [...dates, ...plan.areasPlan[key].itemsPlan.filter(el => contract.contractNumber == el.contractNumber),]
      }  


    dates = dates.sort((a, b) => +a.timeCodeStart - +b.timeCodeStart )
    dates = dates.length == 0 ? [{timeCodeStart: new Date(0)}] : dates
   
    //.map(el => el === undefined ? 0 : el)
    
    // return {contract, completionDatePlan: lastDate[0].toLocaleDateString()}
     
    return {...contract, startDatePlan: new Date(dates[0].timeCodeStart).toLocaleDateString()}
  })
  
 

}

