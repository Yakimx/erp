const { Schema, model } = require("mongoose");

const Laboriousness = new Schema({
  name: { type: String, default: "", unique: true },
  code: { type: String, default: "", unique: true },
  areas: {
    documentation: { type: Number, default: 0 },
    delivery: { type: Number, default: 0 },
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
    deliverySAU: { type: Number, default: 0 },
    assemblingSAU: { type: Number, default: 0 },
  }
    
});

module.exports = model("Laboriousness", Laboriousness);
