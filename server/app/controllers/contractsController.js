const Contract = require("./../models/contract");
const fs = require("fs");
const xmlToJson = require("../utils/parseXml");
const createContracts = require("../utils/createContracts");
const updateXml = require("../utils/updateXml");

class contractsController {
  async getContracts(req, res) {
    try {
      const contracts = await Contract.find({});
      res.send(contracts);
      //res.json("server work");
    } catch (e) {
      console.log(e);
    }
  }

  async updateContract(req, res) {
    try {
      let contract = await req.body;
      delete contract._id;
      delete contract.__v;
      contract.products.map((product) => delete product._id);
      let result = await Contract.findOneAndUpdate(
        { contractNumber: contract.contractNumber },
        contract,
        { new: true }
      );

      res.send(result);
    } catch (e) {
      console.log(e);
    }
  }

  async xmlParse(req, res) {
    try {
      //res.header("Access-Control-Allow-Origin", "*");
      let filedata = req.file.buffer;
      let contracts = createContracts(xmlToJson(filedata));

      contracts.map(async (contractXml) => {
        let contractDb = await Contract.findOne({
          contractNumber: contractXml.contractNumber,
        });
        if (contractDb) {
          await Contract.findOneAndUpdate(
            { contractNumber: contractDb.contractNumber },
            updateXml(contractDb, contractXml)
          );
        } else {
          contractXml.save(function (err) {
            console.log(err);
          });
        }
      });

      res.send("OK");
      // res.send(contracts);
      //res.send(xmlToJson(filedata));
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new contractsController();
