import React from 'react'
import ShelfSwitcher from './ShelfSwitcher'

class Book extends React.Component {
  render(){
    const author = this.props.book.authors
    const title = this.props.book.title
    const imageURL = (this.props.book.imageLinks && `url("${this.props.book.imageLinks.smallThumbnail}")`)
    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 192,
              backgroundImage: imageURL
            }}>
            </div>
            <ShelfSwitcher
              book={this.props.book}
              switchBookShelf={ this.props.switchBookShelf }
            />
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{author}</div>
        </div>
    )
  }
}
export default Book
