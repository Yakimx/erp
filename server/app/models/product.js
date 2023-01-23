const { Schema, model } = require("mongoose");

const Product = new Schema({
  name: { type: String, default: "" },
  quantity: { type: Number, default: 0 },
  code: { type: String, default: "" },
  sum: { type: Number, default: 0 },

  type: { type: String, default: "0" },
  quantityMade: {
    documentation: { type: Number, default: 0 },
    automation: { type: Number, default: 0 },
    cutting: { type: Number, default: 0 },
    sheetBender: { type: Number, default: 0 },
    assemblingA: { type: Number, default: 0 },
    assemblingB: { type: Number, default: 0 },
    assemblingC: { type: Number, default: 0 },
    assemblingSau: { type: Number, default: 0 },
  },
  resourcesRequired: {
    documentation: { type: Number, default: 0.5 },
    automation: { type: Number, default: 0.3 },
    cutting: { type: Number, default: 0.3 },
    sheetBender: { type: Number, default: 0.4 },
    assemblingA: { type: Number, default: 0.6 },
    assemblingB: { type: Number, default: 0.7 },
    assemblingC: { type: Number, default: 0.8 },
    assemblingSau: { type: Number, default: 1 },
  },
  resourcesAllQuantity: {
    documentation: { type: Number, default: 0 },
    automation: { type: Number, default: 0 },
    cutting: { type: Number, default: 0 },
    sheetBender: { type: Number, default: 0 },
    assemblingA: { type: Number, default: 0 },
    assemblingB: { type: Number, default: 0 },
    assemblingC: { type: Number, default: 0 },
    assemblingSau: { type: Number, default: 0 },
  },
  quantityNotConfirmed: {
    documentation: { type: Number, default: 0 },
    automation: { type: Number, default: 0 },
    cutting: { type: Number, default: 0 },
    sheetBender: { type: Number, default: 0 },
    assemblingA: { type: Number, default: 0 },
    assemblingB: { type: Number, default: 0 },
    assemblingC: { type: Number, default: 0 },
    assemblingSau: { type: Number, default: 0 },
  },
});

module.exports = model("Product", Product);
