import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {

  state = {}

  render(){
    const shelfTitle = this.props.shelf.name
    return (
      <div className='bookshelf'>
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.shelf.books.map(book => (
            <li key={book.id}>
            <Book
              book={book}
              switchBookShelf={ this.props.switchBookShelf }
              />
              </li>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}
export default BookShelf
