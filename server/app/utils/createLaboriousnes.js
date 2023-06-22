const Laboriousness = require("../models/laboriousness");

const createLaboriousnes = (item) => {
  return new Laboriousness({
    name: item.name,
    code: item.code,
    areas: item.areas,
  });
};

module.exports = createLaboriousnes;
