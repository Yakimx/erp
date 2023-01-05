const xml2js = require("xml2js");

const xmlToJson = (file) => {
  var parser = new xml2js.Parser();
  let obj = null;
  parser.parseString(file, function (err, result) {
    obj = result;
  });
  return obj;
};

module.exports = xmlToJson;
