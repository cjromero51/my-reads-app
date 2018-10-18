import React from 'react'
import { Link } from 'react-router-dom'
// import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends React.Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    // let inputTest = document.getElementById('myInput')
    // if ( inputTest.value.length === 0 ) {
    //   this.setState({query: ''})
    // }
    this.setState({ query });
    this.updateSearch();
  }

  updateSearch = () => {
    if (this.state.query === '') {
      this.setState({ books: [] })
      return;
    } if (this.state.query !== '') {
    BooksAPI.search(this.state.query).then( res => {
        let finalFilter = []
        finalFilter = this.combineBookCaseAndQuery(this.props.allBooks, res)
        this.setState({books: finalFilter})
    })}
  }
  combineBookCaseAndQuery = (currentBooks, query) => {
    const ht = {};
    currentBooks.forEach(book => ht[book.id] = book.shelf);

    query.forEach(book => {
      book.shelf = ht[book.id] || 'none';
    })
    return query.sort(sortBy('title'));
  }
  // componentWillReceiveProps = (props) => {
  //   this.props = props;
  //   let finalFilter = this.combineBookCaseAndQuery(this.props.allBooks, this.state.books)
  //   this.setState({books: finalFilter})
  // }
  render(){


    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                id='myInput'
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => this.updateQuery(event.target.value)}
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
