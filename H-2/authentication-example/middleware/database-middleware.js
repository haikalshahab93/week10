const {MongoClient} = require('mongodb')

const databaseMiddleware = async (req,res,next) =>{
    const MongoClient = await new MongoClient('mongodb://127.0.0.1:27017').connect()
    db = MongoClient.db('revou-d2')

    req.db()

    next()
}

module.exports = databaseMiddleware