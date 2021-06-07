// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const { Book } = require('../models');

// Controllers
const index = async (req, res) => {
  console.log('Inside of /api/books')
  try {
    const allBooks = await Book.find({})

    res.json({book:allBooks})
  } catch (error) {
    console.log('Error inside of /api/books')
    console.log(error)
    return res.status(400).json({message:"Books not found, please try again"})
  }
}

const show = async (req, res) => {
    const {id} = req.params
    try {
      // look for book based on id
    const book = await Book.findById(id)
    console.log(book)
    return res.json({book})
    } catch (error) {
      console.log('Error inside of /api/books/:id')
      return res.status(400).json({message:'Book not found, try again...'})
      
    }
}

const create = async (req, res) => {
  const {title,author,pages,genre,price,isbn} = req.body
  try{
    const newBook = await Book.create(req.body)
    console.log('New book created', newBook)
    res.json({book:newBook})
  } catch(error){
    console.log(' Error inside of POST of /api/books ')
    console.log(error)
    return res.status(400).json({message:'Book was not created, please try again...'})

  }
}

const update = async (req, res) => {
  console.log(req.body)  
  try {
    // const book = await Book.findOne({title:req.body.title})
    console.log()
    const updatedBook = await Book.updateOne({title: req.body.title}, req.body)
    const book = await Book.findOne({title: req.body.title})
    console.log(updatedBook)
    console.log(book)
    res.redirect(`/api/books/${book.id}`)
    
  } catch (error) {
    console.log('Error inside of UPDATE route')
    console.log(error)
    return res.status(400).json({message:'Error updating book. Please try again'})
  }
}

const deleteBook = async (req, res) => {
  const { id } = req.params //:id
  try {
    console.log(id)
    const result = await Book.findByIdAndRemove(id);
    console.log(result)
    res.redirect('/api/books')
  } catch (error) {
    console.log("Error inside DELETE route")
    console.log(error)
    return res.status(400).json({message:'Error deleting book. Please try again'})
  }
    
}


// GET api/books/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'Books endpoint OK!'});
});

// GET -> /api/books
router.get('/', passport.authenticate('jwt', {session:false}), index); 
router.get('/:id', passport.authenticate('jwt', {session:false}), show);
// POST -> /api/books
router.post('/', passport.authenticate('jwt', {session:false}), create);
// PUT -> /api/books
router.put('/', passport.authenticate('jwt', {session:false}), update);
// DELETE -> /api/books/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteBook);

module.exports = router;