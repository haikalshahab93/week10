const { Router } = require('express')
const { ObjectId } = require('mongodb')

const bookRouter = Router()

bookRouter.use((req,res,next)=>{
    console.log("books middleware")
    next()
})

//create book
bookRouter.post('/', async (req, res) => {

  const {title,author} = req.body
  const book = await req.db.collection('books').insertOne({ title, author })

  res.status(200).json({
    message: 'success',
    data: book
  })
})

// get all books
bookRouter.get('/', async (req, res) => { 

  const books = await req.db.collection('books').find({ is_deleted: { $exists: false } }).toArray()

  res.status(200).json({
    message: 'success',
    data: books
  })
})

// delete books

bookRouter.delete('/:id',async(req,res)=>{
    const {id} = req.params;

    const book = await req.db.collection('books').findOneAndUpdate({ _id: new ObjectId(id)} , {$set : {is_deleted:true}})

    res.status(200).json({
      message: 'success'
    })
})



module.exports = bookRouter