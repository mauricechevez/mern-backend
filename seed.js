// import all models
const {Book} = require('./models/')

Book.create(
[
  {
      title: 'Book 5',
      author: 'Author 5',
      pages: 199,
      genre: 'Business',
      price: 20,
      isbn: '902391340123941203196'
  },
  {
      title: 'Book 6',
      author: 'Author 6',
      pages: 300,
      genre: 'Software',
      price: 100,
      isbn: '9023913455523941203197'
  },
  {
      title: 'Book 7',
      author: 'Author 7',
      pages: 199,
      genre: 'Business',
      price: 20,
      isbn: '9023913403343441203198'
  },
  {
      title: 'Book 8',
      author: 'Author 8',
      pages: 333,
      genre: 'Software',
      price: 20,
      isbn: '9023912123941203199'
  }
], (err,results) =>{
  err ? console.log(err) : console.log(results)
}

)