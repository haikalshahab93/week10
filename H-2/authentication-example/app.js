const express = require('express')
const databaseMiddleware = require('./middleware/database-middleware.js')
const authRouter = require('./routes/auth-route.js')
const bookRouter = require('./routes/book-route.js')

const app = express()

app.use(express.json())
app.use(databaseMiddleware)
    
app.get('/', (req,res)=>{
    res.send('Hello')
})

app.use('/auth',authRouter)
app.use('/books', bookRouter)

app.listen(3000, ()=>{
    console.log("server is running 3000")
})