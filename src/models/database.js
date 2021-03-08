const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
let db;
let isConnecting;

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

class Database {

    collectionName;

    constructor() {
        if (isConnecting) return;

        isConnecting = true;

        MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                console.log("Not connected to database", err);
                return;
            }
            db = client.db();
            console.log("Connected to database");
        });

        setTimeout(() => {
            console.log("timeout");
        }, 2000)
    }

    useCollection(name) {
        this.collectionName = name;
    }
    
    getCollection(){
        return db.collection(this.collectionName);
    }

    find(filters, cb) {
        return this.getCollection().find(filters).toArray(cb);
    }

    findOne(filters, cb) {
        return this.getCollection().findOne(filters, cb);
    }

    insertOne(obj, cb) {
        return this.getCollection().insertOne(obj, cb);
    }
}

module.exports = Database;