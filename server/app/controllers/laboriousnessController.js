const Laboriousness = require("./../models/laboriousness");
const createLaboriousnes = require("../utils/createLaboriousnes");

class laboriousnessController {
  async getLaboriousness(req, res) {
    try {
      const laboriousness = await Laboriousness.find({});
      res.send(laboriousness);
    } catch (e) {
      console.log(e);
    }
  }

  async addLaboriousness(req, res) {
    try {
      let name = req.body.name;
      let laboriousnes = createLaboriousnes(name);
      laboriousnes.save(function (err) {
        console.log(err);
      });
      res.send("OK");
    } catch (e) {
      console.log(e);
    }
  }

  async deleteLaboriousness(req, res) {
    try {
      const id = req.params.id;
      const laboriousness = await Laboriousness.findByIdAndDelete(id);
      if (laboriousness) res.send(laboriousness);
      else res.sendStatus(404);
    } catch (e) {
      console.log(e);
    }
  }

  async updateLaboriousness(req, res) {
    try {
      let laboriousness = await req.body;
      laboriousness.map(async (item) => {
        let laboriousnesDb = await Laboriousness.findOne({
          _id: item._id,
        });
        if (laboriousnesDb) {
          await Laboriousness.findByIdAndUpdate(laboriousnesDb.id, {
            name: item.name,
            documentation: item.documentation,
            automation: item.automation,
            cutting: item.cutting,
            sheetBender: item.sheetBender,
            assemblingA: item.assemblingA,
            assemblingB: item.assemblingB,
            assemblingC: item.assemblingC,
            assemblingSau: item.assemblingSau,
          });
        }
      });

      res.send("Данные обновлены");
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new laboriousnessController();
