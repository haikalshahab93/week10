const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const getAllBooks = async (req,res)=>{
const books = await req.db.collection('books').find().toArray()

try {
    res.status(200).json({
        message:"Book Successfully Retrieved",
        data:books
    })    
} catch (error) {
    res.status(500).json({
        error:error.message
    })
}

}

const createBook = async (req,res)=>{

    const {title,author} = req.body
       
        try {
            const book = await req.db.collection('books').insertOne({title,author})
            res.status(200).json({
                message:"Book Successfully Created",
                data:book
            })
        } catch (error) {
            res.status(500).json({
                error:error.message
            })
        }
}


module.exports = {
    getAllBooks, createBook
}