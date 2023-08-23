//packaging

const express = require('express');
const { MongoClient} = require('mongodb')
const usersRouter = require('./routes/users_routers.js')
const booksRouter = require('./routes/books_routers.js')


const app = express()

app.use(async (req, res, next) => {
    let db
    try {
        const client = await new MongoClient('mongodb://127.0.0.1:27017').connect()
        db = client.db('revou') // databasenya
    } catch (error) {
        console.log(error, "error")
    }
    req.db = db;
    
    next()
})

app.use(express.json())

//halaman depan
app.get('/', (req, res) => {
    res.send("my router")
})

app.use('/v1/users',usersRouter)
app.use('/v1/books',booksRouter)


app.listen(3000, () => console.log(`Server Started on Port 3000`));