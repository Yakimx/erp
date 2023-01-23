const Laboriousness = require("../models/laboriousness");

const createLaboriousnes = (name) => {
  return new Laboriousness({
    name: name,
  });
};

module.exports = createLaboriousnes;
