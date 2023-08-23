const {Router} = require('express')
const {createBook,getAllBooks} = require('../service/book-service.js')

const bookRouter = Router()


bookRouter.get('/', getAllBooks) // get All Books
bookRouter.post('/',createBook) // create Book 


module.exports = bookRouter

