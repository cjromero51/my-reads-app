import React from 'react'
import BookShelf from './BookShelf'
// import * as BooksAPI from './BooksAPI'
class BookCase extends React.Component {
  state = {

  }

  updateBookShelves = () => {
    const newCurrentlyReading = {
      name: 'Currently Reading',
      books: this.props.books.filter(book => book.shelf === 'currentlyReading')
    };
    const newWantToRead = {
      name: 'Want to Read',
      books: this.props.books.filter(book => book.shelf === 'wantToRead')
    };
    const newRead = {
      name: 'Read',
      books: this.props.books.filter(book => book.shelf === 'read')
    };
    return ([newCurrentlyReading, newWantToRead, newRead])
  }
  render(){
    let shelves = [];
    if (this.props.books)
      shelves = this.updateBookShelves()
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                {shelves.map(shelf => (
                  <BookShelf
                  key={shelf.name}
                  shelf={shelf}
                  switchBookShelf={ this.props.switchBookShelf }
                    />
                ))
              }
              </div>
            </div>
            <div className="open-search">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default BookCase
