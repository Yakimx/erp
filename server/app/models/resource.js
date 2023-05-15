const { Schema, model } = require("mongoose");

const Resource = new Schema({
  id: { type: Number, default: 0, unique: true },

  config: {
    lastDate: { type: String, default: "01.01.2030" },
    checkBoxDate: { type: Boolean, default: false },
    startPlanDate: { type: String, default: "01.01.2030" },
    checkBoxStartDate: { type: Boolean, default: true },    
    weekend: { type: [String], default: "01.01.2030" },
  },

  resources: {
    documentation: {
      dayResources: { type: Number, default: 8 },
      adjustment: { type: Number, default: 0 },
      allWorkDays: { type: Number, default: 0 },
      totalResources: { type: Number, default: 0 },
      requiredResources: { type: Number, default: 0 },
    },
    cutting: {
      dayResources: { type: Number, default: 8 },
      adjustment: { type: Number, default: 0 },
      allWorkDays: { type: Number, default: 0 },
      totalResources: { type: Number, default: 0 },
      requiredResources: { type: Number, default: 0 },
    },
    sheetBender: {
      dayResources: { type: Number, default: 8 },
      adjustment: { type: Number, default: 0 },
      allWorkDays: { type: Number, default: 0 },
      totalResources: { type: Number, default: 0 },
      requiredResources: { type: Number, default: 0 },
    },
    assemblingA: {
      dayResources: { type: Number, default: 8 },
      adjustment: { type: Number, default: 0 },
      allWorkDays: { type: Number, default: 0 },
      totalResources: { type: Number, default: 0 },
      requiredResources: { type: Number, default: 0 },
    },
    assemblingB: {
      dayResources: { type: Number, default: 8 },
      adjustment: { type: Number, default: 0 },
      allWorkDays: { type: Number, default: 0 },
      totalResources: { type: Number, default: 0 },
      requiredResources: { type: Number, default: 0 },
    },
    assemblingC: {
      dayResources: { type: Number, default: 8 },
      adjustment: { type: Number, default: 0 },
      allWorkDays: { type: Number, default: 0 },
      totalResources: { type: Number, default: 0 },
      requiredResources: { type: Number, default: 0 },
    },
    assemblingSau: {
      dayResources: { type: Number, default: 8 },
      adjustment: { type: Number, default: 0 },
      allWorkDays: { type: Number, default: 0 },
      totalResources: { type: Number, default: 0 },
      requiredResources: { type: Number, default: 0 },
    },
    automation: {
      dayResources: { type: Number, default: 8 },
      adjustment: { type: Number, default: 0 },
      allWorkDays: { type: Number, default: 0 },
      totalResources: { type: Number, default: 0 },
      requiredResources: { type: Number, default: 0 },
    },
  },
});

module.exports = model("Resource", Resource);
