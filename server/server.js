const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const contractRouter = require("./app/routes/contractsRouter");
const resourceRouter = require("./app/routes/resourceRouter");
const laboriousnessRouter = require("./app/routes/laboriousnessRouter");

const app = express();

app.use(cors());
//app.use(express.json());

app.use(
  bodyParser.urlencoded({
    limit: "1mb",
    extended: false,
  })
);
app.use(bodyParser.json({ limit: "1mb" }));



// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use("/list", contractRouter);
app.use("/resource", resourceRouter);
app.use("/laboriousness", laboriousnessRouter);

const hostname = '10.10.16.2';
const port = 8008;



const urlDb = "mongodb://127.0.0.1:27017/erp";
//const urlDb = "mongodb://6.tcp.eu.ngrok.io:13786/erp";

(async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(urlDb);
    app.listen(port, hostname);
    console.log("Сервер ожидает подключения...");
  } catch (err) {
    return console.log(err);
  }
})();

//app.use(express.static(`${__dirname}/public`));
//const mongoClient = new MongoClient(urlDb);
// (async () => {
//   try {
//     await mongoClient.connect();
//     app.locals.db = mongoClient.db("erp");
//     app.listen(port);
//     console.log("Сервер ожидает подключения...");
//   } catch (err) {
//     return console.log(err);
//   }
// })();

// app.get("/api/users", async (req, res) => {
//   const collection = req.app.locals.db.collection("contracts");
//   try {
//     const users = await collection; //collection.find({}).toArray();
//     res.send(users);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });
// app.get("/api/users/:id", async(req, res) => {

//     const collection = req.app.locals.collection;
//     try{
//         const id = new objectId(req.params.id);
//         const user = await collection.findOne({_id: id});
//         if(user) res.send(user);
//         else res.sendStatus(404);
//     }
//     catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     }
// });

// app.post("/api/users", jsonParser, async(req, res)=> {

//     if(!req.body) return res.sendStatus(400);

//     const userName = req.body.name;
//     const userAge = req.body.age;
//     const user = {name: userName, age: userAge};

//     const collection = req.app.locals.collection;

//     try{
//         await collection.insertOne(user);
//         res.send(user);
//     }
//     catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     }
// });

// app.delete("/api/users/:id", async(req, res)=>{

//     const collection = req.app.locals.collection;
//     try{
//         const id = new objectId(req.params.id);
//         const result = await collection.findOneAndDelete({_id: id});
//         const user = result.value;
//         if(user) res.send(user);
//         else res.sendStatus(404);
//     }
//     catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     }
// });

// app.put("/api/users", jsonParser, async(req, res)=>{

//     if(!req.body) return res.sendStatus(400);
//     const userName = req.body.name;
//     const userAge = req.body.age;

//     const collection = req.app.locals.collection;
//     try{
//         const id = new objectId(req.body.id);
//         const result = await collection.findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName}},
//          {returnDocument: "after" });

//         const user = result.value;
//         if(user) res.send(user);
//         else res.sendStatus(404);
//     }
//     catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     }
// });

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async () => {
  await mongoClient.close();
  console.log("Приложение завершило работу");
  process.exit();
});
