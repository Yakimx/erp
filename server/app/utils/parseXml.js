const xml2js = require("xml2js");

const xmlToJson = (file) => {
  var parser = new xml2js.Parser();
  let obj = null;
  parser.parseString(file, function (err, result) {
    obj = result;
  });
  //no duplicates

  let result = obj.company.customer.filter((contract, i) => {
    let index = obj.company.customer.findIndex((item) => {
      return item.invoice[0].$.number == contract.invoice[0].$.number
        ? true
        : false;
    });
    if (i == index) {
      return true;
    } else {
      console.log(`Удален дубликат: ${contract.invoice[0].$.number}`);
    }
  });

  return result;
};

module.exports = xmlToJson;
