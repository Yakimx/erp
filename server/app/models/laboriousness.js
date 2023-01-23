const { Schema, model } = require("mongoose");

const Laboriousness = new Schema({
  name: { type: String, default: "", unique: true },
  documentation: { type: Number, default: 1 },
  automation: { type: Number, default: 1 },
  cutting: { type: Number, default: 1 },
  sheetBender: { type: Number, default: 1 },
  assemblingA: { type: Number, default: 1 },
  assemblingB: { type: Number, default: 1 },
  assemblingC: { type: Number, default: 1 },
  assemblingSau: { type: Number, default: 1 },
});

module.exports = model("Laboriousness", Laboriousness);
