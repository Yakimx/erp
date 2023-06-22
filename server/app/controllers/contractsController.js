const Contract = require("./../models/contract");
const Laboriousness = require("./../models/laboriousness");
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
      // let contract = await req.body;
      // delete contract._id;
      // delete contract.__v;
      // contract.products.map((product) => delete product._id);
      // let result = await Contract.findOneAndUpdate(
      //   { contractNumber: contract.contractNumber },
      //   contract,
      //   { new: true }
      // );

      // res.send(result);
      let contract = await req.body;
      //delete contract._id;
      //delete contract.__v;
      //contract.products.map((product) => delete product._id);
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

          for(let key in product.quantityMade){
          
            product.quantityMade[key] += +product.quantityNotConfirmed[key];
          }

          for(let key in product.quantityNotConfirmed){
            product.quantityNotConfirmed[key] = 0;
          }

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
      const laboriousness = await Laboriousness.find({});
      
      //res.header("Access-Control-Allow-Origin", "*");
      let filedata = req.file.buffer;
      let contracts = createContracts(xmlToJson(filedata),laboriousness);
      

      let a = await contracts.map(async (contractXml) => {
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
