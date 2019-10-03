const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const mongodb = require('mongodb').MongoClient;
const jsonParser = express.json();
const objectId = require('mongodb').ObjectID;


app.use(bodyParser.json());
app.use(cors());


const mongoClient = new mongodb("mongodb://localhost:27017/", {
    useNewUrlParser: true
}); // create obect

function curentDate() {
    let date = new Date();
    return date.toLocaleString();
}

mongoClient.connect(function (err, client) {
    const db = client.db("forex");
    const collectionBuy = db.collection("moneyBuy");
    const collectionCell = db.collection("moneyCell");
    const logsBuy = db.collection("logsBuy");
    const logsCell = db.collection("logsCell");
    global.globalColectionBuy = collectionBuy;
    global.globalColectionCell = collectionCell;

    global.globalLogsBuy = logsBuy;
    global.globalLogsCell = logsCell;

    app.listen(8081, () => console.log("Server strt on 8081 port"));
    if (err) {
        return console.log(err);
    }

    // let dataMoneyBuy = [
    //     { "name": "dollar", "price": 2, "date": curentDate(), "description": "add" },
    //     { "name": "euro", "price": 3, "date": curentDate(), "description": "add" },
    //     { "name": "rub", "price": 0.4, "date": curentDate(), "description": "add" },
    // ];

    // let dataMoneyCell = [
    //     { "name": "dollar", "price": 2.5, "date": curentDate(), "description": "add" },
    //     { "name": "euro", "price": 3.5, "date": curentDate(), "description": "add" },
    //     { "name": "rub", "price": 0.5, "date": curentDate(), "description": "add" },
    // ];

    // collectionBuy.insertMany(dataMoneyBuy, function (err, result) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log(result);
    //     client.close();
    // });

    // collectionCell.insertMany(dataMoneyCell, function (err, result) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log(result);
    //     client.close();
    // });

    ////////------------//////////////////////

    // let dataLogsBuy = [
    //     { "name": "dollar","count": 100, "price": 2, "date": curentDate(), "summa": 200 },
    //     { "name": "euro","count": 2000, "price": 3, "date": curentDate(), "summa": 6000 },
    //     { "name": "rub","count": 3400, "price": 0.4, "date": curentDate(), "summa": 1360 },
    // ];

    // let dataLogsCell = [
    //     { "name": "dollar","count": 100, "price": 3, "date": curentDate(), "summa": 300 },
    //     { "name": "euro","count": 2000, "price": 4, "date": curentDate(), "summa": 8000 },
    //     { "name": "rub","count": 3400, "price": 0.7, "date": curentDate(), "summa": 2380 },
    // ];

    // logsBuy.insertMany(dataMoneyBuy, function (err, result) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log(result);
    //     client.close();
    // });

    // logsCell.insertMany(dataMoneyCell, function (err, result) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log(result);
    //     client.close();
    // });

});


app.get('/:type', (req, res) => {
    const reqType = req.params.type;
    const collection = global["globalColection" + reqType];
    collection.find().toArray(function (err, dbTable) {
        if (err) return console.log(err);
        res.send(dbTable);
    })
})

app.put('/', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const dbAdminPrice = req.body.adminPrice;
    const reqType = req.body.type;
    const globalColection = global["globalColection" + reqType];
    globalColection.findOneAndUpdate(
        { _id: id }, { $set: { price: dbAdminPrice, date: curentDate(), description: "update" } },
        { returnOriginal: false }, function (err, result) {
            if (err) return console.log('This is error', err);
            res.send(result.value);
        }
    )
})

app.post('/admin', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const viewIns = req.body.moneyView;
    const priceIns = req.body.moneyPrice;

    const reqType = req.body.typedb;
    const globalColection = global["globalColection" + reqType];
    let newMoney = {
        "name": viewIns, "price": priceIns,
        "date": curentDate(), "description": "add"
    }
    console.log(newMoney);
    globalColection.insertOne(newMoney, function (err, result) {
        if (err) {
            return console.log(err);
        }
    }
    )
})

app.delete('/:id&:type', (req, res) => {
    const id = new objectId(req.params.id);
    const reqType = req.params.type;
    const collection = global["globalColection" + reqType]; // какая таблица
    console.log("id", id);
    collection.findOneAndDelete({ _id: id }, function (err, result) {
        if (err) return console.log(err);
        let user = result.value;
        res.send(user);
    })
})
////------------------////

app.get('user/:type', (req, res) => {
    const reqType = req.params.type;
    const collection = global["globalColection" + reqType];
    collection.find().toArray(function (err, dbTable) {
        if (err) return console.log(err);
        res.send(dbTable);
    })
})

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});
