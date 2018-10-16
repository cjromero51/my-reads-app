import React from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
// import Book from './book'
class Search extends React.Component {
  state = {
    query: '',
    books: []
  }
  updateQuery = (query) => {
    this.setState({ query })
    this.updateSearch();
  }
  updateSearch = () => {
    if (this.state.query === '') {
      this.setState({ books: [] })
    }
    if (this.state.query.length > 0) {
    BooksAPI.search(this.state.query).then( res => {
      console.log(res)

      let shownBooks
      let showingBooks
      shownBooks = this.props.allBooks.concat(res)
      const matchingText = new RegExp(escapeRegExp(this.state.query), 'i')
      showingBooks = shownBooks.filter(book => matchingText.test(book.title) || matchingText.test(book.authors))
      showingBooks.sort(sortBy('title'))
      this.setState({books: showingBooks})
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
          <li key={book.id}>{book.title}</li>
        )))}
        </ol>
      </div>
    </div>
    )
  }
}
export default Search
