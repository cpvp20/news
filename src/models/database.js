const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();
let db;
let isConnecting;
const mongo_url = process.env.MONGO_URL;


class Database {

    collectionName

    constructor (collection) {
        if (isConnecting) return
        isConnecting = true
        MongoClient.connect(mongo_url, {useUnifiedTopology: true}, (err, client) => {
            console.log(err)
            if(err) {
                console.log('Failed to connect to MongoDB')
                return
            }
        
            db = client.db()
            this.collectionName = collection
            console.log('Successfully connected to MongoDB')
        })  
    }

    async findOne (filters, cb) {
        return db.collection(this.collectionName).findOne(filters, cb)
    }

    async insertOne (obj, cb) {
        return db.collection(this.collectionName).insertOne(obj, cb)
    }

    async updateOne (filters, updates, cb) {
        return db.collection(this.collectionName).updateOne(filters, updates, cb)
    }

    async findByToken (token, cb) {
        return db.collection(this.collectionName).findOne({token: token}, cb)
    }
}

module.exports = Database