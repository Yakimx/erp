const { Schema, model } = require("mongoose");

const Product = new Schema({
  name: { type: String, default: "" },
  quantity: { type: Number, default: 0 },
  code: { type: String, default: "" },
  sum: { type: Number, default: 0 },

  type: { type: String, default: "0" },
  delivery: {   
    op: { type: Number, default: 0 },    
    sau: { type: Number, default: 0 },    
  },
  quantityMade: {
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
  resourcesRequired: {
    documentation: { type: Number, default: 0.3 },
    
    cutting: { type: Number, default: 0.3 },
    sheetBender: { type: Number, default: 0.3 },
    welding: { type: Number, default: 0.3 },
    painting: { type: Number, default: 0.3 },
    rolling: { type: Number, default: 0.3 },
    balancing: { type: Number, default: 0.3 },
    
    assemblingOP: { type: Number, default: 0.3 },
    assemblingBV: { type: Number, default: 0.3 },
    assemblingMTF: { type: Number, default: 0.3 },
    assemblingUPKP: { type: Number, default: 0.3 },

    documentationSAU: { type: Number, default: 0.3 },
    
    assemblingSAU: { type: Number, default: 0.3 },
  },
  resourcesAllQuantity: {
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
  quantityNotConfirmed: {
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
  shift: {
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
  }
});
//[String],
module.exports = model("Product", Product);
