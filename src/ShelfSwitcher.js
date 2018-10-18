import React from 'react'

class ShelfSwitcher extends React.Component {
  state = {
    shelf: this.props.book.shelf || 'none'
  }
  componentWillReceiveProps = (props) => {
    this.props = props;
    this.setState({shelf: this.props.book.shelf})
  }
  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.shelf} onChange={(event)=>(this.props.switchBookShelf(this.props.book, event.target.value))}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfSwitcher
