const updateXml = (contractDb, contractXml) => {
  contractDb.deliveryDays = contractXml.deliveryDays;
  contractDb.startDate = contractXml.startDate;
  contractDb.status = contractXml.status;
  contractDb.statusDate = contractXml.statusDate;
  contractDb.completionDateContract = contractXml.completionDateContract;
  //   contractDb.products.map(item=>{

  //   })

  return contractDb;
};

module.exports = updateXml;

// {
//     deliveryDays: contract.deliveryDays,
//     startDate: contract.startDate,
//     status: contract.status,
//     nastatusDateme: contract.nastatusDateme,
//     completionDateContract: contract.completionDateContract,
//     products: {
//       name: contract.products.name,
//       quantity: contract.products.quantity,
//       componentsCode: contract.products.componentsCode,
//       sum: contract.products.sum,
//     },
//   }
