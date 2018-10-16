import React from 'react'
import './App.css'
import BookCase from './BookCase'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
  componentDidMount = () => {
    this.reloadAllBooks()
    // if (this.state.newBook) {
    // }
  }
  reloadAllBooks = () => {
    BooksAPI.getAll().then(allBooks => {
      this.setState({
        books: allBooks,
        newBook: false
      })
      console.log(this.state.books)
    })
  }
  switchShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      let newBooksArray = this.state.books;
      const newBooks = newBooksArray.filter(newBook => newBook.id === book.id)
      if (newBooks[0]) {
        newBooks[0].shelf = shelf;
      } else {
        newBooksArray.push(book)
      }
      this.setState({ books: newBooksArray})
    })
  }
  render() {
    return (
      <BookCase books={this.state.books} reloadAllBooks={this.reloadAllBooks}/>
    )
  }
}

export default BooksApp
