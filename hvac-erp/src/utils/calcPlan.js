import { sortDateUp, sortDateDown } from "./sortDate";

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
  let quantityDay = 0;
  let resourceRequired = 0;
  let resourceRequiredItem = 0;

  let itemPlan = {
    contractNumber: 0,
    name: "",
    id: "",
    planResourceRequired: 0,
    // quantityAll: 0,
    // quantityMade: 0,
    // quantityMadeToday: 0,
    //
    // planQuantityRequired: 0,
    // indexProduct: 0,
  };

  let arrResource = [[]];
  contracts = contracts.slice().sort(sortDateUp);

  contracts.map((contract) => {
    contract.products.map((product, index) => {
      itemPlan.contractNumber = contract.contractNumber;
      itemPlan.name = product.name;
      itemPlan.id = product._id;
      itemPlan.planResourceRequired = 0;
      itemPlan.quantityMade = product.quantityMade[sector];
      itemPlan.quantityAll = product.quantity;
      resourceRequiredItem = product.resourcesRequired[sector];

      //fjsaofjosdfnsdfindjf
      itemPlan.quantityMadeToday = product.quantityNotConfirmed[sector];
      itemPlan.indexProduct = index;
      /////
      itemPlan.resourceRequiredItem = resourceRequiredItem;

      quantityRem = product.quantity - product.quantityMade[sector];
      if (quantityRem > 0) {
        resourceRequired = +(quantityRem * resourceRequiredItem).toFixed(2);

        while (resourceRequired > resourceDay) {
          itemPlan.planResourceRequired = resourceDay;
          arrResource[indexDay].push({ ...itemPlan });
          arrResource.push([]);
          indexDay += 1;
          itemPlan.planResourceRequired = 0;
          resourceRequired = resourceRequired - resourceDay;
          resourceDay = resources[sector].dayResources;
        }
        itemPlan.planResourceRequired = resourceRequired;
        arrResource[indexDay].push({ ...itemPlan });
        resourceDay = resourceDay - resourceRequired;
      }
    });
  });

  //add planQuantityRequired
  arrResource.map((day, indexDay) => {
    day.map((item, index) => {
      let quan =
        arrResource[indexDay][index].planResourceRequired /
        arrResource[indexDay][index].resourceRequiredItem;
      arrResource[indexDay][index].planQuantityRequired =
        Math.round(quan * 10) / 10;

      let remainder =
        quan * arrResource[indexDay][index].resourceRequiredItem -
        (Math.round(quan * 10) / 10) *
          arrResource[indexDay][index].resourceRequiredItem;

      if (indexDay + 1 < arrResource.length) {
        if (
          arrResource[indexDay][index].id == arrResource[indexDay + 1][0].id
        ) {
          arrResource[indexDay + 1][0].planResourceRequired += remainder;
        }
      }
    });
  });

  //add date
  arrResource.map((day, indexDay) => {
    arrResource[indexDay] = {
      date: new Date(date + indexDay * 24 * 3600 * 1000).toLocaleDateString(),
      list: arrResource[indexDay],
    };
  });

  return arrResource;
};
