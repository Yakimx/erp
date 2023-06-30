const Contract = require("./../models/contract");
const Product = require("./../models/product");
const  isUpkp  = require("./isUpkp");
const  findLaboriousness  = require("./findLaboriousness");


const createContracts = (objData, laboriousness) => {
  //commitmentdate="14.06.2023" manufacturedate="10.07.2023">
  let contracts = objData.map((contract) => {
    let { number, date, status, statusdate, deliverydays, commitmentdate, manufacturedate } =
      contract.invoice[0].$;

    let items = contract.invoice[0].item;
    let completionDate = manufacturedate;
      // deliverydays > 0
      //   ? new Date(
      //       deliverydays * 24 * 60 * 60 * 1000 +
      //         Date.parse(statusdate.split('.').reverse().join('.'))
      //     )
      //       .toLocaleDateString()
      //   : commitmentdate;

    return new Contract({
      customer: contract.$.name,
      contractNumber: number,
      startDate: commitmentdate,
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
