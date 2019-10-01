const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const mongodb = require('mongodb').MongoClient;
const jsonParser = express.json();
const objectId = require('mongodb').ObjectID;

let globalColectionBuy;
let globalColectionCell;

app.use(bodyParser.json());
app.use(cors());


const mongoClient = new mongodb("mongodb://localhost:27017/", {
    useNewUrlParser: true
}); // create obect

mongoClient.connect(function (err, client) {
    const db = client.db("forex");
    const collectionBuy = db.collection("moneyBuy");
    const collectionCell = db.collection("moneyCell");
    global.globalColectionBuy = collectionBuy;
    global.globalColectionCell = collectionCell;

    app.listen(8081, () => console.log("Server strt on 8081 port"));
    if (err) {
        return console.log(err);
    }
//     function myDate() {
//         let date = new Date();
//         return date.toLocaleString();
//     }

//     let dataMoneyBuy = [
//         { "name": "dollar", "price": 2, "date": myDate(),"description": "add" },
//         { "name": "euro", "price": 3, "date": myDate(),"description": "add" },
//         { "name": "rub", "price": 0.4, "date": myDate(),"description": "add" },
//     ];

//     let dataMoneyCell = [
//         { "name": "dollar", "price": 2.5, "date": myDate(),"description": "add" },
//         { "name": "euro", "price": 3.5, "date": myDate(),"description": "add" },
//         { "name": "rub", "price": 0.5, "date": myDate(),"description": "add" },
//     ];

//    collectionBuy.insertMany(dataMoneyBuy, function (err, result) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log(result);
//         client.close();
//     });

//     collectionCell.insertMany(dataMoneyCell, function (err, result) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log(result);
//         client.close();
//     });
});


app.get('/:type', (req, res) => {
    const reqType = req.params.type;
    const collection = global["globalColection"+reqType];
    collection.find().toArray(function (err, dbTable) {
        if (err) return console.log(err);
        res.send(dbTable);
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
