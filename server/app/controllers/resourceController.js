const Resource = require("./../models/resource");

class resourceController {
  async getResource(req, res) {
    try {
      // let r = new Resource({});
      // r.save();
      const resource = await Resource.find({});
      res.send(resource);
    } catch (e) {
      console.log(e);
    }
  }

  async updateResource(req, res) {
    try {
      let newRes = await req.body;
      const { id, config, resources } = newRes;
      let result = await Resource.findOneAndUpdate(
        { id: 0 },
        { id, config, resources }
      );
      res.send("Файл загружен");
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new resourceController();
