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

    //     let dataMoneyBuy = [
    //         { "name": "dollar", "price": 2, "date":  Date.toLocaleString() ,"description": "add" },
    //         { "name": "euro", "price": 3, "date":  Date.toLocaleString(),"description": "add" },
    //         { "name": "rub", "price": 0.4, "date":  Date.toLocaleString(),"description": "add" },
    //     ];

    //     let dataMoneyCell = [
    //         { "name": "dollar", "price": 2.5, "date":  Date.toLocaleString(),"description": "add" },
    //         { "name": "euro", "price": 3.5, "date":  Date.toLocaleString(),"description": "add" },
    //         { "name": "rub", "price": 0.5, "date":  Date.toLocaleString(),"description": "add" },
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
        { _id: id }, { $set: { price: dbAdminPrice, date: Date.toLocaleString(), description: "update" } },
        { returnOriginal: false }, function (err, result) {
            if (err) return console.log('This is error', err);
            res.send(result.value);
        }
    )
})

app.post('/', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const viewIns = req.body.moneyView;
    const priceIns = req.body.moneyPrice;

    const reqType = req.body.type;
    const globalColection = global["globalColection" + reqType];
    let newMoney = {
        "name": viewIns, "price": priceIns,
        "date": Date.toLocaleString(), "description": "add"
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
    console.log("id",id);
        collection.findOneAndDelete({_id: id},function(err,result){
            if(err) return console.log(err);
            let user = result.value;
            res.send(user);
        })
})

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});
