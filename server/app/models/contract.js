const { Schema, model } = require("mongoose");
const Product = require("./product");

const Contract = new Schema({
  customer: { type: String, default: "" },
  contractNumber: { type: String, unique: true, default: "" },
  startDate: { type: String, default: "" },
  deliveryDays: { type: Number, default: 0 },
  completionDateContract: { type: String, default: "" },
  completionDateDesired: { type: String, default: "" },
  status: { type: String, default: "" },
  statusDate: { type: String, default: "" },

  pause: { type: Boolean, default: false },
  onTime: { type: Boolean, default: true }, //Успеваем ли вовремя сделать
  completionDatePlan: { type: String, default: "01.01.2030" },
  completionDateFact: { type: String, default: "01.01.2030" },
  completionPercentage: { type: Number, default: 0 },
  equipmentDate: { type: String, default: "01.01.2030" },
  equipment: { type: Boolean, default: true },
  typeUpkp: { type: Boolean, default: false },
  ready: { type: Boolean, default: false },
  shipped: { type: Boolean, default: false },
  
  //errorData: true,
  resourcesAllProducts: {
    documentation: { type: Number, default: 0 },
    
    cutting: { type: Number, default: 0 },
    sheetBender: { type: Number, default: 0 },
    welding: { type: Number, default: 0 },
    painting: { type: Number, default: 0 },
    rolling: { type: Number, default: 0 },
    balancing: { type: Number, default: 0 },
    
    assemblingOP: { type: Number, default: 0 },
    assemblingBV: { type: Number, default: 0 },
    assemblingMTF: { type: Number, default: 0 },
    assemblingUPKP: { type: Number, default: 0 },

    documentationSAU: { type: Number, default: 0 },
    
    assemblingSAU: { type: Number, default: 0 },
    
    
    
    
    
  },

  products: [],
});

module.exports = model("Contract", Contract);

// {
//     id: "0",
//     status: {
//       active: 1,
//       decoding: ["Работа", "Очередь", "Пауза", "Ошибка данных", "Готов"],
//     },
//     pause: false,
//     onTime: true, //Успеваем ли вовремя сделать
//     errorData: true,
//     contractNumber: "55755",
//     customer: "СП ОАО «Брестгазоаппарат» СП ОАО «Брестгазоаппарат»",
//     startDate: "28.11.2022",
//     completionDateContract: "31.12.2022",
//     completionDatePlan: "31.12.2022",
//     completionDateFact: "31.12.2022",
//     completionPercentage: "70",
//     resourcesAllContract: {
//       documentation: 0,
//       cutting: 0,
//       sheetBender: 0,
//       assembling: 0,
//       automation: 0,
//     },

//     products: [
//       {
//         type: "ВКК",
//         name: "ВКК-100",
//         quantity: 5,
//         quantityMade: {
//           documentation: 1,
//           cutting: 2,
//           sheetBender: 2,
//           assembling: 3,
//           automation: 3,
//         },
//         resourcesRequired: {
//           documentation: 2,
//           cutting: 3,
//           sheetBender: 5,
//           assembling: 5,
//           automation: 5,
//         },
//         resourcesAllQuantity: {
//           documentation: 0,
//           cutting: 0,
//           sheetBender: 0,
//           assembling: 0,
//           automation: 0,
//         },
//         componentsCode: "",
//       },
