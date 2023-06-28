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
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    delivery: {   
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
    welding: { 
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    painting: { 
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    rolling: { 
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    balancing: { 
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    
    assemblingOP: { 
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    assemblingBV: { 
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    assemblingMTF: { 
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    assemblingUPKP: { 
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },

    documentationSAU: { 
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    deliverySAU: {     
    dayResources: { type: Number, default: 8 },
    adjustment: { type: Number, default: 0 },
    allWorkDays: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    requiredResources: { type: Number, default: 0 }, 
  },
    assemblingSAU: { 
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
