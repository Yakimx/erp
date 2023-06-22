export const isErrorLab = (contracts) => {
  

  return contracts.map((contract)=>{
    let status = 
    contract.products.find((product)=>{
      let isErr = false;
      for(let key in product.resourcesRequired){
        isErr = product.resourcesRequired[key]== -1 ? true : false;
      }
      return isErr;
    }) ? true : false;
    return {...contract, errLab: status}
  })

};
