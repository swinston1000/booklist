import React, { Component } from 'react';
import { Col } from 'react-bootstrap'

class Book extends Component {

  titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

  render() {

    const removeBook = this.props.removeBook.bind(this, this.props.id);
    const editBook = this.props.editBook.bind(this, this.props.id);
    const title = this.titleCase(this.props.volumeInfo.title);

    return (
      <Col sm={Math.floor(12/this.props.booksPerRow)}>
        <div className="book">
        <div onClick={editBook} className="edit-icon glyphicon glyphicon-edit" />
        <div onClick={removeBook} className="delete-icon glyphicon glyphicon-minus-sign" />
          <h4 style={{margin:"5px 30px"}}>{title}</h4>
          <img className="thumbnail" src={this.props.volumeInfo.imageLinks.thumbnail} alt={this.props.volumeInfo.title}/>
          <p>By {this.props.volumeInfo.authors[0]}</p>
          <p>Published: {this.props.volumeInfo.publishedDate}</p>
        </div>
      </Col>
    );
  }
}

export default Book;
