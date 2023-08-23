const {Router} = require('express')
const { ObjectId} = require('mongodb')

const userRouter = Router()


userRouter.use((req,res,next)=>{
  console.log("users middleware")
  next()
})

  //create user
  userRouter.post('/', async (req,res,next)=>{
    console.log(req.body,"test")
  
      const {username,email} = req.body
      const user = await req.db.collection('users').insertOne({username,email})
  
      res.status(200).json({
        message:'success',
        data:user
      })
  
  
  })
  
  // get all users
  userRouter.get('/', async (req,res,next)=>{
  
    const users = await req.db.collection('users').find({is_deleted: {$exists:false}}).toArray()
  
    res.status(200).json({
      message: 'success',
      data:users
    })
  })
  
  //update user 1
  userRouter.put('/:id', async (req,res,next)=>{
  
   const {id} = req.params
  
   const {username,email} = req.body
   const user = await req.db.collection('users').updateOne({ _id: new ObjectId(id)}, { $set: {username,email}})
  
   res.status(200).json({
    message:'success',
    data:user
   })
  })
  
  // delete
  // userRouter.delete('//:id', async (req,res,next)=>{
  
  //   const {id} = req.params
   
  //   const user = await req.db.collection('users').deleteOne({ _id: new ObjectId(id)})
   
  //   res.status(200).json({
  //    message:'success',
  //    data:user
  //   })
  //  })
  
  
  //  delete soft
  
  userRouter.delete('/:id', async (req,res,next)=>{
  
    const {id} = req.params
   
    const user = await req.db.collection('users').findOneAndUpdate({ _id: new ObjectId(id)} , {$set : {is_deleted:true}})
   
    res.status(200).json({
     message:'success'
    })
   })


   module.exports =  userRouter