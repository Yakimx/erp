export const calcEndDatePlan = (filtrContract, plan) => {
 
  return filtrContract.map((contract)=>{
  
   let dates = [
    ...plan.documentation.itemsPlan.filter(el => contract.contractNumber == el.contractNumber),
    ...plan.cutting.itemsPlan.filter(el => contract.contractNumber == el.contractNumber),
    ...plan.sheetBender.itemsPlan.filter(el => contract.contractNumber == el.contractNumber),
    ...plan.assemblingA.itemsPlan.filter(el => contract.contractNumber == el.contractNumber),
    ...plan.assemblingB.itemsPlan.filter(el => contract.contractNumber == el.contractNumber),
    ...plan.assemblingC.itemsPlan.filter(el => contract.contractNumber == el.contractNumber),
    ...plan.assemblingSau.itemsPlan.filter(el => contract.contractNumber == el.contractNumber),
    ...plan.automation.itemsPlan.filter(el => contract.contractNumber == el.contractNumber),
    ]
    .map((el) => new Date(el.planItem[el.planItem.length-1].endDate.split(".").reverse().join(".")))
    .sort((a, b) => +b - +a )
    dates = dates.length == 0 ? [new Date(0)] : dates
   
    //.map(el => el === undefined ? 0 : el)
    
    // return {contract, completionDatePlan: lastDate[0].toLocaleDateString()}
     
    return {...contract, completionDatePlan: new Date(dates[0]).toLocaleDateString()}
  })
  
 

}