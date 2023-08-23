//packaging

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb')


const app = express()

app.use(express.json())

let db
let userDao
(async () =>{
  try{
    const client = await  new MongoClient('mongodb://127.0.0.1:27017').connect()
    db = client.db('revou') // databasenya
    userDao = new userDao(db)
  }catch(error){
      console.log(error,"error")
  }
  
})()


//crud

// middleware ) app level middle ware
app.use((req,res,next)=>{
  console.log('middleware');
  next()
})

app.get('/',(req,res)=>{
  res.send("my app")
})

app.post('/v1/users', async (req,res,next)=>{
  console.log(req.body,"test")

    const {username,email} = req.body
    const user = await db.collection('users').insertOne({username,email})

    res.status(200).json({
      message:'success',
      data:user
    })


})

// get all users
app.get('/v1/users', async (req,res,next)=>{

  const users = await db.collection('users').find({is_deleted: {$exists:false}}).toArray()

  res.status(200).json({
    message: 'success',
    data:users
  })
})


app.put('/v1/users/:id', async (req,res,next)=>{

 const {id} = req.params

 const {username,email} = req.body
 const user = await db.collection('users').updateOne({ _id: new ObjectId(id)}, { $set: {username,email}})

 res.status(200).json({
  message:'success',
  data:user
 })
})

// delete
// app.delete('/v1/users/:id', async (req,res,next)=>{

//   const {id} = req.params
 
//   const user = await db.collection('users').deleteOne({ _id: new ObjectId(id)})
 
//   res.status(200).json({
//    message:'success',
//    data:user
//   })
//  })


//  delete soft

app.delete('/v1/users/:id', async (req,res,next)=>{

  const {id} = req.params
 
  const user = await db.collection('users').findOneAndUpdate({ _id: new ObjectId(id)} , {$set : {is_deleted:true}})
 
  res.status(200).json({
   message:'success'
  })
 })




app.listen(3000,()=>console.log(`Server Started on Port 3000`));