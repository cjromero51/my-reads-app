import React from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
// import Book from './book'
class Search extends React.Component {
  state = {
    query: ''
  }
  updateQuery = (query) => {
    this.setState({ query })
  }
  updateSearch = () => {
    if (this.state.query === '') {
      this.setState({ books: [] })
    }
    BooksAPI.search(this.state.query).then( res => {
      console.log(res)
      this.setState({books:res})
    })
  }
  render(){
    let showingBooks
    if (this.state.query !== '') {
      const matchingText = new RegExp(escapeRegExp(this.state.query), 'i')
      showingBooks = this.props.allBooks.filter(book => matchingText.test(book.title) || matchingText.test(book.authors))
    } else {
      showingBooks = this.props.allBooks
    }
    if (this.state.query !== '') {
      showingBooks.sort(sortBy('title'))
    }

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
        <div className="search-books-results">
        <ol className="books-grid">
        {this.state.query !== '' && (
          showingBooks.map(book => (
          <li key={book.id}>{book.title}</li>
        )))}
        </ol>
      </div>
    </div>
    )
  }
}
export default Search
