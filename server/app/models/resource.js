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
    areas:{

    
    documentation: {
    startTime: { type: String, default: "08:00" },
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    
    cutting: { 
    startTime: { type: String, default: "08:00" },
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 },
   },
    sheetBender: {
    startTime: { type: String, default: "08:00" },
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    welding: {
    startTime: { type: String, default: "08:00" },   
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    painting: {
    startTime: { type: String, default: "08:00" },   
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    rolling: {
    startTime: { type: String, default: "08:00" },   
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    balancing: {
    startTime: { type: String, default: "08:00" },   
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    
    assemblingOP: {
    startTime: { type: String, default: "08:00" },   
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    assemblingBV: {
    startTime: { type: String, default: "08:00" }, 
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    assemblingMTF: {
    startTime: { type: String, default: "08:00" }, 
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    assemblingUPKP: {
    startTime: { type: String, default: "08:00" },   
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },

    documentationSAU: {
    startTime: { type: String, default: "08:00" },   
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    
    assemblingSAU: { 
    startTime: { type: String, default: "08:00" },
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
}
  },
});

module.exports = model("Resource", Resource);
