import React from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
class Search extends React.Component {
  state = {
    query: '',
    books: []
  }
  updateQuery = (query) => {
    this.setState({ query })
    this.updateSearch();
  }
  filteringDuplicates = (arr) => {
    let filteredBooks = []
    for (var i = 0; i < arr.length; i++) {
      if (filteredBooks.indexOf(arr[i]) === -1) {
        filteredBooks.push(arr[i])
      }
    }
    return filteredBooks
  }
  updateSearch = () => {
    if (this.state.query === '') {
      this.setState({ books: [] })
    }
    if (this.state.query.length) {
    BooksAPI.search(this.state.query).then( res => {
      let shownBooks = this.props.allBooks.concat(res)
      let showingBooks = this.filteringDuplicates(shownBooks);
      const matchingText = new RegExp(escapeRegExp(this.state.query), 'i')

      let finalFilter = showingBooks.filter(book => matchingText.test(book.title) || matchingText.test(book.authors))
      finalFilter.sort(sortBy('title'))

      this.setState({books: finalFilter})
    })}
  }
  // componentWillReceiveProps = (props) => {
  //   this.props = props;
  //   let shownBooks = this.props.allBooks.concat(this.state.books)
  //   this.setState({books: shownBooks})
  // }
  render(){


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
        {this.state.books && (
          this.state.books.map(book => (
            <li key={book.id}>
          <Book
            book={book}
            switchBookShelf={ this.props.switchBookShelf }
          />
          </li>
        )))}
        </ol>
      </div>
    </div>
    )
  }
}
export default Search
