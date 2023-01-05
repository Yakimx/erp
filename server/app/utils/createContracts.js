const Contract = require("./../models/contract");
const Product = require("./../models/product");

const createContracts = (objData) => {
  let contracts = objData.company.customer.map((contract) => {
    let { number, date, status, statusdate, deliverydays, commitmentdate } =
      contract.invoice[0].$;

    let items = contract.invoice[0].item;
    let completionDate =
      deliverydays > 0
        ? new Date(
            deliverydays * 24 * 60 * 60 * 1000 +
              Date.parse(date.split(".").reverse().join("."))
          ).toLocaleDateString()
        : commitmentdate;

    return new Contract({
      customer: contract.$.name,
      contractNumber: number,
      startDate: date,
      deliveryDays: +deliverydays,
      status: status,
      statusDate: statusdate,
      completionDateContract: completionDate,
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
