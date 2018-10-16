import React from 'react'
import './App.css'
import BookCase from './BookCase'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
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
      this.setState({books: newBooksArray})
    })
  }
  render() {
    return (
      <BookCase
        switchBookShelf={ this.switchShelf }
        books={ this.state.books }
        reloadAllBooks={ this.reloadAllBooks }/>
    )
  }
}

export default BooksApp
