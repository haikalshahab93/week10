const express = require('express')
const databaseMiddleware = required('./middleware/database-middlewarese.js')
const authRouter = require('/route/auth-route.js')

const app = express()

app.use(express.json())
app.use(databaseMiddleware)

ap.get('/',(req,res)=>{
    res.send('Hello')
})

app.use('/auth',authRouter)
app.use('/books', ()=>{})

app.listen(3000, ()=>{
    console.log("server is running")
})