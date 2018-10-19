import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query }, () => {
      this.updateSearch();
    });
  }

  updateSearch = () => {
    if (this.state.query === '') {
      this.setState({ books: [] })
      return;
    } if (this.state.query !== 0) {
      BooksAPI.search(this.state.query).then( res => {
        console.log(this.state.query.value, this.state.query)
        if (res.length > 0) {
          let finalFilter = []
          finalFilter = this.combineBookCaseAndQuery(this.props.allBooks, res);
          finalFilter = finalFilter.sort(sortBy('title'));
          this.setState({books: finalFilter})
        } else {
          this.setState({books: []})
        }
      })
    }
  }
  combineBookCaseAndQuery = (currentBooks, terms) => {
    const ht = {};
    currentBooks.forEach(book => ht[book.id] = book.shelf)
    terms.forEach(book => book.shelf = ht[book.id] || 'none')
    return terms;
  }

  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="search"
                placeholder="Search by title or author"
                onKeyUp={(event) => this.updateQuery(event.target.value)}
                value={this.state.query.value}
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
            switchBookShelf={this.props.switchBookShelf}
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
