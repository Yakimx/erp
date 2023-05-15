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
    documentation: { type: Number, default: 1 },
    automation: { type: Number, default: 2 },
    cutting: { type: Number, default: 4 },
    sheetBender: { type: Number, default: 4 },
    assemblingA: { type: Number, default: 4 },
    assemblingB: { type: Number, default: 4 },
    assemblingC: { type: Number, default: 4 },
    assemblingSau: { type: Number, default: 4 },
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
  shift: {
    documentation: { type: Number, default: 0 },
    automation: { type: Number, default: 0 },
    cutting: { type: Number, default: 0 },
    sheetBender: { type: Number, default: 0 },
    assemblingA: { type: Number, default: 0 },
    assemblingB: { type: Number, default: 0 },
    assemblingC: { type: Number, default: 0 },
    assemblingSau: { type: Number, default: 0 },
  }
});
//[String],
module.exports = model("Product", Product);
