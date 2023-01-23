const Contract = require("./../models/contract");
const Product = require("./../models/product");

const createContracts = (objData) => {
  let contracts = objData.map((contract) => {
    let { number, date, status, statusdate, deliverydays, commitmentdate } =
      contract.invoice[0].$;

    let items = contract.invoice[0].item;
    let completionDate =
      deliverydays > 0
        ? new Date(
            deliverydays * 24 * 60 * 60 * 1000 +
              Date.parse(date.split(".").reverse().join("."))
          )
            .toLocaleDateString()
            .split(".")
            .reverse()
            .join(".")
        : commitmentdate.split(".").reverse().join(".");

    return new Contract({
      customer: contract.$.name,
      contractNumber: number,
      startDate: date.split(".").reverse().join("."),
      deliveryDays: +deliverydays,
      status: status,
      statusDate: statusdate.split(".").reverse().join("."),
      completionDateContract: completionDate,
      completionDateDesired: completionDate,
      products: items.map((item) => {
        return new Product({
          name: item.$.name,
          quantity: +item.$.amount,
          code: item.$.id,
          sum: +item.$.sum,
        });
      }),
    });
  });

  return contracts;
};

module.exports = createContracts;
