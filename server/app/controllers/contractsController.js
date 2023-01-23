const Contract = require("./../models/contract");
const Resource = require("./../models/resource");
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

  async updatePlan(req, res) {
    try {
      const contracts = await Contract.find({});
      const newContracts = contracts.map((contract) => {
        let newProducts = contract.products.map((product) => {
          product.quantityMade.documentation +=
            +product.quantityNotConfirmed.documentation;
          product.quantityMade.automation +=
            +product.quantityNotConfirmed.automation;
          product.quantityMade.cutting += +product.quantityNotConfirmed.cutting;
          product.quantityMade.sheetBender +=
            +product.quantityNotConfirmed.sheetBender;
          product.quantityMade.assemblingA +=
            +product.quantityNotConfirmed.assemblingA;
          product.quantityMade.assemblingB +=
            +product.quantityNotConfirmed.assemblingB;
          product.quantityMade.assemblingC +=
            +product.quantityNotConfirmed.assemblingC;
          product.quantityMade.assemblingSau +=
            +product.quantityNotConfirmed.assemblingSau;
          product.quantityNotConfirmed.documentation = 0;
          product.quantityNotConfirmed.automation = 0;
          product.quantityNotConfirmed.cutting = 0;
          product.quantityNotConfirmed.sheetBender = 0;
          product.quantityNotConfirmed.assemblingA = 0;
          product.quantityNotConfirmed.assemblingB = 0;
          product.quantityNotConfirmed.assemblingC = 0;
          product.quantityNotConfirmed.assemblingSau = 0;
          return product;
        });
        contract.products = newProducts;
        return contract;
      });
      //console.log(newContracts);
      //console.log(newContracts.products[0].quantityNotConfirmed.documentation);
      newContracts.map(async (contract) => {
        await Contract.findOneAndUpdate(
          { contractNumber: contract.contractNumber },
          contract,
          { new: true }
        );
      });

      res.send("Данные оновлены");
    } catch (e) {
      console.log(e);
    }
  }

  async updateNotConfirmed(req, res) {
    try {
      let contractsClient = await req.body;
      // const contracts = await Contract.find({});
      // let newContracts = contracts.map((contract)=>{
      //   contract.products.map()
      // })

      contractsClient.map(async (contract) => {
        await Contract.findOneAndUpdate(
          { contractNumber: contract.contractNumber },
          contract,
          { new: true }
        );
      });

      res.send("OK");
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
          await contractXml.save();
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
