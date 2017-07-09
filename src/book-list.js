import React, { Component } from 'react';
import Book from './book';
import PropTypes from 'prop-types';
import { Grid, Row } from 'react-bootstrap'
import { chunk } from 'lodash'

class BookList extends Component {

  renderBooks() {

    const { title, author } = this.props.controls;
    const filteredArray = this.props.books
      .filter(book => book.volumeInfo.title.includes(title))
      .filter(book => author ? book.volumeInfo.authors[0] === author : true);

    const rows = chunk(filteredArray, this.props.booksPerRow)

    return rows.map((row, index) => (
      <Row key={index}>
             {
               row.map((book) => (
                 <Book key={book.id}
                       removeBook={this.props.removeBook} 
                       editBook={this.props.openModal.bind(this, book)} 
                       booksPerRow={this.props.booksPerRow} 
                       {...book} />
               ))
             }
      </Row>
    ))
  }

  render() {
    return (
      <Grid> {this.renderBooks()} </Grid>
    );
  }
}

BookList.propTypes = {
  booksPerRow: PropTypes.number.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape(Book.PropTypes)).isRequired,
  controls: PropTypes.object,
  removeBook: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
};


export default BookList;
