export const calcPlan = (contracts, objResources, sector) => {
  let startPlanDate = objResources.config.startPlanDate;
  let resources = objResources.resources;
  //let dateStr = new Date().toLocaleDateString();

  let date = new Date(startPlanDate).getTime();

  let indexDay = 0;
  let result = [
    {
      date: new Date(date + indexDay * 24 * 3600 * 1000).toLocaleDateString(),
      list: [],
    },
  ];

  let resourceDay = resources[sector].dayResources;
  let quantityRem = 0;
  let resourceRequired = 0;
  let resourceRequiredItem = 0;

  let itemPlan = {
    contractNumber: 0,
    name: "",
    quantityAll: 0,
    quantityMade: 0,
    quantityMadeToday: 0,
    planResourceRequired: 0,
    planQuantityRequired: 0,
    indexProduct: 0,
  };

  contracts.map((contract) => {
    contract.products.map((product, index) => {
      quantityRem = product.quantity - product.quantityMade[sector];
      resourceRequiredItem = product.resourcesRequired[sector];
      resourceRequired = quantityRem * resourceRequiredItem;

      itemPlan.contractNumber = contract.contractNumber;
      itemPlan.name = product.name;
      itemPlan.id = product._id;
      itemPlan.quantityMadeToday = product.quantityNotConfirmed[sector];
      itemPlan.quantityAll = product.quantity;
      itemPlan.quantityMade = product.quantityMade[sector];
      itemPlan.planResourceRequired = 0;
      itemPlan.indexProduct = index;

      while (resourceRequired > itemPlan.planResourceRequired) {
        if (resourceDay <= 0) {
          result[indexDay].list.push({ ...itemPlan });
          //init new day
          indexDay += 1;
          result.push({
            date: new Date(
              date + indexDay * 24 * 3600 * 1000
            ).toLocaleDateString(),
            list: [],
          });

          resourceDay = resources[sector].dayResources;
          resourceRequired = resourceRequired - itemPlan.planResourceRequired;
          itemPlan.planResourceRequired = 0;
          itemPlan.quantityMadeToday = 0;
        } else {
          // itemPlan.planResourceRequired =
          //   Math.round(itemPlan.planResourceRequired * 10) / 10 + 0.1;
          // itemPlan.planQuantityRequired =
          //   Math.round(
          //     (itemPlan.planResourceRequired / resourceRequiredItem) * 10
          //   ) / 10;

          // resourceDay = Math.round(resourceDay * 10) / 10 - 0.1;
          console.log(itemPlan.planQuantityRequired);
          itemPlan.planResourceRequired = itemPlan.planResourceRequired + 0.2;
          itemPlan.planQuantityRequired =
            itemPlan.planResourceRequired / resourceRequiredItem;
          resourceDay = resourceDay - 0.2;
        }
      }

      result[indexDay].list.push({ ...itemPlan });
    });
  });

  return result;
};
