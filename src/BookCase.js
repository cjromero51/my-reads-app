import React from 'react'
import BookShelf from './BookShelf'
// import * as BooksAPI from './BooksAPI'
class BookCase extends React.Component {
  state = {

  }
  render(){
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <BookShelf/>
              </div>
            </div>
            <div className="open-search">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
            </div>
          </div>
        </div>
    )
  }
}
export default BookCase
