const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const mongodb = require('mongodb').MongoClient;
const jsonParser = express.json();
const objectId = require('mongodb').ObjectID;

let globalColection;

app.use(bodyParser.json());
app.use(cors());


const mongoClient = new mongodb("mongodb://localhost:27017/", {
    useNewUrlParser: true
}); // create obect

mongoClient.connect(function (err, client) {
    const db = client.db("forex");
    const collection = db.collection("money");
    globalColection = collection;
    app.listen(8081, () => console.log("Server strt on 8081 port"));
    if (err) {
                return console.log(err);
            }
    // let dataMoney = [{ "name": "dollar", "price": 100 },
    // { "name": "euro", "price": 200 },
    // { "name": "rub", "price": 50 }, ];
    // collection.insertMany(dataMoney, function (err, result) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log(result);
    //     client.close();
    // });
});


app.get('/', (req, res) => {
    const collection = globalColection;
    collection.find().toArray(function (err, dbuser) {
        if (err) return console.log(err);
        res.send(dbuser);
    })
})

app.put('/', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    console.log("data:", req.body);
    const dbAdminPrice = req.body.adminPrice;
    globalColection.findOneAndUpdate(
        { _id: id }, { $set: { price: dbAdminPrice } },
        { returnOriginal: false }, function (err, result) {
            if (err) return console.log('This is error', err);
            res.send(result.value);
        }
    )
})

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});
