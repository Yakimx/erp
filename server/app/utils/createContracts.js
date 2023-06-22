const Contract = require("./../models/contract");
const Product = require("./../models/product");
const  isUpkp  = require("./isUpkp");
const  findLaboriousness  = require("./findLaboriousness");


const createContracts = (objData, laboriousness) => {
  
  let contracts = objData.map((contract) => {
    let { number, date, status, statusdate, deliverydays, commitmentdate } =
      contract.invoice[0].$;

    let items = contract.invoice[0].item;
    let completionDate =
      deliverydays > 0
        ? new Date(
            deliverydays * 24 * 60 * 60 * 1000 +
              Date.parse(statusdate.split('.').reverse().join('.'))
          )
            .toLocaleDateString()
        : commitmentdate;

    return new Contract({
      customer: contract.$.name,
      contractNumber: number,
      startDate: date,
      deliveryDays: +deliverydays,
      status: status,
      statusDate: statusdate,
      completionDateContract: completionDate,
      completionDateDesired: completionDate,
      equipmentDate: completionDate,
      completionDatePlan:  new Date(Date.parse(completionDate.split('.').reverse().join('.'))-3*24 * 60 * 60 * 1000).toLocaleDateString(),
      typeUpkp: isUpkp(items),
      products: items.map((item) => {
        return new Product({
          name: item.$.name,
          quantity: +item.$.amount,
          code: item.$.id,
          sum: +item.$.sum,
          resourcesRequired: findLaboriousness(laboriousness, item.$.id),
        });
      }),
    });
  });

  return contracts;
};

module.exports = createContracts;
